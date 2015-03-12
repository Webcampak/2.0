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
console.log('Log: Load: Webcampak.model.connecteddevices.ConnectedDevices');
Ext.define('Webcampak.model.connecteddevices.ConnectedDevices', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'gphotolist', type: 'string'},	
		{name: 'gphotocapabilities', 	type: 'string'},
		{name: 'lsusb', 	type: 'string'},
		{name: 'videostd0', 	type: 'string'},
		{name: 'videostd1', 	type: 'string'},
		{name: 'videostd2', 	type: 'string'},
		{name: 'videostd3', 	type: 'string'},
		{name: 'videostd4', 	type: 'string'},
		{name: 'videostd5', 	type: 'string'},
		{name: 'videostd6', 	type: 'string'},
		{name: 'videostd7', 	type: 'string'},
		{name: 'videostd8', 	type: 'string'},
		{name: 'videostd9', 	type: 'string'},
		{name: 'videoadv0', 	type: 'string'},		
		{name: 'videoadv1', 	type: 'string'},		
		{name: 'videoadv2', 	type: 'string'},		
		{name: 'videoadv3', 	type: 'string'},		
		{name: 'videoadv4', 	type: 'string'},		
		{name: 'videoadv5', 	type: 'string'},		
		{name: 'videoadv6', 	type: 'string'},		
		{name: 'videoadv7', 	type: 'string'},		
		{name: 'videoadv8', 	type: 'string'},	
		{name: 'videoadv9', 	type: 'string'}	
	]
});


