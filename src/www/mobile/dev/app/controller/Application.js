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
console.log('Log: Load: WebcampakMobile.controller.Application');
Ext.define('WebcampakMobile.controller.Application', {
	extend: 'Ext.app.Controller',

	config: {

		stores: [
			'ViewPictures',
			'ViewVideos',			
			'SendEmail',	
			'InsertComment'						
		],    	
		models: [
			'ViewPicture',
			'ViewVideos',			
			'SendEmail',
			'InsertComment'							
		],
		
		refs: {
			main: 				'main',

			picturesContainer:	'picturesContainer',
			videosContainer:		'videosContainer',	
			settingsWindow:		'settingsWindow',

			openSettings:		'	#openSettings',				

			drawWindow:				'drawWindow',					
			openDrawSettings:		'#openDrawSettings',
			drawButton:				'#drawButton',
			freeDrawComponent: 	'freeDrawComponent',	
			closeDrawButton:		'#closeDrawButton',
			deleteDrawButton:		'#deleteDrawButton',
			
			previousButton: 	'#previousButton', 
			nextButton: 		'#nextButton',   
			lastButton: 		'#lastButton',   			
			  
			datePicker: 		'#datePicker',
			datePickerDone: 	'#datePickerDone',	
			datePickerClose: 	'#datePickerClose',
						
			displayImage: 		'#displayImage',
			sourceDatePicker: 'source-datepicker',				

			viewSources: 		'#viewSources',

			emailWindow:		'emailWindow',	
			closeEmailButton: 	'#closeEmailButton',
			sendEmailButton: 		'#sendEmailButton',					
			emailButton: 			'#emailButton',
			emailDrawButton: 			'#emailDrawButton',
			
			commentWindow:			'commentWindow',	
			closeCommentButton: 	'#closeCommentButton',
			saveCommentButton: 	'#saveCommentButton',	

			
			commentButton: 		'#commentButton',						

			timthumbToggle: 		'#timthumbToggle',	

			mainwindowpanel: 		'#mainwindowpanel',
																			       			           			       			           
			sources: 			'sources',
			picturesShow: 		'picturesshow',
			videolist: 			'videolist'			
		},
	
		control: {
			viewport: 				{orientationchange: 	'onOrientationChange'	},      	
			displayImage: 			{load: 					'onImageLoaded'			},
			sources: 				{itemtap: 				'onSourceSelect' 			},
			videolist: 				{itemtap: 				'onVideoSelected' 		},			
			previousButton: 		{tap: 					'previousPicture'			},            
			nextButton: 			{tap: 					'nextPicture'				},
			lastButton: 			{tap: 					'lastPicture'				},			
			            
			emailButton: 			{tap: 					'onEmailPrepare'			},
			emailDrawButton: 		{tap: 					'onEmailPrepare'			},			
			sendEmailButton: 		{tap: 					'onEmailSend'				},	
			closeEmailButton: 	{tap: 					'closeEmail'				},				
			
			timthumbToggle: 		{change: 					'ontimthumbChange'	},			
			
			commentButton: 		{tap: 					'onCommentInsert'			},				
			saveCommentButton: 	{tap: 					'onCommentSubmit'			},		
			closeCommentButton: 	{tap: 					'closeComment'				},	

			datePicker: 			{tap: 					'onDatePicker'				},
			datePickerDone: 		{tap: 					'onDatePickerDone'		},
			datePickerClose: 		{tap: 					'onDatePickerClose'		},			
					
			main: 					{push: 'onMainPush',	pop: 'onMainPop'			},
			viewSources: 			{tap: 					'onViewSources'			},

			openSettings: 			{tap: 					'onOpenSettings'			},
			openDrawSettings: 	{tap: 					'onOpenDrawSettings'		},
			drawButton: 			{tap: 					'onStartDrawing'			},	
			closeDrawButton: 		{tap: 					'resetDrawing'				},	
			deleteDrawButton: 	{tap: 					'onDeleteDrawing'			},			
										
			mainwindowpanel: 		{activeitemchange: 	'onTabPanelChange'		}					
		}
	},

	onStartDrawing: function() {
		console.log('Log: Controller->Application - onStartDrawing() function');
		if (this.getPicturesShow().getComponent('drawtoolbar').isHidden() == true) {	
			console.log('Log: Controller->Application - onStartDrawing() - Show draw toolbar');			
			this.getPicturesShow().getComponent('drawtoolbar').show();
			this.getPicturesShow().getComponent('displayImage').hide();	//We hide pinchzoom image		
			this.getPicturesShow().getComponent('containerDisplayImageDraw').show();	//We show the 'draw' image	
			
			displayPicture = Ext.getStore('ViewPictures').last();	
			screenSizeWidth = this.getPicturesShow().getComponent('containerDisplayImageDraw').element.getWidth();		
			screenSizeHeight = this.getPicturesShow().getComponent('containerDisplayImageDraw').element.getHeight();			
			console.log('Log: Controller->Application - onStartDrawing() - Zone size: ' + screenSizeWidth + 'x' + screenSizeHeight);
			console.log('Log: Controller->Application - onStartDrawing() - Picture size: ' + displayPicture.data.picturewidth + 'x' + displayPicture.data.pictureheight);			

			//1- Determine ideal picture size to fit screen, using width
			bestPictureHeight =	Math.round(screenSizeWidth * displayPicture.data.pictureheight / displayPicture.data.picturewidth);
			bestPictureWidth = screenSizeWidth;
			console.log('Log: Controller->Application - onStartDrawing() - Best picture size: ' + screenSizeWidth + 'x' + bestPictureHeight);						
			if (bestPictureHeight > screenSizeHeight) {
				console.log('Log: Controller->Application - onStartDrawing() - Best picture size too large for screen, trying with width');	
				bestPictureWidth = Math.round(screenSizeHeight * displayPicture.data.picturewidth / displayPicture.data.pictureheight);
				bestPictureHeight = screenSizeHeight;
				console.log('Log: Controller->Application - onStartDrawing() - Best picture size: ' + bestPictureWidth + 'x' + screenSizeHeight);															
			}
			//2- Assigning picture to the container	
			console.log('Log: Controller->Application - onStartDrawing() - Set Image:' + displayPicture.data.picture + '&w=' + bestPictureWidth);		
			this.getPicturesShow().getComponent('containerDisplayImageDraw').getComponent('displayImageDraw').setHtml('<div align="center" style="background-color:black;padding: 0;spacing:0;" ><img src="'+ displayPicture.data.picture + '&w=' + bestPictureWidth + '" ></div>');	//We show the 'draw' image	
			this.getPicturesShow().getComponent('containerDisplayImageDraw').getComponent('displayImageDraw').setWidth(bestPictureWidth);
			this.getPicturesShow().getComponent('containerDisplayImageDraw').getComponent('displayImageDraw').setHeight(bestPictureHeight);
			
		} else {
			console.log('Log: Controller->Application - onStartDrawing() - Hide draw toolbar');			
			this.resetDrawing();
		}			
	},

	onDeleteDrawing: function() {
		console.log('Log: Controller->Application - onDeleteDrawing() function');					
		if (this.getPicturesShow()) {
			this.getPicturesShow().getComponent('containerDisplayImageDraw').getComponent('displayImageDraw').getSurface('main').removeAll();					
			this.getPicturesShow().getComponent('containerDisplayImageDraw').getComponent('displayImageDraw').getSurface('main').clear();		
		}
	},

	resetDrawing: function() {
		console.log('Log: Controller->Application - resetDrawing() function');					
		if (this.getPicturesShow()) {
			this.getPicturesShow().getComponent('containerDisplayImageDraw').getComponent('displayImageDraw').getSurface('main').removeAll();					
			this.getPicturesShow().getComponent('containerDisplayImageDraw').getComponent('displayImageDraw').getSurface('main').clear();		
			this.getPicturesShow().getComponent('drawtoolbar').hide();	
			this.getPicturesShow().getComponent('displayImage').show();	//We show pinchzoom image	
			this.getPicturesShow().getComponent('containerDisplayImageDraw').hide();	//We hide pinchzoom image	
		}
	},

	onOpenSettings: function() {
		console.log('Log: Controller->Application - onOpenSettings() function');
		if (!this.openSettings) { this.openSettings = Ext.create('WebcampakMobile.view.settings.Settings');}
		this.overlay = Ext.Viewport.add(this.openSettings);
		this.overlay.show();				
	},

	onOpenDrawSettings: function() {
		console.log('Log: Controller->Application - onOpenDraw() function');
		if (!this.openDrawSettings) { this.openDrawSettings = Ext.create('WebcampakMobile.view.pictures.DrawWindow');}
		this.overlay = Ext.Viewport.add(this.openDrawSettings);
		this.overlay.show();				
	},

	// This function is started when tab is changed (switching between videos and pictures).
	onTabPanelChange: function() {
		console.log('Log: Controller->Application - onTabPanelChange() function');
		//Active == 0 : Pictures tab
		//Active == 1 : Videos tab		
		if (this.getMainwindowpanel().getInnerItems().indexOf(this.getMainwindowpanel().getActiveItem()) == 0) {
			console.log('Log: Controller->Application - onTabPanelChange() - Active Panel: ViewPictures');			
			viewPicturesStore = Ext.getStore('ViewPictures');			
			viewPicturesStore.on('load',this.loadPicture,this,{single:true});
			viewPicturesStore.load();	
		} else if (this.getMainwindowpanel().getInnerItems().indexOf(this.getMainwindowpanel().getActiveItem()) == 1) {
			console.log('Log: Controller->Application - onTabPanelChange() - Active Panel: ViewVideos');						
			viewVideosStore = Ext.getStore('ViewVideos');			
			viewVideosStore.on('load',this.loadVideoList,this,{single:true});
			viewVideosStore.load();				
		}
	},
	
	//This function is started when user click on Show Sources / Hide Sources
	onViewSources: function() {
		console.log('Log: Controller->Application - onViewSources() function'); 	
		if (this.getMain().getComponent('mainwindow').getComponent('mainwindowsources').isHidden() == true) {		
			this.getViewSources().setText(i18n.gettext('Hide Sources'));
			this.getMain().getComponent('mainwindow').getComponent('mainwindowsources').show();
		} else {
			this.getViewSources().setText(i18n.gettext('Show Sources'));
			this.getMain().getComponent('mainwindow').getComponent('mainwindowsources').hide();			
		}
		//Reload picture to get proper size when side panel is displayed / hidden 
		if (this.getMainwindowpanel().getInnerItems().indexOf(this.getMainwindowpanel().getActiveItem()) == 0) {
			console.log('Log: Controller->Application - onViewSources() - Active Panel: ViewPictures');			
			this.loadPicture();
		}
	},

	//This function is started when user change bandwidth optimization
	ontimthumbChange: function() {
		console.log('Log: Controller->Application - ontimthumbChange() function');  
		//console.log(this.getTimthumbToggle().getValue());    
		Ext.getStore('ViewPictures').getProxy().setExtraParam('timthumb', this.getTimthumbToggle().getValue());				    	    	    	    	    	    	  	    	    	    	    	    	    	
	},

	onCommentSubmit: function() {
		console.log('Log: Controller->Application - onCommentSubmit() function');  
		var commentContent = this.getCommentWindow().getValues();	
		Ext.getStore('InsertComment').on('insert',this.closeComment(),this,{single:true});
		Ext.getStore('InsertComment').insert(0, commentContent);	
	},


	onCommentInsert: function() {
		console.log('Log: Controller->Application - onCommentInsert() function');    	   
		Ext.Viewport.setMasked(false);		 	    	    	
		if (!this.commentInsert) { this.commentInsert = Ext.create('WebcampakMobile.view.pictures.CommentWindow');}
		this.overlay = Ext.Viewport.add(this.commentInsert);
		this.overlay.show();

		viewPicturesStore = Ext.getStore('ViewPictures');	
		displayedPicture = viewPicturesStore.last();

		Ext.getStore('InsertComment').getProxy().setExtraParam('picture', displayedPicture.data.picturetime);		

		insertCommentStore = Ext.getStore('InsertComment');
		commentTmp = insertCommentStore.last();	
		commentTmp.data.commentcontent = displayedPicture.data.picturecomment;		
		commentTmp.data.picturetime = displayedPicture.data.picturetime + '.jpg';

		this.commentInsert.updateRecord(commentTmp);
	},

	closeComment: function() {
		console.log('Log: Controller->Application - closeComment() function');  
		this.getCommentWindow().hide();  		
		if (this.overlay) {
			console.log('Log: Controller->Application - closeComment() - Remove overlay');  			
			this.overlay.remove();
		}	
	},

	onEmailPrepare: function() {
		console.log('Log: Controller->Application - onEmailPrepare() function');   
		Ext.Viewport.setMasked(false);		 	    	    	    	
		if (!this.emailPrepare) { this.emailPrepare = Ext.create('WebcampakMobile.view.pictures.EmailWindow');}
		this.overlay = Ext.Viewport.add(this.emailPrepare);
		this.overlay.show();
		
		viewPicturesStore = Ext.getStore('ViewPictures');	
		displayedPicture = viewPicturesStore.last();
		Ext.getStore('SendEmail').getProxy().setExtraParam('picture', displayedPicture.data.picturetime);		

		sendEmailStore = Ext.getStore('SendEmail');
		emailTmp = sendEmailStore.last();	
		emailTmp.data.emailpicture = displayedPicture.data.picturetime + '.jpg';		

		this.emailPrepare.updateRecord(emailTmp);
	},

	onEmailSend: function() {
		console.log('Log: Controller->Application - onEmailSend() function');
		var emailContent = this.getEmailWindow().getValues();	
		
		if (this.getPicturesShow().getComponent('containerDisplayImageDraw').getComponent('displayImageDraw').getSurface('main').canvases[0].id) {
			canvasId = this.getPicturesShow().getComponent('containerDisplayImageDraw').getComponent('displayImageDraw').getSurface('main').canvases[0].id
			console.log('Log: Controller->Application - onEmailSend() - There is a drawing available');
			bestPictureWidth = this.getPicturesShow().getComponent('containerDisplayImageDraw').getComponent('displayImageDraw').getWidth();
			bestPictureHeight = this.getPicturesShow().getComponent('containerDisplayImageDraw').getComponent('displayImageDraw').getHeight();						
			console.log('Log: Controller->Application - onEmailSend() - There is a drawing size: ' + bestPictureWidth + 'x' + bestPictureHeight);
    		var canvas = document.getElementById(canvasId);       
          if (canvas.getContext) {
             var ctx = canvas.getContext("2d"); 
             var myImage = canvas.toDataURL(); 
             console.log(myImage);
             emailContent.emaildrawing = canvas.toDataURL();
          }	       			
		}		
		console.log(emailContent);
		Ext.getStore('SendEmail').on('insert',this.closeEmail(),this,{single:true});
		Ext.getStore('SendEmail').insert(0, emailContent);	
	},

	closeEmail: function() {
		console.log('Log: Controller->Application - closeEmail() function');  
		this.getEmailWindow().hide(); 
		if (this.overlay) {
			console.log('Log: Controller->Application - closeEmail() - Remove overlay');  			
			this.overlay.remove();
		}	 		
	},

	onImageLoaded: function() {
		console.log('Log: Controller->Application - onImageLoaded() function');	
		Ext.Viewport.setMasked(false);
	},

	onDatePicker: function() {
		console.log('Log: Controller->Application - onDatePicker() function');
		if (!this.sourceDatePicker) { this.sourceDatePicker = Ext.create('WebcampakMobile.view.source.DatePicker');}	

		//We get picture timestampe in order to display the picker on the last selected picture
		viewPicturesStore = Ext.getStore('ViewPictures');	
		displayedPicture = viewPicturesStore.last();		
		var currentPictureTime = displayedPicture.data.picturetime + "";				
		var currentPictureMonth = currentPictureTime.substring(4, 6) - 1; 		
		var currentPictureDate = new Date(currentPictureTime.substring(0, 4), currentPictureMonth, currentPictureTime.substring(6, 8), currentPictureTime.substring(8, 10), currentPictureTime.substring(10, 12), currentPictureTime.substring(12, 14), 0);				

		console.log(this.sourceDatePicker);
		Ext.Viewport.add(this.sourceDatePicker);
		this.sourceDatePicker.setValueAnimated(currentPictureDate);
		this.sourceDatePicker.show();			
	},	

	onDatePickerDone: function() {
		console.log('Log: Controller->Application - onDatePickerDone() function');
		selectedTimestamp = new Date(this.sourceDatePicker.getValue()).getTime();	
		console.log('Log: Controller->Application->onDatePicker - handler - selected timestamp: ' + dateFormat(selectedTimestamp, 'yyyyddmmHHMMss'));			
		viewPicturesStore = Ext.getStore('ViewPictures');
		Ext.getStore('ViewPictures').getProxy().setExtraParam('currentdate', dateFormat(selectedTimestamp, 'yyyymmddHHMMss'));	
		this.sourceDatePicker.hide();	
		viewPicturesStore.on('load',this.loadPicture,this,{single:true});
		viewPicturesStore.load();																	
	},	

	onDatePickerClose: function() {
		console.log('Log: Controller->Application - onDatePickerClose() function');
		this.sourceDatePicker.hide();																	
	},	

	onReloadPictureStore: function() {
		console.log('Log: Controller->Application - onReloadPictureStore() function');
		Ext.getCmp('datePickerDone').destroy();	
		console.log('Log: Controller->Application - onReloadPictureStore() - datePickerDone destroyed');				

		//picker.destroy();										
		viewPicturesStore = Ext.getStore('ViewPictures');			
		viewPicturesStore.on('load',this.loadPicture,this,{single:true});
		viewPicturesStore.load();	
	},

	onSourceSelect: function(list, index, node, record) {
		console.log('Log: Controller->Application - onSourceSelect() function');   
		this.getMain().getComponent('mainwindow').getComponent('launchscreen').hide();	
		this.getMain().getComponent('mainwindow').getComponent('mainwindowpanel').show();

		Ext.getStore('ViewPictures').getProxy().setExtraParam('sourceid', record.data.sourceid);
		Ext.getStore('ViewVideos').getProxy().setExtraParam('sourceid', record.data.sourceid);		
		Ext.getStore('ViewPictures').getProxy().setExtraParam('currentdate', record.data.latestpicturedate);		
		Ext.getStore('SendEmail').getProxy().setExtraParam('sourceid', record.data.sourceid);
		Ext.getStore('InsertComment').getProxy().setExtraParam('sourceid', record.data.sourceid);				

		//Active == 0 : Pictures tab
		//Active == 1 : Videos tab	
		if (this.getMainwindowpanel().getInnerItems().indexOf(this.getMainwindowpanel().getActiveItem()) == 0) {
			console.log('Log: Controller->Application - onSourceSelect() - Currently selected tab: ViewPictures');   			
			viewPicturesStore = Ext.getStore('ViewPictures');			
			viewPicturesStore.on('load',this.loadPicture,this,{single:true});
			viewPicturesStore.load();	
		} else if (this.getMainwindowpanel().getInnerItems().indexOf(this.getMainwindowpanel().getActiveItem()) == 1) {
			console.log('Log: Controller->Application - onSourceSelect() - Currently selected tab: ViewVideos');   						
			viewVideosStore = Ext.getStore('ViewVideos');			
			viewVideosStore.on('load',this.loadVideoList,this,{single:true});
			viewVideosStore.load();				
		}
		Ext.Viewport.setMasked(false);		
		
    },

	loadVideoList: function() {
		console.log('Log: Controller->Application - loadVideoList() function'); 
						
	},

	onVideoSelected: function(list, index, node, record) {
		console.log('Log: Controller->Application - onVideoSelected() function');  	
		if (record.data.mp4 != null) {
			if (!this.showWatchVideo) {this.showWatchVideo = Ext.create('WebcampakMobile.view.videos.Watch');}
			console.log('Log: Controller->Application - onVideoSelected() - URL: ' + record.data.mp4);  
			console.log('Log: Controller->Application - onVideoSelected() - Poster: ' + record.data.jpg);  									
			this.showWatchVideo.down('video').setUrl(record.data.mp4);
			this.showWatchVideo.down('video').setPosterUrl(record.data.jpg);
			this.getVideosContainer().push(this.showWatchVideo);		
		}
	},
    
	onOrientationChange: function() {
		console.log('Log: Controller->Application - onOrientationChange() function');	
		if (typeof this.getMain().getItems().items[2] != 'undefined') {
			if (this.getMain().getItems().items[2].id == "source-show-display") {
				this.loadPicture(); 	    	   
			} 		
		} else {
		console.log('Log: Controller->Application - onOrientationChange() - No action taken, currently not in picture view mode');			
		}
	
	},	
	    
	loadPicture: function() {
		console.log('Log: Controller->Application - loadPicture() function');   
		
		//If user was drawing, clear drawing and move back to picture view.
		this.resetDrawing();

		viewPicturesStore = Ext.getStore('ViewPictures');	
		displayPicture = viewPicturesStore.last();

		screenSize = this.getPicturesContainer().element.getSize();		
		
		if (!this.showSource) {this.showSource = Ext.create('WebcampakMobile.view.pictures.Show');}
		this.showSource.updateRecord(displayPicture, screenSize);

		// Update window title to source name
		this.getMain().getComponent('maintoolbar').setTitle(displayPicture.data.sourcename);		
		
		this.getPicturesContainer().push(this.showSource);	
	},

	previousPicture: function() {
		console.log('Log: Controller->Application - previousPicture() function');   
		viewPicturesStore = Ext.getStore('ViewPictures');		 
		if (viewPicturesStore.getCount() > 0) {
			currentPictureValue = viewPicturesStore.last();
			var selectedpicture = currentPictureValue.getData()['pictureprevious'] + "";
			Ext.getStore('ViewPictures').getProxy().setExtraParam('currentdate', selectedpicture);			
			viewPicturesStore.on('load',this.loadPicture,this,{single:true});
			viewPicturesStore.load();	
		}		
	},

	nextPicture: function() {
		console.log('Log: Controller->Application - nextPicture() function'); 	
		viewPicturesStore = Ext.getStore('ViewPictures');		 
		if (viewPicturesStore.getCount() > 0) {
			currentPictureValue = viewPicturesStore.last();
			var selectedpicture = currentPictureValue.getData()['picturenext'] + "";
			Ext.getStore('ViewPictures').getProxy().setExtraParam('currentdate', selectedpicture);			
			viewPicturesStore.on('load',this.loadPicture,this,{single:true});
			viewPicturesStore.load();	
		}		   	
	},

	lastPicture: function() {
		console.log('Log: Controller->Application - lastPicture() function'); 	
		viewPicturesStore = Ext.getStore('ViewPictures');		 
		if (viewPicturesStore.getCount() > 0) {
			currentPictureValue = viewPicturesStore.last();
			var selectedpicture = currentPictureValue.getData()['picturelast'] + "";
			Ext.getStore('ViewPictures').getProxy().setExtraParam('currentdate', "0");			
			viewPicturesStore.on('load',this.loadPicture,this,{single:true});
			viewPicturesStore.load();	
		}		   	
	},

    onMainPush: function(view, item) {
		console.log('Log: Controller->Application - onMainPush() function');    	
    },

    onMainPop: function(view, item) {
		console.log('Log: Controller->Application - onMainPop() function');     	    	
    } 
});
