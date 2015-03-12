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
console.log('Log: Load: Webcampak.view.cloudconfiguration.videos.VideoCreationAdvanced');
Ext.define('Webcampak.view.cloudconfiguration.videos.VideoCreationAdvanced' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.cloudconfigvideosvideocreationadvanced',
	
	uncheckedValue: 'off',	inputValue: 'on',
	items   : [{
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',	pack: 'start'},				
		items   : [
			{flex: 1,																xtype: 'label',			html: i18n.gettext('1080p:'), 	padding: 2	},
			{width: 50,																xtype: 'label',			html: i18n.gettext('Bitrate:'), 	padding: 2	}, 			
			{width: 55,	name: 'cfgvideocodecH2641080pbitrate', 		xtype: 'textfield',		readOnly: true, readOnlyCls: 'x-item-disabled'},
			{width: 40,																xtype: 'label',			html: i18n.gettext('Size:'), 	padding: 2	}, 	
			{width: 55,	name: 'cfgvideocodecH2641080pwidth', 			xtype: 'textfield',		readOnly: true, readOnlyCls: 'x-item-disabled'},
			{width: 10,																xtype: 'label',			html: 'x', 	padding: 2	}, 
			{width: 55,	name: 'cfgvideocodecH2641080pheight', 			xtype: 'textfield',		readOnly: true, readOnlyCls: 'x-item-disabled'},
			{width: 40,																xtype: 'label',			html: i18n.gettext('Crop:'), 	padding: 2	}, 	
			{width: 55,	name: 'cfgvideocodecH2641080pcropwidth', 		xtype: 'textfield',		readOnly: true, readOnlyCls: 'x-item-disabled'},
			{width: 10,																xtype: 'label',			html: ':', 	padding: 2	}, 	
			{width: 55,	name: 'cfgvideocodecH2641080pcropheight', 	xtype: 'textfield',		readOnly: true, readOnlyCls: 'x-item-disabled'},
			{width: 10,																xtype: 'label',			html: ':', 	padding: 2	}, 	
			{width: 55,	name: 'cfgvideocodecH2641080pcropx', 			xtype: 'textfield',		readOnly: true, readOnlyCls: 'x-item-disabled'},
			{width: 10,																xtype: 'label',			html: ':', 	padding: 2	}, 	
			{width: 55,	name: 'cfgvideocodecH2641080pcropy', 			xtype: 'numberfield',	minValue: 0,	maxValue: 10000}
		]
	}, {
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',	pack: 'start'},				
		items   : [
			{flex: 1,																xtype: 'label',			html: i18n.gettext('720p:'), 	padding: 2	},
			{width: 50,																xtype: 'label',			html: i18n.gettext('Bitrate:'), 	padding: 2	}, 			
			{width: 55,	name: 'cfgvideocodecH264720pbitrate', 			xtype: 'textfield',		readOnly: true, readOnlyCls: 'x-item-disabled'},
			{width: 40,																xtype: 'label',			html: i18n.gettext('Size:'), 	padding: 2	}, 	
			{width: 55,	name: 'cfgvideocodecH264720pwidth', 			xtype: 'textfield',		readOnly: true, readOnlyCls: 'x-item-disabled'},
			{width: 10,																xtype: 'label',			html: 'x', 	padding: 2	}, 
			{width: 55,	name: 'cfgvideocodecH264720pheight', 			xtype: 'textfield',		readOnly: true, readOnlyCls: 'x-item-disabled'},
			{width: 40,																xtype: 'label',			html: i18n.gettext('Crop:'), 	padding: 2	}, 	
			{width: 55,	name: 'cfgvideocodecH264720pcropwidth', 		xtype: 'textfield',		readOnly: true, readOnlyCls: 'x-item-disabled'},
			{width: 10,																xtype: 'label',			html: ':', 	padding: 2	}, 	
			{width: 55,	name: 'cfgvideocodecH264720pcropheight', 		xtype: 'textfield',		readOnly: true, readOnlyCls: 'x-item-disabled'},
			{width: 10,																xtype: 'label',			html: ':', 	padding: 2	}, 	
			{width: 55,	name: 'cfgvideocodecH264720pcropx', 			xtype: 'textfield',		readOnly: true, readOnlyCls: 'x-item-disabled'},
			{width: 10,																xtype: 'label',			html: ':', 	padding: 2	}, 	
			{width: 55,	name: 'cfgvideocodecH264720pcropy', 			xtype: 'numberfield',	minValue: 0,	maxValue: 10000}
		]	
	}, { 
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',	pack: 'start'},				
		items   : [
			{flex: 1,																xtype: 'label',			html: i18n.gettext('480p:'), 	padding: 2	},
			{width: 50,																xtype: 'label',			html: i18n.gettext('Bitrate:'), 	padding: 2	}, 			
			{width: 55,	name: 'cfgvideocodecH264480pbitrate', 			xtype: 'textfield',		readOnly: true, readOnlyCls: 'x-item-disabled'},
			{width: 40,																xtype: 'label',			html: i18n.gettext('Size:'), 	padding: 2	}, 	
			{width: 55,	name: 'cfgvideocodecH264480pwidth', 			xtype: 'textfield',		readOnly: true, readOnlyCls: 'x-item-disabled'},
			{width: 10,																xtype: 'label',			html: 'x', 	padding: 2	}, 
			{width: 55,	name: 'cfgvideocodecH264480pheight', 			xtype: 'textfield',		readOnly: true, readOnlyCls: 'x-item-disabled'},
			{width: 40,																xtype: 'label',			html: i18n.gettext('Crop:'), 	padding: 2	}, 	
			{width: 55,	name: 'cfgvideocodecH264480pcropwidth', 		xtype: 'textfield',		readOnly: true, readOnlyCls: 'x-item-disabled'},
			{width: 10,																xtype: 'label',			html: ':', 	padding: 2	}, 	
			{width: 55,	name: 'cfgvideocodecH264480pcropheight', 		xtype: 'textfield',		readOnly: true, readOnlyCls: 'x-item-disabled'},
			{width: 10,																xtype: 'label',			html: ':', 	padding: 2	}, 	
			{width: 55,	name: 'cfgvideocodecH264480pcropx', 			xtype: 'textfield',		readOnly: true, readOnlyCls: 'x-item-disabled'},
			{width: 10,																xtype: 'label',			html: ':', 	padding: 2	}, 	
			{width: 55,	name: 'cfgvideocodecH264480pcropy', 			xtype: 'numberfield',	minValue: 0,	maxValue: 10000}
		]							
	}]
});



