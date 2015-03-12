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
console.log('Log: Load: Webcampak.controller.Menu');
Ext.define('Webcampak.controller.Menu', {
    extend: 'Ext.app.Controller',

	stores: [
		'UserAuthorizations'	
	],

	models: [
		'UserAuthorization'	
	],

	views: [
		'pictures.PicturesWindow', 
		'videos.VideosWindow', 		
		'permissions.PermissionsWindow',
		'configuration.ConfigurationWindow',
		'connecteddevices.ConnectedDevicesWindow',		
		'toolbar.Menu',
		'cloudusers.CloudUsersWindow',
		'cloudconfiguration.ConfigurationWindow',
		'systemconfiguration.ConfigurationWindow',
		'log.LogWindow',
		'dashboard.sourcediskusage.SourceDiskUsageWindow',
		'dashboard.sourcepicturefiles.SourcePictureFilesWindow',
		'dashboard.sourcepicturesizes.SourcePictureSizesWindow',
		'dashboard.systemstats.SystemStatsWindow'
	],

	refs: [
		{ref: 'picturesWindow', 					selector: 'pictureswindow', 							autoCreate: true,	xtype: 'pictureswindow'},
		{ref: 'videosWindow', 						selector: 'videoswindow', 								autoCreate: true,	xtype: 'videoswindow'},
		{ref: 'toptoolbar', 							selector: 'toptoolbar', 								autoCreate: true,	xtype: 'toptoolbar'},
		{ref: 'toptoolbarmenu', 					selector: 'toptoolbarmenu', 							autoCreate: true,	xtype: 'toptoolbarmenu'},			
		{ref: 'viewmenus', 							selector: 'viewmenus', 									autoCreate: true,	xtype: 'viewmenus'},
		{ref: 'configmenus', 						selector: 'configmenus', 								autoCreate: true,	xtype: 'configmenus'},
		{ref: 'permissionsWindow', 				selector: 'permissionswindow', 						autoCreate: true,	xtype: 'permissionswindow'},
		{ref: 'cloudusersCloudUsersWindow', 	selector: 'cloudusersCloudUsersWindow', 			autoCreate: true,	xtype: 'cloudusersCloudUsersWindow'},	
		{ref: 'cloudconfigurationwindow',		selector: 'cloudconfigurationwindow', 				autoCreate: true, xtype: 'cloudconfigurationwindow'},					
		{ref: 'configurationWindow', 				selector: 'configurationwindow', 					autoCreate: true, xtype: 'configurationwindow'},
		{ref: 'systemconfigurationwindow', 		selector: 'systemconfigurationwindow', 			autoCreate: true, xtype: 'systemconfigurationwindow'},		
		{ref: 'logWindow', 							selector: 'logwindow', 									autoCreate: true, xtype: 'logwindow'},
		{ref: 'sourcediskusagewindow',			selector: 'sourcediskusagewindow', 					autoCreate: true, xtype: 'sourcediskusagewindow'},		
		{ref: 'sourcepicturefileswindow',		selector: 'sourcepicturefileswindow', 				autoCreate: true, xtype: 'sourcepicturefileswindow'},		
		{ref: 'sourcepicturesizeswindow',		selector: 'sourcepicturesizeswindow', 				autoCreate: true, xtype: 'sourcepicturesizeswindow'},		
		{ref: 'systemstatswindow',					selector: 'systemstatswindow', 						autoCreate: true, xtype: 'systemstatswindow'},
		{ref: 'connecteddeviceswindow',			selector: 'connecteddeviceswindow', 				autoCreate: true, xtype: 'connecteddeviceswindow'}
//		{ref: 'filesgraphWindow', 		selector: 'filesgraphwindow', 		autoCreate: true, xtype: 'filesgraphwindow'}
	],	
  
	onLaunch: function() {
		console.log('Log: Controller->Menu: Controller onLaunch: function()');
		this.getUserAuthorizationsStore().on('load',this.authMenus,this,{single:true});
		this.getUserAuthorizationsStore().load();

		setTimeout(function(){
			Ext.get('loading').remove();
			Ext.get('loading-mask').fadeOut({remove:true});
		}, 250);	
	},
    
	init: function() {
		console.log('Log: Controller->Menu: Controller init: function()');
		// Start listening for events on views
		this.control({
			'viewport button[action=openPhotos]': 	{click: 	this.openPictures												},	
			'pictureswindow': 							{hide: 	this.closePictures,	minimize: this.openPictures	},	
			'#menuOpenPhotos': 							{click: 	this.openPictures												}, 		
					
			'viewport button[action=openVideos]': 	{click: 	this.openVideos										},  
			'videoswindow': 								{hide: 	this.closeVideos,minimize: this.openVideos	},	
			'#menuOpenVideos': 							{click: 	this.openVideos										},						     
			     
			'viewport button[action=openPermissions]': 	{click: 	this.openPermissions													},
			'permissionswindow': 								{hide: 	this.closePermissions,	minimize: this.openPermissions	},		     
			'#menuOpenConfigPermissions': 					{click: 	this.openPermissions													},		
							          			
			'viewport button[action=openConfig]': 			{click: 	this.openConfigSources												},
			'configurationwindow': 								{hide: 	this.closeConfigSources ,minimize: this.openConfigSources	},
			'#menuOpenConfigSources': 							{click: 	this.openConfigSources												},

			'viewport button[action=openSystemConfig]': 	{click: 	this.openSystemConfig												},
			'systemconfigurationwindow': 						{hide: 	this.closeSystemConfig, minimize: this.openSystemConfig	},
			'#menuOpenSystemConfig': 							{click: 	this.openSystemConfig												},

			'viewport button[action=openCloudConfiguration]': 	{click: 	this.openCloudConfigSources														},
			'cloudconfigurationwindow': 								{hide: 	this.closeCloudConfigSources,minimize: this.openCloudConfigSources	},
			'#menuOpenCloudConfiguration': 							{click: 	this.openCloudConfigSources														},
			
			'viewport button[action=openCloudUsers]': 	{click: 	this.openCloudUsers													},
			'cloudusersCloudUsersWindow': 					{hide: 	this.closeCloudUsers,	minimize: this.openCloudUsers		},
			'#menuOpenCloudUsers': 								{click: 	this.openCloudUsers													},
			
			'viewport button[action=openLog]': 	{click: 	this.openLog									},
			'logwindow': 								{hide: 	this.closeLog,	minimize: this.openLog	},			
			'#menuOpenLog': 							{click: 	this.openLog									},
			
			'viewport button[action=openStatsPicturesFiles]': 	{click: 	this.openStatsPicturesFiles														},			
			'sourcepicturefileswindow': 								{hide: 	this.closeStatsPicturesFiles,	minimize: this.openStatsPicturesFiles	},			
			'#menuOpenStatsPicturesFiles': 							{click: 	this.openStatsPicturesFiles														},
			
			'viewport button[action=openStatsPicturesSizes]': 	{click: 	this.openStatsPicturesSizes														},			
			'sourcepicturesizeswindow': 								{hide: 	this.closeStatsPicturesSizes,	minimize: this.openStatsPicturesSizes	},			
			'#menuOpenStatsPicturesSizes': 							{click: 	this.openStatsPicturesSizes														},
			
			'viewport button[action=openStatsSourceDisk]': 	{click: 	this.openStatsSourceDisk													},			
			'sourcediskusagewindow': 								{hide: 	this.closeStatsSourceDisk,	minimize: this.openStatsSourceDisk	},			
			'#menuOpenStatsSourceDisk': 							{click: 	this.openStatsSourceDisk													},
			
			'viewport button[action=openStatsSystem]': 	{click: 	this.openStatsSystem													},			
			'systemstatswindow': 								{hide: 	this.closeStatsSystem,	minimize: this.openStatsSystem	},			
			'#menuOpenStatsSystem': 							{click: 	this.openStatsSystem													},

			'viewport button[action=openConnectedDevices]': 	{click: 	this.openConnectedDevices									},
			'connecteddeviceswindow': 									{hide: 	this.closeConnectedDevices,	minimize: this.openConnectedDevices	},			
			'#menuOpenConnectedDevices': 								{click: 	this.openConnectedDevices									},
			
			'#menuReboot': 										{click: 	this.rebootWebcampak													}
						
		});
	},

	isMenuAllowed: function(key) {
		console.log('Log: Controller->Menu: isMenuAllowed: function()');
		isAllowed = false;
		this.getUserAuthorizationsStore().each(function(record) { 
			if (record.data.name == key) {
				console.log('Log: Controller->Menu: isMenuAllowed: Display ' + key + ' menu');
				isAllowed = true;
			}
		});	
		return isAllowed;	
	},	

	authMenus: function() {
		console.log('Log: Controller->Menu: Controller authMenus: - Setting up authorizations');
		if (this.isMenuAllowed('auth.view.pictures') == true) {					
			this.getToptoolbarmenu().getComponent('menubutton').menu.getComponent('menuOpenPhotos').setVisible(true);
			this.getViewmenus().down().getComponent('menuOpenPhotos').setVisible(true);
		}	
		if (this.isMenuAllowed('auth.view.videos') == true) {
			this.getToptoolbarmenu().getComponent('menubutton').menu.getComponent('menuOpenVideos').setVisible(true);
			this.getViewmenus().down().getComponent('menuOpenVideos').setVisible(true);
		}
		if (this.isMenuAllowed('auth.stats') == true) {
			this.getToptoolbarmenu().getComponent('menubutton').menu.getComponent('menuOpenStats').setVisible(true);
		}			
		if (this.isMenuAllowed('auth.stats.pictures.files') == true) {
			this.getToptoolbarmenu().getComponent('menubutton').menu.getComponent('menuOpenStats').menu.getComponent('menuOpenStatsPicturesFiles').setVisible(true);
		}				
		if (this.isMenuAllowed('auth.stats.pictures.size') == true) {
			this.getToptoolbarmenu().getComponent('menubutton').menu.getComponent('menuOpenStats').menu.getComponent('menuOpenStatsPicturesSizes').setVisible(true);
		}	
		if (this.isMenuAllowed('auth.stats.sources.disk') == true) {
			this.getToptoolbarmenu().getComponent('menubutton').menu.getComponent('menuOpenStats').menu.getComponent('menuOpenStatsSourceDisk').setVisible(true);
		}			
		if (this.isMenuAllowed('auth.stats.system') == true) {
			this.getToptoolbarmenu().getComponent('menubutton').menu.getComponent('menuOpenStats').menu.getComponent('menuOpenStatsSystem').setVisible(true);
		}							
		if (this.isMenuAllowed('auth.config') == true) {
			this.getToptoolbarmenu().getComponent('menubutton').menu.getComponent('menuOpenConfig').setVisible(true);
		}
		if (this.isMenuAllowed('auth.config.admin.cloud') == true) {
			this.getToptoolbarmenu().getComponent('menubutton').menu.getComponent('menuOpenConfig').menu.getComponent('menuOpenCloudUsers').setVisible(true);
			this.getConfigmenus().down().getComponent('menuOpenCloudUsers').setVisible(true);			
		}			
		if (this.isMenuAllowed('auth.config.cloud') == true) {
			this.getToptoolbarmenu().getComponent('menubutton').menu.getComponent('menuOpenConfig').menu.getComponent('menuOpenCloudConfiguration').setVisible(true);
			this.getConfigmenus().down().getComponent('menuOpenCloudConfiguration').setVisible(true);
			if (this.isMenuAllowed('auth.config.cloud.write') == true) {
				/*
				this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelcapture').getComponent('cloudconfigurationtabpanelcapturebuttons').setVisible(true);		
				this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelcapture').getComponent('cloudconfigurationtabpanelcaptureinstantcapture').setVisible(true);		
				this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelpictures').getComponent('cloudconfigurationtabpanelpicturesbuttons').setVisible(true);		
				this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelvideos').getComponent('cloudconfigurationtabpanelvideosbuttons').setVisible(true);		
				this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelcustomvideos').getComponent('cloudconfigurationtabpanelcustomvideosbuttons').setVisible(true);		
				this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpaneladvanced').getComponent('cloudconfigurationtabpaneladvancedbuttons').setVisible(true);		
				this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelftpservers').getComponent('cloudconfigurationtabpanelftpserversbuttons').setVisible(true);		
				*/
				if (this.getCloudconfigurationwindow().down('#saveToolbar')) {
					this.getCloudconfigurationwindow().down('#saveToolbar').setVisible(true);								
				}
			}	else {
				if (this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelreadonly')) {
				this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelreadonly').setVisible(true);	
				}		
			}
		}
		if (this.isMenuAllowed('auth.config.sources') == true) {
			this.getToptoolbarmenu().getComponent('menubutton').menu.getComponent('menuOpenConfig').menu.getComponent('menuOpenConfigSources').setVisible(true);
			this.getConfigmenus().down().getComponent('menuOpenConfigSources').setVisible(true);			
		}
		if (this.isMenuAllowed('auth.config.logs') == true) {
			this.getToptoolbarmenu().getComponent('menubutton').menu.getComponent('menuOpenLog').setVisible(true);
		}		
		if (this.isMenuAllowed('auth.config.admin.permissions') == true) {
			this.getToptoolbarmenu().getComponent('menubutton').menu.getComponent('menuOpenConfig').menu.getComponent('menuOpenConfigPermissions').setVisible(true);
			this.getConfigmenus().down().getComponent('menuOpenConfigPermissions').setVisible(true);			
		}		
		if (this.isMenuAllowed('auth.config.admin.general') == true) {
			this.getToptoolbarmenu().getComponent('menubutton').menu.getComponent('menuOpenConfig').menu.getComponent('menuOpenSystemConfig').setVisible(true);
		}		
		if (this.isMenuAllowed('auth.config.admin.reboot') == true) {
			this.getToptoolbarmenu().getComponent('menubutton').menu.getComponent('menuOpenReboot').setVisible(true);			
			this.getToptoolbarmenu().getComponent('menubutton').menu.getComponent('menuOpenReboot').menu.getComponent('menuReboot').setVisible(true);
		}
		if (this.isMenuAllowed('auth.config.admin.connecteddevices') == true) {
			this.getToptoolbarmenu().getComponent('menubutton').menu.getComponent('menuOpenConfig').menu.getComponent('menuOpenConnectedDevices').setVisible(true);
		}			
		if (this.isMenuAllowed('auth.view.pictures.comment') == true) {		
		//	console.log('======> TO BE INVESTIGATED');
			this.getPicturesWindow().getComponent('globalpanel').getComponent('centralpanel').getComponent('centralpaneltoolbar').getComponent('openComment').setVisible(true);		
		}
		if (this.isMenuAllowed('auth.view.pictures.email') == true) {		
		//	console.log('======> TO BE INVESTIGATED');
			this.getPicturesWindow().getComponent('globalpanel').getComponent('centralpanel').getComponent('centralpaneltoolbar').getComponent('openEmail').setVisible(true);		
		}		
					
	},

	/**
	* Functions related to Pictures window
	*/
	openPictures: function() {
		console.log('Log: Controller->Menu: openPhotos: function()');
		if(!this.getPicturesWindow().isVisible()) {
			console.log('Log: Controller->Menu: openPhotos - getPicturesWindow().setVisible(true)');			
			this.getPicturesWindow().setVisible(true);
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbviewpicture').setVisible(true);
		} else {
			console.log('Log: Controller->Menu: openPhotos - getPicturesWindow().setVisible(false)');			
			this.getPicturesWindow().setVisible(false);
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbviewpicture').setVisible(true);
		}
	},
	closePictures: function() {
		console.log('Log: Controller->Menu: closePictures: function()');
		this.getToptoolbar().getComponent('applicationlist').getComponent('tbviewpicture').setVisible(false);
	},
	
	/**
	* Functions related to Videos window
	*/
	openVideos: function() {
		console.log('Log: Controller->Menu: openVideos: function()');
		if(!this.getVideosWindow().isVisible()) {
			console.log('Log: Controller->Menu: openVideos - getVideosWindow().setVisible(true)');				
			this.getVideosWindow().setVisible(true);
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbviewvideo').setVisible(true); 						
		} else {
			console.log('Log: Controller->Menu: openVideos - getVideosWindow().setVisible(false)');						
			this.getVideosWindow().setVisible(false);
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbviewvideo').setVisible(true); 						
		}
	},
	closeVideos: function() {
		console.log('Log: Controller->Menu: closeVideos: function()');
		this.getToptoolbar().getComponent('applicationlist').getComponent('tbviewvideo').setVisible(false);
	},
 
	/**
	* Functions related to Permissions window
	*/
	openPermissions: function() {
		console.log('Log: Controller->Menu: openPermissions: function()');
		if(!this.getPermissionsWindow().isVisible()) {
			this.getPermissionsWindow().setVisible(true);
			console.log('Log: Controller->Menu: openPermissions - getPermissionsWindow().setVisible(true)');	
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbconfpermissons').setVisible(true); 
		} else {
			this.getPermissionsWindow().setVisible(false);
			console.log('Log: Controller->Menu: openPermissions - getPermissionsWindow().setVisible(false)');		
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbconfpermissons').setVisible(true); 														
		}
	},
	closePermissions: function() {
		console.log('Log: Controller->Menu: closePermissions: function()');
		this.getToptoolbar().getComponent('applicationlist').getComponent('tbconfpermissons').setVisible(false);
	},	

	/**
	* Functions related to Configuration window
	*/
	openConfigSources: function() {
		console.log('Log: Controller->Menu: openConfigSources: function()');	
		if(!this.getConfigurationWindow().isVisible()) {
			console.log('Log: Controller->Menu: openConfigSources: - displaying window');			
			this.getConfigurationWindow().setVisible(true);
			console.log('Log: Controller->Menu: openConfigSources - getConfigurationWindow().setVisible(true)');	
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbconfsources').setVisible(true); 															
		} else {
			console.log('Log: Controller->Menu: openConfigSources: - hiding window');						
			this.getConfigurationWindow().setVisible(false);
			console.log('Log: Controller->Menu: openConfigSources - getConfigurationWindow().setVisible(false)');		
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbconfsources').setVisible(true); 																		
		}
	},
	closeConfigSources: function() {
		console.log('Log: Controller->Menu: openConfigSources: - hiding window');								
		this.getToptoolbar().getComponent('applicationlist').getComponent('tbconfsources').setVisible(false);
	},

	openSystemConfig: function() {
		console.log('Log: Controller->Menu: openSystemConfig: function()');
		if(!this.getSystemconfigurationwindow().isVisible()) {
			this.getSystemconfigurationwindow().setVisible(true);
			console.log('Log: Controller->Menu: openSystemConfig - getConfigurationWindow().setVisible(true)');	
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbsystemconf').setVisible(true); 															
		} else {
			this.getSystemconfigurationwindow().setVisible(false);
			console.log('Log: Controller->Menu: openSystemConfig - getConfigurationWindow().setVisible(false)');		
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbsystemconf').setVisible(true); 																		
				
		}
	},
	closeSystemConfig: function() {
		console.log('Log: Controller->Menu: closePermissions: function()');
		this.getToptoolbar().getComponent('applicationlist').getComponent('tbsystemconf').setVisible(false);
	},

	openCloudConfigSources: function() {
		console.log('Log: Controller->Menu: openCloudConfigSources: function()');
		if(!this.getCloudconfigurationwindow().isVisible()) {
			this.getCloudconfigurationwindow().setVisible(true);
			console.log('Log: Controller->Menu: openCloudConfigSources - getConfigurationWindow().setVisible(true)');	
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbcloudconfiguration').setVisible(true); 															
		} else {
			this.getCloudconfigurationwindow().setVisible(false);
			console.log('Log: Controller->Menu: openConfig - getConfigurationWindow().setVisible(false)');		
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbcloudconfiguration').setVisible(true); 																		
			//getCloudconfigurationwindow
		}
	},
	closeCloudConfigSources: function() {
		console.log('Log: Controller->Menu: closePermissions: function()');
		this.getToptoolbar().getComponent('applicationlist').getComponent('tbcloudconfiguration').setVisible(false);
	},

	/**
	* Functions related to Cloud windows
	*/
	openCloudUsers: function() {
		console.log('Log: Controller->Menu: openCloudUsers: function()');
		if(!this.getCloudusersCloudUsersWindow().isVisible()) {
			console.log('Log: Controller->Menu: openCloudUsers - getCloudusersCloudUsersWindow().setVisible(true)');			
			this.getCloudusersCloudUsersWindow().setVisible(true);
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbcloudusers').setVisible(true);
		} else {
			console.log('Log: Controller->Menu: openCloudUsers - getCloudusersCloudUsersWindow().setVisible(false)');			
			this.getCloudusersCloudUsersWindow().setVisible(false);
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbcloudusers').setVisible(true);
		}
	},
	closeCloudUsers: function() {
		console.log('Log: Controller->Menu: closeCloudUsers: function()');
		this.getToptoolbar().getComponent('applicationlist').getComponent('tbcloudusers').setVisible(false);
	},
	
	/**
	* Functions related to Log window
	*/
	openLog: function() {
		console.log('Log: Controller->Menu: openLog: function()');
		if(!this.getLogWindow().isVisible()) {
			console.log('Log: Controller->Menu: openLog - getLogWindow().setVisible(true)');			
			this.getLogWindow().setVisible(true);
			this.getToptoolbar().getComponent('applicationlist').getComponent('tblog').setVisible(true);
		} else {
			console.log('Log: Controller->Menu: openLog - getLogWindow().setVisible(false)');			
			this.getLogWindow().setVisible(false);
			this.getToptoolbar().getComponent('applicationlist').getComponent('tblog').setVisible(true);
		}
	},
	closeLog: function() {
		console.log('Log: Controller->Menu: closeLog: function()');
		this.getToptoolbar().getComponent('applicationlist').getComponent('tblog').setVisible(false);
	},

	openConnectedDevices: function() {
		console.log('Log: Controller->Menu: openConnectedDevices: function()');
		if(!this.getConnecteddeviceswindow().isVisible()) {
			console.log('Log: Controller->Menu: openConnectedDevices - getConnecteddeviceswindow().setVisible(true)');			
			this.getConnecteddeviceswindow().setVisible(true);
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbconnecteddevices').setVisible(true);
		} else {
			console.log('Log: Controller->Menu: openConnectedDevices - getConnecteddeviceswindow().setVisible(false)');			
			this.getConnecteddeviceswindow().setVisible(false);
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbconnecteddevices').setVisible(true);
		}
	},
	closeConnectedDevices: function() {
		console.log('Log: Controller->Menu: closeConnectedDevices: function()');
		this.getToptoolbar().getComponent('applicationlist').getComponent('tbconnecteddevices').setVisible(false);
	},
	

	openStatsSourceDisk: function() {
		console.log('Log: Controller->Menu: openStatsSourceDisk: function()');
		if(!this.getSourcediskusagewindow().isVisible()) {
			console.log('Log: Controller->Menu: openStatsSourceDisk - getSourcediskusagewindow().setVisible(true)');			
			this.getSourcediskusagewindow().setVisible(true);
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbstatssourcedisk').setVisible(true);
		} else {
			console.log('Log: Controller->Menu: openStatsSourceDisk - getSourcediskusagewindow().setVisible(false)');			
			this.getSourcediskusagewindow().setVisible(false);
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbstatssourcedisk').setVisible(true);
		}
	},
	closeStatsSourceDisk: function() {
		console.log('Log: Controller->Menu: closeStatsSourceDisk: function()');
		this.getToptoolbar().getComponent('applicationlist').getComponent('tbstatssourcedisk').setVisible(false);
	},

	openStatsPicturesFiles: function() {
		console.log('Log: Controller->Menu: openStatsSourceDisk: function()');
		if(!this.getSourcepicturefileswindow().isVisible()) {
			console.log('Log: Controller->Menu: openStatsPicturesFiles - getSourcepicturefileswindow().setVisible(true)');			
			this.getSourcepicturefileswindow().setVisible(true);
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbstatpicturesfiles').setVisible(true);
		} else {
			console.log('Log: Controller->Menu: openStatsPicturesFiles - getSourcepicturefileswindow().setVisible(false)');			
			this.getSourcepicturefileswindow().setVisible(false);
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbstatpicturesfiles').setVisible(true);
		}
	},
	closeStatsPicturesFiles: function() {
		console.log('Log: Controller->Menu: closeStatsPicturesFiles: function()');
		this.getToptoolbar().getComponent('applicationlist').getComponent('tbstatpicturesfiles').setVisible(false);
	},
	
	openStatsPicturesSizes: function() {
		console.log('Log: Controller->Menu: openStatsPicturesSizes: function()');
		if(!this.getSourcepicturesizeswindow().isVisible()) {
			console.log('Log: Controller->Menu: openStatsPicturesSizes - getSourcepicturesizeswindow().setVisible(true)');			
			this.getSourcepicturesizeswindow().setVisible(true);
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbstatpicturessizes').setVisible(true);
		} else {
			console.log('Log: Controller->Menu: openStatsPicturesSizes - getSourcepicturesizeswindow().setVisible(false)');			
			this.getSourcepicturesizeswindow().setVisible(false);
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbstatpicturessizes').setVisible(true);
		}
	},
	closeStatsPicturesSizes: function() {
		console.log('Log: Controller->Menu: closeStatsPicturesSizes: function()');
		this.getToptoolbar().getComponent('applicationlist').getComponent('tbstatpicturessizes').setVisible(false);
	},
	
	openStatsSystem: function() {
		console.log('Log: Controller->Menu: openStatsSystem: function()');
		if(!this.getSystemstatswindow().isVisible()) {
			console.log('Log: Controller->Menu: openStatsSystem - getSystemstatswindow().setVisible(true)');			
			this.getSystemstatswindow().setVisible(true);
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbstatsystemstats').setVisible(true);
		} else {
			console.log('Log: Controller->Menu: openStatsSystem - getSystemstatswindow().setVisible(false)');			
			this.getSystemstatswindow().setVisible(false);
			this.getToptoolbar().getComponent('applicationlist').getComponent('tbstatsystemstats').setVisible(true);
		}
	},
	closeStatsSystem: function() {
		console.log('Log: Controller->Menu: closeStatsSystem: function()');
		this.getToptoolbar().getComponent('applicationlist').getComponent('tbstatsystemstats').setVisible(false);
	},

	rebootWebcampak: function() {
		console.log('Log: Controller->Menu: rebootWebcampak: function()');
		Ext.Msg.show({
			title: i18n.gettext('Reboot Webcampak ?'),
			msg: i18n.gettext('You are about to reboot Webcampak, it will take +/- 1mnm. Proceed ?'),
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function(btn){
				if(btn === 'yes') {
					console.log('Log: Controller->Menu: rebootWebcampak: Webcampak will reboot');
					$.get('remote/reboot.php',function(data,status) {
						console.log('Log: Controller->Menu: rebootWebcampak: Reboot called');
					},'html');	    	
				}
			}
		}); 
    }	
});
