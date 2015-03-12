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
console.log('Log: Load: Webcampak.model.cloudconfiguration.CustomVideo');
Ext.define('Webcampak.model.cloudconfiguration.CustomVideo', {
	extend: 'Ext.data.Model',
	fields: [

		// Custom video creation settings
		{name: 'cfgvideocodecH2641080pcreate', 		type: 'string'},
		{name: 'cfgvideocodecH2641080pcreateflv', 	type: 'string'},
		{name: 'cfgvideocodecH2641080pfps', 			type: 'int'},		
		{name: 'cfgvideocodecH264720pcreate', 			type: 'string'},
		{name: 'cfgvideocodecH264720pcreateflv', 		type: 'string'},
		{name: 'cfgvideocodecH264720pfps', 				type: 'int'},
		{name: 'cfgvideocodecH264480pcreate', 			type: 'string'},
		{name: 'cfgvideocodecH264480pcreateflv', 		type: 'string'},
		{name: 'cfgvideocodecH264480pfps', 				type: 'int'},

		// Advanced video settings for 1080p, 720p, 480p   
		{name: 'cfgvideocodecH2641080pwidth', 			type: 'int'},
		{name: 'cfgvideocodecH2641080pheight', 		type: 'string'},
		{name: 'cfgvideocodecH2641080pbitrate', 		type: 'int'},
		{name: 'cfgvideocodecH2641080pcropwidth', 	type: 'int'},
		{name: 'cfgvideocodecH2641080pcropheight', 	type: 'int'},
		{name: 'cfgvideocodecH2641080pcropx', 			type: 'int'},
		{name: 'cfgvideocodecH2641080pcropy', 			type: 'int'},
		{name: 'cfgvideocodecH264720pwidth', 			type: 'int'},
		{name: 'cfgvideocodecH264720pheight', 			type: 'string'},
		{name: 'cfgvideocodecH264720pbitrate', 		type: 'int'},
		{name: 'cfgvideocodecH264720pcropwidth', 		type: 'int'},
		{name: 'cfgvideocodecH264720pcropheight', 	type: 'int'},
		{name: 'cfgvideocodecH264720pcropx', 			type: 'int'},
		{name: 'cfgvideocodecH264720pcropy', 			type: 'int'},
		{name: 'cfgvideocodecH264480pwidth', 			type: 'int'},
		{name: 'cfgvideocodecH264480pheight', 			type: 'string'},
		{name: 'cfgvideocodecH264480pbitrate', 		type: 'int'},
		{name: 'cfgvideocodecH264480pcropwidth', 		type: 'int'},
		{name: 'cfgvideocodecH264480pcropheight', 	type: 'int'},
		{name: 'cfgvideocodecH264480pcropx', 			type: 'int'},
		{name: 'cfgvideocodecH264480pcropy', 			type: 'int'},
		
		// Watermark settings
		{name: 'cfgwatermarkactivate', 				type: 'string'},
		{name: 'cfgwatermarkfile', 					type: 'string'},
		{name: 'cfgwatermarkdissolve', 				type: 'int'},
		{name: 'cfgwatermarkpositionx', 				type: 'int'},
		{name: 'cfgwatermarkpositiony', 				type: 'int'},		
		
		// Text settings
		{name: 'cfgvideopreimagemagicktxt', 			type: 'string'},
		{name: 'cfgvideopreimgtext', 						type: 'string'},
		{name: 'cfgvideopreimgdateformat', 				type: 'string'},
		{name: 'cfgvideopreimgtextsize', 				type: 'int'},
		{name: 'cfgvideopreimgtextgravity', 			type: 'string'},
		{name: 'cfgvideopreimgtextfont', 				type: 'string'},
		{name: 'cfgvideopreimgtextbasecolor', 			type: 'string'},
		{name: 'cfgvideopreimgtextbaseposition', 		type: 'string'},
		{name: 'cfgvideopreimgtextovercolor', 			type: 'string'},
		{name: 'cfgvideopreimgtextoverposition', 		type: 'string'},		
		
		// Soundtrack settings
		{name: 'cfgvideoaddaudio', 				type: 'string'},
		{name: 'cfgvideoaudiofile', 				type: 'string'},

		// Settings regarding custom video creation
		{name: 'cfgcustomvidname', 				type: 'string'},
		{name: 'cfgcustomstarttimestamp', 		type: 'int', defaultValue: 0},		
		{name: 'cfgcustomstartday', 				type: 'string'},
		{name: 'cfgcustomstartmonth', 			type: 'string'},
		{name: 'cfgcustomstartyear', 				type: 'int'},
		{name: 'cfgcustomstarthour', 				type: 'string'},
		{name: 'cfgcustomstartminute', 			type: 'string'},
		{name: 'cfgcustomendtimestamp', 		type: 'int', defaultValue: 0}, 		
		{name: 'cfgcustomendday', 					type: 'string'},
		{name: 'cfgcustomendmonth', 				type: 'string'},
		{name: 'cfgcustomendyear', 				type: 'int'},
		{name: 'cfgcustomendhour', 				type: 'string'},
		{name: 'cfgcustomendminute', 				type: 'string'},
		{name: 'cfgcustomkeepstarthour', 		type: 'string'},
		{name: 'cfgcustomkeepstartminute', 		type: 'string'},
		{name: 'cfgcustomkeependhour', 			type: 'string'},
		{name: 'cfgcustomkeependminute', 		type: 'string'},
		{name: 'cfgvidminintervalvalue', 		type: 'int'},
		{name: 'cfgvidmininterval', 				type: 'string'},
		{name: 'cfgcustomactive', 					type: 'string'},
		{name: 'cfgvideoemailactivate', 			type: 'string'}
		 	   	    	
	]
});
 


