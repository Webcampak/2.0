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
console.log('Log: Load: Webcampak.model.pictures.ViewPicture');
Ext.define('Webcampak.model.pictures.ViewPicture', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id', 					type: 'int'},
    	{name: 'sourceid', 			type: 'int'},
    	{name: 'sourcename', 		type: 'string'},

		{name: 'reqpicturetime', 	type: 'int'},
		{name: 'reqsourceid', 		type: 'int'},   	
    	{name: 'reqzoomlevel', 		type: 'int'},
    			
    	{name: 'zoomlevel', 			type: 'int'},
    	{name: 'timthumb', 			type: 'int'},    	

    	{name: 'currentdate', 		type: 'int'},
    	{name: 'disableddates', 	type: 'string'},
     	{name: 'mindate', 			type: 'int'},  //Min date to be displayed in calendar
     	{name: 'maxdate', 			type: 'int'},  //Max date to be displayed in calendar     	
    	     	
    	{name: 'picture', 			type: 'string'},
    	{name: 'pictureurl', 		type: 'string'},     	 
    	{name: 'picturecomment', 	type: 'string'},     	
    	{name: 'picturewidth', 		type: 'int'}, 
    	{name: 'pictureheight',		type: 'int'}, 
     	{name: 'picturetime', 		type: 'int'},
     	{name: 'picturenext', 		type: 'int'}, 	
     	{name: 'pictureprevious', 	type: 'int'},
     	{name: 'picturelast', 		type: 'int'},     	
     	 	     	     	
    	{name: 'thumb1', 				type: 'string'}, 
    	{name: 'thumb1time', 		type: 'int'}, 
   	{name: 'thumb2', 				type: 'string'}, 
    	{name: 'thumb2time', 		type: 'int'}, 
   	{name: 'thumb3', 				type: 'string'}, 
    	{name: 'thumb3time', 		type: 'int'}, 
   	{name: 'thumb4', 				type: 'string'}, 
    	{name: 'thumb4time', 		type: 'int'}, 
   	{name: 'thumb5', 				type: 'string'}, 
    	{name: 'thumb5time', 		type: 'int'}, 
   	{name: 'thumb6', 				type: 'string'}, 
    	{name: 'thumb6time', 		type: 'int'}  	
    ]
});


