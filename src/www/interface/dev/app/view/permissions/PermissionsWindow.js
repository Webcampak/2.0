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
console.log('Log: Load: Webcampak.view.permissions.PermissionsWindow');
Ext.define('Webcampak.view.permissions.PermissionsWindow' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.permissionswindow',
	 
    requires: [
        'Webcampak.view.permissions.GroupsWindow',
        'Webcampak.view.permissions.SourcesWindow',
        'Webcampak.view.permissions.UsersWindow'       
    ],	
	
	iconCls: 'icon-user',  	
	title: i18n.gettext('Manage Permissions & interface settings'),
	layout: 'fit',
	width: 900,
	//height: 400, 
	scroll: true,
	autoScroll: true,	
	maximizable: true,
	minimizable: true,
	closeAction : 'hide',	
	items: [{
		xtype: 'tabpanel',
		items: [{
			title: i18n.gettext('Users'),
			itemID: 'users',
			xtype: 'userswindow',
			border: 0			
		}, {
			title: i18n.gettext('Groups'),
			itemID: 'openGroupsTab',
			layout: 'fit',
			items: [{
				xtype: 'groupwindow'
			}]				
		},	 {
			title: i18n.gettext('Companies'),
			itemID: 'companies',
			xtype: 'companylist',	
			border: 0		
		}, {
			title: i18n.gettext('Sources'),
			itemID: 'sources',
			layout: 'fit',			
			items: [{
				xtype: 'sourcewindow'
			}]
		}]		
	}]
});



