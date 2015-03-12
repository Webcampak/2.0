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
console.log('Log: Load: Webcampak.model.dashboard.SystemStats');
Ext.define('Webcampak.model.dashboard.SystemStats', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'Timestamp', 				type: 'int'}, 
		{name: 'BandwidthIn', 			type: 'int'},
		{name: 'BandwidthOut', 			type: 'int'},
		{name: 'BandwidthTotal', 		type: 'int'},				
		{name: 'MemoryUsageTotal', 	type: 'int'},				
		{name: 'MemoryUsageUsed', 		type: 'int'},				
		{name: 'MemoryUsageFree', 		type: 'int'},				
		{name: 'MemoryUsagePercent', 	type: 'int'},				
		{name: 'DiskUsageTotal', 		type: 'int'},				
		{name: 'DiskUsageUsed', 		type: 'int'},				
		{name: 'DiskUsageFree', 		type: 'int'},				
		{name: 'DiskUsagePercent', 	type: 'int'},				
		{name: 'CPUUsagePercent', 		type: 'int'}			
	]    
});

