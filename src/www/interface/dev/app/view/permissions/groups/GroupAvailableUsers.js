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
console.log('Log: Load: Webcampak.view.permissions.groups.GroupAvailableUsers');
//var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');
Ext.define('Webcampak.view.permissions.groups.GroupAvailableUsers' ,{
	extend: 'Ext.grid.Panel',
	alias : 'widget.groupavailableusers',
   multiSelect: true,
	viewConfig: {
		plugins: {
			ptype: 'gridviewdragdrop',
			dragText: i18n.gettext('Drag users to add them to the group'),
			dragGroup: 'groupavailableusersDDGroup',
			dropGroup: 'groupmembersDDGroup'			
		}		
	},   

	store: 'permissions.groups.GroupAvailableUsers',
	autoScroll: true,
	border: 0,
	columns: [
		{header: i18n.gettext('ID #'), 		dataIndex: 'id',			sortable: false, 	width: 40								},
		{header: i18n.gettext('Username'), 	dataIndex: 'username',	sortable: true, 	flex: 1, 	editor: 'textfield'	},
		{header: i18n.gettext('Firstname'), dataIndex: 'firstname',	sortable: true, 	flex: 1, 	editor: 'textfield'	},
		{header: i18n.gettext('Lastname'), 	dataIndex: 'lastname',	sortable: true, 	flex: 1, 	editor: 'textfield'	}				
	],

    selType: 'rowmodel'
                 
});

