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
console.log('Log: Load: WebcampakMobile.view.pictures.Show');
Ext.define('WebcampakMobile.view.pictures.Show', {
	extend: 'Ext.Container',
	xtype: 'picturesshow',

	config: {
		id: 'picture-show-display',		
		layout: 'vbox',
		//scrollable: 'both',
		scrollable: false,
		items: [{
			xtype : 'toolbar',
			docked: 'top',
			items: [	
				{xtype: 'button', 		iconMask: true, 	iconCls: 'arrow_left', 		id: 'previousButton', 	itemId: 'previousButton' 			},
				{xtype: 'button', 		iconMask: true, 	iconCls: 'arrow_right', 	id: 'nextButton', 		itemId: 'nextButton'					},		
				{xtype: 'button', 		iconMask: true, 	iconCls: 'fforward', 		id: 'lastButton', 		itemId: 'lastButton'					},					
				{xtype: 'spacer' 																																					},			
				{xtype: 'button', 		iconMask: true, 	iconCls: 'mail', 				id: 'emailButton' 													},
				{xtype: 'container', 	html: 'No Date'																													},
				{xtype: 'button',			iconMask: true, 	iconCls: 'doc_compose1',	id: 'commentButton', 	itemId: 'commentButton'				},					
				{xtype: 'spacer' 																																					},		
				{xtype: 'button',			iconMask: true, 	iconCls: 'compose3',			id: 'drawButton', 		itemId: 'drawButton'					},								
				{xtype: 'button', 		iconMask: true, 	iconCls: 'calendar', 		id: 'datePicker'														}												
			]        			
		}, {		
			flex: 1,					
			xtype: 'pinchzoomimage',
			hidden: false,
			mode: 'image',
			id: 'displayImage',
			listeners: {
				longpress: {
					fn: function() {				
						if (Ext.getStore('ViewPictures').last().data.pictureurl != "") {	
							window.open(Ext.getStore('ViewPictures').last().data.pictureurl);
						}	
					},
					element: 'element'
				}
			}
		}, {
			flex: 1,
			hidden: true,			
			layout: 'hbox',
			id: 'containerDisplayImageDraw',
			items: [{
				xtype: 'container',
				flex: 1
			}, {
				xtype: 'freeDrawComponent',
				html: 'this is a test',
				draggable: false,
				id: 'displayImageDraw'
			}, {
				xtype: 'container',
				flex: 1			
			}]											
		}, {
			xtype : 'toolbar',
			id: 'drawtoolbar',
			docked: 'bottom',
			hidden: true,
			items: [	
				{xtype: 'button', 	iconMask: true, 	iconCls: 'trash', 	id: 'deleteDrawButton', 	itemId: 'deleteDrawButton',		text  : i18n.gettext('Clear Drawing')			},
				{xtype: 'spacer' 																																																		},							
				{xtype: 'button', 	iconMask: true, 	iconCls: 'mail', 		id: 'emailDrawButton', 			itemId: 'emailDrawButton',			text  : i18n.gettext('Email Drawing')			},
//				{xtype: 'button', 	iconMask: true, 	iconCls: 'compose3', id: 'openDrawSettings', 	itemId: 'openDrawSettings',		text  : i18n.gettext('Draw Settings')			},					
				{xtype: 'spacer' 																																																		},			
				{xtype: 'button', 	iconMask: true, 	iconCls: 'stop1', 	id: 'closeDrawButton', 		itemId: 'closeDrawButton',			text  : i18n.gettext('Close')						}							
			]					
		}],
		record: null
	},

	updateRecord: function(newRecord, screenSize) {
		if (newRecord) {
			console.log('Log: View->Source->Show - updateRecord function()');
			//this.setTitle(newRecord.data.sourcename);
			//screenSize = Ext.getBody().getSize();
			console.log('Log: View->Source->Show - updateRecord - Current screen width: ' + screenSize.width);
			console.log('Log: View->Source->Show - updateRecord - Original picture dimensions: ' + newRecord.data.picturewidth + 'x' + newRecord.data.pictureheight);
			displayTargetHeight = Math.round(screenSize.width * newRecord.data.pictureheight / newRecord.data.picturewidth);		
			console.log('Log: View->Source->Show - updateRecord - Target picture dimensions: ' + screenSize.width + 'x' + displayTargetHeight);	
			console.log('Log: View->Source->Show - updateRecord - TimThumb:' + newRecord.data.timthumb );
			
			if (newRecord.data.timthumb == "0") {
				//Put a load mask on front of the picture while it s loading
				if (this.down('pinchzoomimage').getSrc() != newRecord.data.pictureurl) {
					Ext.Viewport.setMasked({xtype:'loadmask',message: i18n.gettext('Image loading...')});	
				}					
				console.log('Log: View->Source->Show - updateRecord - Set Image:' + newRecord.data.pictureurl);		
				//this.down('pinchzoomimage').setWidth(newRecord.data.picturewidth);
				//this.down('pinchzoomimage').setHeight(newRecord.data.pictureheight);			
				this.down('pinchzoomimage').setWidth(screenSize.width);
				this.down('pinchzoomimage').setHeight(displayTargetHeight);						
				this.down('pinchzoomimage').setSrc(newRecord.data.pictureurl);
			} else {
				//Put a load mask on front of the picture while it s loading
				if (this.down('pinchzoomimage').getSrc() != newRecord.data.picture + '&w=' + screenSize.width) {
					Ext.Viewport.setMasked({xtype:'loadmask',message: i18n.gettext('Image loading...')});	
				}					
				console.log('Log: View->Source->Show - updateRecord - Set Image:' + newRecord.data.picture + '&w=' + screenSize.width);		
				this.down('pinchzoomimage').setWidth(screenSize.width);
				this.down('pinchzoomimage').setHeight(displayTargetHeight);									
				this.down('pinchzoomimage').setSrc(newRecord.data.picture + '&w=' + screenSize.width);		
			}			
			//this.down('image').setSrc(newRecord.data.picture + '&w=' + screenSize.width);		
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
