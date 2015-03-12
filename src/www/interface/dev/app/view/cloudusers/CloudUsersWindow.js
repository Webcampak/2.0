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
console.log('Log: Load: Webcampak.view.cloudusers.CloudUsersWindow');
Ext.define('Webcampak.view.cloudusers.CloudUsersWindow' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.cloudusersCloudUsersWindow',

		
	iconCls: 'icon-cloudusers',  	
	title: i18n.gettext('Manage Cloud users'),//'Manage Cloud users',
	layout: 'fit',
	width: 1100,
	minHeight: 300, 
	scroll: true,
	autoScroll: true,	
	maximizable: true,
	minimizable: true,
	closeAction : 'hide',	
	items: [{
		flex: 1,
		title: i18n.gettext('Available Webcampak Cloud users'), //'Available Webcampak Cloud users',		
		xtype: 'cloudusersUsersList',		
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			items: [{
				text: i18n.gettext('Add'), //'Add',
				iconCls: 'icon-add',
				xtype: 'button',
				action: 'openAddUserWindow'
			}, '-', {
				itemId: 'delete',
				text: i18n.gettext('Delete'), //'Delete',
				iconCls: 'icon-delete',
				xtype: 'button',
				action: 'deleteCloudUser',
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
	}]
});



