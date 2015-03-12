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
console.log('Log: Load: WebcampakMobile.store.Sources');
Ext.define('WebcampakMobile.store.Sources', {
	extend: 'Ext.data.Store',

	config: {
		model: 'WebcampakMobile.model.Source',
		autoLoad: true,
		sorters: 'weight',
/*		grouper: {
			groupFn: function(record) {
				//console.log('Log: Store->Sources - groupFn() function - ' + record.get('name'));    	    	    	    	    	    	    	    	    	            	
				return record.get('name')[0];
			}
		},*/
		proxy: {  	
			type: 'rest',
			url: '/interface/app.php/sources',
			extraParams: {currentdate: '0', sourceid: '0'},			
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		}      
    }
});
