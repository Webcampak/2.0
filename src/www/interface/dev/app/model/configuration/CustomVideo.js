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
console.log('Log: Load: Webcampak.model.configuration.CustomVideo');
Ext.define('Webcampak.model.configuration.CustomVideo', {
	extend: 'Ext.data.Model',
	fields: [

		// Settings for youtube	
		{name: 'cfgvideoyoutubeupload', 				type: 'string'},
		{name: 'cfgvideoyoutubecategory', 			type: 'string'},

		// Settings for audio file
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
		{name: 'cfgcustomactive', 					type: 'string'},

		{name: 'cfgvidminintervalvalue', 		type: 'int'},
		{name: 'cfgvidmininterval', 				type: 'string'},

		// Settings for watermark
		{name: 'cfgwatermarkactivate', 				type: 'string'},
		{name: 'cfgwatermarkfile', 					type: 'string'},
		{name: 'cfgwatermarkdissolve', 				type: 'int'},
		{name: 'cfgwatermarkpositionx', 				type: 'int'},
		{name: 'cfgwatermarkpositiony', 				type: 'int'},

		// Settings for video filter
		{name: 'cfgfilteractivate', 				type: 'string'},
		{name: 'cfgfilterwatermarkfile', 		type: 'string'},
		{name: 'cfgfiltervalue', 					type: 'string'},

		// Settings for Image Magick and modifications
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
		{name: 'cfgvideopreresize', 						type: 'string'},
		{name: 'cfgvideopreresizeres', 					type: 'string'},
		{name: 'cfgvideoeffect', 							type: 'string'},

		// Settings for Phidget configuration
		{name: 'cfgphidgetsensornb', 				type: 'string'},

		// Settings for FTP configuration
		{name: 'cfgftpmainserveraviid', 				type: 'string'},
		{name: 'cfgftpmainserveraviretry', 			type: 'string'},
		{name: 'cfgftpmainservermp4id', 				type: 'string'},
		{name: 'cfgftpmainservermp4retry', 			type: 'string'},
		{name: 'cfgftphotlinkserveraviid', 			type: 'string'},
		{name: 'cfgftphotlinkserveraviretry', 		type: 'string'},
		{name: 'cfgftphotlinkservermp4id', 			type: 'string'},
		{name: 'cfgftphotlinkservermp4retry', 		type: 'string'},

		// Settings for 1080p video format
		{name: 'cfgvideocodecH2641080pcreate', 		type: 'string'},
		{name: 'cfgvideocodecH2641080pcreateflv', 	type: 'string'},
		{name: 'cfgvideocodecH2641080pfps', 			type: 'int'},
		{name: 'cfgvideocodecH2641080pwidth', 			type: 'int'},
		{name: 'cfgvideocodecH2641080pheight', 		type: 'string'},
		{name: 'cfgvideocodecH2641080pbitrate', 		type: 'int'},
		{name: 'cfgvideocodecH2641080pcropwidth', 	type: 'int'},
		{name: 'cfgvideocodecH2641080pcropheight', 	type: 'int'},
		{name: 'cfgvideocodecH2641080pcropx', 			type: 'int'},
		{name: 'cfgvideocodecH2641080pcropy', 			type: 'int'},
		{name: 'cfgvideocodecH2641080pcrop', 			type: 'int'},
		{name: 'cfgvideocodecH2641080p2pass', 			type: 'string'},
		{name: 'cfgvideocodecH2641080pminsize', 		type: 'int'},

		// Settings for 720p video format
		{name: 'cfgvideocodecH264720pcreate', 			type: 'string'},
		{name: 'cfgvideocodecH264720pcreateflv', 		type: 'string'},
		{name: 'cfgvideocodecH264720pfps', 				type: 'int'},
		{name: 'cfgvideocodecH264720pwidth', 			type: 'int'},
		{name: 'cfgvideocodecH264720pheight', 			type: 'string'},
		{name: 'cfgvideocodecH264720pbitrate', 		type: 'int'},
		{name: 'cfgvideocodecH264720pcropwidth', 		type: 'int'},
		{name: 'cfgvideocodecH264720pcropheight', 	type: 'int'},
		{name: 'cfgvideocodecH264720pcropx', 			type: 'int'},
		{name: 'cfgvideocodecH264720pcropy', 			type: 'int'},
		{name: 'cfgvideocodecH264720pcrop', 			type: 'int'},
		{name: 'cfgvideocodecH264720p2pass', 			type: 'string'},
		{name: 'cfgvideocodecH264720pminsize', 		type: 'int'},

		// Settings for 480p video format
		{name: 'cfgvideocodecH264480pcreate', 			type: 'string'},
		{name: 'cfgvideocodecH264480pcreateflv', 		type: 'string'},
		{name: 'cfgvideocodecH264480pfps', 				type: 'int'},
		{name: 'cfgvideocodecH264480pwidth', 			type: 'int'},
		{name: 'cfgvideocodecH264480pheight', 			type: 'string'},
		{name: 'cfgvideocodecH264480pbitrate', 		type: 'int'},
		{name: 'cfgvideocodecH264480pcropwidth', 		type: 'int'},
		{name: 'cfgvideocodecH264480pcropheight', 	type: 'int'},
		{name: 'cfgvideocodecH264480pcropx', 			type: 'int'},
		{name: 'cfgvideocodecH264480pcropy', 			type: 'int'},
		{name: 'cfgvideocodecH264480pcrop', 			type: 'int'},
		{name: 'cfgvideocodecH264480p2pass', 			type: 'string'},
		{name: 'cfgvideocodecH264480pminsize', 		type: 'int'},

		// Settings for custom video format
		{name: 'cfgvideocodecH264customcreate', 			type: 'string'},
		{name: 'cfgvideocodecH264customcreateflv', 		type: 'string'},
		{name: 'cfgvideocodecH264customfps', 				type: 'int'},
		{name: 'cfgvideocodecH264customwidth', 			type: 'int'},
		{name: 'cfgvideocodecH264customheight', 			type: 'string'},
		{name: 'cfgvideocodecH264custombitrate', 			type: 'int'},
		{name: 'cfgvideocodecH264customcropwidth', 		type: 'int'},
		{name: 'cfgvideocodecH264customcropheight', 		type: 'int'},
		{name: 'cfgvideocodecH264customcropx', 			type: 'int'},
		{name: 'cfgvideocodecH264customcropy', 			type: 'int'},
		{name: 'cfgvideocodecH264customcrop', 				type: 'int'},
		{name: 'cfgvideocodecH264custom2pass', 			type: 'string'},
		{name: 'cfgvideocodecH264customminsize', 			type: 'int'}
    	   	    	
	]
});
 


