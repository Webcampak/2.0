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

/**
  * Custom function used to determine window height
  */
Ext.define('Webcampak.view.pictures.PicturesWindow' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.pictureswindow',
	
	store: 'pictures.ViewPicture',	

	iconCls: 'icon-photos',  	
	title: i18n.gettext('Webcampak Pictures'),
	width: 990,
	height: 650,
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
			html: i18n.gettext('No Source Selected'),
			flex: 1					
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
					xtype: 'dayslist'
				}]
			}, {
				xtype: 'container',
				layout: {type: 'vbox', pack: 'start', align: 'center'},		
				items: [{
					xtype: 'container',					
					html: i18n.gettext('Select a picture below')	
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
			dockedItems: [{				
				itemId: 'centralpaneltoolbar',
				xtype: 'toolbar',
				dock: 'top',
				items: [{
					text: i18n.gettext('Optimize'),
					xtype: 'button',
					itemId: 'timthumbButton',
					action: 'timthumbButton',
					enableToggle: true,
					hidden: true			
				}, '-', {
					xtype: 'container',
					width: 40,
					html: 'Zoom'					
				},  {
					flex: 2,					
					xtype: 'zoompicture'		
				}, '-', {			
					text: i18n.gettext('Comment'),
					xtype: 'button',
					hidden: true,
					iconCls: 'icon-comments',
					itemId: 'openComment',
					action: 'openComment'						
				}, {
					text: i18n.gettext('Email'),
					xtype: 'button',
					hidden: true,
					iconCls: 'icon-email',			
					itemId: 'openEmail',							
					action: 'openEmail'		
				}, {
					text: i18n.gettext('Sensors'),
					xtype: 'button',
					hidden: true,
					iconCls: 'icon-stats',			
					itemId: 'openSensors',							
					action: 'openSensors'	
				}, {
					width: 20,											
					xtype: 'button',
					iconCls: 'icon-download',										
					action: 'downloadPicture'																				
				}, '-', {	
					width: 20,											
					xtype: 'button',
					iconCls: 'icon-previous',										
					action: 'previousPicture'					
				}, {
					width: 20,																
					xtype: 'button',
					iconCls: 'icon-next',					
					action: 'nextPicture'		
				}, {
					width: 20,				
					xtype: 'button',
					iconCls: 'icon-last',										
					action: 'lastPicture'															
				}] 
			}],			
			items: [{
				itemId: 'picturepanel',				
				xtype: 'currentpicture',
				flex: 3.5													
			}, {
				itemId: 'existingcommentbox',
				name: 'existingcommentbox',								
				xtype: 'textarea',
				hideLabel: true,
				hidden: true,
				style: 'margin:0', 
				readOnly: true, 
				//readOnlyCls: 'x-item-disabled',				
				flex: 0.5					
			}, {
				xtype: 'thumbnails'										
			}]					
		}]
	}]
});




 





