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
console.log('Log: Load: Webcampak.model.videos.ViewVideo');
Ext.define('Webcampak.model.videos.ViewVideo', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id', 					type: 'int'},
    	{name: 'sourceid', 			type: 'int'},
    	{name: 'sourcename', 		type: 'string'},

    	{name: 'currentfile', 		type: 'string'},
    	{name: 'currentdate', 		type: 'int'},  	
    	
    	{name: 'disableddates', 	type: 'string'},
     	{name: 'mindate', 			type: 'int'},  //Min date to be displayed in calendar
     	{name: 'maxdate', 			type: 'int'},  //Max date to be displayed in calendar     	
    	     	
    	{name: 'previewpicture', 			type: 'string'}, 
    	{name: 'previewpicturewidth', 	type: 'int'}, 
    	{name: 'previewpictureheight',	type: 'int'}, 
    	{name: 'previewvideo', 				type: 'string'}, 
 
    	{name: 'videoname', 				type: 'string'},     	
     	{name: 'videonext', 				type: 'string'}, 	
     	{name: 'videoprevious', 		type: 'string'}

    ]
});


