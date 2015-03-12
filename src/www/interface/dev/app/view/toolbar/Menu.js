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
console.log('Log: Load: Webcampak.view.toolbar.Menu');
Ext.define('Webcampak.view.toolbar.Menu', {
	extend: 'Ext.toolbar.Toolbar',

	alias: 'widget.toptoolbarmenu', 

	items: [{
		text: i18n.gettext('Webcampak'),
		border: 0,
		padding: 0,
		itemId: 'menubutton',			
		iconCls: 'icon-webcampak',  
		menu: {
			style: { overflow: 'visible' }, 
			itemId: 'menu',			
			items: [{
				text: i18n.gettext('Pictures'),
				itemId: 'menuOpenPhotos',
				iconCls: 'icon-pictures',
				hidden: true	
			}, {
				text: i18n.gettext('Slideshow'),
				iconCls: 'icon-pictures',
				href: '/interface/slideshow.html',
				tooltip: i18n.gettext('Display a slideshow of the latest picture capture by each source. Slideshow refreshed every 5 minutes')
			}, {
				text: i18n.gettext('Videos'),
				itemId: 'menuOpenVideos',
				iconCls: 'icon-videos',
				hidden: true					
			}, '-', {
				text: i18n.gettext('Statistics & Reports'),
				itemId: 'menuOpenStats',
				iconCls: 'icon-stats',
				hidden: true,			
				menu: {
					items: [{
						text: i18n.gettext('Number of pictures per source'),
						itemId: 'menuOpenStatsPicturesFiles',						
						iconCls: 'icon-pictures',
						hidden: true						
					}, {
						text: i18n.gettext('Size of pictures per source'),
						itemId: 'menuOpenStatsPicturesSizes',						
						iconCls: 'icon-pictures',
						hidden: true						
					}, {
						text: i18n.gettext('Disk usage per source'),
						itemId: 'menuOpenStatsSourceDisk',						
						iconCls: 'icon-disk',
						hidden: true				
					}, {
						text: i18n.gettext('System Stats'),
						itemId: 'menuOpenStatsSystem',						
						iconCls: 'icon-misc',
						hidden: true										
					}]				
				}									
			}, '-', {			
				text: i18n.gettext('Configuration'),
				itemId: 'menuOpenConfig',				
				iconCls: 'icon-settings',
				hidden: true,						
				menu: {
					items: [{
						text: i18n.gettext('Cloud Users'),
						itemId: 'menuOpenCloudUsers',					
						iconCls: 'icon-cloudusers',
						hidden: true														
					}, {
						text: i18n.gettext('Cloud Config.'),
						itemId: 'menuOpenCloudConfiguration',					
						iconCls: 'icon-cloudconfiguration',
						hidden: true														
					}, {
						text: i18n.gettext('Sources'),
						itemId: 'menuOpenConfigSources',											
						iconCls: 'icon-settings',
						hidden: true														
					}, {
						text: i18n.gettext('Permissions'),
						itemId: 'menuOpenConfigPermissions',					
						iconCls: 'icon-user',
						hidden: true														
					}, {
						text: i18n.gettext('General'),
						itemId: 'menuOpenSystemConfig',					
						iconCls: 'icon-configgeneral',
						hidden: true
					}, {
						text: i18n.gettext('Connected Devices'),
						itemId: 'menuOpenConnectedDevices',					
						iconCls: 'icon-camera',
						hidden: true					
					}]
				}
			}, {	
				text: i18n.gettext('Logs'),
				itemId: 'menuOpenLog',					
				iconCls: 'icon-logs',
				hidden: true			
			}, {
				text: i18n.gettext('Reboot'),
				itemId: 'menuOpenReboot',				
				iconCls: 'icon-reboot',	
				hidden: true,									
				menu: {	
					items: [{				
						text: i18n.gettext('Reboot Webcampak'),
						itemId: 'menuReboot',					
						iconCls: 'icon-reboot'		
					}]										
				}												
			}, '-', {
				text: i18n.gettext('Documentation'),
				iconCls: 'icon-help',
				href: 'http://www.webcampak.com/doc/',
				tooltip: i18n.gettext('Link to Webcampak documentation, available in English & French')	
			}, {	
				text: i18n.gettext('Blog'),
				iconCls: 'icon-internet',				
				href: 'http://blog.webcampak.com',
				tooltip: i18n.gettext('Link to Webcampak.com blog')
			}, {					
				text: i18n.gettext('About'),
				iconCls: 'icon-webcampak',
				href: 'http://www.webcampak.com',
				tooltip: i18n.gettext('Link to Webcampak.com website')
			}, '-', {
				text: i18n.gettext('Log Out'),
				href: 'logout.php',				
				iconCls: 'icon-logout'				
			}]
		}
	}]
});

