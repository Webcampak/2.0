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
console.log('Log: Load: Webcampak.view.permissions.ftpservers.FTPServersList');
Ext.define('Webcampak.view.configuration.ftpservers.FTPServersList' ,{
	extend: 'Ext.grid.Panel',
	alias : 'widget.configurationftpserverslist',

	store: 'configuration.FTPServer',
	autoScroll: true,
	columns: [
        	{text: i18n.gettext('ID'), 			width: 40, 	sortable: true, 								dataIndex: 'id'}, 
        	{text: i18n.gettext('Name'),			flex: 1, 	sortable: true, 	allowBlank: false, 	dataIndex: 'name', 		field: {xtype: 'textfield'}}, 
        	{text: i18n.gettext('Host'),			width: 80, 	sortable: true, 	allowBlank: false, 	dataIndex: 'host', 		field: {xtype: 'textfield'}}, 
        	{text: i18n.gettext('Username'), 	flex: 1, 	sortable: true, 								dataIndex: 'username', 	field: {xtype: 'textfield'}}, 
        	{text: i18n.gettext('Password'), 	flex: 1, 	sortable: true, 								dataIndex: 'password', 	field: {xtype: 'textfield'}}, 
        	{text: i18n.gettext('Directory'),	flex: 1.5,	sortable: true,								dataIndex: 'directory',	field: {xtype: 'textfield'}}, 
        	{text: i18n.gettext('Active'),		flex: 1,		sortable: true,								dataIndex: 'active',		field: {xtype: 'combobox', store: ['yes', 'no']}}   	
    ],
	 selType: 'rowmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        })
    ]         
});



                   