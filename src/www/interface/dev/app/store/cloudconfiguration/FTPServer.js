/*
Copyright 2010-2012 Infracom & Eurotechnia (support@webcampak.com)
This file is part of the Webcampak project.
Webcampak is free software: you can redistribute it and/or modify it 
under the terms of the GNU General Public License as published by 
the Free Software Foundation, either version 3 of the License, 
or (at your option) any later version.

Webcampak is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Webcampak. 
If not, see http://www.gnu.org/licenses/.
*/
console.log('Log: Load: Webcampak.store.cloudconfiguration.FTPServer');
Ext.define('Webcampak.store.cloudconfiguration.FTPServer', {
	extend: 'Ext.data.Store',
	model: 'Webcampak.model.cloudconfiguration.FTPServer',
//	autoLoad: true,
	autoSync: true,    
	proxy: {  	
		type: 'rest',
		url: '/interface/app.php/cloudconfigftpservers',
		extraParams: {sourceid: '0'},		
		reader: {
			type: 'json',
			root: 'data'
		},
		writer: {
			type: 'json'
		}	
	 
	},
	listeners: {
		beforeload: function(store, opt){
			Ext.getBody().mask(i18n.gettext('Please wait, loading content...'));	
		},	
		dataChanged: function(store) {
			Ext.getBody().unmask();	
		},
		write: function(store, operation){
    		console.log('Log: Store->Configuration->FTPServer: listeners write: function(store, operation)');			
			var record = operation.getRecords()[0],
				name = Ext.String.capitalize(operation.action),
				verb;
    		console.log('Log: Store->Configuration->FTPServer: listeners write: action: ' + name);		
			if (name == 'Destroy') {
				record = operation.records[0];
				verb = i18n.gettext('Destroyed');
			} else {
				verb = name + 'd';
			}
			Ext.customPopup.msg(name, Ext.String.format('{0} ' + i18n.gettext('Server:') + ' {1}', verb, record.getId()));
		}
	}    
});
