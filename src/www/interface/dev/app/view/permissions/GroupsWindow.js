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
console.log('Log: Load: Webcampak.view.permissions.GroupsWindow');
//var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');
Ext.define('Webcampak.view.permissions.GroupsWindow' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.groupwindow',

	height: 500,
	width: 600,	
	layout: {
		type:'hbox',
		align: 'stretch',
		pack: 'start'			
	},		
	items: [{
		flex: 1,
		title: i18n.gettext('Available Groups'),		
		xtype: 'grouplist',		
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			items: [{
				text: i18n.gettext('Add'),
				iconCls: 'icon-add',
				xtype: 'button',
				action: 'openAddGroupWindow'
			}, '-', {
				itemId: 'delete',
				text: i18n.gettext('Delete'),
				iconCls: 'icon-delete',
				xtype: 'button',
				action: 'deleteGroup',
				disabled: true
			}] 
		}]   				
	}, {
		flex: 4,
		xtype: 'panel',
		itemId: 'groupnmemberscenter',	
		hidden: true,	
		autoScroll:true,
		layout: {
			type:'vbox',
			align: 'stretch',
			pack: 'start'	
		},
		items:[{		
			flex: 1,
			title: i18n.gettext('Manage group members'),
			itemId: 'groupnamemembers',
			layout: {
				type:'hbox',
				align: 'stretch',
				pack: 'start'			
			},
			items: [{
				flex: 1,
				title: i18n.gettext('Webcampak users'),
				xtype: 'groupavailableusers',
				dockedItems: [{
					dock: 'bottom',
					items:[{							
						padding: '2',
						html: '<b><u>' + i18n.gettext('Tip:') + '</u></b> ' + i18n.gettext('Drag users to the right grid to add them to members list')
					}]	
				}]						
			}, {
				flex: 1,
				title: i18n.gettext('Members of the group'),
				xtype: 'groupmembers',
				dockedItems: [{
					dock: 'bottom',
					items:[{							
						padding: '2',
						html: '<b><u>' + i18n.gettext('Tip:') + '</u></b> ' + i18n.gettext('Drag users to the left grid to remove them from members list')
					}]		
				}]								
			}]		
		}, {
			flex: 1,			
			title: i18n.gettext('Manage page access for group members'),
			itemId: 'groupmanagepages',
			layout: {
				type:'hbox',
				align: 'stretch',
				pack: 'start'		
			},
			items: [{
				flex: 1,
				title: i18n.gettext('Webcampak pages'),
				xtype: 'groupavailablepages',
				dockedItems: [{
					xtype: 'toolbar',
					dock: 'bottom',
					items: [{
						text: i18n.gettext('Add'),
						iconCls: 'icon-add',
						xtype: 'button',
						action: 'addPage'
					}, '-', {
						itemId: 'delete',
						text: i18n.gettext('Delete'),
						iconCls: 'icon-delete',
						xtype: 'button',
						action: 'deletePage'//,
						//disabled: true
					}]
				}]	 					
			}, {
				flex: 1,
				title: i18n.gettext('Access allowed'),
				xtype: 'grouppages'	
			}]	
		}]	
	}]
});	
 

