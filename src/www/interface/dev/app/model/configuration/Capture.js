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
console.log('Log: Load: Webcampak.model.configuration.Capture');
Ext.define('Webcampak.model.configuration.Capture', {
	extend: 'Ext.data.Model',	
	
	fields: [
		// Source configuration
		{name: 'cfgsourceactive', 				type: 'string'},
		{name: 'cfgsourcetype', 				type: 'string'},
		{name: 'cfgsourcedebug', 				type: 'string'},
		{name: 'cfgdebugprolong', 				type: 'string'},
		{name: 'cfgnocapture', 					type: 'string'},
		{name: 'cfgminimumcapturevalue', 	type: 'int'},
		{name: 'cfgminimumcaptureinterval', type: 'string'},
		{name: 'cfgcapturedelay', 				type: 'int'},
		{name: 'cfgcapturedelaydate', 		type: 'string'},
		{name: 'cfgcapturedelayinterval', 	type: 'string'},
		{name: 'cfgcapturetimezone', 			type: 'string'},
		{name: 'cfgsourcelanguage', 			type: 'string'},		
		
		{name: 'cfgemailerroractivate', 		type: 'string'},

		// Cron jobs configuration
		{name: 'cfgcroncapturevalue', 		type: 'int'},
		{name: 'cfgcroncaptureinterval', 	type: 'string'},
		{name: 'cfgcroncalendar', 				type: 'string'},
		
		{name: 'cfgcapturedayenable1', 		type: 'string'},
		{name: 'cfgcapturestarthour1', 		type: 'int'},
		{name: 'cfgcapturestartminute1', 	type: 'int'},
		{name: 'cfgcapturesendhour1', 		type: 'int'},
		{name: 'cfgcapturesendminute1', 		type: 'int'},

		{name: 'cfgcapturedayenable2', 		type: 'string'},
		{name: 'cfgcapturestarthour2', 		type: 'int'},
		{name: 'cfgcapturestartminute2', 	type: 'int'},
		{name: 'cfgcapturesendhour2', 		type: 'int'},
		{name: 'cfgcapturesendminute2', 		type: 'int'},

		{name: 'cfgcapturedayenable3', 		type: 'string'},
		{name: 'cfgcapturestarthour3', 		type: 'int'},
		{name: 'cfgcapturestartminute3', 	type: 'int'},
		{name: 'cfgcapturesendhour3', 		type: 'int'},
		{name: 'cfgcapturesendminute3', 		type: 'int'},

		{name: 'cfgcapturedayenable4', 		type: 'string'},
		{name: 'cfgcapturestarthour4', 		type: 'int'},
		{name: 'cfgcapturestartminute4', 	type: 'int'},
		{name: 'cfgcapturesendhour4', 		type: 'int'},
		{name: 'cfgcapturesendminute4', 		type: 'int'},

		{name: 'cfgcapturedayenable5', 		type: 'string'},
		{name: 'cfgcapturestarthour5', 		type: 'int'},
		{name: 'cfgcapturestartminute5', 	type: 'int'},
		{name: 'cfgcapturesendhour5', 		type: 'int'},
		{name: 'cfgcapturesendminute5', 		type: 'int'},

		{name: 'cfgcapturedayenable6', 		type: 'string'},
		{name: 'cfgcapturestarthour6', 		type: 'int'},
		{name: 'cfgcapturestartminute6', 	type: 'int'},
		{name: 'cfgcapturesendhour6', 		type: 'int'},
		{name: 'cfgcapturesendminute6', 		type: 'int'},

		{name: 'cfgcapturedayenable7', 		type: 'string'},
		{name: 'cfgcapturestarthour7', 		type: 'int'},
		{name: 'cfgcapturestartminute7', 	type: 'int'},
		{name: 'cfgcapturesendhour7', 		type: 'int'},
		{name: 'cfgcapturesendminute7', 		type: 'int'},

		// Gphoto2 source configuration
		{name: 'cfgsourcegphotocameramodel', 			type: 'string'},
		{name: 'cfgsourcegphotocameraportdetail', 	type: 'string'},
		{name: 'cfgsourcegphotocalibration', 			type: 'string'},
		{name: 'cfgsourcegphotoowner', 					type: 'string'},
		{name: 'cfgsourcegphotoraw', 						type: 'string'},

		// Wpak source configuration
		{name: 'cfgsourcewpaktype', 				type: 'string'},
		{name: 'cfgsourcewpakprocessraw', 		type: 'string'},
		{name: 'cfgsourcewpakgetsourceid', 		type: 'int'},

		// Webcam source configuration
		{name: 'cfgsourcewebcamsize', 			type: 'string'},
		{name: 'cfgsourcewebcamcamid', 			type: 'string'},
		{name: 'cfgsourcewebcambright', 			type: 'int'},
		{name: 'cfgsourcewebcamcontrast', 		type: 'int'},
		{name: 'cfgsourcewebcamsaturation', 	type: 'int'},
		{name: 'cfgsourcewebcamgain', 			type: 'int'},

		// IPCAM source configuration
		{name: 'cfgsourcecamiptemplate', 			type: 'string'},
		{name: 'cfgsourcecamiplimiterotation', 	type: 'string'},
		{name: 'cfgsourcecamiphotlinkerror', 		type: 'string'},

		// Webfile source configuration
		{name: 'cfgsourcewebfileurl', 	type: 'string'}
	    	   	    	
	]
});
 


