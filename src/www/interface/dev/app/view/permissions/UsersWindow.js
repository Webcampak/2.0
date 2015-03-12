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
console.log('Log: Load: Webcampak.view.permissions.UsersWindow');
Ext.define('Webcampak.view.permissions.UsersWindow' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.userswindow',
	height: 500,
	width: 600,

	layout: {
		type:'vbox',
		pack: 'start',
		align: 'stretch'
	},	

	items: [{
		flex: 2,
		xtype: 'userlist',		
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'top',
			items: [{
				text: i18n.gettext('Add'),
				iconCls: 'icon-add',
				xtype: 'button',
				action: 'openAddUserWindow'
			}, '-', {
				itemId: 'delete',
				text: i18n.gettext('Delete'),
				iconCls: 'icon-delete',
				xtype: 'button',
				action: 'deleteUser',
				disabled: true
			}, '-', {
				xtype: 'container',
				flex: 1
			}, '-', {				
				text: i18n.gettext('Refresh'),
				iconCls: 'icon-reload',					
				xtype: 'button',
				action: 'reloadUsers'
			}] 
		}]   				
	}, {
		flex: 3,
		xtype: 'panel',
		title: i18n.gettext('Select a user in the list above'),
		itemId: 'usersourcescenter',
		autoScroll:true,
		layout: {
			type:'hbox',
			align: 'stretch',
			pack: 'start'		
		},			
		items:[{
			flex: 1,
			hidden: true,
			title: i18n.gettext('Webcampak sources'),
			itemId: 'useravailablesources',			
			xtype: 'useravailablesources',
			dockedItems: [{
				dock: 'bottom',
				items:[{			
					border: 0,										
					padding: '2',
					html: '<b><u>' + i18n.gettext('Tip:') + '</u></b> ' + i18n.gettext('Drag sources to the right grid to add them to granted list')
				}]	
			}]	
		},{	
			flex: 1,
			hidden: true,
			title: i18n.gettext('Access granted to the following sources'),
			itemId: 'usersources',						
			xtype: 'usersources',
			dockedItems: [{
				dock: 'bottom',
				items:[{			
					border: 0,										
					padding: '2',
					html: '<b><u>' + i18n.gettext('Tip:') + '</u></b> ' + i18n.gettext('Drag sources to the left grid to remove them from granted list')
				}]	
			}]									
		}]
	}] 
});
