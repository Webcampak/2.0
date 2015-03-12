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
console.log('Log: Load: Webcampak.view.Viewport');
Ext.define('Webcampak.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    requires: [
        'Webcampak.view.ConfigMenus',
        'Webcampak.view.ViewMenus',
        'Webcampak.view.TopToolbar'        
    ],
	items:[{
		xtype: 'container',			
		width: '100%',
		height: '100%',			
		layout:'column',
		cls: 'myBackground',			
		padding: '0 0 0 0',
		layout: {
			type: 'vbox',
			align : 'stretch',
			pack  : 'start'
		},
		items: [{
			xtype: 'toptoolbar'
		}, {	
			xtype: 'container',	
			layout: {
				type: 'hbox',
				align : 'stretch',
				pack  : 'start'
			},		
			items: [{
				width: 400,
				baseCls:'x-plain',
				bodyStyle:'padding:5px 0 5px 5px',
				items:[{
					xtype: 'viewmenus'
				}]
			},{
				flex: 1,
				baseCls:'x-plain',
				bodyStyle:'padding:5px 0 5px 5px'		
			},{
				width: 400,
				baseCls:'x-plain',
				bodyStyle:'padding:5px 0 5px 5px',
				items:[{
					xtype: 'configmenus'					
				}]	
			}]
		}]	
	}]
});