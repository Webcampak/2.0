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
console.log('Log: Load: Webcampak.view.pictures.HoursList');
Ext.define('Webcampak.view.pictures.HoursList' ,{
	extend: 'Ext.grid.Panel',
	alias : 'widget.hourslist',

	hideHeaders:true,
	//layout: {align: 'center'},
	//style: {color: '#FFFFFF', background:'#ff00ff', padding: '0'},
	cls: 'innercell',
	//store: 'pictures.HoursList',

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
	change: function(value, metaData) {
		if (value == "0") {
			metaData.style = 'background:#989898;';
			return '<span style="color: #989898;">' + value + '</span>';
		} else if (value.substring(0, 1) == "X"){
			//If first character is a "X" it means that this picture has a comment attached
			metaData.style = 'background:#3896af; color:#3896af;'; 	
			value = value.substring(0, 1) + value.substring(1 + 1, value.length)	// We then remove "X"
			value = Ext.String.htmlEncode(value);
			metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value.substring(8, 10) + ':' + value.substring(10, 12)) + '"';
			return value;					
		} else if (value > 0) {
			metaData.style = 'background:#5dc1dc; color:#5dc1dc;'; 
			value = Ext.String.htmlEncode(value);
			metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value.substring(8, 10) + ':' + value.substring(10, 12)) + '"';
			//return '<span style="color: #5dc1dc;">' + value + '</span>';
			return value;		
		}
	},
  
    viewConfig: {
        stripeRows: true
    },
 
	initComponent: function() {
    	
		this.store = 'pictures.HoursList';
	
		//columns: [    	
		this.columns = [ 
		   {width: 12, sortable: false, dataIndex: 'id'}, 
        	{width: 5, sortable: false, dataIndex: '00', renderer: this.change}, 
        	{width: 5, sortable: false, dataIndex: '01', renderer: this.change}, 
        	{width: 5, sortable: false, dataIndex: '02', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '03', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '04', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '05', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '06', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '07', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '08', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '09', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '10', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '11', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '12', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '13', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '14', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '15', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '16', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '17', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '18', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '19', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '20', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '21', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '22', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '23', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '24', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '25', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '26', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '27', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '28', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '29', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '30', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '31', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '32', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '33', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '34', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '35', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '36', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '37', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '38', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '39', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '40', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '41', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '42', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '43', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '44', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '45', renderer: this.change}, 
        	{width: 5, sortable: false, dataIndex: '46', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '47', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '48', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '49', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '50', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '51', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '52', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '53', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '54', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '55', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '56', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '57', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '58', renderer: this.change},  
        	{width: 5, sortable: false, dataIndex: '59', renderer: this.change}
        	        	
    ];
    	
    	this.callParent(arguments);
    }    
});
