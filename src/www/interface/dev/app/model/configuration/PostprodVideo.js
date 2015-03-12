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
console.log('Log: Load: Webcampak.model.configuration.PostprodVideo');
Ext.define('Webcampak.model.configuration.PostprodVideo', {
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
		{name: 'cfgcustomendtimestamp', 			type: 'int', defaultValue: 0},		
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
		{name: 'cfgmovefilestosource', 			type: 'int'},
		{name: 'cfgemailpostactivate', 			type: 'string'},		

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


		{name: 'cfgcropactivate', 				type: 'string'},
		{name: 'cfgcropsizewidth', 			type: 'int'},
		{name: 'cfgcropsizeheight', 			type: 'int'},
		{name: 'cfgcropxpos', 					type: 'int'},
		{name: 'cfgcropypos', 					type: 'int'},
		{name: 'cfgvideosizeactivate', 		type: 'string'},
		{name: 'cfgvideosizewidth', 			type: 'int'},
		{name: 'cfgvideosizeheight', 			type: 'int'},

		{name: 'cfgrotateactivate', 			type: 'string'},
		{name: 'cfgrotateangle', 				type: 'float'},

		{name: 'cfgtransitionactivate', 				type: 'string'},
		{name: 'cfgtransitioncropsizewidth', 				type: 'int'},
		{name: 'cfgtransitioncropsizeheight', 				type: 'int'},
		{name: 'cfgtransitioncropxpos', 				type: 'int'},
		{name: 'cfgtransitioncropypos', 				type: 'int'},

		{name: 'cfgthumbnailactivate', 				type: 'string'},
		{name: 'cfgthumbnailsrccropsizewidth', 	type: 'int'},
		{name: 'cfgthumbnailsrccropsizeheight', 	type: 'int'},
		{name: 'cfgthumbnailsrccropxpos', 			type: 'int'},
		{name: 'cfgthumbnailsrccropypos', 			type: 'int'},
		{name: 'cfgthumbnaildstsizewidth', 			type: 'int'},
		{name: 'cfgthumbnaildstsizeheight', 		type: 'int'},
		{name: 'cfgthumbnaildstxpos', 				type: 'int'},
		{name: 'cfgthumbnaildstypos', 				type: 'int'},
		{name: 'cfgthumbnailborder', 					type: 'string'},

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
		{name: 'cfgvideoeffect', 							type: 'string'}
    	   	    	
	]
});
 


