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
console.log('Log: Load: Webcampak.controller.configuration.Configuration');
Ext.define('Webcampak.controller.configuration.Configuration', {
	extend: 'Ext.app.Controller',

	stores: [
		'permissions.sources.Sources',
		'configuration.InstantCapture',		
		'configuration.Picture',
		'configuration.CameraPort',
		'configuration.WebcamPort',
		'configuration.FTPServer',
		'configuration.Phidget',
		'configuration.PhidgetSensor',
		'configuration.WatermarkFile',
		'configuration.Timezone',
		'configuration.TextFont',
		'configuration.AudioFile',
		'configuration.Video',
		'configuration.CustomVideo',
		'configuration.PostprodVideo',
		'configuration.Capture',
		'configuration.Advanced'						
	],

	models: [			
		'permissions.Source',
		'configuration.InstantCapture',			
		'configuration.Picture',
		'configuration.CameraPort',
		'configuration.WebcamPort',
		'configuration.WatermarkFile',
		'configuration.Timezone',
		'configuration.TextFont',
		'configuration.AudioFile',
		'configuration.Video',	
		'configuration.CustomVideo',
		'configuration.PostprodVideo',
		'configuration.Capture',
		'configuration.Advanced'																
	],

	views: [
		'configuration.SourcesList',
		'configuration.capture.Source',
		'configuration.capture.Timezone',
		'configuration.capture.Calendar',
		'configuration.capture.Gphoto',
		'configuration.capture.CameraPort',
		'configuration.capture.WpakSource',
		'configuration.capture.AllowedSources',		
		'configuration.capture.Webcam',
		'configuration.capture.WebcamPort',			
		'configuration.capture.IPCamera',	
		'configuration.capture.Webfile',
		'configuration.capture.Phidget',
		'configuration.capture.PhidgetSensors',
		'configuration.capture.InstantCapture',				
		'configuration.pictures.Rotate',
		'configuration.pictures.Crop',
		'configuration.pictures.Watermark',
		'configuration.pictures.WatermarkFile',
		'configuration.pictures.Text',
		'configuration.pictures.TextFont',
		'configuration.pictures.Hotlink',
		'configuration.pictures.Archive',
		'configuration.pictures.FTP',
		'configuration.pictures.FTPServer',		
		'configuration.pictures.SourceCopy',		
		'configuration.videos.VideoCreation',
		'configuration.videos.VideoCreationAdvanced',	
		'configuration.videos.Watermark',		
		'configuration.videos.Filter',
		'configuration.videos.PreProcess',	
		'configuration.videos.Audio',	
		'configuration.videos.AudioFile',
		'configuration.videos.Youtube',
		'configuration.videos.FTP',
		'configuration.customvideos.Create',
		'configuration.postprodvideos.Transition',
		'configuration.postprodvideos.Resize',
		'configuration.postprodvideos.Effect',
		'configuration.postprodvideos.Thumbnail',
		'configuration.postprodvideos.Text',
		'configuration.postprodvideos.Prepare',
		'configuration.advanced.LocalFTP',		
		'configuration.advanced.Email',
		'configuration.advanced.Phidget',
		'configuration.ftpservers.FTPServersList',
		'configuration.ftpservers.AddFTPServer'			
	],

	config: {
        sigpad: null
	},
 
	refs: [
		{ref: 'configurationWindow', 				selector: 'configurationwindow'},	
		{ref: 'configurationsourcelist',			selector: 'configurationsourcelist'},
		{ref: 'configcapturesource',				selector: 'configcapturesource'},
		{ref: 'configcapturecalendar',			selector: 'configcapturecalendar'},
		{ref: 'configcapturegphoto',				selector: 'configcapturegphoto'},
		{ref: 'configcapturewpaksource',			selector: 'configcapturewpaksource'},		
		{ref: 'configcapturecameraport',			selector: 'configcapturecameraport'},
		{ref: 'configcapturewebcam',				selector: 'configcapturewebcam'},
		{ref: 'configcapturewebcamport',			selector: 'configcapturewebcamport'},			
		{ref: 'configcaptureipcamera',			selector: 'configcaptureipcamera'},
		{ref: 'configcapturewebfile',				selector: 'configcapturewebfile'},
		{ref: 'configcapturephidget',				selector: 'configcapturephidget'},
		{ref: 'configcapturephidgetsensors',	selector: 'configcapturephidgetsensors'},
		{ref: 'configpicturesrotate',				selector: 'configpicturesrotate'},
		{ref: 'configpicturescrop',				selector: 'configpicturescrop'},
		{ref: 'configpictureswatermark',			selector: 'configpictureswatermark'},
		{ref: 'configpictureswatermarkfile',	selector: 'configpictureswatermarkfile'},
		{ref: 'configpicturestext',				selector: 'configpicturestext'},
		{ref: 'configpicturestextfont',			selector: 'configpicturestextfont'},
		{ref: 'configpictureshotlink',			selector: 'configpictureshotlink'},
		{ref: 'configpicturesarchive',			selector: 'configpicturesarchive'},
		{ref: 'configpicturesftp',					selector: 'configpicturesftp'},
		{ref: 'configpicturesftpserver',			selector: 'configpicturesftpserver'},		
		{ref: 'configpicturessourcecopy',		selector: 'configpicturessourcecopy'},		
		{ref: 'configvideosvideocreation',				selector: 'configvideosvideocreation'},
		{ref: 'configvideosvideocreationadvanced',	selector: 'configvideosvideocreationadvanced'},
		{ref: 'configvideoswatermark',					selector: 'configvideoswatermark'},
		{ref: 'configvideosfilter',						selector: 'configvideosfilter'},
		{ref: 'configvideospreprocess',					selector: 'configvideospreprocess'},
		{ref: 'configvideosaudio',							selector: 'configvideosaudio'},
		{ref: 'configvideosaudiofile',					selector: 'configvideosaudiofile'},								
		{ref: 'configvideosyoutube',						selector: 'configvideosyoutube'},
		{ref: 'configvideosftp',							selector: 'configvideosftp'},
		{ref: 'configcustomvideoscreate',				selector: 'configcustomvideoscreate'},
		{ref: 'configpostprodvideostransition',		selector: 'configpostprodvideostransition'},	
		{ref: 'configpostprodvideosresize',				selector: 'configpostprodvideosresize'},
		{ref: 'configpostprodvideostext',				selector: 'configpostprodvideostext'},
		{ref: 'configpostprodvideoseffect',				selector: 'configpostprodvideoseffect'},
		{ref: 'configpostprodvideosthumbnail',			selector: 'configpostprodvideosthumbnail'},
		{ref: 'configadvancedlocalftp',					selector: 'configadvancedlocalftp'},
		{ref: 'configurationftpserversaddftpserver',	selector: 'configurationftpserversaddftpserver', 	autoCreate: true, xtype: 'configurationftpserversaddftpserver'},
		{ref: 'configurationftpserverslist',			selector: 'configurationftpserverslist'},
		{ref: 'configcaptureinstantcapture',			selector: 'configcaptureinstantcapture'}																																																																																																																																																	
	],

	init: function() {
		console.log('Log: Controller->Configuration->Configuration: Controller init: function()');
		this.control({
			'configurationwindow': 										{resize: 			this.windowResize			},
			'configurationsourcelist': 								{selectionchange:	this.onSourceSelect		},
			'configcapturesource combo': 								{select: 			this.onSourceTypeSelect	},	
			'#configurationtabpanel': 									{tabchange: 		this.onTabSelected		},				
			'configurationwindow button[action=saveForm]': 		{click: 				this.saveForm				},
			'configurationwindow button[action=resetForm]': 	{click: 				this.resetForm				},
			
			'configurationwindow button[action=openAddFTPServerWindow]': 						{click: 	this.openAddFTPServerWindow		},
			'configurationwindow button[action=deleteFTPServer]': 								{click: 	this.deleteFTPServer					},
			'configurationftpserversaddftpserver button[action=closeAddFTPServerWindow]': {click: 	this.closeAddFTPServerWindow		},	
			'configurationftpserversaddftpserver button[action=addFTPServer]': 				{click: 	this.addFTPServer						},
			
			'configcaptureinstantcapture button[action=instantCapture]': 						{click: 	this.instantCapture					}															
		});
	},
	windowResize: function() {
		console.log('Log: Controller->Configuration->Configuration: windowResize: function()');
	},

	instantCapture: function() {
		console.log('Log: Controller->Configuration->Configuration: instantCapture: function()');	
		Ext.getStore('configuration.InstantCapture').getProxy().setExtraParam('capture', 'true');					
		this.getConfigurationInstantCaptureStore().on('load',this.displayCapture,this,{single:true});
		this.getConfigurationInstantCaptureStore().load();
	},
	
	displayCapture: function() {
		console.log('Log: Controller->Configuration->Configuration: displayCapture: function()');
		Ext.getStore('configuration.InstantCapture').getProxy().setExtraParam('capture', 'false');
		currentPictureValue = this.getConfigurationInstantCaptureStore().last();
		var currentPictureFile = currentPictureValue.getData()['picture'];
		var currentPictureWidth = currentPictureValue.getData()['picturewidth'];
		var currentPictureHeight = currentPictureValue.getData()['pictureheight'];						
		var currentPictureSourceId = currentPictureValue.getData()['sourceid'];
		var currentPictureTime = currentPictureValue.getData()['picturetime'] + "";		

		//Get window size (to accelerate loading by only getting picture with same width as window). For Height, 30px adjustement is to keep date below picture on screen
		var currentWindowWidth = this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcapture').getWidth();
		var currentWindowHeight = this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcapture').getHeight();	
		var targetPictureWidth = currentWindowWidth - 40;
		console.log('Log: Controller->Configuration->Configuration: displayCapture: Current Window Size:' + currentWindowWidth + 'x' + currentWindowHeight);
		console.log('Log: Controller->Configuration->Configuration: displayCapture: Captured Picture Size:' + currentPictureWidth + 'x' + currentPictureHeight);

		this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcapture').update('<center><img src="' + currentPictureFile + '&w=' + targetPictureWidth + '" title="' + i18n.gettext('Webcampak Picture') + '"></center>');				

	},	
	
	onTabSelected: function(tabPanel, newCard, oldCard) {
		console.log('Log: Controller->Configuration->Configuration: onTabSelected: function()');
		this.getConfigurationWindow().getComponent('configurationtabpanel').hide();
		this.loadTabContent(newCard.initialConfig.itemId);
	},	

	resetForm: function() {
		console.log('Log: Controller->Configuration->Configuration: resetForm: function()');
		this.loadTabContent(this.getConfigurationWindow().getComponent('configurationtabpanel').getActiveTab().initialConfig.itemId);		
	},	

	loadTabContent: function(selectedTab) {
		console.log('Log: Controller->Configuration->Configuration: loadTabContent: Disabling save button');		
		this.getConfigurationWindow().down('#saveForm').setDisabled(true);
		this.getConfigurationWindow().down('#saveToolbar').setVisible(true);	
		if (selectedTab == "configurationtabpanelcapture") {
			console.log('Log: Controller->Configuration->Configuration: loadTabContent: Loading Capture panel content');	
			this.getConfigurationCameraPortStore().load();
			this.getConfigurationWebcamPortStore().load();					
	     	this.getConfigurationCaptureStore().on('load',this.loadCaptureTab,this,{single:true});
			this.getConfigurationCaptureStore().load();	
		} else if (selectedTab == "configurationtabpanelpictures") {
			console.log('Log: Controller->Configuration->Configuration: loadTabContent: Loading Pictures panel content');		
			this.getConfigurationWatermarkFileStore().load();
			this.getConfigurationFTPServerStore().load();
	     	this.getConfigurationPictureStore().on('load',this.loadPicturesTab,this,{single:true});
			this.getConfigurationPictureStore().load();			
		} else if (selectedTab == "configurationtabpanelvideos") {
			console.log('Log: Controller->Configuration->Configuration: loadTabContent: Loading Videos panel content');
			this.getConfigurationWatermarkFileStore().load();
			this.getConfigurationAudioFileStore().load();
			this.getConfigurationFTPServerStore().load();			
	     	this.getConfigurationVideoStore().on('load',this.loadVideosTab,this,{single:true});
			this.getConfigurationVideoStore().load();
		} else if (selectedTab == "configurationtabpanelcustomvideos") {
			console.log('Log: Controller->Configuration->Configuration: loadTabContent: Loading Custom Videos panel content');
			this.getConfigurationWatermarkFileStore().load();
			this.getConfigurationAudioFileStore().load();
			this.getConfigurationFTPServerStore().load();			
	     	this.getConfigurationCustomVideoStore().on('load',this.loadCustomVideosTab,this,{single:true});
			this.getConfigurationCustomVideoStore().load();							
		} else if (selectedTab == "configurationtabpanelpostprodvideos") {
			console.log('Log: Controller->Configuration->Configuration: loadTabContent: Loading Post-Prod Videos panel content');
			this.getConfigurationWatermarkFileStore().load();
			this.getConfigurationAudioFileStore().load();
			this.getConfigurationFTPServerStore().load();			
	     	this.getConfigurationPostprodVideoStore().on('load',this.loadPostprodVideosTab,this,{single:true});
			this.getConfigurationPostprodVideoStore().load();							
		} else if (selectedTab == "configurationtabpaneladvanced") {
			console.log('Log: Controller->Configuration->Configuration: loadTabContent: Loading Advanced panel content');
	     	this.getConfigurationAdvancedStore().on('load',this.loadAdvancedTab,this,{single:true});
			this.getConfigurationAdvancedStore().load();							
		} else if (selectedTab == "configurationtabpanelftpservers") {
			console.log('Log: Controller->Configuration->Configuration: loadTabContent: Loading FTP Servers panel content');
	     	this.getConfigurationFTPServerStore().on('load',this.loadFTPServersTab,this,{single:true});
			this.getConfigurationFTPServerStore().load();
		}			
	},	
	
	loadCaptureTab: function () {
		console.log('Log: Controller->Configuration->Configuration: loadCaptureTab: function()');

		//Display configuration bloc (hidden if no sources are selected)
		this.getConfigurationWindow().getComponent('configurationtabpanel').show();
		
		//Load store into the form
		currentConfig = this.getConfigurationCaptureStore().last();
		this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcapture').loadRecord(currentConfig);

		// Various actions to expand or collapse some sections depending of the configuration
		if (this.getConfigurationCaptureStore().last().getData()['cfgcroncalendar'] == "on") {this.getConfigcapturecalendar().expand();} 
		else {this.getConfigcapturecalendar().collapse();}
		if (this.getConfigurationCaptureStore().last().getData()['cfgsourcetype'] == "gphoto") {this.getConfigcapturegphoto().expand();} 
		else {this.getConfigcapturegphoto().collapse();}
		if (this.getConfigurationCaptureStore().last().getData()['cfgsourcetype'] == "wpak") {this.getConfigcapturewpaksource().expand();} 
		else {this.getConfigcapturewpaksource().collapse();}		
		if (this.getConfigurationCaptureStore().last().getData()['cfgsourcetype'] == "webcam") {this.getConfigcapturewebcam().expand();} 
		else {this.getConfigcapturewebcam().collapse();}
		if (this.getConfigurationCaptureStore().last().getData()['cfgsourcetype'] == "ipcam") {this.getConfigcaptureipcamera().expand();} 
		else {this.getConfigcaptureipcamera().collapse();}
		if (this.getConfigurationCaptureStore().last().getData()['cfgsourcetype'] == "webfile" || this.getConfigurationCaptureStore().last().getData()['cfgsourcetype'] == "rtsp") {this.getConfigcapturewebfile().expand();} 
		else {this.getConfigcapturewebfile().collapse();}
		if (this.getConfigurationCaptureStore().last().getData()['cfgsourcetype'] == "sensor") { this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcapture').getComponent('configurationtabpanelcapturephidget').expand();} 
		else {this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcapture').getComponent('configurationtabpanelcapturephidget').collapse();}		

		console.log('Log: Controller->Configuration->Configuration: loadCaptureTab: Enabling save button');
		this.getConfigurationWindow().down('#saveForm').setDisabled(false);
	},

	loadPicturesTab: function () {
		console.log('Log: Controller->Configuration->Configuration: loadPicturesTab: function()');
		//Display configuration bloc (hidden if no sources are selected)
		this.getConfigurationWindow().getComponent('configurationtabpanel').show();
		
		//Load store into the form
		currentConfig = this.getConfigurationPictureStore().last();
		this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelpictures').loadRecord(currentConfig);

		// Various actions to expand or collapse some sections depending of the configuration
		if (this.getConfigurationPictureStore().last().getData()['cfgcropactivate'] == "on") {this.getConfigpicturescrop().expand();} 
		else {this.getConfigpicturescrop().collapse();}
		if (this.getConfigurationPictureStore().last().getData()['cfgrotateactivate'] == "on") {this.getConfigpicturesrotate().expand();} 
		else {this.getConfigpicturesrotate().collapse();}		
		if (this.getConfigurationPictureStore().last().getData()['cfgpicwatermarkactivate'] == "on") {this.getConfigpictureswatermark().expand();} 
		else {this.getConfigpictureswatermark().collapse();}		
		
		console.log('Log: Controller->Configuration->Configuration: loadPicturesTab: Enabling save button');				
		this.getConfigurationWindow().down('#saveForm').setDisabled(false);			
	},

	loadVideosTab: function () {
		console.log('Log: Controller->Configuration->Configuration: loadVideosTab: function()');
		//Display configuration bloc (hidden if no sources are selected)
		this.getConfigurationWindow().getComponent('configurationtabpanel').show();
		
		//Load store into the form
		currentConfig = this.getConfigurationVideoStore().last();
		this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelvideos').loadRecord(currentConfig);

		console.log('Log: Controller->Configuration->Configuration: loadVideosTab: Enabling save button');				
		this.getConfigurationWindow().down('#saveForm').setDisabled(false);	

	},

	loadCustomVideosTab: function () {
		console.log('Log: Controller->Configuration->Configuration: loadCustomVideosTab: function()');
		//Display configuration bloc (hidden if no sources are selected)
		this.getConfigurationWindow().getComponent('configurationtabpanel').show();
		
		//Load store into the form
		currentConfig = this.getConfigurationCustomVideoStore().last();
		this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcustomvideos').loadRecord(currentConfig);

		//Get timestamp from dates and push this to form
		var cfgcustomstarttimestamp = new Date(currentConfig.get('cfgcustomstartyear'), currentConfig.get('cfgcustomstartmonth') - 1, currentConfig.get('cfgcustomstartday'), currentConfig.get('cfgcustomstarthour'), currentConfig.get('cfgcustomstartminute'), 0, 0);		
		var cfgcustomendtimestamp = new Date(currentConfig.get('cfgcustomendyear'), currentConfig.get('cfgcustomendmonth') - 1, currentConfig.get('cfgcustomendday'), currentConfig.get('cfgcustomendhour'), currentConfig.get('cfgcustomendminute'), 0, 0);					
//		var cfgcustomstarttimestamp = new Date(currentConfig.get('cfgcustomstartyear'), currentConfig.get('cfgcustomstartmonth'), currentConfig.get('cfgcustomstartday'), currentConfig.get('cfgcustomstarthour'), currentConfig.get('cfgcustomstartminute'), 0, 0);		
//		var cfgcustomendtimestamp = new Date(currentConfig.get('cfgcustomendyear'), currentConfig.get('cfgcustomendmonth'), currentConfig.get('cfgcustomendday'), currentConfig.get('cfgcustomendhour'), currentConfig.get('cfgcustomendminute'), 0, 0);			
		this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcustomvideos').down('#customstarttimestamp').setValue(cfgcustomstarttimestamp);
		this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcustomvideos').down('#customendtimestamp').setValue(cfgcustomendtimestamp);

		console.log('Log: Controller->Configuration->Configuration: loadCustomVideosTabs: Enabling save button');				
		this.getConfigurationWindow().down('#saveForm').setDisabled(false);			
				
	},

	loadPostprodVideosTab: function () {
		console.log('Log: Controller->Configuration->Configuration: loadPostprodVideosTab: function()');
		//Display configuration bloc (hidden if no sources are selected)
		this.getConfigurationWindow().getComponent('configurationtabpanel').show();
		
		//Load store into the form
		currentConfig = this.getConfigurationPostprodVideoStore().last();
		this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelpostprodvideos').loadRecord(currentConfig);

		//Get timestamp from dates and push this to form
		var cfgcustomstarttimestamp = new Date(currentConfig.get('cfgcustomstartyear'), currentConfig.get('cfgcustomstartmonth') - 1, currentConfig.get('cfgcustomstartday'), currentConfig.get('cfgcustomstarthour'), currentConfig.get('cfgcustomstartminute'), 0, 0);		
		var cfgcustomendtimestamp = new Date(currentConfig.get('cfgcustomendyear'), currentConfig.get('cfgcustomendmonth') - 1, currentConfig.get('cfgcustomendday'), currentConfig.get('cfgcustomendhour'), currentConfig.get('cfgcustomendminute'), 0, 0);			
//		var cfgcustomstarttimestamp = new Date(currentConfig.get('cfgcustomstartyear'), currentConfig.get('cfgcustomstartmonth'), currentConfig.get('cfgcustomstartday'), currentConfig.get('cfgcustomstarthour'), currentConfig.get('cfgcustomstartminute'), 0, 0);		
//		var cfgcustomendtimestamp = new Date(currentConfig.get('cfgcustomendyear'), currentConfig.get('cfgcustomendmonth'), currentConfig.get('cfgcustomendday'), currentConfig.get('cfgcustomendhour'), currentConfig.get('cfgcustomendminute'), 0, 0);			
		this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelpostprodvideos').down('#customstarttimestamp').setValue(cfgcustomstarttimestamp);
		this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelpostprodvideos').down('#customendtimestamp').setValue(cfgcustomendtimestamp);		

		// Various actions to expand or collapse some sections depending of the configuration
		if (this.getConfigurationPostprodVideoStore().last().getData()['cfgfilteractivate'] == "on") {this.getConfigvideosfilter().expand();} 
		else {this.getConfigvideosfilter().collapse();}
		if (this.getConfigurationPostprodVideoStore().last().getData()['cfgcropactivate'] == "on") {this.getConfigpicturescrop().expand();} 
		else {this.getConfigpicturescrop().collapse();}		
		if (this.getConfigurationPostprodVideoStore().last().getData()['cfgrotateactivate'] == "on") {this.getConfigpicturesrotate().expand();} 
		else {this.getConfigpicturesrotate().collapse();}		
		if (this.getConfigurationPostprodVideoStore().last().getData()['cfgtransitionactivate'] == "on") {this.getConfigpostprodvideostransition().expand();} 
		else {this.getConfigpostprodvideostransition().collapse();}	
		if (this.getConfigurationPostprodVideoStore().last().getData()['cfgvideosizeactivate'] == "on") {this.getConfigpostprodvideosresize().expand();} 
		else {this.getConfigpostprodvideosresize().collapse();}	
		if (this.getConfigurationPostprodVideoStore().last().getData()['cfgvideoeffect'] == "on") {this.getConfigpostprodvideoseffect().expand();} 
		else {this.getConfigpostprodvideoseffect().collapse();}
		if (this.getConfigurationPostprodVideoStore().last().getData()['cfgthumbnailactivate'] == "on") {this.getConfigpostprodvideosthumbnail().expand();} 
		else {this.getConfigpostprodvideosthumbnail().collapse();}
		if (this.getConfigurationPostprodVideoStore().last().getData()['cfgwatermarkactivate'] == "on") {this.getConfigvideoswatermark().expand();} 
		else {this.getConfigvideoswatermark().collapse();}	
		if (this.getConfigurationPostprodVideoStore().last().getData()['cfgvideopreimagemagicktxt'] == "on") {this.getConfigpostprodvideostext().expand();} 
		else {this.getConfigpostprodvideostext().collapse();}	
								
		console.log('Log: Controller->Configuration->Configuration: loadPostprodVideosTab: Enabling save button');				
		this.getConfigurationWindow().down('#saveForm').setDisabled(false);
	},

	loadAdvancedTab: function () {
		console.log('Log: Controller->Configuration->Configuration: loadAdvancedTab: function()');
		//Display configuration bloc (hidden if no sources are selected)
		this.getConfigurationWindow().getComponent('configurationtabpanel').show();
		
		//Load store into the form
		currentConfig = this.getConfigurationAdvancedStore().last();
		this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpaneladvanced').loadRecord(currentConfig);		

		console.log('Log: Controller->Configuration->Configuration: loadAdvancedTab: Enabling save button');				
		this.getConfigurationWindow().down('#saveForm').setDisabled(false);		
	},

	loadFTPServersTab: function () {
		console.log('Log: Controller->Configuration->Configuration: loadFTPServersTab: function()');
		//Display configuration bloc (hidden if no sources are selected)
		this.getConfigurationWindow().getComponent('configurationtabpanel').show();
		
		//Load store into the form
		//currentConfig = this.getConfigurationAdvancedStore().last();
		//this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelftpservers').loadRecord(currentConfig);		

		console.log('Log: Controller->Configuration->Configuration: loadAdvancedTab: Removing');				
		this.getConfigurationWindow().down('#saveToolbar').setVisible(false);	
	},

	onSourceTypeSelect: function(combo, records, eOpts) {
		console.log('Log: Controller->Configuration->Configuration: onSourceTypeSelect: function()');
		if (records[0].data.value == "gphoto") {
			this.getConfigcapturegphoto().expand();
			this.getConfigcapturewpaksource().collapse();			
			this.getConfigcapturewebcam().collapse();
			this.getConfigcaptureipcamera().collapse();
			this.getConfigcapturewebfile().collapse();
			this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcapture').getComponent('configurationtabpanelcapturephidget').collapse();
		} else if (records[0].data.value == "wpak") {
			this.getConfigcapturegphoto().collapse();
			this.getConfigcapturewpaksource().expand();						
			this.getConfigcapturewebcam().collapse();
			this.getConfigcaptureipcamera().collapse();
			this.getConfigcapturewebfile().collapse();
			this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcapture').getComponent('configurationtabpanelcapturephidget').collapse();			
		} else if (records[0].data.value == "webcam") {			
			this.getConfigcapturegphoto().collapse();
			this.getConfigcapturewpaksource().collapse();			
			this.getConfigcapturewebcam().expand();
			this.getConfigcaptureipcamera().collapse();
			this.getConfigcapturewebfile().collapse();
			this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcapture').getComponent('configurationtabpanelcapturephidget').collapse();
		} else if (records[0].data.value == "ipcam") {
			this.getConfigcapturegphoto().collapse();
			this.getConfigcapturewpaksource().collapse();			
			this.getConfigcapturewebcam().collapse();
			this.getConfigcaptureipcamera().expand();
			this.getConfigcapturewebfile().collapse();
			this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcapture').getComponent('configurationtabpanelcapturephidget').collapse();
		} else if (records[0].data.value == "webfile" || records[0].data.value == "rtsp") {
			this.getConfigcapturegphoto().collapse();
			this.getConfigcapturewpaksource().collapse();			
			this.getConfigcapturewebcam().collapse();
			this.getConfigcaptureipcamera().collapse();
			this.getConfigcapturewebfile().expand();
			this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcapture').getComponent('configurationtabpanelcapturephidget').collapse();
		} else if (records[0].data.value == "sensor") {
			this.getConfigcapturegphoto().collapse();
			this.getConfigcapturewpaksource().collapse();			
			this.getConfigcapturewebcam().collapse();
			this.getConfigcaptureipcamera().collapse();
			this.getConfigcapturewebfile().collapse();
			this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcapture').getComponent('configurationtabpanelcapturephidget').expand();
		}
	},

	saveForm: function() {
		console.log('Log: Controller->Configuration->Configuration: saveForm: function()');
		//console.log(this.getConfigurationWindow().getComponent('configurationtabpanel').getActiveTab().initialConfig.itemId);
		
		if (this.getConfigurationWindow().getComponent('configurationtabpanel').getActiveTab().initialConfig.itemId == "configurationtabpanelcapture") {
			console.log('Log: Controller->Configuration->Configuration: saveForm: - Saving content from Captures tab');	
//			this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcapture').loadRecord(currentConfig);
//			this.getConfigurationCaptureStore().on('insert',this.loadTabContent('configurationtabpanelcapture'),this,{single:true});
			this.getConfigurationCaptureStore().insert(0, this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcapture').getValues());			

		} else if (this.getConfigurationWindow().getComponent('configurationtabpanel').getActiveTab().initialConfig.itemId == "configurationtabpanelpictures") {
			console.log('Log: Controller->Configuration->Configuration: saveForm: - Saving content from Pictures tab');	
//			this.getConfigurationPictureStore().on('insert',this.loadTabContent('configurationtabpanelpictures'),this,{single:true});
			this.getConfigurationPictureStore().insert(0, this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelpictures').getValues());		
			
		} else if (this.getConfigurationWindow().getComponent('configurationtabpanel').getActiveTab().initialConfig.itemId == "configurationtabpanelvideos") {
			console.log('Log: Controller->Configuration->Configuration: saveForm: - Saving content from Pictures tab');		
//			this.getConfigurationVideoStore().on('insert',this.loadTabContent('configurationtabpanelvideos'),this,{single:true});
			this.getConfigurationVideoStore().insert(0, this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelvideos').getValues());	
			
		} else if (this.getConfigurationWindow().getComponent('configurationtabpanel').getActiveTab().initialConfig.itemId == "configurationtabpanelcustomvideos") {
			console.log('Log: Controller->Configuration->Configuration: saveForm: - Saving content from Custom videos');			
			var formValues = this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcustomvideos').getValues();
			var key, vals = formValues;
			for (key in vals) {
				if (key != "") {
					if (key == "cfgcustomstarttimestamp") {
						currentStartDate = vals[key];
						formValues['cfgcustomstartyear'] = currentStartDate.substring(6, 10);
						formValues['cfgcustomstartmonth'] = currentStartDate.substring(3, 5);						
						formValues['cfgcustomstartday'] = currentStartDate.substring(0, 2);
						formValues['cfgcustomstarthour'] = currentStartDate.substring(11, 13);
						formValues['cfgcustomstartminute'] = currentStartDate.substring(14, 16);
					} else if (key == "cfgcustomendtimestamp") {
						currentEndDate = vals[key];
						formValues['cfgcustomendyear'] = currentEndDate.substring(6, 10);
						formValues['cfgcustomendmonth'] = currentEndDate.substring(3, 5);						
						formValues['cfgcustomendday'] = currentEndDate.substring(0, 2);
						formValues['cfgcustomendhour'] = currentEndDate.substring(11, 13);
						formValues['cfgcustomendminute'] = currentEndDate.substring(14, 16);						
					} 					
					/*
					if (key == "cfgcustomstarttimestamp") {
						var customstarttimestamp = new Date(vals[key]);
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
					} else if (key == "cfgcustomendtimestamp") {
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
					} 
					*/
				}
			}
//			this.getConfigurationCustomVideoStore().on('insert',this.loadTabContent('configurationtabpanelcustomvideos'),this,{single:true});
			this.getConfigurationCustomVideoStore().insert(0, formValues);
		} else if (this.getConfigurationWindow().getComponent('configurationtabpanel').getActiveTab().initialConfig.itemId == "configurationtabpanelpostprodvideos") {
			console.log('Log: Controller->Configuration->Configuration: saveForm: - Saving content from Pictures tab');			
			var formValues = this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelpostprodvideos').getValues();
			var key, vals = formValues;
			for (key in vals) {
				if (key != "") {
					if (key == "cfgcustomstarttimestamp") {
						currentStartDate = vals[key];
						formValues['cfgcustomstartyear'] = currentStartDate.substring(6, 10);
						formValues['cfgcustomstartmonth'] = currentStartDate.substring(3, 5);						
						formValues['cfgcustomstartday'] = currentStartDate.substring(0, 2);
						formValues['cfgcustomstarthour'] = currentStartDate.substring(11, 13);
						formValues['cfgcustomstartminute'] = currentStartDate.substring(14, 16);
					} else if (key == "cfgcustomendtimestamp") {
						currentEndDate = vals[key];
						formValues['cfgcustomendyear'] = currentEndDate.substring(6, 10);
						formValues['cfgcustomendmonth'] = currentEndDate.substring(3, 5);						
						formValues['cfgcustomendday'] = currentEndDate.substring(0, 2);
						formValues['cfgcustomendhour'] = currentEndDate.substring(11, 13);
						formValues['cfgcustomendminute'] = currentEndDate.substring(14, 16);						
					} 	
					/*					
					if (key == "cfgcustomstarttimestamp") {
						var customstarttimestamp = new Date(vals[key]);
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
					} else if (key == "cfgcustomendtimestamp") {
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
					} 
					*/
				}
			}
//			this.getConfigurationPostprodVideoStore().on('insert',this.loadTabContent('configurationtabpanelpostprodvideos'),this,{single:true});
			this.getConfigurationPostprodVideoStore().insert(0, formValues);		
		} else if (this.getConfigurationWindow().getComponent('configurationtabpanel').getActiveTab().initialConfig.itemId == "configurationtabpaneladvanced") {
			console.log('Log: Controller->Configuration->Configuration: saveForm: - Saving content from Advanced tab');	
//			this.getConfigurationAdvancedStore().on('insert',this.loadTabContent('configurationtabpaneladvanced'),this,{single:true});
			this.getConfigurationAdvancedStore().insert(0, this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpaneladvanced').getValues());		
		}
/*		
		//Get current store values
		var storeRecords = this.getConfigurationPictureStore().getAt(0);
		storeRecords.beginEdit();
		var key, vals = this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcapture').getValues();
		for (key in vals) {
			if ( key != "") {
				//console.log('Submitted Form - Key:' + key + ' Value:' +  vals[key]);
				storeRecords.set(key, vals[key]);
			}
		}
		storeRecords.endEdit();
		this.getConfigurationPictureStore().on('commit',this.reloadStore,this,{single:true});
		storeRecords.commit();
		// Reload store*/
	},

	
	onSourceSelect: function(selModel, selection) {
		console.log('Log: Controller->Configuration->Configuraton: onSourceSelect: function()'); 
		if (selection == "") {
			console.log('Log: Controller->Configuration->Sources: onSourceSelect: No source selected'); 
		} else {
			this.getConfigurationWindow().down('#saveToolbar').setVisible(true);		
			console.log('Log: Controller->Configuration->Configuration: onSourceSelect: Disabling save button');		
			this.getConfigurationWindow().down('#saveForm').setDisabled(true);					
			
			this.getConfigurationWindow().getComponent('configurationtabpanel').setTitle(i18n.gettext('Configuration of') + ' ' + selection[0].get('name') + " (" + selection[0].get('sourceid') + ")");

			//Get source name and push this to form (advanced > Local FTP)
			this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpaneladvanced').down('#localftpusername').setValue('source' + selection[0].get('sourceid'));

			// Remove previous "instant capture" image if any
			this.getConfigurationWindow().getComponent('configurationtabpanel').getComponent('configurationtabpanelcapture').update(' ');				

			//Select Pictures tab by default when new source is selected			
			this.getConfigurationWindow().getComponent('configurationtabpanel').setActiveTab('configurationtabpanelcapture');

			console.log('Log: Controller->Configuration->Configuraton: onSourceSelect: - Configure Store'); 
	     	Ext.getStore('configuration.Phidget').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));
	     	Ext.getStore('configuration.Capture').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));
			Ext.getStore('configuration.Picture').getProxy().setExtraParam('sourceid', selection[0].get('sourceid')); 
			Ext.getStore('configuration.Video').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));
			Ext.getStore('configuration.CustomVideo').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));
			Ext.getStore('configuration.PostprodVideo').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));
			Ext.getStore('configuration.Advanced').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));
			Ext.getStore('configuration.WatermarkFile').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));				
			Ext.getStore('configuration.AudioFile').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));
			Ext.getStore('configuration.FTPServer').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));		
			Ext.getStore('configuration.InstantCapture').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));					

	     	//this.getConfigurationPhidgetStore().on('load',this.loadCaptureTab,this,{single:true});
	     	this.getConfigurationPhidgetStore().load();	

			this.getConfigurationCaptureStore().on('load',this.loadCaptureTab,this,{single:true});
			this.getConfigurationCaptureStore().load();
		}
	}, 


	openAddFTPServerWindow: function() {
		console.log('Log: Controller->Configuration->Configuration: openAddFTPServerWindow: function()');  
		this.getConfigurationftpserversaddftpserver().getComponent('configurationftpserversaddftpserverform').down('#addservername').setValue('');
		this.getConfigurationftpserversaddftpserver().getComponent('configurationftpserversaddftpserverform').down('#addserverhost').setValue('');
		this.getConfigurationftpserversaddftpserver().getComponent('configurationftpserversaddftpserverform').down('#addserverusername').setValue('');
		this.getConfigurationftpserversaddftpserver().getComponent('configurationftpserversaddftpserverform').down('#addserverpassword').setValue('');
		this.getConfigurationftpserversaddftpserver().getComponent('configurationftpserversaddftpserverform').down('#addserverdirectory').setValue('');
		this.getConfigurationftpserversaddftpserver().getComponent('configurationftpserversaddftpserverform').down('#addserveractive').setValue('no');
		this.getConfigurationftpserversaddftpserver().show();		
	},

	closeAddFTPServerWindow: function() {
		console.log('Log: Controller->Configuration->Configuration: closeAddFTPServerWindow: function()');   
		this.getConfigurationftpserversaddftpserver().hide();		
	},
	
	addFTPServer: function() {		
		console.log('Log: Controller->Configuration->Configuration: addFTPServer: function()');
		var key, vals = this.getConfigurationftpserversaddftpserver().getComponent('configurationftpserversaddftpserverform').getValues();	
		this.getConfigurationFTPServerStore().insert(0,
			[{
				name: 		vals['addservername'],
				host: 		vals['addserverhost'],
				username: 	vals['addserverusername'],
				password: 	vals['addserverpassword'],
				directory: 	vals['addserverdirectory'],
				active: 		vals['addserveractive']
			}]
		);	
		this.getConfigurationftpserversaddftpserver().hide();
	},	

	deleteFTPServer: function() {
		console.log('Log: Controller->Configuration->Configuration: deleteFTPServer: function()');
		var selection = this.getConfigurationftpserverslist().getSelectionModel().getSelection()[0];
		var currentStore = this.getConfigurationFTPServerStore();
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
  
                  