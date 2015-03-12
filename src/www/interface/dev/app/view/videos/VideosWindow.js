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
console.log('Log: Load: Webcampak.view.videos.VideosWindow');
Ext.define('Webcampak.view.videos.VideosWindow' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.videoswindow',
	
	//store: 'pictures.ViewPicture',	
	
	iconCls: 'icon-videos',  	
	title: i18n.gettext('Webcampak Videos'),
	width: 900,
	height: 650,
	maximizable: true,
	minimizable: true,
	closeAction : 'hide',
	layout:'fit',
	dockedItems: [{
		itemId: 'videoswindowdockedtoolbar',
		xtype: 'toolbar',
		dock: 'top',
		items: [{
			xtype: 'videossourceslist'
		}, '-', {
			xtype: 'container',
			itemId: 'sourcenametitle',
			cls: 'viewvideossourcename',
			html: i18n.gettext('No Source Selected'),
			flex: 1					
		}, '-', {
			text: i18n.gettext('Refresh'),
			iconCls: 'icon-reload',					
			xtype: 'button',
			action: 'refreshVideos'			
		}] 
	}],	
	items: [{
		xtype: 'panel',
		layout: {type: 'hbox', pack: 'start', align: 'stretch'},
		defaults: {frame: true},
		itemId: 'globalpanel',
		items: [{
			width: 325,
 			layout: {type: 'vbox', align: 'stretch'},
	 		defaults: {frame: true},
			items: [{
				xtype: 'container',
				layout: {type: 'vbox', pack: 'start', align: 'center'},
				height: 210, //flex: 1,
				items: [{
					xtype: 'videosdayslist'
				}]		
			}, {
				xtype: 'videoslist'
			}]						
		}, {
			flex: 1,
			layout: {type: 'vbox', align: 'stretch'},
			defaults: {frame: true},
			itemId: 'centralpanel',			
			items: [{
				xtype: 'currentvideo',				
				flex: 4
			}]					
		}]
	}]
});




 





