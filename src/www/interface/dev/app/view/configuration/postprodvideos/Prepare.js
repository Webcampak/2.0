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
console.log('Log: Load: Webcampak.view.configuration.postprodvideos.Prepare');
Ext.define('Webcampak.view.configuration.postprodvideos.Prepare' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.configpostprodvideosprepare',

	layout: 'fit',
	items   : [{
		labelWidth: 250,		
		flex: 1,	
		fieldLabel: i18n.gettext('From'),					
		name: 'cfgcustomstarttimestamp',
		itemId: 'customstarttimestamp',
		format: 'd/m/Y',
		xtype: 'datetimefield'
	},	{
		labelWidth: 250,		
		flex: 1,	
		fieldLabel: i18n.gettext('To'),					
		name: 'cfgcustomendtimestamp',
		itemId: 'customendtimestamp',
		format: 'd/m/Y',
		xtype: 'datetimefield'
	},	{
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',	pack: 'start'},				
		items   : [
			{flex: 1,													xtype: 'label',											html: i18n.gettext('Only keep pictures between:')			}, 
			{width: 50,	name : 'cfgcustomkeepstarthour',		xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 23										}, 
			{width: 10,													xtype: 'label',											html: ':',							padding: 2						}, 
			{width: 50,	name : 'cfgcustomkeepstartminute', 	xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 59										},
			{width: 30,													xtype: 'label',											html: i18n.gettext('and'),		padding: 2						}, 
			{width: 50,	name : 'cfgcustomkeependhour',		xtype: 'numberfield',									minValue: 0,	maxValue: 23										}, 
			{width: 10,													xtype: 'label',											html: ':',							padding: 2						}, 
			{width: 50,	name : 'cfgcustomkeependminute',		xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 59										}
		]
	},	{
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',	pack: 'start'},				
		items   : [
			{flex: 1,	xtype: 'label',		html: i18n.gettext('Minimum interval between two pictures:')					}, 
			{width: 50,	name : 'cfgvidminintervalvalue',	xtype: 'numberfield',		allowBlank: false,	minValue: 0		}, 
			{		
				width:				80,
				xtype:				'combo',
				mode:					'local',
				value:				'minutes',
				triggerAction:		'all',
				forceSelection:	true,
				editable:			false,
				name:					'cfgvidmininterval',
				displayField:		'name',
				valueField:			'value',
				queryMode:			'local',
				store:				
					Ext.create('Ext.data.Store', {
						fields : ['name', 'value'],
						data   : [
							{name : i18n.gettext('Minutes'),   value: 'minutes'},
							{name : i18n.gettext('Seconds'),  value: 'seconds'}
						]
					})					
			}
		]
	}, {
		labelWidth:				250,
		flex: 				1,
		fieldLabel: 		i18n.gettext('Move pictures to:'),
		xtype:				'combo',
		mode:					'local',
		value:				'no',
		triggerAction:		'all',
		forceSelection:	true,
		editable:			false,
		name:					'cfgmovefilestosource',
		displayField:		'name',
		valueField:			'sourceid',
		queryMode:			'local',
		store: 'permissions.sources.Sources'			
	}, {		
		labelWidth: 250,
		flex: 1,				
		name: 'cfgemailmovieactivate',
		xtype: 'checkboxfield',
		fieldLabel: i18n.gettext('Send an email once completed'),
		uncheckedValue: 'off',	
		inputValue: 'on'		
	}, {		
		labelWidth:				250,
		flex: 				1,
		fieldLabel: i18n.gettext('Start processing'),
		xtype:				'combo',
		mode:					'local',
		value:				'minutes',
		triggerAction:		'all',
		forceSelection:	true,
		editable:			false,
		name:					'cfgcustomactive',
		displayField:		'name',
		valueField:			'value',
		queryMode:			'local',
		store:				
			Ext.create('Ext.data.Store', {
				fields : ['name', 'value'],
				data   : [
					{name : i18n.gettext('Disabled'),   value: 'off'},
					{name : i18n.gettext('As Soon As Possible'),  value: 'planon'},
					{name : i18n.gettext('At 4:00 am'),  value: 'plan04'}							
				]
			})					
	}]
});



