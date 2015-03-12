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
console.log('Log: Load: Webcampak.model.configuration.Advanced');
Ext.define('Webcampak.model.configuration.Advanced', {
	extend: 'Ext.data.Model',
	fields: [
		// Failure configuration
		{name: 'cfgemailalertfailure', 		type: 'int'},
		{name: 'cfgemailalertreminder', 		type: 'int'},
		{name: 'cfgphidgeterroractivate', 	type: 'string'},
		{name: 'cfgphidgetfailure', 			type: 'int'},

		// Phidget configuration (Capture)
		{name: 'cfgphidgetcameraport', 	type: 'string'},

		// Phidget configuration (Display)
		{name: 'cfgphidgetsensorsgraph', 	type: 'string'},

		// Email configuration
		{name: 'cfgemailsendto', 				type: 'string'},
		{name: 'cfgemailsendcc', 				type: 'string'},
		{name: 'cfgemailreplyto', 				type: 'string'},
		{name: 'cfgemailalwaysnotify', 		type: 'string'},		
		
		// FTP configuration
		{name: 'cfglocalftppass', 				type: 'string'},
		{name: 'cfgftpphidgetserverid', 		type: 'string'},
		{name: 'cfgftpphidgetserverretry', 	type: 'string'}	    	
	]
});
 


