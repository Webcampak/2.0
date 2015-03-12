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
console.log('Log: Load: Webcampak.view.log.LogFile');
Ext.define('Webcampak.view.log.LogFile' ,{
	extend: 'Ext.grid.Panel',
	alias : 'widget.loglogfile',

	store: 'log.LogFile',
	scroll: true,
	autoScroll: true,
//	height: 250,
	border: 0,	
	columns: [
		{header: '#', 			dataIndex: 'line',		sortable: false, 	width: 40	},
		{header: '', 	dataIndex: 'content',	sortable: false, 	flex: 3		}
	],
    selType: 'rowmodel'          
});
