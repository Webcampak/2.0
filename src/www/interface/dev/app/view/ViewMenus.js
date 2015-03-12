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
console.log('Log: Load: Webcampak.view.ViewMenus');
Ext.define('Webcampak.view.ViewMenus', {
	extend: 'Ext.Container',
	alias: 'widget.viewmenus',
	layout:'fit',
	items: [{
		xtype: 'container',
		layout: {type: 'hbox', pack: 'start', align: 'stretch'},
		defaults: {frame: true},
		items: [{
			xtype: 'container',
			itemId: 'menuOpenPhotos',
			hidden: true,			
			style: {color: '#FFFFFF'},
 			layout: {type: 'vbox', align: 'center'},
 			width: 80,
	 		defaults: {frame: true},
			items: [{
				xtype: 'button', 
				action: 'openPhotos', 
				cls: 'buttonPhotos'				
			},	{
				xtype: 'container',
				html: i18n.gettext("Pictures")
			}]
	 	}, {
			xtype: 'container',	 
			itemId: 'menuOpenVideos',	
			hidden: true,										
			style: {color: '#FFFFFF'},
 			layout: {type: 'vbox', align: 'center'},
			width: 80,			
	 		defaults: {frame: true},	
			items: [{
				xtype: 'button', 
				action: 'openVideos', 
				cls: 'buttonVideos'				
			},	{
				xtype: 'container',
				html: i18n.gettext("Videos")	
			}]	 		 		
	 	}]
	}]	 	
});
