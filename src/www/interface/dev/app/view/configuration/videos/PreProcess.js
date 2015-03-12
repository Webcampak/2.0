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
console.log('Log: Load: Webcampak.view.configuration.videos.PreProcess');
Ext.define('Webcampak.view.configuration.videos.PreProcess' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.configvideospreprocess',

	layout: 'fit',
	items   : [{
		labelWidth: 140,
		flex: 1,				
		name: 'cfgvideopreimagemagicktxt',
		xtype: 'checkboxfield',
		fieldLabel: i18n.gettext('Insert legend'),
		uncheckedValue: 'off',	
		inputValue: 'on' 		
	},	{
		labelWidth: 140,
		flex: 1,				
		name: 'cfgvideopreimgtext',
		xtype: 'textfield',
		fieldLabel: i18n.gettext('Legend')
	},	{
		name:	'cfgvideopreimgdateformat',
		labelWidth: 140,	
		xtype: 'combo',		
		fieldLabel:	i18n.gettext('Date format'),		
		flex: 1,
		mode:	'local',					
		value:	'0',	
		triggerAction:	'all',	
		queryMode: 'local',
		forceSelection: true, 		
		editable: false,		
		displayField: 'name', 	
		valueField: 'value',
		store:				
			Ext.create('Ext.data.Store', {
				fields : ['name', 'value'],
				data   : [
					{name : i18n.gettext('Do not insert date'),						value: '0'},
					{name : i18n.gettext('25/01/2010 - 21h30'),						value: '1'},
					{name : i18n.gettext('25/01/2010'),									value: '2'},
					{name : i18n.gettext('09h30'),										value: '3'},
					{name : i18n.gettext('Thursday 25 January 2010 - 21h30'),	value: '4'},
					{name : i18n.gettext('25 January 2010 - 21h30'), 				value: '5'},
					{name : i18n.gettext('01/25/2010 - 09h30 PM'),					value: '6'},
					{name : i18n.gettext('01/25/2010 - 21h30'),						value: '7'}	
				]
		})		
	},	{	
		//Container, capture frequency and minimum interval
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',		pack: 'start'},				
		items   : [{
			flex: 1,
			labelWidth: 140,			
			fieldLabel: i18n.gettext('Text size'),					
			name : 'cfgvideopreimgtextsize',
			xtype: 'numberfield',
			width: 20,
			minValue: 0
		}, {
			//padding: 			'0 5 0 5',
			flex:					1,
			xtype:				'combo',
			fieldLabel: 		i18n.gettext('Text location'),
			mode:					'local',
			value:				'southwest',
			triggerAction:		'all',
			forceSelection:	true,
			editable:			false,
			name:					'cfgvideopreimgtextgravity',
			displayField:		'name',
			valueField:			'value',
			queryMode:			'local',
			store:				
				Ext.create('Ext.data.Store', {
					fields : ['name', 'value'],
					data   : [
						{name : i18n.gettext('South West'),		value: 'southwest'},
						{name : i18n.gettext('South'),			value: 'south'},
						{name : i18n.gettext('South East'),		value: 'southeast'},
						{name : i18n.gettext('East'),				value: 'east'},
						{name : i18n.gettext('North East'),		value: 'northeast'},
						{name : i18n.gettext('North'),			value: 'north'},
						{name : i18n.gettext('North West'),		value: 'northwest'},
						{name : i18n.gettext('West'),				value: 'west'}
					]
				})		
			}]            		
	},	{	
		name : 'cfgvideopreimgtextfont',	
		labelWidth: 140,
		xtype: 'configpicturestextfont'
	},	{
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',		pack: 'start'},				
		items   : [{
				flex: 1,
				labelWidth: 140,
				fieldLabel: i18n.gettext('Legend Coordinates'),					
				name : 'cfgvideopreimgtextoverposition',
				xtype: 'textfield'
			}, {
				flex: 1,
				fieldLabel: i18n.gettext('Legend Color'),					
				name : 'cfgvideopreimgtextovercolor',
				xtype: 'textfield'
		}]
	},	{	
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',		pack: 'start'},				
		items   : [{
				flex: 1,
				labelWidth: 140,
				fieldLabel: i18n.gettext('Shadow Coordinates'),					
				name : 'cfgvideopreimgtextbaseposition',
				xtype: 'textfield'
			}, {
				flex: 1,
				fieldLabel: i18n.gettext('Shadow Color'),					
				name : 'cfgvideopreimgtextbasecolor',
				xtype: 'textfield'
		}]
	},	{	
		flex: 1,																
		xtype: 'label',			
		html: '<b>Resize picture</b>', 	
		padding: 2 	
	},	{		
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',		pack: 'start'},				
		items   : [{
				flex: 1,
				labelWidth: 200,
				fieldLabel: i18n.gettext('Resize picture before video creation'),					
				name : 'cfgvideopreresize',
				xtype: 'checkboxfield',
				uncheckedValue: 'off',	
				inputValue: 'on'
			}, {
				flex: 1,
				labelWidth: 200,				
				fieldLabel: i18n.gettext('Picture size (1920x1080)'),					
				name : 'cfgvideopreresizeres',
				xtype: 'textfield'
		}]
	},	{	
		flex: 1,																
		xtype: 'label',			
		html: '<b>Apply effect</b>', 	
		padding: 2 	
	},	{			
		name:	'cfgvideoeffect',	
		labelWidth: 140,	
		xtype: 'combo',		
		fieldLabel:	i18n.gettext('Video effect'),		
		flex: 1,
		mode:	'local',					
		value:	'no',	
		triggerAction:	'all',	
		queryMode: 'local',
		forceSelection: true, 		
		editable: false,		
		displayField: 'name', 	
		valueField: 'value',
		store:				
			Ext.create('Ext.data.Store', {
				fields : ['name', 'value'],
				data   : [
					{name : i18n.gettext('No effect'),		value: 'no'},
					{name : i18n.gettext('Tilt Shift'),		value: 'tiltshift'},
					{name : i18n.gettext('charcoal'),		value: 'charcoal'},
					{name : i18n.gettext('colorin'),			value: 'colorin'},
					{name : i18n.gettext('sketch'),			value: 'sketch'}
				]
			})		
	}]
});


