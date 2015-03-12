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
	
	iconCls: 'icon-photos',  	
	title: i18n.gettext('Webcampak Pictures'),
	width: 900,
	height: 600, 
	maximizable: true,
	minimizable: true,
	closeAction : 'hide',
	layout:'fit',
	dockedItems: [{
		itemId: 'pictureswindowdockedtoolbar',
		xtype: 'toolbar',
		dock: 'top',
		items: [{
			xtype: 'sourceslist'
		}, '-', {
			xtype: 'container',
			itemId: 'sourcenametitle',
			cls: 'viewpicturessourcename',
			html: 'Nom de la source',		
			flex: 1
		}, '-', {			
			text: i18n.gettext('Comment'),
			xtype: 'button',
			iconCls: 'icon-comments',
			action: 'commentPicture'						
		}, {
			text: i18n.gettext('Email'),
			xtype: 'button',
			iconCls: 'icon-email',					
			action: 'openEmail'						
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
				layout: {align: 'center'},
				height: 30,
				items: [{
					xtype: 'sourceslist'
				}]		
			}, {
				xtype: 'container',
				layout: {type: 'vbox', pack: 'start', align: 'center'},
				height: 210, //flex: 1,
				items: [{
					xtype: 'dayslist'
				}]		
			}, {
				xtype: 'container',
				layout: {type: 'vbox', pack: 'start', align: 'center'},
				flex: 1,
				items: [{
					xtype: 'hourslist'
				}]	
			}]						
		}, {		
			flex: 1,
			layout: {type: 'vbox', align: 'stretch'},
			defaults: {frame: true},
			itemId: 'centralpanel',
			items: [{
				xtype: 'sourcename'
			}, {
				xtype: 'container',
				height: 30,
				layout: {type: 'hbox', pack: 'start', align: 'stretch'},
				defaults: {frame: true},					
				items: [{
					xtype: 'container',			
					flex: 1,
					layout: {type: 'vbox', align: 'stretch'},
	 				defaults: {frame: true},
					items: [{
						text: '<<- ' + i18n.gettext('Previous'),
						xtype: 'button',
						action: 'previousPicture'			
					}]
				}, {
					xtype: 'container',
					flex: 1,
					layout: {type: 'vbox', align: 'stretch'},
	 				defaults: {frame: true},
					items: [{
						text: i18n.gettext('Next') + ' ->>',
						//iconCls: 'icon-add',
						xtype: 'button',
						action: 'nextPicture'				
					}]
				}]	
			}, {
				xtype: 'panel',
				flex: 4,
				itemId: 'picturepanel',
				items: [{
					xtype: 'currentpicture'
				}]	
			}, {
				xtype: 'container',
				layout: {type: 'hbox', pack: 'start', align: 'stretch'},
				defaults: {frame: true},		
				items: [{				
					xtype: 'panel',
					flex: 1,
					height: 30,
					layout: {type: 'hbox', pack: 'start', align: 'stretch'},
					defaults: {frame: true},		
					items: [{
						xtype: 'container',
						width: 40,
						html: 'Zoom'
					}, {
						flex: 1,
						xtype: 'zoompicture'
					}]	
				}, {
					text: i18n.gettext('Comment'),
					xtype: 'button',
					iconCls: 'icon-comments',
					action: 'commentPicture'						
				}, {
					text: i18n.gettext('Email'),
					xtype: 'button',
					iconCls: 'icon-email',					
					action: 'openEmail'						
				}]															
			}, {
				xtype: 'thumbnails'										
			}]					
		}]
	}]
});




 





