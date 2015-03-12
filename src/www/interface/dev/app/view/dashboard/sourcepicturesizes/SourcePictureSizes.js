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
console.log('Log: Load: Webcampak.view.dashboard.sourcepicturesizes.SourcePictureSizes');
Ext.define('Webcampak.view.dashboard.sourcepicturesizes.SourcePictureSizes' ,{
	extend: 'Ext.chart.Chart', 
	alias: 'widget.sourcepicturesizes',

	store: 'dashboard.SourcePictureSizes',

	animate: true,
	shadow: true,

	axes: [{
		title: i18n.gettext('Size (MB)'),
		type: 'Numeric',
		position: 'left',
		minimum: 0,
		grid: {
			odd: {
				opacity: 1,
				fill: '#ddd',
				stroke: '#bbb',
				'stroke-width': 0.5
			}
		},
		label: {font: '10px Arial'}			
	}, {
		type: 'Time',
		title: i18n.gettext('Source Name'),				
		position: 'bottom',
		fields: ['date'],
		dateFormat: 'd M',
		label: {font: '10px Arial'},
		grid: true
	}],
	series: [{
		type: 'line',
		xField: 'date',
		yField: 'graphdata',
		smooth: true,		
		highlight: {
			size: 7,
			radius: 7
		},		
		tips: {
			trackMouse: true,
			width: 250,
			height: 25,
			renderer: function(storeItem, item) {
				this.setTitle(storeItem.get('graphdata') + ' ' + i18n.gettext('MB of pictures in') + ' ' + Ext.util.Format.dateRenderer('d M Y')(new Date(storeItem.get('date') + 43200000))); // We add 12 hours in miliseconds to be in the middle of the day
			}
		}
	}]
});

  
