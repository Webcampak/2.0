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
console.log('Log: Load: Webcampak.view.permissions.users.UserSources');
Ext.define('Webcampak.view.permissions.users.UserSources' ,{
	extend: 'Ext.grid.Panel',
	alias : 'widget.usersources',
	
   multiSelect: true,
	viewConfig: {
		plugins: {
			ptype: 'gridviewdragdrop',
			dragText: i18n.gettext('Drag sources to add them to the user'),
			dragGroup: 'usersourcesDDGroup',
			dropGroup: 'useravailablesourcesDDGroup'
		}
	},
   
	store: 'permissions.users.UserSources',
	autoScroll: true,
	minHeight: 50,
	border: 0,
	columns: [
		{header: i18n.gettext('ID #'), 			dataIndex: 'id',					sortable: false, 	width: 40	},
		{header: i18n.gettext('Source ID'), 	dataIndex: 'sourceid',			sortable: true, 	width: 60	},		
		{header: i18n.gettext('Name'), 			dataIndex: 'name',				sortable: true, 	flex: 1		},
		{header: i18n.gettext('Permission'), 	dataIndex: 'permission',		sortable: true, 	width: 70, 
			field: {
				xtype: 				'combobox', 
				mode:					'local',
				value:				'rw',	
				triggerAction:		'all',
				forceSelection:	true,
				editable:			false,		
				displayField:		'name',						
				valueField:			'value',
				queryMode:			'local',
				store: Ext.create('Ext.data.Store', {
						fields : ['name', 'value'],
						data   : [
							{name : i18n.gettext('Read-Only'),	value: 'ro'},
							{name : i18n.gettext('Read-Write'),	value: 'rw'}
						]
					})				
			}
		}				
	],
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        })
    ],	
    selType: 'rowmodel'                 
});

