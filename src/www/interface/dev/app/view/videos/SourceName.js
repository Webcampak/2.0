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
console.log('Log: Load: Webcampak.view.videos.SourceName');
Ext.define('Webcampak.view.videos.SourceName' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.videossourcename',

	height: 20,
	layout: {type: 'vbox', align: 'center'},
	style: {border:'0'},
	defaults: {frame: false},	
	items: [{
		itemId: 'sourcenametitle',
		//style: {border:'0'},
		cls: 'viewpicturessourcename',
	//	defaults: {frame: false},		
		html: ' '
	}]
});
