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
console.log('Log: Load: Webcampak.view.videos.VideosList');
Ext.define('Webcampak.view.videos.VideosList' ,{
	extend: 'Ext.grid.Panel',
	alias : 'widget.videoslist',

	autoScroll: true,
	height: 250,


	/**
	* Convert number of bytes into human readable format
	*
	* @param integer bytes     Number of bytes to convert
	* @param integer precision Number of digits after the decimal separator
	* @return string
	*/
	filesize: function(value, metaData) {
		if (value > 0) {
			var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
			var posttxt = 0;
			if (value == 0) return 'n/a';
			while( value >= 1024 ) {
				posttxt++;
				value = value / 1024;
			}
			return parseInt(value).toFixed(0) + " " + sizes[posttxt];
		} else {
			return value;
		}
	},


    /**
     * Custom function used for display a downloadable link
     * @param {Object} val
     */
	download: function(value, metaData) {
		if (value != "") {
			return '<a href="' + value + '" target="_blank"><img src="/interface/images/download16x16.png" /></a>';			
		}
	},
  
	initComponent: function() {    	
		this.store = 'videos.VideosList';
		//columns: [    	
		this.columns = [ 
        	//{width: 5, sortable: false, dataIndex: '01', renderer: this.change}, 
			{header: i18n.gettext('Name'), 		dataIndex: 'name',			sortable: true, flex: 1 										},
			{header: i18n.gettext('Format'), 	dataIndex: 'format',			sortable: true, width: 50										},
			{header: i18n.gettext('Size'), 		dataIndex: 'size',			sortable: true, width: 60, renderer: this.filesize		},
			{header: i18n.gettext('AVI'), 		dataIndex: 'download',		sortable: true, width: 30, renderer: this.download		},
			{header: i18n.gettext('MP4'), 		dataIndex: 'mp4',				sortable: true, width: 30, renderer: this.download		}	
    ];
    	this.callParent(arguments);
    } 
});

