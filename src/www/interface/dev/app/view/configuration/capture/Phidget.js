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
console.log('Log: Load: Webcampak.view.configuration.capture.Phidget');
Ext.define('Webcampak.view.configuration.capture.Phidget' ,{
	extend: 'Ext.grid.Panel', 
	alias: 'widget.configcapturephidget',

	store: 'configuration.Phidget',
	autoScroll: true,
	columns: [
        	{text: i18n.gettext('ID'), 		width: 40, 	sortable: true, 								dataIndex: 'id'}, 
        	{text: i18n.gettext('Type'),		width: 120, sortable: true, 	allowBlank: false, 	dataIndex: 'type', 		field: {xtype: 'configcapturephidgetsensors'}}, 
        	{text: i18n.gettext('Port'),		width: 40, 	sortable: true, 	allowBlank: false, 	dataIndex: 'port', 		field: {xtype: 'numberfield', minValue: 0, maxValue: 20}}, 
        	{text: i18n.gettext('Legend'), 	flex: 1, 	sortable: true, 								dataIndex: 'legend', 	field: {xtype: 'textfield'}}, 
        	{text: i18n.gettext('Color'), 	width: 80, 	sortable: true, 								dataIndex: 'color', 		field: {xtype: 'textfield'}} 	
    ],
	 selType: 'rowmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        })
    ]  
});

