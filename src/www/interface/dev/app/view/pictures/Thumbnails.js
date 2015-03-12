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
console.log('Log: Load: Webcampak.view.pictures.Thumbnails');
Ext.define('Webcampak.view.pictures.Thumbnails' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.thumbnails',
	style: 'text-align: center',

	emitNavAction  : function(thumb) {
		console.log('Webcampak.view.pictures.Thumbnails - Click Event: Thumbnail: ' + thumb);
		return this.fireEvent('navaction', this, thumb);
	},
	
	flex: 1,
	layout: {type: 'hbox', pack: 'start', align: 'stretch'},
	defaults: {frame: true},	

	initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
			items: [{
				xtype: 'container',
				flex: 1,
				layout: {type: 'vbox', align: 'stretch'},
			 	defaults: {frame: true},
				itemId: 'thumb1',	 	
				items: [{
					xtype: 'container',
					style: 'text-align: center;',	
					itemId: 'date',
					html: i18n.gettext('12:10')		
				},{
					xtype: 'image',
					itemId: 'picture',
					id: 'thumbnail1',
					mode: '', 
					styleHtmlContent: true,
					width: '100%',
					listeners: {
						el: {
							click: function() {
									me.emitNavAction('1');
							}
						}
					}										
				}]
			}, {
				xtype: 'container',
				flex: 1,
				layout: {type: 'vbox', align: 'stretch'},
	 			defaults: {frame: true},
				itemId: 'thumb2',
				items: [{
					xtype: 'container',
					style: 'text-align: center;',			
					itemId: 'date',
					html: i18n.gettext('12:20')			
				},{
					xtype: 'image',
					itemId: 'picture',
					mode: '', 
					styleHtmlContent: true,
					width: '100%',
					listeners: {
						el: {
							click: function() {
									me.emitNavAction('2');
							}
						}
					}						
				}]
			},	{
				xtype: 'container',
				flex: 1,
				layout: {type: 'vbox', align: 'stretch'},
			 	defaults: {frame: true},
				itemId: 'thumb3',
				items: [{
					xtype: 'container',
					style: 'text-align: center;',			
					itemId: 'date',
					html: i18n.gettext('12:30')			
				},{
					xtype: 'image',
					itemId: 'picture',
					mode: '', 
					styleHtmlContent: true,
					width: '100%',
					listeners: {
						el: {
							click: function() {
									me.emitNavAction('3');
							}
						}
					}						
				}]
			},	{
				xtype: 'container',
				flex: 1,
				layout: {type: 'vbox', align: 'stretch'},
	 			defaults: {frame: true},
				itemId: 'thumb4',
				items: [{
					xtype: 'container',
					style: 'text-align: center;',			
					itemId: 'date',
					html: i18n.gettext('12:40')			
				},{
					xtype: 'image',
					itemId: 'picture',
					mode: '', 
					styleHtmlContent: true,
					width: '100%',
					listeners: {
						el: {
							click: function() {
									me.emitNavAction('4');
							}
						}
					}						
				}]				
			},	{
				xtype: 'container',
				flex: 1,
				layout: {type: 'vbox', align: 'stretch'},
			 	defaults: {frame: true},
				itemId: 'thumb5',
				items: [{
					xtype: 'container',
					style: 'text-align: center;',			
					itemId: 'date',
					html: i18n.gettext('12:50')			
				},{
					xtype: 'image',
					itemId: 'picture',
					mode: '', 
					styleHtmlContent: true,
					width: '100%',
					listeners: {
						el: {
							click: function() {
									me.emitNavAction('5');
							}
						}
					}						
				}]			
			},	{
				xtype: 'container',
				flex: 1,
				layout: {type: 'vbox', align: 'stretch'},
			 	defaults: {frame: true},
				itemId: 'thumb6',
				items: [{
					xtype: 'container',
					style: 'text-align: center;',			
					itemId: 'date',
					html: i18n.gettext('13:00')			
				},{
					xtype: 'image',
					itemId: 'picture',
					mode: '', 
					styleHtmlContent: true,
					width: '100%',
					listeners: {
						el: {
							click: function() {
									me.emitNavAction('6');
							}
						}
					}						
				}]			
			}]             
        });
		me.callParent(arguments);
	}
});
/*
	items: [{
		xtype: 'container',
		flex: 1,
		layout: {type: 'vbox', align: 'stretch'},
	 	defaults: {frame: true},
		itemId: 'thumb1',	 	
		items: [{
			xtype: 'container',
			style: 'text-align: center;',	
			itemId: 'date',
			html: i18n.gettext('12:10')		
		},{
			xtype: 'image',
			itemId: 'picture',
			id: 'thumbnail1',
			mode: '', 
			styleHtmlContent: true,
			width: '100%',
			listeners: {
             click : {    //intercept qualified links
                 fn          : this.emitNavAction,
                 element : 'el',                   //indicates wait till after 
                 scope     : this
				}
			}							
		}]
	}, {
		xtype: 'container',
		flex: 1,
		layout: {type: 'vbox', align: 'stretch'},
	 	defaults: {frame: true},
		itemId: 'thumb2',
		items: [{
			xtype: 'container',
			style: 'text-align: center;',		
			itemId: 'date',
			html: i18n.gettext('12:20')		
		},{
			xtype: 'image',
			itemId: 'picture',
			mode: '', 
			styleHtmlContent: true,
			width: '100%'
		}]
	},	{
		xtype: 'container',
		flex: 1,
		layout: {type: 'vbox', align: 'stretch'},
	 	defaults: {frame: true},
		itemId: 'thumb3',
		items: [{
			xtype: 'container',
			style: 'text-align: center;',		
			itemId: 'date',
			html: i18n.gettext('12:30')		
		},{
			xtype: 'image',
			itemId: 'picture',
			mode: '', 
			styleHtmlContent: true,
			width: '100%'
		}]
	},	{
		xtype: 'container',
		flex: 1,
		layout: {type: 'vbox', align: 'stretch'},
	 	defaults: {frame: true},
		itemId: 'thumb4',
		items: [{
			xtype: 'container',
			style: 'text-align: center;',		
			itemId: 'date',
			html: i18n.gettext('12:40')		
		},{
			xtype: 'image',
			itemId: 'picture',
			mode: '', 
			styleHtmlContent: true,
			width: '100%'
		}]			
	},	{
		xtype: 'container',
		flex: 1,
		layout: {type: 'vbox', align: 'stretch'},
	 	defaults: {frame: true},
		itemId: 'thumb5',
		items: [{
			xtype: 'container',
			style: 'text-align: center;',		
			itemId: 'date',
			html: i18n.gettext('12:50')		
		},{
			xtype: 'image',
			itemId: 'picture',
			mode: '', 
			styleHtmlContent: true,
			width: '100%'
		}]		
	},	{
		xtype: 'container',
		flex: 1,
		layout: {type: 'vbox', align: 'stretch'},
	 	defaults: {frame: true},
		itemId: 'thumb6',
		items: [{
			xtype: 'container',
			style: 'text-align: center;',		
			itemId: 'date',
			html: i18n.gettext('13:00')		
		},{
			xtype: 'image',
			itemId: 'picture',
			mode: '', 
			styleHtmlContent: true,
			width: '100%'
		}]		
	}] 
*/	 



