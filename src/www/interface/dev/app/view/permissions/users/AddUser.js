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
console.log('Log: Load: Webcampak.view.permissions.users.AddUser');
Ext.define('Webcampak.view.permissions.users.AddUser' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.permissionsadduser',
	 
	iconCls: 'icon-user',  	
	title: i18n.gettext('Add a User'),
	//layout: 'fit',
	width: 400,
	//height: 300,
	items: [{
		bodyPadding: '12 10 10',		
		xtype: 'form',	
		//layout: 'fit',	
		itemId: 'permissionsadduserform',
		items: [{
			flex: 1,				
			name: 'adduserusername',
			itemId: 'adduserusername',
			xtype: 'textfield',
			fieldLabel: i18n.gettext('Username'),
			vtype: 'alphanum',
			allowBlank: false			
		}, {
			flex: 1,				
			name: 'adduserpassword',
			itemId: 'adduserpassword',
			xtype: 'textfield',
			fieldLabel: i18n.gettext('Password'),
			minLength: 8,
			allowBlank: false		
		}, {
			flex: 1,				
			name: 'adduseremail',
			itemId: 'adduseremail',
			xtype: 'textfield',
			fieldLabel: i18n.gettext('Email')
		}, {
			flex: 1,				
			name: 'adduserfirstname',
			itemId: 'adduserfirstname',
			xtype: 'textfield',
			fieldLabel: i18n.gettext('Firstname')
		}, {
			flex: 1,				
			name: 'adduserlastname',
			itemId: 'adduserlastname',
			xtype: 'textfield',
			fieldLabel: i18n.gettext('Lastname')	
		}, {
			flex: 1,				
			name: 'addusercompany',
			itemId: 'addusercompany',
			xtype: 'userscompanieslist',
			fieldLabel: i18n.gettext('Company')			
		}, {
			flex: 1,				
			name: 'addusergroup',
			itemId: 'addusergroup',
			xtype: 'usersgroupslist',
			fieldLabel: i18n.gettext('Group')	
		}, {
			flex: 1,				
			itemId: 'adduserinterface',
			fieldLabel: i18n.gettext('Enable Interface'),	
			name: 'adduserinterface',
			xtype: 'checkboxfield',
			uncheckedValue: 'no',	
			inputValue: 'yes'					
		}],
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			items: [{
				text: i18n.gettext('Add'),
				xtype: 'button',
				action: 'addUser'
			}, '-', {
				text: i18n.gettext('Cancel'),
				xtype: 'button',
				action: 'closeAddUserWindow'
			}] 
		}]			
	}]
});



