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
console.log('Log: Load: Webcampak.controller.videos.Videos');
Ext.define('Webcampak.controller.videos.Videos', {
	extend: 'Ext.app.Controller',

	stores: [
		'videos.VideosList',
		'videos.ViewVideo',				
		'permissions.sources.Sources'		
	],

	models: [
		'videos.VideoList',
		'videos.ViewVideo',			
		'permissions.Source'
	],

	views: [
		'videos.VideosWindow',
		'videos.VideosList',		
		'videos.DaysList',
		'videos.SourceName',	
		'videos.SourcesList',		
		'videos.CurrentVideo',
		'permissions.sources.SourcesList'
	],

	refs: [
		{ref: 'videoswindow', 		selector: 'videoswindow'},
		{ref: 'videoslist',			selector: 'videoslist'},
		{ref: 'videosdayslist',		selector: 'videosdayslist'},		
		{ref: 'videossourcename',	selector: 'videossourcename'},	
		{ref: 'videossourceslist',	selector: 'videossourceslist'},
		{ref: 'currentvideo', 		selector: 'currentvideo'}
	],

	init: function() {
		console.log('Log: Controller->Permissions->Groups: Controller init: function()');
		this.control({
			'videoswindow button[action=refreshVideos]': {click: 			this.refreshVideos		},
			'videoswindow': 										{resize: 		this.windowResize			},					
			'videosdayslist': 									{select: 		this.onDaySelected		},	
			'videossourceslist': 								{select: 		this.onSourceSelected	},
			'videoslist dataview': 								{cellclick: 	this.onVideoSelected		}
		});
	},

	windowResize: function() {
		console.log('Log: Controller->Videos->Videos: windowResize: function()');
		this.getVideosViewVideoStore().on('load',this.loadViewElements,this,{single:true});
		this.getVideosViewVideoStore().load();
	},

	refreshVideos: function() {
		console.log('Log: Controller->Videos->Videos: refreshVideos: function()');
		this.getVideosViewVideoStore().on('load',this.loadViewElements,this,{single:true});	
		this.getVideosViewVideoStore().load();
		this.getVideosVideosListStore().load();			
	},



	onVideoSelected: function(iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
		console.log('Log: Controller->Videos->Videos: onVideoSelected: function()');
		var selectedvideo = iRecord.getData()['filename'];
		console.log('Log: Controller->Videos->Videos: onVideoSelected: Selected video: ' + selectedvideo);		
		if (selectedvideo !="") {
			Ext.getStore('videos.ViewVideo').getProxy().setExtraParam('currentfile', selectedvideo);			
			this.getVideosViewVideoStore().on('load',this.loadViewElements,this,{single:true});
			this.getVideosViewVideoStore().load();
		}
	},
		
	onDaySelected: function(field, date) {
		console.log('Log: Controller->Videos->Videos: onDaySelected: function()'); 
		//Extract timestamp from selected date
		var currentdate = new Date(date).getTime()
		
		//Set timestamp into store
		Ext.getStore('videos.VideosList').getProxy().setExtraParam('currentdate', currentdate);

		//Reload store to take new date into consideration
		this.getVideosVideosListStore().load();	
	},

	onSourceSelected: function(selModel, selection) {
		console.log('Log: Controller->Videos->Videos: onSourceSelected: function()'); 
		//Extract timestamp from selected date
		//var currentdate = new Date(date).getTime()
		console.log('Log: Controller->Videos->Videos: onSourceSelected: Selected name is:' + selection[0].get('name'));
		console.log('Log: Controller->Videos->Videos: onSourceSelected: Selected Sourceid is:' + selection[0].get('sourceid'));		
		
		//Set sourceid into store 
		Ext.getStore('videos.VideosList').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));
		Ext.getStore('videos.ViewVideo').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));

		//Set timestamp into store to "0", force reload of last day
		Ext.getStore('videos.VideosList').getProxy().setExtraParam('currentdate', 0);
		Ext.getStore('videos.ViewVideo').getProxy().setExtraParam('currentfile', 0);				

		//Reload store to take new date into consideration
		this.getVideosVideosListStore().load();	
		this.getVideosVideosListStore().sync();

		//Set Sourcename as the title		
		//this.getVideossourcename().getComponent('sourcenametitle').update("<b>" + selection[0].get('name') + "</b>");
		this.getVideoswindow().getComponent('videoswindowdockedtoolbar').getComponent('sourcenametitle').update("<b>" + selection[0].get('name') + "</b>");								

		this.getCurrentvideo().getComponent('picturedisplay').update('<center>No Preview available</center>');				

		//Load the latest picture for the selected source
		this.getVideosViewVideoStore().on('load',this.loadViewElements,this,{single:true});
		this.getVideosViewVideoStore().load();
		
	},

	loadViewElements: function() {
		//Load (or reload) all pictures elements based upon selected picture (format: YYYYMMDDHHMMSS), if selectedpicture = "0", picture is taken from current store record		
		console.log('Log: Controller->Videos->Videos: loadViewElements: function()'); 
		if (this.getVideosViewVideoStore().getCount() > 0) {		
			console.log('Log: Controller->Videos->Videos: loadViewElements - Store updated'); 
			currentVideoValue = this.getVideosViewVideoStore().last();
			var currentPreviewPicture = currentVideoValue.getData()['previewpicture'];
			var currentPreviewPictureWidth = currentVideoValue.getData()['previewpicturewidth'];			
			var currentPreviewPictureHeight = currentVideoValue.getData()['previewpictureheight'];			
			var currentPreviewVideo = currentVideoValue.getData()['previewvideo'];	

			var currentVideoName = currentVideoValue.getData()['videoname'];	
			var currentVideoDate = currentVideoValue.getData()['currentdate'];				

			var currentVideoSourceId = currentVideoValue.getData()['sourceid'];	
			
			var currentVideoNext = currentVideoValue.getData()['videonext'];	
			var currentVideoPrevious = currentVideoValue.getData()['videoprevious'];				
						

			var currentDate = currentVideoValue.getData()['currentdate'];
			var currentFile = currentVideoValue.getData()['currentfile'];	// File currently selected in the list, 0 if no file have been selectd
			console.log('Log: Controller->Videos->Videos: loadViewElements - Will display elements about: ' + currentVideoName); 
			
			//Display videoname date
			//console.log(this.getCurrentVideo());
			this.getCurrentvideo().getComponent('videoname').update(currentVideoName);				

			//Set sourceid into store
			Ext.getStore('videos.VideosList').getProxy().setExtraParam('sourceid', currentVideoSourceId);
			Ext.getStore('videos.ViewVideo').getProxy().setExtraParam('sourceid', currentVideoSourceId);

			if (currentPreviewPictureWidth != 0 && currentPreviewPictureHeight != 0) {
				//Get window size. For Height, 30px adjustement is to keep name below picture on screen
				var currentWindowWidth = this.getVideoswindow().getComponent('globalpanel').getComponent('centralpanel').getWidth();
				var currentWindowHeight = this.getVideoswindow().getComponent('globalpanel').getComponent('centralpanel').getHeight() - 30;		
				console.log('Log: Controller->Videos->Videos: loadViewElements: Video: Window Size:' + currentWindowWidth + 'x' + currentWindowHeight);
				console.log('Log: Controller->Videos->Videos: loadViewElements: Video: Picture Size:' + currentPreviewPictureWidth + 'x' + currentPreviewPictureHeight);
	
				//We ensure that target height of the picture will not by greather than current window height (otherwise a portion of the picture will not be displayed)
				currentPictureTargetHeight = Math.round(currentWindowWidth * currentPreviewPictureHeight / currentPreviewPictureWidth);
				if (currentPictureTargetHeight > currentWindowHeight) {
					currentPictureTargetWidth = Math.round(currentWindowHeight * currentPreviewPictureWidth / currentPreviewPictureHeight);
					this.getCurrentvideo().getComponent('picturedisplay').setSize({width:currentPictureTargetWidth, height:currentWindowHeight});
				} else {
					currentPictureTargetWidth = currentWindowWidth;
					//this.getCurrentvideo().getComponent('picturedisplay').setSize({width:currentPictureTargetWidth, height:currentPictureTargetHeight});
				}			

				//Launching Flowplayer	
				console.log('Log: Controller->Videos->Videos: loadViewElements: Preview Video File:' + currentPreviewVideo);
				var insertPlayer = '<a href="' + currentPreviewVideo + '" style="display:block;width:' + currentPictureTargetWidth + 'px;height:' + currentPictureTargetHeight + 'px;" id="vidflowplayer">';
  				var insertPlayer = insertPlayer + '<img src="' + currentPreviewPicture + '" width="' + currentPictureTargetWidth + '" />';
  				var insertPlayer = insertPlayer + '</a>';				
				this.getCurrentvideo().getComponent('picturedisplay').update('<center>' + insertPlayer + '</center>');				
				flowplayer("vidflowplayer", "/interface/lib/flowplayer-3.2.12/flowplayer-3.2.12.swf");
			} else {
				this.getCurrentvideo().getComponent('picturedisplay').update('<center>No Preview available</center>');				
			}

			//Set Sourcename as the title		
			if (currentVideoValue.getData()['sourcename'] != '') {
				//this.getVideossourcename().getComponent('sourcenametitle').update("<b>" + currentVideoValue.getData()['sourcename'] + "</b>");
				this.getVideoswindow().getComponent('videoswindowdockedtoolbar').getComponent('sourcenametitle').update("<b>" + currentVideoValue.getData()['sourcename'] + "</b>");
			}

			// Set Min date in calendar
			if (currentVideoValue.getData()['mindate'] > 0 ) {
				console.log('Log: Controller->Videos->Videos: loadViewElements: Calendar: Set min date: ' + currentVideoValue.getData()['mindate']);
				this.getVideosdayslist().setMinDate(new Date(currentVideoValue.getData()['mindate']));
			}
			// Set Max date in calendar
			if (currentVideoValue.getData()['maxdate'] > 0 ) {
				console.log('Log: Controller->Videos->Videos: loadViewElements: Calendar: Set max date: ' + currentVideoValue.getData()['maxdate']);
				this.getVideosdayslist().setMaxDate(new Date(currentVideoValue.getData()['maxdate']));
			}
			
			//Determine days not to be displayed on calendar
			if (currentVideoValue.getData()['disableddates'] != "" ) {
				console.log('Log: Controller->Videos->Videos: loadViewElements: Calendar: Set disabled dates');
				currentDisabledDates = eval('[' + currentVideoValue.getData()['disableddates'] + ']'); //['06/09/2012', '04/../2012']	MMDDYYYY
				console.log('Log: Controller->Videos->Videos: loadViewElements: Calendar: Set disabled dates: ' + currentDisabledDates);					
				this.getVideosdayslist().setDisabledDates(currentDisabledDates);	//MMDDYYYY
			} else {
				testDisabledDates = "'02/19/2010'"; //This is a fake value to reset calendar
				currentDisabledDates = eval('[' + testDisabledDates + ']'); //['06/09/2012', '04/../2012']	MMDDYYYY
				console.log('Log: Controller->Videos->Videos: loadViewElements: Calendar: Set disabled dates: ' + currentDisabledDates);				
				this.getVideosdayslist().setDisabledDates(currentDisabledDates);	//MMDDYYYY		
			}	


	
			// If no dates have been previously selected, set current date to date of the latest picture of the source
			console.log('Log: Controller->Videos->Videos: loadViewElements: Calendar: Set current day to oldest video of the source');				
			this.getVideosdayslist().setValue(new Date(currentVideoValue.getData()['currentdate']));	
			if (currentFile == 0) {				
				//Set Max date into store
				Ext.getStore('videos.VideosList').getProxy().setExtraParam('currentdate', currentVideoValue.getData()['currentdate']);	
					
				//Reload store to take new date into consideration
				this.getVideosVideosListStore().load();		
			}	
		} 
	}
});
  
                  