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
console.log('Log: Load: Webcampak.view.TopToolbar');
Ext.define('Webcampak.view.TopToolbar', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.toptoolbar', 

	layout: {type: 'hbox', align : 'stretch', pack  : 'start'},	
	items: [{
		xtype: 'toptoolbarmenu',
		width: 100
	}, '-', {
		itemId: 'applicationlist',
		xtype: 'container',
		flex: 1,
		items: [
			{itemId: 'tbviewpicture',			xtype: 'button', 	action: 'openPhotos', 						text: i18n.gettext('Pictures'),										hidden: true,	iconCls: 'icon-pictures'				}, 
			{itemId: 'tbviewvideo',				xtype: 'button',	action: 'openVideos', 						text: i18n.gettext('Videos'),											hidden: true,	iconCls: 'icon-videos'					}, 
			{itemId: 'tbconfpermissons',		xtype: 'button',	action: 'openPermissions',					text: i18n.gettext('Permissions Conf.'),							hidden: true,	iconCls: 'icon-user'						}, 
			{itemId: 'tbconfsources',			xtype: 'button',	action: 'openConfig',						text: i18n.gettext('Sources Conf.'),								hidden: true,	iconCls: 'icon-settings'				}, 
			{itemId: 'tbcloudconfiguration',	xtype: 'button',	action: 'openCloudConfiguration',		text: i18n.gettext('Cloud Configuration'),						hidden: true,	iconCls: 'icon-cloudconfiguration'	}, 
			{itemId: 'tbcloudusers',			xtype: 'button',	action: 'openCloudUsers',					text: i18n.gettext('Cloud Users'),									hidden: true,	iconCls: 'icon-cloudusers'				}, 			
			{itemId: 'tblog',						xtype: 'button',	action: 'openLog',							text: i18n.gettext('Logs'),											hidden: true,	iconCls: 'icon-logs'						}, 			
			{itemId: 'tbconnecteddevices',	xtype: 'button',	action: 'openConnectedDevices',			text: i18n.gettext('Connected Devices'),							hidden: true,	iconCls: 'icon-camera'					}, 			
			{itemId: 'tbsystemconf',			xtype: 'button',	action: 'openSystemConfig',				text: i18n.gettext('System Conf.'),									hidden: true,	iconCls: 'icon-configgeneral'			}, 
			{itemId: 'tbstatpicturesfiles',	xtype: 'button',	action: 'openStatsPicturesFiles', 		text: i18n.gettext('Stats: Number of pictures per source'),	hidden: true,	iconCls: 'icon-pictures'				}, 
			{itemId: 'tbstatpicturessizes',	xtype: 'button',	action: 'openStatsPicturesSizes', 		text: i18n.gettext('Stats: Size of pictures per source'),	hidden: true,	iconCls: 'icon-pictures'				}, 
			{itemId: 'tbstatssourcedisk',		xtype: 'button',	action: 'openStatsSourceDisk',			text: i18n.gettext('Stats: Disk Usage per source'),			hidden: true,	iconCls: 'icon-disk'						}, 
			{itemId: 'tbstatsystemstats',		xtype: 'button',	action: 'openStatsSystem',					text: i18n.gettext('Stats: System'),								hidden: true,	iconCls: 'icon-misc'						}
		]	
	}, '-', 
		{itemId: 'flagfr',	xtype: 'button', 	href: 'index.html?lang=fr', hrefTarget: '_self', iconCls: 'flag-fr'						}, 	
		{itemId: 'flagen',	xtype: 'button', 	href: 'index.html?lang=en', hrefTarget: '_self', iconCls: 'flag-en'						}, 	
		{itemId: 'flagpt',	xtype: 'button', 	href: 'index.html?lang=pt', hrefTarget: '_self', iconCls: 'flag-pt'						}, 	
		{itemId: 'flagde',	xtype: 'button', 	href: 'index.html?lang=de', hrefTarget: '_self', iconCls: 'flag-de', hidden: true	}
	]
});

//tbsystemconf