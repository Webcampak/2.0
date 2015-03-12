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
console.log('Log: Load: Webcampak.view.pictures.PicturesWindow');
Ext.define('Webcampak.view.pictures.PicturesWindow' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.pictureswindow',
	
	store: 'pictures.ViewPicture',	
	
	iconCls: 'icon-user',  	
	title: 'Webcampak Pictures',
	width: 1050,
	height: 550, 
	maximizable: true,
	closeAction : 'hide',
	layout:'fit',
	items: [{
		xtype: 'panel',
		//title: "Global Frame",		
		//style: {color: '#FFFFFF', background:'#000000'},
		layout: {type: 'hbox', pack: 'start', align: 'stretch'},
		defaults: {frame: true},
		itemId: 'globalpanel',
		items: [{
			//title: 'Left Panel',
			//style: {color: '#FFFFFF', background:'#ff0000'},
			width: 325,
 			layout: {type: 'vbox', align: 'stretch'},
	 		defaults: {frame: true},
			items: [{
				xtype: 'container',
				layout: {type: 'vbox', pack: 'start', align: 'center'},
				//style: {color: '#FFFFFF', background:'#0000ff'},
				height: 210, //flex: 1,
				items: [{
					xtype: 'dayslist',
				}]		
			}, {
				xtype: 'container',
				layout: {type: 'vbox', pack: 'start', align: 'center'},
				//style: {color: '#FFFFFF', background:'#0000ff', padding: '0'},
				flex: 1,
				items: [{
					xtype: 'hourslist',
				}]	
			}]						
		}, {
			//title: 'Center Panel',
			//style: {color: '#FFFFFF', background:'#00ff00'},			
			flex: 1,
			layout: {type: 'vbox', align: 'stretch'},
			defaults: {frame: true},
			itemId: 'centralpanel',
			items: [{
				xtype: 'sourcename',
			}, {
				xtype: 'container',
				//title: 'Picture',
				//style: {color: '#FFFFFF', background:'#432101'},				
				height: 30,
				layout: {type: 'hbox', pack: 'start', align: 'stretch'},
				defaults: {frame: true},					
				items: [{
					xtype: 'container',			
					flex: 1,
					layout: {type: 'vbox', align: 'stretch'},
	 				defaults: {frame: true},
					items: [{
						text: '<<- Previous',
						//iconCls: 'icon-add',
						xtype: 'button',
						action: 'previousPicture'			
					}]
				}, {
					xtype: 'container',
					flex: 1,
					layout: {type: 'vbox', align: 'stretch'},
	 				defaults: {frame: true},
					items: [{
						text: 'Next ->>',
						//iconCls: 'icon-add',
						xtype: 'button',
						action: 'nextPicture'				
					}]
				}]	
			}, {
				xtype: 'panel',
				//title: 'Picture',
				//style: {color: '#FFFFFF', background:'#432101'},				
				flex: 4,
				itemId: 'picturepanel',
				items: [{
					xtype: 'currentpicture',
				}]	
			}, {
				xtype: 'thumbnails',												
			}]					
		}, {
			//title: 'Left Panel',
			//style: {color: '#FFFFFF', background:'#ff0000'},
			width: 170,
 			layout: {type: 'vbox', align: 'stretch'},
	 		defaults: {frame: true},
			items: [{
				xtype: 'container',
				//title: 'Source Selection',
				layout: {align: 'center'},
				height: 40, //flex: 1,
				items: [{
					xtype: 'sourceslist',
				}]		
			}, {
				xtype: 'container',
				//title: 'Zoom',
				//style: {color: '#FFFFFF', background:'#0f0f0f'},				
				height: 50, //flex: 1,
 				layout: {type: 'vbox', align: 'stretch'},
	 			defaults: {frame: true},				
				items: [{
					xtype: 'zoompicture',
				},{
					xtype: 'container',
					//style: {color: '#FFFFFF', background:'#f0f0f0'},	
					//layout: {type: 'Auto', align: 'center'},	
					style: 'text-align: center;',		
					html: 'Zoom'
				}]			
			},	{
				xtype: 'container',
				//title: 'Tools',
				//style: {color: '#FFFFFF', background:'#123456'},				
				height: 80, //flex: 1
	 			layout: {type: 'vbox', align: 'center'},
				width: 80,			
		 		defaults: {frame: true},
				items: [{
					xtype: 'button', 
					action: 'downloadPicture', 
					cls: 'buttonDownload'			
				},	{
					xtype: 'container',
					html: 'Download',				
				}]		
			}]						
		}]
	}]
});




 





