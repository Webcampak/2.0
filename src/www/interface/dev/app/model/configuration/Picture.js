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
console.log('Log: Load: Webcampak.model.configuration.Picture');
Ext.define('Webcampak.model.configuration.Picture', {
	extend: 'Ext.data.Model',
	fields: [
		// FTP configuration
		{name: 'cfgftpmainserverid', 			type: 'string'},
		{name: 'cfgftpmainserverraw', 		type: 'string'},		
		{name: 'cfgftpmainserverretry', 		type: 'string'},
		{name: 'cfgftpsecondserverid', 		type: 'string'},
		{name: 'cfgftpsecondserverraw', 		type: 'string'},		
		{name: 'cfgftpsecondserverretry', 	type: 'string'},
		{name: 'cfgftphotlinkserverid', 		type: 'string'},
		{name: 'cfgftphotlinkserverretry', 	type: 'string'},

		// Copy configuration
		{name: 'cfgcopymainenable', 			type: 'string'},
		{name: 'cfgcopymainsourceid', 		type: 'int'},
		{name: 'cfgcopymainsourceraw', 		type: 'string'},		
		{name: 'cfgcopysecondenable', 		type: 'string'},
		{name: 'cfgcopysecondsourceid', 		type: 'int'},
		{name: 'cfgcopysecondsourceraw', 	type: 'string'},

		// Pictures management
		{name: 'cfgdeletelocalpictures', 		type: 'string'},
		{name: 'cfgsavepictures', 					type: 'string'},
		{name: 'cfgcaptureminisize', 				type: 'int'},
		{name: 'cfgcapturedeleteafterdays', 	type: 'int'},
		{name: 'cfgcapturemaxdirsize', 			type: 'int'},
		
		// Pictures manipulations
		{name: 'cfgcropactivate', 					type: 'string'},
		{name: 'cfgcropsizewidth', 				type: 'int'},
		{name: 'cfgcropsizeheight', 				type: 'int'},
		{name: 'cfgcropxpos', 						type: 'int'},
		{name: 'cfgcropypos', 						type: 'int'},

		{name: 'cfgrotateactivate', 			type: 'string'},
		{name: 'cfgrotateangle', 				type: 'float'},

		{name: 'cfgimagemagicktxt', 			type: 'string'},
		{name: 'cfgimgtext', 					type: 'string'},	
		{name: 'cfgimgdateformat', 			type: 'string'},
		{name: 'cfgimgtextsize', 				type: 'int'},
		{name: 'cfgimgtextgravity', 			type: 'string'},
		{name: 'cfgimgtextfont', 				type: 'string'},
		{name: 'cfgimgtextbasecolor', 		type: 'string'},
		{name: 'cfgimgtextbaseposition', 	type: 'string'}, 
		{name: 'cfgimgtextovercolor', 		type: 'string'},
		{name: 'cfgimgtextoverposition', 	type: 'string'},
		{name: 'cfghotlinksize1', 				type: 'string'},
		{name: 'cfghotlinksize2', 				type: 'string'},
		{name: 'cfghotlinksize3', 				type: 'string'},
		{name: 'cfghotlinksize4', 				type: 'string'},
		{name: 'cfghotlinkerrorcreate', 		type: 'string'},


		{name: 'cfgarchivesize', 				type: 'string'},
		{name: 'cfgpicwatermarkactivate', 	type: 'string'},
		{name: 'cfgpicwatermarkfile', 		type: 'string'},
		{name: 'cfgpicwatermarkdissolve', 	type: 'int'},
		{name: 'cfgpicwatermarkpositionx', 	type: 'int'},
		{name: 'cfgpicwatermarkpositiony', 	type: 'int'} 	    	   	    	
	]
});
 


