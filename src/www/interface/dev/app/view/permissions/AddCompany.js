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
console.log('Log: Load: Webcampak.view.permissions.AddCompany');
Ext.define('Webcampak.view.permissions.AddCompany' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.permissionsaddcompany',
	 
	iconCls: 'icon-user',  	
	title: i18n.gettext('Add a Company'),
	layout: 'fit',
	width: 400,
	items: [{
		bodyPadding: '12 10 10',		
		xtype: 'form',	
		layout: 'fit',	
		itemId: 'permissionsaddcompanyform',
		items: [{
			flex: 1,				
			name: 'addcompanyname',
			itemId: 'addcompanyname',
			xtype: 'textfield',
			fieldLabel: i18n.gettext('Company Name')	
		}],
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			items: [{
				text: i18n.gettext('Add'),
				xtype: 'button',
				action: 'addCompany'
			}, '-', {
				text: i18n.gettext('Cancel'),
				xtype: 'button',
				action: 'closeAddCompanyWindow'
			}] 
		}]			
	}]
});



