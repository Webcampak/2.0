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
console.log('Log: Load: Webcampak.view.cloudconfiguration.ftpservers.AddFTPServer');
Ext.define('Webcampak.view.cloudconfiguration.ftpservers.AddFTPServer' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.cloudconfigurationftpserversaddftpserver',
	 
	iconCls: 'icon-settings',  	
	title: i18n.gettext('Add a FTP Server'),
	//layout: 'fit',
	width: 400,
	//height: 300,
	items: [{
		bodyPadding: '12 10 10',		
		xtype: 'form',	
		//layout: 'fit',	
		itemId: 'configurationftpserversaddftpserverform',
		items: [{
			flex: 1,				
			name: 'addservername',
			itemId: 'addservername',
			xtype: 'textfield',
			fieldLabel: i18n.gettext('Server Name (Description)'),
			vtype: 'alphanum',
			allowBlank: false			
		}, {
			flex: 1,				
			name: 'addserverhost',
			itemId: 'addserverhost',
			xtype: 'textfield',
			fieldLabel: i18n.gettext('Host'),
			allowBlank: false		
		}, {
			flex: 1,				
			name: 'addserverusername',
			itemId: 'addserverusername',
			xtype: 'textfield',
			fieldLabel: i18n.gettext('Username'),
			allowBlank: false					
		}, {
			flex: 1,				
			name: 'addserverpassword',
			itemId: 'addserverpassword',
			xtype: 'textfield',
			fieldLabel: i18n.gettext('Password'),
			allowBlank: false							
		}, {
			flex: 1,				
			name: 'addserverdirectory',
			itemId: 'addserverdirectory',
			xtype: 'textfield',
			fieldLabel: i18n.gettext('Directory')
		}, {
			flex: 1,				
			itemId: 'addserveractive',
			name: 'addserveractive',			
			fieldLabel: i18n.gettext('Active Mode'),
			xtype: 'checkboxfield',
			uncheckedValue: 'no',	
			inputValue: 'yes'					
		}],
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			items: [{
				text: i18n.gettext('Add'),
				iconCls: 'icon-add',				
				xtype: 'button',
				action: 'addFTPServer'
			}, '-', {
				text: i18n.gettext('Cancel'),
				xtype: 'button',
				action: 'closeAddFTPServerWindow'
			}] 
		}]			
	}]
});



