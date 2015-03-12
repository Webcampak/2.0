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
console.log('Log: Load: Webcampak.controller.cloud.CloudConfiguration');
Ext.define('Webcampak.controller.cloud.CloudConfiguration', {
	extend: 'Ext.app.Controller',

	stores: [
		'permissions.sources.Sources',
		'configuration.InstantCapture',		
		'cloudconfiguration.Picture',
		'cloudconfiguration.FTPServer',
		'cloudconfiguration.WatermarkFile',		
		'cloudconfiguration.Timezone',
		'cloudconfiguration.TextFont',
		'cloudconfiguration.AudioFile',
		'cloudconfiguration.Video',
		'cloudconfiguration.CustomVideo',
		'cloudconfiguration.Capture',
		'cloudconfiguration.Advanced'						
	],

	models: [			
		'permissions.Source',
		'configuration.InstantCapture',				
		'cloudconfiguration.Picture',
		'cloudconfiguration.WatermarkFile',
		'cloudconfiguration.Timezone',
		'cloudconfiguration.TextFont',
		'cloudconfiguration.AudioFile',
		'cloudconfiguration.Video',	
		'cloudconfiguration.CustomVideo',
		'cloudconfiguration.Capture',
		'cloudconfiguration.Advanced'																
	],

	views: [
		'cloudconfiguration.SourcesList',
		'cloudconfiguration.capture.Source',
		'cloudconfiguration.capture.Timezone',
		'cloudconfiguration.capture.Calendar',
		'cloudconfiguration.capture.InstantCapture',		
		'cloudconfiguration.pictures.Crop',
		'cloudconfiguration.pictures.Rotate',
		'cloudconfiguration.pictures.Watermark',
		'cloudconfiguration.pictures.WatermarkFile',
		'cloudconfiguration.pictures.Text',
		'cloudconfiguration.pictures.TextFont',
		'cloudconfiguration.pictures.Hotlink',
		'cloudconfiguration.pictures.Archive',
		'cloudconfiguration.pictures.FTP',
		'cloudconfiguration.pictures.FTPServer',		
		'cloudconfiguration.videos.VideoCreation',
		'cloudconfiguration.videos.VideoCreationAdvanced',	
		'cloudconfiguration.videos.Watermark',		
		'cloudconfiguration.videos.PreProcess',	
		'cloudconfiguration.videos.Audio',	
		'cloudconfiguration.videos.AudioFile',
		'cloudconfiguration.videos.FTP',
		'cloudconfiguration.customvideos.Create',
		'cloudconfiguration.advanced.LocalFTP',		
		'cloudconfiguration.advanced.Email',
		'cloudconfiguration.ftpservers.FTPServersList',
		'cloudconfiguration.ftpservers.AddFTPServer'			
	],

	config: {
        sigpad: null
	},

	refs: [
		{ref: 'cloudconfigurationwindow', 				selector: 'cloudconfigurationwindow'},	
		{ref: 'cloudconfigurationsourcelist',			selector: 'cloudconfigurationsourcelist'},
		{ref: 'cloudconfigcapturesource',				selector: 'cloudconfigcapturesource'},
		{ref: 'cloudconfigcapturecalendar',				selector: 'cloudconfigcapturecalendar'},
		{ref: 'cloudconfigpicturescrop',					selector: 'cloudconfigpicturescrop'},
		{ref: 'cloudconfigpicturesrotate',				selector: 'cloudconfigpicturesrotate'},
		{ref: 'cloudconfigpictureswatermark',			selector: 'cloudconfigpictureswatermark'},
		{ref: 'cloudconfigpictureswatermarkfile',		selector: 'cloudconfigpictureswatermarkfile'},
		{ref: 'cloudconfigpicturestext',					selector: 'cloudconfigpicturestext'},
		{ref: 'cloudconfigpicturestextfont',			selector: 'cloudconfigpicturestextfont'},
		{ref: 'cloudconfigpictureshotlink',				selector: 'cloudconfigpictureshotlink'},
		{ref: 'cloudconfigpicturesarchive',				selector: 'cloudconfigpicturesarchive'},
		{ref: 'cloudconfigpicturesftp',					selector: 'cloudconfigpicturesftp'},
		{ref: 'cloudconfigpicturesftpserver',			selector: 'cloudconfigpicturesftpserver'},		
		{ref: 'cloudconfigvideosvideocreation',			selector: 'cloudconfigvideosvideocreation'},
		{ref: 'cloudconfigvideosvideocreationadvanced',	selector: 'cloudconfigvideosvideocreationadvanced'},
		{ref: 'cloudconfigvideoswatermark',					selector: 'cloudconfigvideoswatermark'},
		{ref: 'cloudconfigvideospreprocess',				selector: 'cloudconfigvideospreprocess'},
		{ref: 'cloudconfigvideosaudio',						selector: 'cloudconfigvideosaudio'},
		{ref: 'cloudconfigvideosaudiofile',					selector: 'cloudconfigvideosaudiofile'},								
		{ref: 'cloudconfigvideosftp',							selector: 'cloudconfigvideosftp'},
		{ref: 'cloudconfigcustomvideoscreate',				selector: 'cloudconfigcustomvideoscreate'},
		{ref: 'cloudconfigadvancedlocalftp',					selector: 'cloudconfigadvancedlocalftp'},
		{ref: 'cloudconfigurationftpserversaddftpserver',	selector: 'cloudconfigurationftpserversaddftpserver', 	autoCreate: true, xtype: 'cloudconfigurationftpserversaddftpserver'},
		{ref: 'cloudconfigurationftpserverslist',				selector: 'cloudconfigurationftpserverslist'},
		{ref: 'cloudconfigcaptureinstantcapture',				selector: 'cloudconfigcaptureinstantcapture'}																																																																									
	],

	init: function() {
		console.log('Log: Controller->Cloud->CloudConfiguration: Controller init: function()');
		this.control({
			'cloudconfigurationwindow': 										{resize: 			this.windowResize			},
			'cloudconfigurationsourcelist': 									{selectionchange:	this.onSourceSelect		},
			'#cloudconfigurationtabpanel': 									{tabchange: 		this.onTabSelected		},				
			'cloudconfigurationwindow button[action=saveForm]': 		{click: 				this.saveForm				},
			'cloudconfigurationwindow button[action=resetForm]': 		{click: 				this.resetForm				},
			'cloudconfigurationwindow button[action=reloadSources]': {click: 				this.reloadSources				},			
			
			'cloudconfigurationwindow button[action=openAddFTPServerWindow]': 						{click: 	this.openAddFTPServerWindow	},
			'cloudconfigurationwindow button[action=deleteFTPServer]': 									{click: 	this.deleteFTPServer				},
			'cloudconfigurationftpserversaddftpserver button[action=closeAddFTPServerWindow]': 	{click: 	this.closeAddFTPServerWindow	},	
			'cloudconfigurationftpserversaddftpserver button[action=addFTPServer]': 				{click: 	this.addFTPServer					},	
			
			'cloudconfigcaptureinstantcapture button[action=instantCapture]': 						{click: 	this.instantCapture	}									
		});
	},
	windowResize: function() {
		console.log('Log: Controller->Cloud->CloudConfiguration: windowResize: function()');
		
	},

	reloadSources: function() {
		console.log('Log: Controller->Cloud->CloudConfiguration: reloadSources: function()');
		//this.getPermissionssourcesSourcesStore().load();
		Ext.getStore('permissions.sources.Sources').load();							
	},

	instantCapture: function() {
		console.log('Log: Controller->Cloud->CloudConfiguration: instantCapture: function()');
		
		Ext.getStore('configuration.InstantCapture').getProxy().setExtraParam('capture', 'true');					
		this.getConfigurationInstantCaptureStore().on('load',this.displayCapture,this,{single:true});
		this.getConfigurationInstantCaptureStore().load();
	},

	displayCapture: function() {
		console.log('Log: Controller->Cloud->CloudConfiguration: displayCapture: function()');
		Ext.getStore('configuration.InstantCapture').getProxy().setExtraParam('capture', 'false');
		currentPictureValue = this.getConfigurationInstantCaptureStore().last();
		var currentPictureFile = currentPictureValue.getData()['picture'];
		var currentPictureWidth = currentPictureValue.getData()['picturewidth'];
		var currentPictureHeight = currentPictureValue.getData()['pictureheight'];						
		var currentPictureSourceId = currentPictureValue.getData()['sourceid'];
		var currentPictureTime = currentPictureValue.getData()['picturetime'] + "";		

		//Get window size (to accelerate loading by only getting picture with same width as window). For Height, 30px adjustement is to keep date below picture on screen
		var currentWindowWidth = this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelcapture').getWidth();
		var currentWindowHeight = this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelcapture').getHeight();	
		var targetPictureWidth = currentWindowWidth - 40;
		console.log('Log: Controller->Cloud->CloudConfiguration: displayCapture: Current Window Size:' + currentWindowWidth + 'x' + currentWindowHeight);
		console.log('Log: Controller->Cloud->CloudConfiguration: displayCapture: Captured Picture Size:' + currentPictureWidth + 'x' + currentPictureHeight);

		this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelcapture').update('<center><img src="' + currentPictureFile + '&w=' + targetPictureWidth + '" title="' + i18n.gettext('Webcampak Picture') + '"></center>');				

	},
	
	onTabSelected: function(tabPanel, newCard, oldCard) {
		console.log('Log: Controller->Cloud->CloudConfiguration: onTabSelected: function()');
		this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').hide();
		this.loadTabContent(newCard.initialConfig.itemId);
	},	

	resetForm: function() {
		console.log('Log: Controller->Cloud->CloudConfiguration: resetForm: function()');
		this.loadTabContent(this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getActiveTab().initialConfig.itemId);		
	},	

	loadTabContent: function(selectedTab) {
		this.getCloudconfigurationwindow().down('#saveForm').setDisabled(true);
		this.getCloudconfigurationwindow().down('#saveToolbar').setVisible(true);				
		if (selectedTab == "cloudconfigurationtabpanelcapture") {
			console.log('Log: Controller->Cloud->CloudConfiguration: loadTabContent: Loading Capture panel content');
	     	this.getCloudconfigurationCaptureStore().on('load',this.loadCaptureTab,this,{single:true});
			this.getCloudconfigurationCaptureStore().load();	
		} else if (selectedTab == "cloudconfigurationtabpanelpictures") {
			console.log('Log: Controller->Cloud->CloudConfiguration: loadTabContent: Loading Pictures panel content');
			this.getCloudconfigurationFTPServerStore().load();		
			this.getCloudconfigurationWatermarkFileStore().load();															
	     	this.getCloudconfigurationPictureStore().on('load',this.loadPicturesTab,this,{single:true});
			this.getCloudconfigurationPictureStore().load();				
		} else if (selectedTab == "cloudconfigurationtabpanelvideos") {
			console.log('Log: Controller->Cloud->CloudConfiguration: loadTabContent: Loading Videos panel content');
			this.getCloudconfigurationWatermarkFileStore().load();
			this.getCloudconfigurationAudioFileStore().load();	
			this.getCloudconfigurationFTPServerStore().load();																														
	     	this.getCloudconfigurationVideoStore().on('load',this.loadVideosTab,this,{single:true});
			this.getCloudconfigurationVideoStore().load();
		} else if (selectedTab == "cloudconfigurationtabpanelcustomvideos") {
			console.log('Log: Controller->Cloud->CloudConfiguration: loadTabContent: Loading Custom Videos panel content');
			this.getCloudconfigurationWatermarkFileStore().load();
			this.getCloudconfigurationAudioFileStore().load();				
	     	this.getCloudconfigurationCustomVideoStore().on('load',this.loadCustomVideosTab,this,{single:true});
			this.getCloudconfigurationCustomVideoStore().load();							
		} else if (selectedTab == "cloudconfigurationtabpanelpostprodvideos") {
			console.log('Log: Controller->Cloud->CloudConfiguration: loadTabContent: Loading Post-Prod Videos panel content');
			this.getCloudconfigurationWatermarkFileStore().load();			
	     	this.getCloudconfigurationPostprodVideoStore().on('load',this.loadPostprodVideosTab,this,{single:true});
			this.getCloudconfigurationPostprodVideoStore().load();							
		} else if (selectedTab == "cloudconfigurationtabpaneladvanced") {
			console.log('Log: Controller->Cloud->CloudConfiguration: loadTabContent: Loading Advanced panel content');
	     	this.getCloudconfigurationAdvancedStore().on('load',this.loadAdvancedTab,this,{single:true});
			this.getCloudconfigurationAdvancedStore().load();							
		} else if (selectedTab == "cloudconfigurationtabpanelftpservers") {
			console.log('Log: Controller->Cloud->CloudConfiguration: loadTabContent: Loading FTP Servers panel content');
	     	this.getCloudconfigurationFTPServerStore().on('load',this.loadFTPServersTab,this,{single:true});
			this.getCloudconfigurationFTPServerStore().load();							
		}			
	},	
	
	loadCaptureTab: function () {
		console.log('Log: Controller->Cloud->CloudConfiguration: loadCaptureTab: function()');
		//Display configuration bloc (hidden if no sources are selected)
		this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').show();
		
		//Load store into the form
		currentConfig = this.getCloudconfigurationCaptureStore().last();
		this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelcapture').loadRecord(currentConfig);
		
		console.log('Log: Controller->Cloud->CloudConfiguration: loadCaptureTab: Enabling save button');
		this.getCloudconfigurationwindow().down('#saveForm').setDisabled(false);				
	},

	loadPicturesTab: function () {
		console.log('Log: Controller->Cloud->CloudConfiguration: loadPicturesTab: function()');
		//Display configuration bloc (hidden if no sources are selected)
		this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').show();
		
		//Load store into the form
		currentConfig = this.getCloudconfigurationPictureStore().last();
		this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelpictures').loadRecord(currentConfig);

		// Various actions to expand or collapse some sections depending of the configuration
		if (this.getCloudconfigurationPictureStore().last().getData()['cfgcropactivate'] == "on") {this.getCloudconfigpicturescrop().expand();} 
		else {this.getCloudconfigpicturescrop().collapse();}
		if (this.getCloudconfigurationPictureStore().last().getData()['cfgrotateactivate'] == "on") {this.getCloudconfigpicturesrotate().expand();} 
		else {this.getCloudconfigpicturesrotate().collapse();}		
		if (this.getCloudconfigurationPictureStore().last().getData()['cfgpicwatermarkactivate'] == "on") {this.getCloudconfigpictureswatermark().expand();} 
		else {this.getCloudconfigpictureswatermark().collapse();}

		console.log('Log: Controller->Cloud->CloudConfiguration: loadPicturesTab: Enabling save button');
		this.getCloudconfigurationwindow().down('#saveForm').setDisabled(false);			
		
	},

	loadVideosTab: function () {
		console.log('Log: Controller->Cloud->CloudConfiguration: loadVideosTab: function()');
		//Display configuration bloc (hidden if no sources are selected)
		this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').show();
		
		//Load store into the form
		currentConfig = this.getCloudconfigurationVideoStore().last();
		this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelvideos').loadRecord(currentConfig);

		console.log('Log: Controller->Cloud->CloudConfiguration: loadVideosTab: Enabling save button');
		this.getCloudconfigurationwindow().down('#saveForm').setDisabled(false);
	},

	loadCustomVideosTab: function () {
		console.log('Log: Controller->Cloud->CloudConfiguration: loadCustomVideosTab: function()');
		//Display configuration bloc (hidden if no sources are selected)
		this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').show();
		
		//Load store into the form
		currentConfig = this.getCloudconfigurationCustomVideoStore().last();
		this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelcustomvideos').loadRecord(currentConfig);

		//Get timestamp from dates and push this to form
		var cfgcustomstarttimestamp = new Date(currentConfig.get('cfgcustomstartyear'), currentConfig.get('cfgcustomstartmonth') - 1, currentConfig.get('cfgcustomstartday'), currentConfig.get('cfgcustomstarthour'), currentConfig.get('cfgcustomstartminute'), 0, 0);		
		var cfgcustomendtimestamp = new Date(currentConfig.get('cfgcustomendyear'), currentConfig.get('cfgcustomendmonth') - 1, currentConfig.get('cfgcustomendday'), currentConfig.get('cfgcustomendhour'), currentConfig.get('cfgcustomendminute'), 0, 0);			
//		var cfgcustomstarttimestamp = new Date(currentConfig.get('cfgcustomstartyear'), currentConfig.get('cfgcustomstartmonth'), currentConfig.get('cfgcustomstartday'), currentConfig.get('cfgcustomstarthour'), currentConfig.get('cfgcustomstartminute'), 0, 0);		
//		var cfgcustomendtimestamp = new Date(currentConfig.get('cfgcustomendyear'), currentConfig.get('cfgcustomendmonth'), currentConfig.get('cfgcustomendday'), currentConfig.get('cfgcustomendhour'), currentConfig.get('cfgcustomendminute'), 0, 0);			
		this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelcustomvideos').down('#customstarttimestamp').setValue(cfgcustomstarttimestamp);
		this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelcustomvideos').down('#customendtimestamp').setValue(cfgcustomendtimestamp);		

		console.log('Log: Controller->Cloud->CloudConfiguration: loadCustomVideosTab: Enabling save button');
		this.getCloudconfigurationwindow().down('#saveForm').setDisabled(false);
	},

	loadAdvancedTab: function () {
		console.log('Log: Controller->Cloud->CloudConfiguration: loadAdvancedTab: function()');
		//Display configuration bloc (hidden if no sources are selected)
		this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').show();
		
		//Load store into the form
		currentConfig = this.getCloudconfigurationAdvancedStore().last();
		this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpaneladvanced').loadRecord(currentConfig);		

		console.log('Log: Controller->Cloud->CloudConfiguration: loadAdvancedTab: Enabling save button');
		this.getCloudconfigurationwindow().down('#saveForm').setDisabled(false);
	},

	loadFTPServersTab: function () {
		console.log('Log: Controller->Cloud->CloudConfiguration: loadFTPServersTab: function()');
		//Display configuration bloc (hidden if no sources are selected)
		this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').show();	

		console.log('Log: Controller->Configuration->Configuration: loadAdvancedTab: Removing');				
		this.getCloudconfigurationwindow().down('#saveToolbar').setVisible(false);			
		
	},

	saveForm: function() {
		console.log('Log: Controller->Cloud->CloudConfiguration: saveForm: function()');
		//console.log(this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getActiveTab().initialConfig.itemId);
		
		if (this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getActiveTab().initialConfig.itemId == "cloudconfigurationtabpanelcapture") {
			console.log('Log: Controller->Cloud->CloudConfiguration: saveForm: - Saving content from Captures tab');	
//			this.getCloudconfigurationCaptureStore().on('insert',this.loadTabContent('cloudconfigurationtabpanelcapture'),this,{single:true});
			this.getCloudconfigurationCaptureStore().insert(0, this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelcapture').getValues());
			
		} else if (this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getActiveTab().initialConfig.itemId == "cloudconfigurationtabpanelpictures") {
			console.log('Log: Controller->Cloud->CloudConfiguration: saveForm: - Saving content from Pictures tab');	
//			this.getCloudconfigurationPictureStore().on('insert',this.loadTabContent('cloudconfigurationtabpanelpictures'),this,{single:true});
			this.getCloudconfigurationPictureStore().insert(0, this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelpictures').getValues());		
			
		} else if (this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getActiveTab().initialConfig.itemId == "cloudconfigurationtabpanelvideos") {
			console.log('Log: Controller->Cloud->CloudConfiguration: saveForm: - Saving content from Videos tab');	
//			this.getCloudconfigurationVideoStore().on('insert',this.loadTabContent('cloudconfigurationtabpanelvideos'),this,{single:true});
			this.getCloudconfigurationVideoStore().insert(0, this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelvideos').getValues());	
			
		} else if (this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getActiveTab().initialConfig.itemId == "cloudconfigurationtabpanelcustomvideos") {
			console.log('Log: Controller->Cloud->CloudConfiguration: saveForm: - Saving content from Custom videos');			
			var formValues = this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelcustomvideos').getValues();
			var key, vals = formValues;
			for (key in vals) {
				if (key != "") {
					if (key == "cfgcustomstarttimestamp") {
						console.log(vals[key]);
						//05/09/2012 22:42:53
						//var currentPictureMonth = selectedpicture.substring(4, 6); // TO BE INVESTIGATED
						currentStartDate = vals[key];
						formValues['cfgcustomstartyear'] = currentStartDate.substring(6, 10);
						formValues['cfgcustomstartmonth'] = currentStartDate.substring(3, 5);						
						formValues['cfgcustomstartday'] = currentStartDate.substring(0, 2);
						formValues['cfgcustomstarthour'] = currentStartDate.substring(11, 13);
						formValues['cfgcustomstartminute'] = currentStartDate.substring(14, 16);
						console.log(formValues['cfgcustomstartyear'] + ' ' + formValues['cfgcustomstartmonth'] + ' ' + formValues['cfgcustomstartday'] + ' ' + formValues['cfgcustomstarthour'] + ' ' + formValues['cfgcustomstartminute']);						
						/*var customstarttimestamp = new Date(vals[key]);
						if (customstarttimestamp.getDate() < 10) {formValues['cfgcustomstartday'] = '0' + customstarttimestamp.getDate();} 
						else {formValues['cfgcustomstartday'] = customstarttimestamp.getDate();}
						if (customstarttimestamp.getHours() < 10) {formValues['cfgcustomstarthour'] = '0' + customstarttimestamp.getHours();} 
						else {formValues['cfgcustomstarthour'] = customstarttimestamp.getHours();}
						if (customstarttimestamp.getMinutes() < 10) {formValues['cfgcustomstartminute'] = '0' + customstarttimestamp.getMinutes();} 
						else {formValues['cfgcustomstartminute'] = customstarttimestamp.getMinutes();}
						formValues['cfgcustomstartyear'] = customstarttimestamp.getFullYear();	
						formValues['cfgcustomstartmonth'] = customstarttimestamp.getMonth();	
						formValues['cfgcustomstartmonth'] = (parseInt(formValues['cfgcustomstartmonth']) + 1).toString();
						if (parseInt(formValues['cfgcustomstartmonth']) < 10) {formValues['cfgcustomstartmonth'] = '0' + formValues['cfgcustomstartmonth'];} 	
						console.log(formValues['cfgcustomstartyear'] + ' ' + formValues['cfgcustomstartmonth'] + ' ' + formValues['cfgcustomstartday'] + ' ' + formValues['cfgcustomstarthour'] + ' ' + formValues['cfgcustomstartminute']);
						*/																																																				
					} else if (key == "cfgcustomendtimestamp") {
						currentEndDate = vals[key];
						formValues['cfgcustomendyear'] = currentEndDate.substring(6, 10);
						formValues['cfgcustomendmonth'] = currentEndDate.substring(3, 5);						
						formValues['cfgcustomendday'] = currentEndDate.substring(0, 2);
						formValues['cfgcustomendhour'] = currentEndDate.substring(11, 13);
						formValues['cfgcustomendminute'] = currentEndDate.substring(14, 16);						
						/*
						var customendtimestamp = new Date(vals[key]);
						if (customendtimestamp.getDate() < 10) {formValues['cfgcustomendday'] = '0' + customendtimestamp.getDate();}
						else {formValues['cfgcustomendday'] = customendtimestamp.getDate();}
						if (customendtimestamp.getHours() < 10) {formValues['cfgcustomendhour'] = '0' + customendtimestamp.getHours();} 
						else {formValues['cfgcustomendhour'] = customendtimestamp.getHours();}
						if (customendtimestamp.getMinutes() < 10) {formValues['cfgcustomendminute'] = '0' + customendtimestamp.getMinutes();} 
						else {formValues['cfgcustomendminute'] = customendtimestamp.getMinutes();}
						formValues['cfgcustomendyear'] = customendtimestamp.getFullYear();	
						formValues['cfgcustomendmonth'] = customstarttimestamp.getMonth();	
						formValues['cfgcustomendmonth'] = (parseInt(formValues['cfgcustomendmonth']) + 1).toString();
						if (parseInt(formValues['cfgcustomendmonth']) < 10) {formValues['cfgcustomendmonth'] = '0' + formValues['cfgcustomendmonth'];} 
						console.log(vals[key]);	
						console.log(customendtimestamp);							
						*/
						console.log(formValues['cfgcustomendyear'] + ' ' + formValues['cfgcustomendmonth'] + ' ' + formValues['cfgcustomendday'] + ' ' + formValues['cfgcustomendhour'] + ' ' + formValues['cfgcustomendminute']);																																																																
					} 
				}
			}
//			this.getCloudconfigurationCustomVideoStore().on('insert',this.loadTabContent('cloudconfigurationtabpanelcustomvideos'),this,{single:true});
			this.getCloudconfigurationCustomVideoStore().insert(0, formValues);	
		} else if (this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getActiveTab().initialConfig.itemId == "cloudconfigurationtabpaneladvanced") {
			console.log('Log: Controller->Cloud->CloudConfiguration: saveForm: - Saving content from Advanced tab');	
//			this.getCloudconfigurationAdvancedStore().on('insert',this.loadTabContent('cloudconfigurationtabpaneladvanced'),this,{single:true});
			this.getCloudconfigurationAdvancedStore().insert(0, this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpaneladvanced').getValues());		
		}
/*		
		//Get current store values
		var storeRecords = this.getCloudconfigurationPictureStore().getAt(0);
		storeRecords.beginEdit();
		var key, vals = this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelcapture').getValues();
		for (key in vals) {
			if ( key != "") {
				//console.log('Submitted Form - Key:' + key + ' Value:' +  vals[key]);
				storeRecords.set(key, vals[key]);
			}
		}
		storeRecords.endEdit();
		this.getCloudconfigurationPictureStore().on('commit',this.reloadStore,this,{single:true});
		storeRecords.commit();
		// Reload store*/
	},

	
	onSourceSelect: function(selModel, selection) {
		console.log('Log: Controller->Cloud->CloudConfiguration: onSourceSelect: function()'); 
		if (selection == "") {
			console.log('Log: Controller->Cloud->CloudConfiguration: onSourceSelect: No source selected'); 
		} else {
			
			this.getCloudconfigurationwindow().down('#saveToolbar').setVisible(true);							
			
			this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').setTitle(i18n.gettext('Configuration of') + ' ' + selection[0].get('name') + " (" + selection[0].get('sourceid') + ")");

			//Get source name and push this to form (advanced > Local FTP)
			this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpaneladvanced').down('#localftpusername').setValue('source' + selection[0].get('sourceid'));

	     	Ext.getStore('cloudconfiguration.Capture').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));
			Ext.getStore('cloudconfiguration.Picture').getProxy().setExtraParam('sourceid', selection[0].get('sourceid')); 
			Ext.getStore('cloudconfiguration.Video').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));
			Ext.getStore('cloudconfiguration.CustomVideo').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));
			Ext.getStore('cloudconfiguration.Advanced').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));
			Ext.getStore('cloudconfiguration.WatermarkFile').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));				
			Ext.getStore('cloudconfiguration.AudioFile').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));
			Ext.getStore('cloudconfiguration.FTPServer').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));
			Ext.getStore('configuration.InstantCapture').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));					

			//Load FTP Servers from store
			this.getCloudconfigurationFTPServerStore().load();

			//Select Pictures tab by default when new source is selected			
			this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').setActiveTab('cloudconfigurationtabpanelcapture');
			
			this.getCloudconfigurationwindow().getComponent('cloudconfigurationtabpanel').getComponent('cloudconfigurationtabpanelcapture').update(' ');							
								
			this.getCloudconfigurationCaptureStore().on('load',this.loadCaptureTab,this,{single:true});
			this.getCloudconfigurationCaptureStore().load();
		}
	}, 


	openAddFTPServerWindow: function() {
		console.log('Log: Controller->Cloud->CloudConfiguration: openAddFTPServerWindow: function()');  
		this.getCloudconfigurationftpserversaddftpserver().getComponent('configurationftpserversaddftpserverform').down('#addservername').setValue('');
		this.getCloudconfigurationftpserversaddftpserver().getComponent('configurationftpserversaddftpserverform').down('#addserverhost').setValue('');
		this.getCloudconfigurationftpserversaddftpserver().getComponent('configurationftpserversaddftpserverform').down('#addserverusername').setValue('');
		this.getCloudconfigurationftpserversaddftpserver().getComponent('configurationftpserversaddftpserverform').down('#addserverpassword').setValue('');
		this.getCloudconfigurationftpserversaddftpserver().getComponent('configurationftpserversaddftpserverform').down('#addserverdirectory').setValue('');
		this.getCloudconfigurationftpserversaddftpserver().getComponent('configurationftpserversaddftpserverform').down('#addserveractive').setValue('no');
		this.getCloudconfigurationftpserversaddftpserver().show();		
	},

	closeAddFTPServerWindow: function() {
		console.log('Log: Controller->Cloud->CloudConfiguration: closeAddFTPServerWindow: function()');   
		this.getCloudconfigurationftpserversaddftpserver().hide();		
	},
	
	addFTPServer: function() {		
		console.log('Log: Controller->Cloud->CloudConfiguration: addFTPServer: function()');
		var key, vals = this.getCloudconfigurationftpserversaddftpserver().getComponent('configurationftpserversaddftpserverform').getValues();	
		this.getCloudconfigurationFTPServerStore().insert(0,
			[{
				name: 		vals['addservername'],
				host: 		vals['addserverhost'],
				username: 	vals['addserverusername'],
				password: 	vals['addserverpassword'],
				directory: 	vals['addserverdirectory'],
				active: 		vals['addserveractive']
			}]
		);	
		this.getCloudconfigurationftpserversaddftpserver().hide();
	},	

	deleteFTPServer: function() {
		console.log('Log: Controller->Cloud->CloudConfiguration: deleteFTPServer: function()');
		var selection = this.getCloudconfigurationftpserverslist().getSelectionModel().getSelection()[0];
		var currentStore = this.getCloudconfigurationFTPServerStore();
		if (selection) {
			Ext.Msg.show({
				title:'Delete Record?',
				msg: i18n.gettext('You are deleting a record permanently, this cannot be undone. Proceed ?'),
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(btn){
					if(btn === 'yes') {
						console.log('Log: Controller->Permissions->Users: deleteUser: currentStore.remove(selection):');	    	
						currentStore.remove(selection);
					}
				}
			}); 
		}
	}
});
  
                  