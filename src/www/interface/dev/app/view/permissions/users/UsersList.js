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
console.log('Log: Load: Webcampak.view.permissions.users.UsersList');
//var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');
Ext.define('Webcampak.view.permissions.users.UsersList' ,{
	extend: 'Ext.grid.Panel',
	alias : 'widget.userlist',

	store: 'permissions.Users',
	autoScroll: true,
	columns: [
        	{text: i18n.gettext('ID'), 					width: 40, 	sortable: true, 								dataIndex: 'id'}, 
        	{text: i18n.gettext('Username'),				flex: 1, 	sortable: true, 	allowBlank: false, 	dataIndex: 'username', 		field: {xtype: 'textfield'}}, 
        	{text: i18n.gettext('Password'),				width: 80, 	sortable: true, 	allowBlank: false, 	dataIndex: 'password', 		field: {xtype: 'textfield'}}, 
        	{text: i18n.gettext('Email'), 				flex: 1.5, 	sortable: true, 								dataIndex: 'email', 			field: {xtype: 'textfield',vtype: 'email'}}, 
        	{text: i18n.gettext('Firstname'), 			flex: 1, 	sortable: true, 								dataIndex: 'firstname', 	field: {xtype: 'textfield'}}, 
        	{text: i18n.gettext('Lastname'),				flex: 1,		sortable: true,								dataIndex: 'lastname',		field: {xtype: 'textfield'}}, 
        	{text: i18n.gettext('Company'), 				flex: 1,		sortable: true,								dataIndex: 'companyname',	field: {xtype: 'userscompanieslist'}},      	
        	{text: i18n.gettext('Group'),					flex: 1,		sortable: true,								dataIndex: 'groupname',		field: {xtype: 'usersgroupslist'}},
        	{text: i18n.gettext('Enable Interface'),	flex: 1,		sortable: true,								dataIndex: 'admin',			field: {xtype: 'combobox', store: ['yes', 'no']}}   	
    ],
	 selType: 'rowmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        })
    ]         
});



                   