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
console.log('Log: Load: Webcampak.view.pictures.SensorsWindow');
Ext.define('Webcampak.view.pictures.SensorsWindow' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.picturessensorswindow',
	
	iconCls: 'icon-stats',  	
	title: i18n.gettext('Source Sensors'),
	maximizable: true,
	width: 520,
	height: 700,
	layout: 'fit',
	items: [{
		xtype: 'container',
		itemId: 'sensorcontainer',		
		plain: true,
		border: 0,
		bodyPadding: 5,
		layout: {
			type: 'vbox',
			align: 'stretch'  
		},
		items: [{
			xtype: 'image',
			itemId: 'sensor1',					
			src: '',
			styleHtmlContent: true,
			width: '100%'			
		}, {
			xtype: 'image',
			itemId: 'sensor2',					
			src: '',
			styleHtmlContent: true,
			width: '100%'	
		}, {
			xtype: 'image',
			itemId: 'sensor3',					
			src: '',
			styleHtmlContent: true,
			width: '100%'	
		}, {
			xtype: 'image',
			itemId: 'sensor4',					
			src: '',
			styleHtmlContent: true,
			width: '100%'	
		}]		
	}]
});
