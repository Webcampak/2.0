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
console.log('Log: Load: Webcampak.view.cloudconfiguration.videos.VideoCreation');
Ext.define('Webcampak.view.cloudconfiguration.videos.VideoCreation' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.cloudconfigvideosvideocreation',
	
	uncheckedValue: 'off',	inputValue: 'on',
	items   : [{
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',	pack: 'start'},				
		items   : [
			{flex: 1,							name: 'cfgvideocodecH2641080pcreate',		xtype: 'checkboxfield',	uncheckedValue: 'off',	inputValue: 'on', fieldLabel: i18n.gettext('H. 264 (1080p)')}, 
			{width: 180,																				xtype: 'label',			html: i18n.gettext('HD Format, Highest quality.'), 	padding: 2	}, 
			{width: 100, labelWidth: 70,	name: 'cfgvideocodecH2641080pcreateflv',	xtype: 'checkboxfield',	uncheckedValue: 'off',	inputValue: 'on', fieldLabel: i18n.gettext('Web (MP4)')	}, 
			{width: 160,						name: 'cfgvideocodecH2641080pfps', 			xtype: 'numberfield',	fieldLabel: i18n.gettext('FPS'), minValue: 1,	maxValue: 100}
		]
	}, {
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',	pack: 'start'},				
		items   : [
			{flex: 1,								name: 'cfgvideocodecH264720pcreate',		xtype: 'checkboxfield',	uncheckedValue: 'off',	inputValue: 'on', fieldLabel: i18n.gettext('H. 264 (720p)')}, 
			{width: 180,																					xtype: 'label',			html: i18n.gettext('HD Format, High quality.'), 	padding: 2	}, 
			{width: 100, labelWidth: 70,		name: 'cfgvideocodecH264720pcreateflv',	xtype: 'checkboxfield',	uncheckedValue: 'off',	inputValue: 'on', fieldLabel: i18n.gettext('Web (MP4)')												}, 
			{width: 160,							name: 'cfgvideocodecH264720pfps', 			xtype: 'numberfield',	fieldLabel: i18n.gettext('FPS'), minValue: 1,	maxValue: 100}
		]	
	}, { 
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',	pack: 'start'},				
		items   : [
			{flex: 1,								name: 'cfgvideocodecH264480pcreate',		xtype: 'checkboxfield',	uncheckedValue: 'off',	inputValue: 'on', fieldLabel: i18n.gettext('H. 264 (480p)')}, 
			{width: 180,															xtype: 'label',			html: i18n.gettext('Similar to DVD.'), 	padding: 2	}, 
			{width: 100, labelWidth: 70,		name: 'cfgvideocodecH264480pcreateflv',	xtype: 'checkboxfield',	uncheckedValue: 'off',	inputValue: 'on', fieldLabel: i18n.gettext('Web (MP4)')												}, 
			{width: 160,							name: 'cfgvideocodecH264480pfps', 			xtype: 'numberfield',		fieldLabel: i18n.gettext('FPS')	, minValue: 1,	maxValue: 100}
		]					
	}]
});



