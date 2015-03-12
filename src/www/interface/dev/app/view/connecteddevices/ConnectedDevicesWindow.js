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
console.log('Log: Load: Webcampak.view.connecteddevices.ConnectedDevicesWindow');
Ext.define('Webcampak.view.connecteddevices.ConnectedDevicesWindow' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.connecteddeviceswindow',
		
	iconCls: 'icon-configgeneral',  	
	title: i18n.gettext('Webcampak connected devices'),
//	layout: 'fit',
layout: {
    type: 'vbox',
    align : 'stretch',
    pack  : 'start'
},
	width: 900,
	height: 600, 
	maximizable: true,
	minimizable: true,
	closeAction : 'hide',
	scroll: true,
	autoScroll: true,	
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'top',
		items: [{
			text: i18n.gettext('Scan'),
			iconCls: 'icon-reload',
			xtype: 'button',
			action: 'reloadConnectedDevices'
		}] 
	}],
	items: [{	
		title: i18n.gettext('Gphoto2: Connected Cameras'),
		xtype: 'panel',	
		itemId: 'gphotopanel',		
		flex: 1,
		collapsible: true,
		layout: 'fit',	
		items: [{
			itemId: 'gphotolist',
			name: 'gphotolist',								
			xtype: 'textarea',
			style: 'margin:0', 
			readOnly: true			
		}]
	}, {		
		title: i18n.gettext('Gphoto2: Cameras Capabilities'),
		xtype: 'panel',
		itemId: 'gphotocapabilitiespanel',		
		flex: 1,		
		collapsible: true,		
		layout: 'fit',	
		items: [{						
			itemId: 'gphotocapabilities',
			name: 'gphotocapabilities',								
			xtype: 'textarea',
			style: 'margin:0', 
			readOnly: true			
		}]
	}, {	
		title: i18n.gettext('USB devices connected (lsusb)'),
		flex: 1,				
		xtype: 'panel',
		itemId: 'lsusbpanel',		
		collapsible: true,	
		layout: 'fit',	
		items: [{						
			itemId: 'lsusb',
			name: 'lsusb',								
			xtype: 'textarea',
			style: 'margin:0', 
			readOnly: true			
		}]		
	}, {	
		title: i18n.gettext('Video Devices, USB Webcams'),
		xtype: 'panel',
		itemId: 'videostdpanel',		
		collapsible: true,	
		collapsed: true,			
		//layout: 'fit',	
		items: [
			{fieldLabel: i18n.gettext('/dev/video0'), itemId: 'videostd0', 	name: 'videostd0',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800},
			{fieldLabel: i18n.gettext('/dev/video1'), itemId: 'videostd1', 	name: 'videostd1',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800},
			{fieldLabel: i18n.gettext('/dev/video2'), itemId: 'videostd2', 	name: 'videostd2',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800},
			{fieldLabel: i18n.gettext('/dev/video3'), itemId: 'videostd3', 	name: 'videostd3',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800},
			{fieldLabel: i18n.gettext('/dev/video4'), itemId: 'videostd4', 	name: 'videostd4',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800},
			{fieldLabel: i18n.gettext('/dev/video5'), itemId: 'videostd5', 	name: 'videostd5',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800},
			{fieldLabel: i18n.gettext('/dev/video6'), itemId: 'videostd6', 	name: 'videostd6',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800},
			{fieldLabel: i18n.gettext('/dev/video7'), itemId: 'videostd7', 	name: 'videostd7',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800},
			{fieldLabel: i18n.gettext('/dev/video8'), itemId: 'videostd8', 	name: 'videostd8',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800},
			{fieldLabel: i18n.gettext('/dev/video9'), itemId: 'videostd9', 	name: 'videostd9',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800}	
		]		
	}, {					
		title: i18n.gettext('Video Devices, USB Webcams (Advanced)'),
		xtype: 'panel',
		itemId: 'videoadvpanel',				
		collapsible: true,	
		collapsed: true,	
		//layout: 'fit',	
		items: [
			{fieldLabel: i18n.gettext('/dev/video0'), itemId: 'videoadv0', 	name: 'videoadv0',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800},
			{fieldLabel: i18n.gettext('/dev/video1'), itemId: 'videoadv1', 	name: 'videoadv1',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800},
			{fieldLabel: i18n.gettext('/dev/video2'), itemId: 'videoadv2', 	name: 'videoadv2',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800},
			{fieldLabel: i18n.gettext('/dev/video3'), itemId: 'videoadv3', 	name: 'videoadv3',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800},
			{fieldLabel: i18n.gettext('/dev/video4'), itemId: 'videoadv4', 	name: 'videoadv4',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800},
			{fieldLabel: i18n.gettext('/dev/video5'), itemId: 'videoadv5', 	name: 'videoadv5',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800},
			{fieldLabel: i18n.gettext('/dev/video6'), itemId: 'videoadv6', 	name: 'videoadv6',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800},
			{fieldLabel: i18n.gettext('/dev/video7'), itemId: 'videoadv7', 	name: 'videoadv7',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800},
			{fieldLabel: i18n.gettext('/dev/video8'), itemId: 'videoadv8', 	name: 'videoadv8',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800},
			{fieldLabel: i18n.gettext('/dev/video9'), itemId: 'videoadv9', 	name: 'videoadv9',	xtype: 'textarea', style: 'margin:0', readOnly: true, width: 800}	
		]									
	}]	
});




