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
console.log('Log: Load: WebcampakMobile.view.source.Show');
Ext.define('WebcampakMobile.view.source.Show', {
	extend: 'Ext.Container',
	xtype: 'source-show',

	config: {
		title: i18n.gettext('Source name'),
		id: 'source-show-display',		
		baseCls: 'x-show-contact',
		layout: 'vbox',
		scrollable: 'both',
		items: [{
			xtype : 'toolbar',
			docked: 'bottom',
			items: [		
				{xtype: 'button', 		ui: 'back', 									id: 'previousButton', 	itemId: 'previousButton', text: i18n.gettext('Prev.')	},
				{xtype: 'spacer' 																																										},			
				{xtype: 'button', 		iconMask: true, 	iconCls: 'action', 	id: 'emailButton' 																				},
				{xtype: 'container', 	html: 'No Date'																																		},
				{xtype: 'button',			iconMask: true, 	iconCls: 'compose',	id: 'commentButton', 	itemId: 'commentButton'											},				
				{xtype: 'spacer' 																																										},					
				{xtype: 'button', 		ui: 'forward', 								id: 'nextButton', 		itemId: 'nextButton', 		text: i18n.gettext('Next')	}
			]        			
		}, {		
			flex: 1,					
			//xtype: 'pinchzoomimage',
			xtype: 'image',
			id: 'displayImage'
		}],
		record: null
	},

	updateRecord: function(newRecord) {
		if (newRecord) {
			console.log('Log: View->Source->Show - updateRecord function()');
			this.setTitle(newRecord.data.sourcename);
			screenSize = Ext.getBody().getSize();
			console.log('Log: View->Source->Show - updateRecord - Current screen width: ' + screenSize.width);
			console.log('Log: View->Source->Show - updateRecord - Original picture dimensions: ' + newRecord.data.picturewidth + 'x' + newRecord.data.pictureheight);
			displayTargetHeight = Math.round(screenSize.width * newRecord.data.pictureheight / newRecord.data.picturewidth);		
			console.log('Log: View->Source->Show - updateRecord - Target picture dimensions: ' + screenSize.width + 'x' + displayTargetHeight);	
			console.log('Log: View->Source->Show - updateRecord - TimThumb:' + newRecord.data.timthumb )
			
			//Put a load mask on front of the picture while it s loading
			if (this.down('image').getSrc() != newRecord.data.picture + '&w=' + screenSize.width) {
				Ext.Viewport.setMasked({xtype:'loadmask',message: i18n.gettext('Image loading...')});	
			}			
			this.down('image').setWidth(screenSize.width);
			this.down('image').setHeight(displayTargetHeight);

			console.log('TimThumb:' + newRecord.data.timthumb )

			if (newRecord.data.timthumb == "0") {
				this.down('image').setSrc(newRecord.data.pictureurl);
			} else {
				this.down('image').setSrc(newRecord.data.picture + '&w=' + screenSize.width);		
			}			

/*			this.down('pinchzoomimage').setWidth(screenSize.width);
			this.down('pinchzoomimage').setHeight(displayTargetHeight);
			this.down('pinchzoomimage').setSrc(newRecord.data.picture + '&w=' + screenSize.width);		*/
			
			if (newRecord.data.picturetime != '0') { 
				var currentPictureTime = newRecord.data.picturetime + "";				
				var currentPictureMonth = currentPictureTime.substring(4, 6) - 1; // TO BE INVESTIGATED
				var currentPictureDate = new Date(currentPictureTime.substring(0, 4), currentPictureMonth, currentPictureTime.substring(6, 8), currentPictureTime.substring(8, 10), currentPictureTime.substring(10, 12), currentPictureTime.substring(12, 14), 0);		
				this.down('toolbar').down('container').setHtml('<div style="color: #ffffff; text-color: #ffffff;text-align: center;">' + dateFormat(currentPictureDate, 'mmm dd yyyy') + '<br />' + dateFormat(currentPictureDate, 'HH:MM:ss') + '</div>');							
			} else {
				this.down('toolbar').down('container').setHtml('<div style="color: #ffffff; text-color: #ffffff;text-align: center;">' + i18n.gettext('No date') + '<br />' + i18n.gettext('available') + '</div>');				
			}			
			if (newRecord.data.pictureprevious == null) {
				console.log('Log: View->Source->Show - updateRecord - There is no previous picture, disabling button');	
				this.down('toolbar').getComponent('previousButton').disable();							
			} else {
				this.down('toolbar').getComponent('previousButton').enable();											
			}
			if (newRecord.data.picturenext == null) {
				console.log('Log: View->Source->Show - updateRecord - There is no next picture, disabling button');		
				this.down('toolbar').getComponent('nextButton').disable();																	
			} else {
				this.down('toolbar').getComponent('nextButton').enable();											
			}
			if (newRecord.data.picturecomment != null) { 
				this.down('toolbar').getComponent('commentButton').setUi('confirm');											
			} else {
				this.down('toolbar').getComponent('commentButton').setUi('normal');															
			}				
		}
	}
});
