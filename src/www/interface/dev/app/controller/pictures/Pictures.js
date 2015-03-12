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
console.log('Log: Load: Webcampak.controller.pictures.Pictures');
Ext.define('Webcampak.controller.pictures.Pictures', {
	extend: 'Ext.app.Controller',

	stores: [
		'pictures.HoursList',
		'pictures.ViewPicture',	
		'pictures.PictureSendEmail',	
		'pictures.PictureInsertComment',
		'pictures.Sensor',										
		'permissions.sources.Sources'		
	],

	models: [
		'pictures.HourList',
		'pictures.ViewPicture',		
		'pictures.PictureSendEmail',
		'pictures.PictureInsertComment',		
		'pictures.Sensor',				
		'permissions.Source'
	],

	views: [
		'pictures.PicturesWindow',
		'pictures.SendEmailWindow',
		'pictures.InsertCommentWindow',				
		'pictures.SensorsWindow',						
		'pictures.CurrentPicture',
		'pictures.Thumbnails',
		'pictures.Zoom',
		'pictures.HoursList',
		'pictures.DaysList',
		'pictures.SourcesList',		
		'pictures.SourceName',				
		'permissions.sources.SourcesList'
	],

	refs: [
		{ref: 'pictureswindow', 					selector: 'pictureswindow'},
		{ref: 'picturessendemailwindow', 		selector: 'picturessendemailwindow', 			autoCreate: true, xtype: 'picturessendemailwindow'},		
		{ref: 'picturesinsertcommentwindow',	selector: 'picturesinsertcommentwindow', 		autoCreate: true, xtype: 'picturesinsertcommentwindow'},	
		{ref: 'picturessensorswindow',			selector: 'picturessensorswindow', 				autoCreate: true, xtype: 'picturessensorswindow'},							
		{ref: 'currentpicture', 			selector: 'currentpicture'},		
		{ref: 'zoompicture', 				selector: 'zoompicture'},		
		{ref: 'thumbnails', 					selector: 'thumbnails'},	
		{ref: 'hourslist',					selector: 'hourslist'},
		{ref: 'dayslist',						selector: 'dayslist'},
		{ref: 'sourceslist',					selector: 'sourceslist'},				
		{ref: 'sourcename',					selector: 'sourcename'}	
	],

	init: function() {
		console.log('Log: Controller->Permissions->Groups: Controller init: function()');
		//this.getPermissionsGroupsGroupAvailableUsersStore().load();
		this.control({
			'pictureswindow button[action=previousPicture]': 			{click: 				this.previousPicture},
			'pictureswindow button[action=downloadPicture]': 			{click: 				this.downloadPicture},			
			'pictureswindow button[action=nextPicture]': 				{click: 				this.nextPicture},
			'pictureswindow button[action=lastPicture]': 				{click: 				this.lastPicture},			
			'pictureswindow button[action=openEmail]': 					{click: 				this.openEmail},	
			'pictureswindow button[action=openComment]': 				{click: 				this.openComment},
			'pictureswindow button[action=openSensors]': 				{click: 				this.openSensors},			
			'pictureswindow button[action=timthumbButton]': 			{click: 				this.timthumbButton},								
			'picturessendemailwindow button[action=sendEmail]': 		{click: 				this.sendEmail},
			'picturessendemailwindow button[action=closeEmail]':		{click: 				this.closeEmail},		
			'picturesinsertcommentwindow button[action=saveComment]': 		{click: 		this.saveComment},
			'picturesinsertcommentwindow button[action=deleteComment]': 	{click: 		this.deleteComment},			
			'picturesinsertcommentwindow button[action=closeComment]':		{click: 		this.closeComment},							
			'pictureswindow': 											{resize: 			this.windowResize},					
			'dayslist': 													{select: 			this.onDaySelected},
			'zoompicture': 												{changecomplete: 	this.onZoomChange},			
			'sourceslist': 												{select: 			this.onSourceSelected},
			'hourslist dataview': 										{cellclick: 		this.onPictureHourSelected},
			'thumbnails': 													{'navaction' : this.thumbnailClick, scope : this}
		});
	},

	thumbnailClick: function(view, thumb) {
		console.log('Log: Controller->Pictures->Pictures: thumbnailClick: function()');
		console.log('Log: Controller->Pictures->Pictures: thumbnailClick: Click on: ' + thumb);		
		if (this.getPicturesViewPictureStore().getCount() > 0) {
			currentPictureValue = this.getPicturesViewPictureStore().last();
			var selectedpicture = currentPictureValue.getData()['thumb' + thumb + 'time'] + "";
			Ext.getStore('pictures.ViewPicture').getProxy().setExtraParam('currentdate', selectedpicture);			
			this.getPicturesViewPictureStore().on('load',this.loadViewElements,this,{single:true});
			this.getPicturesViewPictureStore().load();
		}
	},

	timthumbButton: function() {
		console.log('Log: Controller->Pictures->Pictures: timthumbDisable: function()');
		if (this.getPicturesViewPictureStore().getCount() > 0) {		
			console.log('Log: Controller->Pictures->Pictures: loadViewElements - Store updated'); 
			currentPictureValue = this.getPicturesViewPictureStore().last();
			var currentTimthumb = currentPictureValue.getData()['timthumb'];		
			if (currentTimthumb == 1) {
				Ext.getStore('pictures.ViewPicture').getProxy().setExtraParam('timthumb', 0);	
			} else {
				Ext.getStore('pictures.ViewPicture').getProxy().setExtraParam('timthumb', 1);		
			}	
			this.getPicturesViewPictureStore().on('load',this.loadViewElements,this,{single:true});
			this.getPicturesViewPictureStore().load();
		}	
	},
	
	onZoomChange: function(slider, value) {
		console.log('Log: Controller->Pictures->Pictures: onZoomChange: function()');
		console.log('Log: Controller->Pictures->Pictures: onZoomChange: function() - Zoom Value:' + value);
		Ext.getStore('pictures.ViewPicture').getProxy().setExtraParam('zoomlevel', value);
		this.getPicturesViewPictureStore().on('load',this.loadViewElements,this,{single:true});
		this.getPicturesViewPictureStore().load();
	},

	windowResize: function() {
		console.log('Log: Controller->Pictures->Pictures: windowResize: function()');
		this.getPicturesViewPictureStore().on('load',this.loadViewElements,this,{single:true});
		this.getPicturesViewPictureStore().load();
	},
	
	downloadPicture: function() {
		console.log('Log: Controller->Pictures->Pictures: downloadPicture: function()');		
		window.open(Ext.getStore('pictures.ViewPicture').last().data.pictureurl);
	},		
	
	previousPicture: function() {
		console.log('Log: Controller->Pictures->Pictures: previousPicture: function()');
		if (this.getPicturesViewPictureStore().getCount() > 0) {
			currentPictureValue = this.getPicturesViewPictureStore().last();
			var selectedpicture = currentPictureValue.getData()['pictureprevious'] + "";
			Ext.getStore('pictures.ViewPicture').getProxy().setExtraParam('currentdate', selectedpicture);			
			this.getPicturesViewPictureStore().on('load',this.loadViewElements,this,{single:true});
			this.getPicturesViewPictureStore().load();
		}		
	},

	nextPicture: function() {
		console.log('Log: Controller->Pictures->Pictures: nextPicture: function()'); 
		if (this.getPicturesViewPictureStore().getCount() > 0) {
			currentPictureValue = this.getPicturesViewPictureStore().last();
			var selectedpicture = currentPictureValue.getData()['picturenext'] + "";
			Ext.getStore('pictures.ViewPicture').getProxy().setExtraParam('currentdate', selectedpicture);			
			this.getPicturesViewPictureStore().on('load',this.loadViewElements,this,{single:true});
			this.getPicturesViewPictureStore().load();
		}		   	
	},

	lastPicture: function() {
		console.log('Log: Controller->Pictures->Pictures: lastPicture: function()'); 
		if (this.getPicturesViewPictureStore().getCount() > 0) {
			currentPictureValue = this.getPicturesViewPictureStore().last();
			var selectedpicture = currentPictureValue.getData()['picturelast'] + "";
			
			Ext.getStore('pictures.ViewPicture').getProxy().setExtraParam('currentdate', "0");		
			Ext.getStore('pictures.Sensor').getProxy().setExtraParam('currentdate', "0");					

			var currentPictureMonth = selectedpicture.substring(4, 6) - 1; // TO BE INVESTIGATED
			var currentdate = new Date(selectedpicture.substring(0, 4), currentPictureMonth, selectedpicture.substring(6, 8), selectedpicture.substring(8, 10), selectedpicture.substring(10, 12), selectedpicture.substring(12, 14), 0);		
			//console.log(currentdate);
		//	var currentdateTimestamp = currentdate.getTime();		
			Ext.getStore('pictures.HoursList').getProxy().setExtraParam('currentdate', selectedpicture.substring(0, 14));	
	
			this.getDayslist().setValue(currentdate);				
	
			//Reload hours list	
			this.getPicturesHoursListStore().load();			
				
			this.getPicturesViewPictureStore().on('load',this.loadViewElements,this,{single:true});
			this.getPicturesViewPictureStore().load();
		}		   	
	},

	onPictureHourSelected: function(iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
		console.log('Log: Controller->Pictures->Pictures: onPictureHourSelected: function()');
		var selectedcol = iColIdx - 1
		if (iColIdx < 10) { selectedcol = "0" + selectedcol;};
		//get selected picture time from grid
		var selectedpicture = iRecord.getData()[selectedcol]
		if (selectedpicture !="0") {
			if (selectedpicture.substring(0, 1) == "X"){
				selectedpicture = selectedpicture.replace("X","");
				console.log('Log: Controller->Pictures->Pictures: onPictureHourSelected: function() - Selected picture ' + selectedpicture + ' has a comment attached'); 
			}			
			Ext.getStore('pictures.ViewPicture').getProxy().setExtraParam('currentdate', selectedpicture);			
			this.getPicturesViewPictureStore().on('load',this.loadViewElements,this,{single:true});
			this.getPicturesViewPictureStore().load();
		}
	},
		
	onDaySelected: function(field, date) {
		console.log('Log: Controller->Pictures->Pictures: onDaySelected: function()'); 
		//Extract timestamp from selected date
		var currentdate = new Date(date)

		if (currentdate.getDate() < 10) {currentdateDay = '0' + currentdate.getDate();} 
		else {currentdateDay = currentdate.getDate();}
		if (currentdate.getHours() < 10) {currentdateHour = '0' + currentdate.getHours();} 
		else {currentdateHour = currentdate.getHours();}
		if (currentdate.getMinutes() < 10) {currentdateMinute = '0' + currentdate.getMinutes();} 
		else {currentdateMinute = currentdate.getMinutes();}
		if (currentdate.getSeconds() < 10) {currentdateSeconds = '0' + currentdate.getSeconds();} 
		else {currentdateSeconds = currentdate.getSeconds();}		
		currentdateYear = currentdate.getFullYear();	
		currentdateMonth = currentdate.getMonth();	
		currentdateMonth = (parseInt(currentdateMonth) + 1).toString();
		if (parseInt(currentdateMonth) < 10) {currentdateMonth = '0' + currentdateMonth;} 
		
		//Set timestamp into store
		Ext.getStore('pictures.HoursList').getProxy().setExtraParam('currentdate', currentdateYear + currentdateMonth + currentdateDay + currentdateHour + currentdateMinute + currentdateSeconds);
		Ext.getStore('pictures.Sensor').getProxy().setExtraParam('currentdate', currentdateYear + currentdateMonth + currentdateDay + currentdateHour + currentdateMinute + currentdateSeconds);

		//Reload store to take new date into consideration
		this.getPicturesHoursListStore().load();

		this.sensorProcess();		
			
	},

	onSourceSelected: function(selModel, selection) {
		console.log('Log: Controller->Pictures->Pictures: onSourceSelected: function()'); 
		//Extract timestamp from selected date
		//var currentdate = new Date(date).getTime()
		console.log('Log: Controller->Pictures->Pictures: onSourceSelected: Selected name is:' + selection[0].get('name'));
		console.log('Log: Controller->Pictures->Pictures: onSourceSelected: Selected Sourceid is:' + selection[0].get('sourceid'));		
		
		//Set sourceid into store
		Ext.getStore('pictures.HoursList').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));
		Ext.getStore('pictures.ViewPicture').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));	
		Ext.getStore('pictures.PictureSendEmail').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));	
		Ext.getStore('pictures.PictureInsertComment').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));			
		Ext.getStore('pictures.Sensor').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));			

		//Reload store to take new date into consideration
		this.getPicturesHoursListStore().load();
		this.getPicturesHoursListStore().sync();

		//Set Sourcename as the title		
		//this.getSourcename().getComponent('sourcenametitle').update("<b>" + selection[0].get('name') + "</b>");
		this.getPictureswindow().getComponent('pictureswindowdockedtoolbar').getComponent('sourcenametitle').update("<b>" + selection[0].get('name') + "</b>");						

		//Set timestamp into store
		Ext.getStore('pictures.HoursList').getProxy().setExtraParam('currentdate', 0);
		Ext.getStore('pictures.ViewPicture').getProxy().setExtraParam('currentdate', 0);		
		Ext.getStore('pictures.Sensor').getProxy().setExtraParam('currentdate', 0);		

		//Load the latest picture for the selected source
		this.getPicturesViewPictureStore().on('load',this.loadViewElements,this,{single:true});
		this.getPicturesViewPictureStore().load();
	},

	openEmail: function() {
		console.log('Log: Controller->Pictures->Pictures: openEmail: function()');

		this.getPicturessendemailwindow().getComponent('emailpanel').down('#emailsendto').setValue('');
		this.getPicturessendemailwindow().getComponent('emailpanel').down('#emailsubject').setValue('');
		this.getPicturessendemailwindow().getComponent('emailpanel').down('#emailcontent').setValue('');
		
		this.getPicturessendemailwindow().show();
		currentPictureValue = this.getPicturesViewPictureStore().last();		
		var currentPictureFile = currentPictureValue.getData()['picturetime'] + '.jpg';
		this.getPicturessendemailwindow().getComponent('emailpanel').down('#emailpicture').setValue(currentPictureFile);
		Ext.getStore('pictures.PictureSendEmail').getProxy().setExtraParam('picture', currentPictureValue.getData()['picturetime']);		
		
	},

	sendEmail: function() {
		console.log('Log: Controller->Pictures->Pictures: sendEmail: function()');
		emailSendTo = this.getPicturessendemailwindow().getComponent('emailpanel').getValues().emailsendto
		emailSendSubject = this.getPicturessendemailwindow().getComponent('emailpanel').getValues().emailsubject
		emailSendContent = this.getPicturessendemailwindow().getComponent('emailpanel').getValues().emailcontent
		console.log('Log: Controller->Pictures->Pictures: sendEmail: Send To: ' + emailSendTo);		
		console.log('Log: Controller->Pictures->Pictures: sendEmail: Subject: ' + emailSendSubject);		
		console.log('Log: Controller->Pictures->Pictures: sendEmail: Content: ' + emailSendContent);		
		
		if (emailSendTo != "" && emailSendSubject != "" && emailSendContent != "") {
			this.getPicturesPictureSendEmailStore().on('insert',this.closeEmail(),this,{single:true});
			this.getPicturesPictureSendEmailStore().insert(0, this.getPicturessendemailwindow().getComponent('emailpanel').getValues());
		}		
	},
	
	closeEmail: function() {
		console.log('Log: Controller->Pictures->Pictures: closeEmail: function()');
		this.getPicturessendemailwindow().hide();		
	},	

	openComment: function() {
		console.log('Log: Controller->Pictures->Pictures: openComment: function()');
		this.getPicturesinsertcommentwindow().show();
		currentPictureValue = this.getPicturesViewPictureStore().last();		
		var currentPictureFile = currentPictureValue.getData()['picturetime'] + '.jpg';
		this.getPicturesinsertcommentwindow().getComponent('commentpanel').down('#commentpicture').setValue(currentPictureFile);
		Ext.getStore('pictures.PictureInsertComment').getProxy().setExtraParam('picture', currentPictureValue.getData()['picturetime']);		
		
	},

	saveComment: function() {
		console.log('Log: Controller->Pictures->Pictures: saveComment: function()');
		
		this.getPicturesPictureInsertCommentStore().on('insert',this.closeComment,this,{single:true});
		this.getPicturesPictureInsertCommentStore().insert(0, this.getPicturesinsertcommentwindow().getComponent('commentpanel').getValues());		

		this.closeComment();
		//this.getPicturesinsertcommentwindow().hide();	
	},

	deleteComment: function() {
		console.log('Log: Controller->Pictures->Pictures: deleteComment: function()');

		this.getPicturesinsertcommentwindow().getComponent('commentpanel').down('#commentpicture').setValue('');		

		this.getPicturesPictureInsertCommentStore().on('insert',this.closeComment,this,{single:true});		
		this.getPicturesPictureInsertCommentStore().insert(0, [{
			commentcontent: 	''								
		}]);				
		
		
	//	this.getPicturesPictureInsertCommentStore().on('insert',this.closeComment,this,{single:true});
	//	this.getPicturesPictureInsertCommentStore().insert(0, this.getPicturesinsertcommentwindow().getComponent('commentpanel').getValues());		

		this.closeComment();
		//this.getPicturesinsertcommentwindow().hide();	
	},	
	
	closeComment: function() {
		console.log('Log: Controller->Pictures->Pictures: closeComment: function()');
		this.getPicturesinsertcommentwindow().hide();	
		
		this.getPicturesHoursListStore().load();		
		
		//Load the latest picture for the selected source
		this.getPicturesViewPictureStore().on('load',this.loadViewElements,this,{single:true});
		this.getPicturesViewPictureStore().load();		
	},

	openSensors: function() {
		console.log('Log: Controller->Pictures->Pictures: openSensors: function()');
		this.getPicturessensorswindow().show();
		currentSensorValue = this.getPicturesSensorStore().last();		
		if (currentSensorValue.getData()['sensor1'] != "") {
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor1').setSrc(currentSensorValue.getData()['sensor1']);
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor1').setWidth(497);
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor1').setHeight(162);		
		}
		if (currentSensorValue.getData()['sensor2'] != "") {
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor2').setSrc(currentSensorValue.getData()['sensor2']);
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor2').setWidth(497);
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor2').setHeight(162);		
		}
		if (currentSensorValue.getData()['sensor3'] != "") {
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor3').setSrc(currentSensorValue.getData()['sensor3']);
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor3').setWidth(497);
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor3').setHeight(162);		
		}
		if (currentSensorValue.getData()['sensor4'] != "") {
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor4').setSrc(currentSensorValue.getData()['sensor4']);
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor4').setWidth(497);
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor4').setHeight(162);		
		}
	},

	sensorProcess: function() {
		console.log('Log: Controller->Pictures->Pictures: sensorProcess: function()');		
		//Load the latest picture for the selected source
		this.getPicturesSensorStore().on('load',this.loadSensorButton,this,{single:true});
		this.getPicturesSensorStore().load();		
	},

	loadSensorButton: function() {
		console.log('Log: Controller->Pictures->Pictures: loadSensorButton: function()');				
		// Display Sensors button
		currentSensorValue = this.getPicturesSensorStore().last();
		if (currentSensorValue.getData()['sensor1'] != "") {
			this.getPictureswindow().getComponent('globalpanel').getComponent('centralpanel').getComponent('centralpaneltoolbar').getComponent('openSensors').setVisible(true);		
		} else {
			this.getPictureswindow().getComponent('globalpanel').getComponent('centralpanel').getComponent('centralpaneltoolbar').getComponent('openSensors').setVisible(false);					
		}
		if (currentSensorValue.getData()['sensor1'] != "") {
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor1').setSrc(currentSensorValue.getData()['sensor1']);
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor1').setWidth(497);
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor1').setHeight(162);		
		}
		if (currentSensorValue.getData()['sensor2'] != "") {
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor2').setSrc(currentSensorValue.getData()['sensor2']);
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor2').setWidth(497);
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor2').setHeight(162);		
		}
		if (currentSensorValue.getData()['sensor3'] != "") {
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor3').setSrc(currentSensorValue.getData()['sensor3']);
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor3').setWidth(497);
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor3').setHeight(162);		
		}
		if (currentSensorValue.getData()['sensor4'] != "") {
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor4').setSrc(currentSensorValue.getData()['sensor4']);
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor4').setWidth(497);
			this.getPicturessensorswindow().getComponent('sensorcontainer').getComponent('sensor4').setHeight(162);		
		}		
	},
	
	loadViewElements: function() {
		//Load (or reload) all pictures elements based upon selected picture (format: YYYYMMDDHHMMSS), if selectedpicture = "0", picture is taken from current store record		
		console.log('Log: Controller->Pictures->Pictures: loadViewElements: function()'); 
		if (this.getPicturesViewPictureStore().getCount() > 0) {		
			console.log('Log: Controller->Pictures->Pictures: loadViewElements - Store updated'); 
			currentPictureValue = this.getPicturesViewPictureStore().last();
			var currentPictureFile = currentPictureValue.getData()['picture'];
			var currentPictureUrl = currentPictureValue.getData()['pictureurl'];
			var currentTimthumb = currentPictureValue.getData()['timthumb'];						
			var currentZoomLevel = currentPictureValue.getData()['zoomlevel'];
			var currentPictureWidth = currentPictureValue.getData()['picturewidth'];
			var currentPictureHeight = currentPictureValue.getData()['pictureheight'];						
			var currentPictureSourceId = currentPictureValue.getData()['sourceid'];
			var currentPictureTime = currentPictureValue.getData()['picturetime'] + "";	
			var currentDate = currentPictureValue.getData()['currentdate'];
			var currentPictureComment = currentPictureValue.getData()['picturecomment'];			
			console.log('Log: Controller->Pictures->Pictures: loadViewElements - Will display elements about: ' + currentPictureTime); 

			if (currentTimthumb != 2) {
				//Show optimize button (disable timthumb)
				console.log('Log: Controller->Pictures->Pictures: loadViewElements - Display optimize button'); 				
				this.getPictureswindow().getComponent('globalpanel').getComponent('centralpanel').getComponent('centralpaneltoolbar').down('#timthumbButton').show();
				if (currentTimthumb == 0) {
					this.getPictureswindow().getComponent('globalpanel').getComponent('centralpanel').getComponent('centralpaneltoolbar').down('#timthumbButton').toggle(false);					
				} else {
					this.getPictureswindow().getComponent('globalpanel').getComponent('centralpanel').getComponent('centralpaneltoolbar').down('#timthumbButton').toggle(true);										
				}		
			} else {
				this.getPictureswindow().getComponent('globalpanel').getComponent('centralpanel').getComponent('centralpaneltoolbar').down('#timthumbButton').hide();				
			}
						
			//Display picture date
			var currentPictureMonth = currentPictureTime.substring(4, 6) - 1; // Because javascript month are from 0 to 11
			var currentPictureDate = new Date(currentPictureTime.substring(0, 4), currentPictureMonth, currentPictureTime.substring(6, 8), currentPictureTime.substring(8, 10), currentPictureTime.substring(10, 12), currentPictureTime.substring(12, 14), 0);		
			//this.getCurrentpicture().getComponent('picturedate').update(currentPictureDate.toString());	
			this.getCurrentpicture().getComponent('picturedate').update(dateFormat(currentPictureDate));	

			//Display comment (if any)
			if (currentPictureComment != "") {
				this.getPictureswindow().getComponent('globalpanel').getComponent('centralpanel').down('#existingcommentbox').setValue(currentPictureComment);
				this.getPictureswindow().getComponent('globalpanel').getComponent('centralpanel').getComponent('existingcommentbox').show();
			} else {
				this.getPictureswindow().getComponent('globalpanel').getComponent('centralpanel').getComponent('existingcommentbox').hide();				
			}
			this.getPictureswindow().getComponent('globalpanel').getComponent('centralpanel').down('#existingcommentbox').setValue(currentPictureComment);			
			this.getPicturesinsertcommentwindow().getComponent('commentpanel').down('#commentcontent').setValue(currentPictureComment);			

			//Set sourceid into store
			Ext.getStore('pictures.HoursList').getProxy().setExtraParam('sourceid', currentPictureSourceId);
			Ext.getStore('pictures.ViewPicture').getProxy().setExtraParam('sourceid', currentPictureSourceId);
			Ext.getStore('pictures.PictureSendEmail').getProxy().setExtraParam('sourceid', currentPictureSourceId);
			Ext.getStore('pictures.PictureInsertComment').getProxy().setExtraParam('sourceid', currentPictureSourceId);							
			Ext.getStore('pictures.Sensor').getProxy().setExtraParam('sourceid', currentPictureSourceId);							

			//Get window size (to accelerate loading by only getting picture with same width as window). For Height, 30px adjustement is to keep date below picture on screen
			var currentWindowWidth = this.getPictureswindow().getComponent('globalpanel').getComponent('centralpanel').getComponent('picturepanel').getWidth();
			var currentWindowHeight = this.getPictureswindow().getComponent('globalpanel').getComponent('centralpanel').getComponent('picturepanel').getHeight() - 30;		
			console.log('Log: Controller->Pictures->Pictures: loadViewElements: Main Picture: Window Size:' + currentWindowWidth + 'x' + currentWindowHeight);
			console.log('Log: Controller->Pictures->Pictures: loadViewElements: Main Picture: Picture Size:' + currentPictureWidth + 'x' + currentPictureHeight);

			//We ensure that target height of the picture will not by greather than current window height (otherwise a portion of the picture will not be displayed)
			currentPictureTargetHeight = Math.round(currentWindowWidth * currentPictureHeight / currentPictureWidth);
			if (currentPictureTargetHeight > currentWindowHeight) {
				currentPictureTargetWidth = Math.round(currentWindowHeight * currentPictureWidth / currentPictureHeight);
				this.getCurrentpicture().getComponent('picturedisplay').setSize({width:currentPictureTargetWidth, height:currentWindowHeight});
			} else {
				currentPictureTargetWidth = currentWindowWidth;
				this.getCurrentpicture().getComponent('picturedisplay').setSize({width:currentPictureTargetWidth, height:currentPictureTargetHeight});
			}			

			// Calculate Zoom level of the picture as it is currently displayed
			// currentPictureWidth: Width of the fullsize picture stored on the server
			// currentPictureTargetWidth: Width of the picture displayed by the interface
			var currentZoomLevel = Math.round(currentPictureTargetWidth * 100 / currentPictureWidth);
			console.log('Log: Controller->Pictures->Pictures: loadViewElements: Current Picture ratio (zoom):' + currentZoomLevel +'%');
			// Set Zoomlevel into the slider
			this.getZoompicture().setValue(currentZoomLevel);		
			//#Manage Zoom slider, if zoomlevel > currentZoomLevel, activate jquery jqzoom, otherwise simply display picture (we don't want to zoom to a size smaller that what the window can currently display
			if (currentPictureValue.getData()['zoomlevel'] > currentZoomLevel) { 
				console.log('Log: Controller->Pictures->Pictures: loadViewElements: Main Picture: Display file:' + currentPictureFile + '&w=' + currentPictureTargetWidth);									
				//Determine target zoom width to match slider value
				var targetZoomPictureWidth = Math.round(currentPictureValue.getData()['zoomlevel'] * currentPictureWidth / 100);
				console.log('Log: Controller->Pictures->Pictures: loadViewElements: Target Zoom level:' + currentPictureValue.getData()['zoomlevel'] + '% -> Target Width:' + targetZoomPictureWidth);				
				
				//Picture will be accessed via timthumb, width is passed as an argument
				if (currentTimthumb == 1) { 
					console.log('Log: Controller->Pictures->Pictures: loadViewElements: Timthumb enabled');										
					this.getCurrentpicture().getComponent('picturedisplay').update('<a href="' + currentPictureFile + '&w=' + targetZoomPictureWidth + '" class="jqzoom" title="' + i18n.gettext('Webcampak Zoom') + ' (' + currentPictureValue.getData()['zoomlevel'] + '%)"><img src="' + currentPictureFile + '&w=' + currentPictureTargetWidth + '" title="Webcampak"></a>');
				} else {
					console.log('Log: Controller->Pictures->Pictures: loadViewElements: Timthumb disabled');						
					this.getCurrentpicture().getComponent('picturedisplay').update('<a href="' + currentPictureFile + '&w=' + targetZoomPictureWidth + '" class="jqzoom" title="' + i18n.gettext('Webcampak Zoom') + ' (' + currentPictureValue.getData()['zoomlevel'] + '%)"><img src="' + currentPictureUrl + '" width="' + currentPictureTargetWidth + '" title="Webcampak"></a>');					
				}
				//Set Zoomlevel into the slider	
				this.getZoompicture().setValue(currentPictureValue.getData()['zoomlevel']);
				
				//Loading jqzoom to display zoomed picture	
				console.log('Log: Controller->Pictures->Pictures: loadViewElements: Load jqzoom module');
				var options = {  
	            zoomType: 'innerzoom',  
	            lens:true,  
	            preloadImages: true,  
	            alwaysOn:false,
					showEffect : 'fadein',  
					hideEffect: 'fadeout' 	            
			    };
				$(".jqzoom").jqzoom(options);		
			} else { //No zoomlevel selected, display regular picture
				if (currentTimthumb == 1 || currentTimthumb == 2) { 
					//Picture will be accessed via timthumb, width is passed as an argument				
					console.log('Log: Controller->Pictures->Pictures: loadViewElements: Timthumb enabled');	
					console.log('Log: Controller->Pictures->Pictures: loadViewElements: Main Picture: Display file:' + currentPictureFile + '&w=' + currentPictureTargetWidth);										
					this.getCurrentpicture().getComponent('picturedisplay').update('<center><img src="' + currentPictureFile + '&w=' + currentPictureTargetWidth + '" title="' + i18n.gettext('Webcampak Picture') + '"></center>');
				} else {
					console.log('Log: Controller->Pictures->Pictures: loadViewElements: Timthumb disabled');
					this.getCurrentpicture().getComponent('picturedisplay').update('<center><img src="' + currentPictureUrl + '" width="' + currentPictureTargetWidth + '" title="' + i18n.gettext('Webcampak Picture') + '"></center>');											
				}

			}

			//Calculate ideal thumbnail width
			var currentWindowThumbWidth = this.getThumbnails().getWidth();
			var currentWindowThumbHeight = this.getThumbnails().getHeight();
			console.log('Log: Controller->Pictures->Pictures: loadViewElements: Thumbnail: Window Size:' + currentWindowWidth + 'x' + currentWindowHeight);

			//Push Thumbnails values to Window
			var targetThumbnailWidth = Math.floor(currentWindowThumbWidth / 6);
			console.log('Log: Controller->Pictures->Pictures: loadViewElements: Thumbnail: Target Thumbnail Width:' + targetThumbnailWidth);
			if (currentPictureValue.getData()['thumb1'] != '') {				
				this.getThumbnails().getComponent('thumb1').getComponent('picture').setSrc(currentPictureValue.getData()['thumb1'] + '&w=' + targetThumbnailWidth);
				var thumb1time = currentPictureValue.getData()['thumb1time'] + " ";
				this.getThumbnails().getComponent('thumb1').getComponent('date').update(thumb1time.substring(8, 10) + ":" + thumb1time.substring(10, 12));	
				this.getThumbnails().getComponent('thumb1').getComponent('picture').show();
				this.getThumbnails().getComponent('thumb1').getComponent('date').show();						
			} else {
				this.getThumbnails().getComponent('thumb1').getComponent('picture').hide();
				this.getThumbnails().getComponent('thumb1').getComponent('date').hide();
			};
			if (currentPictureValue.getData()['thumb2'] != '') {
				this.getThumbnails().getComponent('thumb2').getComponent('picture').setSrc(currentPictureValue.getData()['thumb2'] + '&w=' + targetThumbnailWidth);
				var thumb2time = currentPictureValue.getData()['thumb2time'] + " ";
				this.getThumbnails().getComponent('thumb2').getComponent('date').update(thumb2time.substring(8, 10) + ":" + thumb2time.substring(10, 12));
				this.getThumbnails().getComponent('thumb2').getComponent('picture').show();
				this.getThumbnails().getComponent('thumb2').getComponent('date').show();							
			} else {
				this.getThumbnails().getComponent('thumb2').getComponent('picture').hide();
				this.getThumbnails().getComponent('thumb2').getComponent('date').hide();
			};
			if (currentPictureValue.getData()['thumb3'] != '') {
				this.getThumbnails().getComponent('thumb3').getComponent('picture').setSrc(currentPictureValue.getData()['thumb3'] + '&w=' + targetThumbnailWidth);
				var thumb3time = currentPictureValue.getData()['thumb3time'] + " ";
				this.getThumbnails().getComponent('thumb3').getComponent('date').update(thumb3time.substring(8, 10) + ":" + thumb3time.substring(10, 12));
				this.getThumbnails().getComponent('thumb3').getComponent('picture').show();
				this.getThumbnails().getComponent('thumb3').getComponent('date').show();							
			} else {
				this.getThumbnails().getComponent('thumb3').getComponent('picture').hide();
				this.getThumbnails().getComponent('thumb3').getComponent('date').hide();
			};
			if (currentPictureValue.getData()['thumb4'] != '') {
				this.getThumbnails().getComponent('thumb4').getComponent('picture').setSrc(currentPictureValue.getData()['thumb4'] + '&w=' + targetThumbnailWidth);
				var thumb4time = currentPictureValue.getData()['thumb4time'] + " ";
				this.getThumbnails().getComponent('thumb4').getComponent('date').update(thumb4time.substring(8, 10) + ":" + thumb4time.substring(10, 12));
				this.getThumbnails().getComponent('thumb4').getComponent('picture').show();
				this.getThumbnails().getComponent('thumb4').getComponent('date').show();						
			} else {
				this.getThumbnails().getComponent('thumb4').getComponent('picture').hide();
				this.getThumbnails().getComponent('thumb4').getComponent('date').hide();
			};
			if (currentPictureValue.getData()['thumb5'] != '') {
				this.getThumbnails().getComponent('thumb5').getComponent('picture').setSrc(currentPictureValue.getData()['thumb5'] + '&w=' + targetThumbnailWidth);
				var thumb5time = currentPictureValue.getData()['thumb5time'] + " ";
				this.getThumbnails().getComponent('thumb5').getComponent('date').update(thumb5time.substring(8, 10) + ":" + thumb5time.substring(10, 12));	
				this.getThumbnails().getComponent('thumb5').getComponent('picture').show();
				this.getThumbnails().getComponent('thumb5').getComponent('date').show();						
			} else {
				this.getThumbnails().getComponent('thumb5').getComponent('picture').hide();
				this.getThumbnails().getComponent('thumb5').getComponent('date').hide();
			};
			if (currentPictureValue.getData()['thumb6'] != '') {
				this.getThumbnails().getComponent('thumb6').getComponent('picture').setSrc(currentPictureValue.getData()['thumb6'] + '&w=' + targetThumbnailWidth);
				var thumb6time = currentPictureValue.getData()['thumb6time'] + " ";
				this.getThumbnails().getComponent('thumb6').getComponent('date').update(thumb6time.substring(8, 10) + ":" + thumb6time.substring(10, 12));
				this.getThumbnails().getComponent('thumb6').getComponent('picture').show();
				this.getThumbnails().getComponent('thumb6').getComponent('date').show();							
			} else {
				this.getThumbnails().getComponent('thumb6').getComponent('picture').hide();
				this.getThumbnails().getComponent('thumb6').getComponent('date').hide();
			};

			//Set Sourcename as the title		
			if (currentPictureValue.getData()['sourcename'] != '') {
				//this.getSourcename().getComponent('sourcenametitle').update("<b>" + currentPictureValue.getData()['sourcename'] + "</b>");
				this.getPictureswindow().getComponent('pictureswindowdockedtoolbar').getComponent('sourcenametitle').update("<b>" + currentPictureValue.getData()['sourcename'] + "</b>");						
			}
			
			//Determine days not to be displayed on calendar
			if (currentPictureValue.getData()['disableddates'] != "" ) {
				currentDisabledDates = eval('[' + currentPictureValue.getData()['disableddates'] + ']'); //['06/09/2012', '04/../2012']	MMDDYYYY
				console.log('Log: Controller->Pictures->Pictures: loadViewElements: Calendar: Set disabled dates: ' + currentDisabledDates);
				this.getDayslist().setDisabledDates(currentDisabledDates);	//MMDDYYYY
			} else {
				testDisabledDates = "'02/19/2010'"; //This is a fake value to reset calendar
				currentDisabledDates = eval('[' + testDisabledDates + ']'); //['06/09/2012', '04/../2012']	MMDDYYYY
				console.log('Log: Controller->Pictures->Pictures: loadViewElements: Calendar: Set disabled dates: ' + currentDisabledDates);				
				this.getDayslist().setDisabledDates(currentDisabledDates);	//MMDDYYYY		
			}					

			// Set Min date in calendar
			if (currentPictureValue.getData()['mindate'] > 0 ) {
				console.log('Log: Controller->Pictures->Pictures: loadViewElements: Calendar: Set min date to: ' + new Date(currentPictureValue.getData()['mindate']));
				this.getDayslist().setMinDate(new Date(currentPictureValue.getData()['mindate']));
			}
			// Set Max date in calendar
			if (currentPictureValue.getData()['maxdate'] > 0 ) {
				console.log('Log: Controller->Pictures->Pictures: loadViewElements: Calendar: Set max date to: ' + new Date(currentPictureValue.getData()['maxdate']));
				this.getDayslist().setMaxDate(new Date(currentPictureValue.getData()['maxdate']));
			}	
			// If no dates have been previously selected, set current date to date of the latest picture of the source
			if (currentDate == 0) {
				console.log('Log: Controller->Pictures->Pictures: loadViewElements: Calendar: Set current day to oldest picture of the source');				
				this.getDayslist().setValue(new Date(currentPictureValue.getData()['maxdate']));	
				
				var selectedpicture = currentPictureValue.getData()['picturelast'] + "";
				//Set Max date into store
				Ext.getStore('pictures.HoursList').getProxy().setExtraParam('currentdate', selectedpicture.substring(0, 14));	
				Ext.getStore('pictures.Sensor').getProxy().setExtraParam('currentdate', selectedpicture.substring(0, 14));	
					
				//Reload store to take new date into consideration
				this.getPicturesHoursListStore().load();		
				
				this.sensorProcess();
			}	
		}
		
	}

});
  
                  