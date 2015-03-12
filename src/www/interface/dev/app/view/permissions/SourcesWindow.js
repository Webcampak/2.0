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
console.log('Log: Load: Webcampak.view.permissions.SourcesWindow');
//var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');
Ext.define('Webcampak.view.permissions.SourcesWindow' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.sourcewindow',
		
	height: 500,
	width: 600,	
	layout: {
		type:'hbox',
		align: 'stretch',
		pack: 'start'		
	},		
	items: [{
		flex: 2,
		title: i18n.gettext('Available Sources'),		
		xtype: 'sourcelist',		
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			items: [{
				text: i18n.gettext('Add'),
				iconCls: 'icon-add',
				xtype: 'button',
				action: 'openAddSourceWindow'
			}, '-', {
				itemId: 'delete',
				text: i18n.gettext('Delete'),
				iconCls: 'icon-delete',
				xtype: 'button',
				action: 'deleteSource',
				disabled: true
			}] 
		}]   				
	}, {
		flex: 3,
		xtype: 'panel',
		itemId: 'sourcenmemberscenter',	
		hidden: true,	
		autoScroll:true,
		layout: {
			type:'vbox',
			align: 'stretch',
			pack: 'start'		
		},
		items:[{		
			flex: 1,
			title: i18n.gettext('Manage source members'),
			itemId: 'sourcenamemembers',
			layout: {
				type:'hbox',
				align: 'stretch',
				pack: 'start'		
			},
			items: [{
				flex: 1,
				title: i18n.gettext('Webcampak users'),
				xtype: 'sourceavailableusers',
				dockedItems: [{
					dock: 'bottom',
					items:[{							
						padding: '2',
						html: '<b><u>' + i18n.gettext('Tip:') + '</u></b> ' + i18n.gettext('Drag users to the right grid to add them to members list')
					}]	
				}]						
			}, {
				flex: 1,
				title: i18n.gettext('Members of the source'),
				xtype: 'sourcemembers',
				dockedItems: [{
					dock: 'bottom',
					items:[{							
						padding: '2',
						html: '<b><u>' + i18n.gettext('Tip:') + '</u></b> ' + i18n.gettext('Drag users to the left grid to remove them from members list')
					}]		
				}]								
			}]		
		}]	
	}]
});	
 	

