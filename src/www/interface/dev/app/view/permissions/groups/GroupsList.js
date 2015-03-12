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
console.log('Log: Load: Webcampak.view.permissions.groups.GroupsList');
//var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');
Ext.define('Webcampak.view.permissions.groups.GroupsList' ,{
	extend: 'Ext.grid.Panel',
	alias : 'widget.grouplist',

	store: 'permissions.groups.Groups',
//	scroll: true,
	autoScroll: true,
	//height: 250,
	border: 0,
	columns: [
		{header: i18n.gettext('ID #'), dataIndex: 'id',	sortable: false, 	width: 40								},
		{header: i18n.gettext('Name'), dataIndex: 'name',	sortable: true, 	flex: 1, 	editor: 'textfield'	}
	],
    selType: 'rowmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        })
    ]             
});
