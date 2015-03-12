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
console.log('Log: Load: Webcampak.view.configuration.capture.Source');
Ext.define('Webcampak.view.configuration.capture.Source' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.configcapturesource',

	layout: 'fit',
		items   : [
		// Activate source
		{name:	'cfgsourceactive',	xtype: 'checkboxfield', fieldLabel: i18n.gettext('Activate Source'), uncheckedValue: 'off',	inputValue: 'on'}, 
		// Select source type
		{
			name:	'cfgsourcetype',		
			itemId: 'configsourcetype',	
			xtype: 'combo',		
			fieldLabel:	i18n.gettext('Source Type'),
			flex: 1,
			mode:	'local',					
			value:	'gphoto',	
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
						{name : i18n.gettext('Compact or DSLR USB Camera (Gphoto2 PTP mode)'),		value: 'gphoto'			},
						{name : i18n.gettext('Webcampak Source'),												value: 'wpak'				},	
						{name : i18n.gettext('USB Webcam'),  													value: 'webcam'			},
						{name : i18n.gettext('IP Camera (FTP)'), 												value: 'ipcam'				},
						{name : i18n.gettext('Internet Picture (HTTP ou FTP)'), 							value: 'webfile'			},
						{name : i18n.gettext('Video Streaming (RTSP)'), 									value: 'rtsp'				},
						{name : i18n.gettext('Sensor (Phidget)'), 											value: 'sensor'			}
					]
				})			
		},	{	
			//Container, capture frequency and minimum interval
			xtype: 'container',
			layout: {type:'hbox',	align: 'stretch',		pack: 'start'},				
			items   : [{
				// Capture Frequency
				flex: 1,
				xtype: 'fieldcontainer',			
				fieldLabel: i18n.gettext('Capture every'),
				combineErrors: false,
				layout: {type:'hbox',	pack: 'start'},				
				items: [{
					name : 'cfgcroncapturevalue',
					xtype: 'numberfield',
					width: 48,
					minValue: 0,
					allowBlank: false					
				}, {
					//padding: 			'0 5 0 5',
					flex:					1,
					xtype:				'combo',
					mode:					'local',
					value:				'minutes',
					triggerAction:		'all',
					forceSelection:	true,
					editable:			false,
					name:					'cfgcroncaptureinterval',
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
				}]            		
			}, {
				// Minimum Interval
				flex: 1,	
				xtype: 'fieldcontainer',			
				fieldLabel: i18n.gettext('Minimum Interval'),
				labelWidth: 150,
				combineErrors: false,
				layout: {type:'hbox',	pack: 'start'},				
				items: [{
					name : 'cfgminimumcapturevalue',
					xtype: 'numberfield',
					width: 48,
					minValue: 0,
					allowBlank: false					
				}, {
					//padding: 			'0 5 0 5',
					//width:					100,
					flex: 				1,
					xtype:				'combo',
					mode:					'local',
					value:				'minutes',
					triggerAction:		'all',
					forceSelection:	true,
					editable:			false,
					name:					'cfgminimumcaptureinterval',
					displayField:		'name',
					valueField:			'value',
					queryMode:			'local',
					store:				
						Ext.create('Ext.data.Store', {
							fields : ['name', 'value'],
							data   : [
								{name : i18n.gettext('Minutes'),  value: 'minutes'},
								{name : i18n.gettext('Seconds'),  value: 'seconds'}
							]
					})		
				}]							
			}]			
		},	{
			//Container, capture delay and picture date
			xtype: 'container',
			layout: {
				type:'hbox',
				align: 'stretch',
				pack: 'start'		
			},				
			items   : [{
				// Capture delay
				flex: 1,		
				xtype: 'fieldcontainer',			
				fieldLabel: i18n.gettext('Capture delay'),
				combineErrors: false,
				layout: {
					type:'hbox',
					pack: 'start'	
				},				
				items: [{
					name : 'cfgcapturedelay',
					xtype: 'numberfield',
					width: 48,
					minValue: 0,
					allowBlank: false					
				}, {
					flex:					1,
					xtype:				'combo',
					mode:					'local',
					value:				'seconds',
					triggerAction:		'all',
					forceSelection:	true,
					editable:			false,
					name:					'cfgcapturedelayinterval',
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
				}]            		
			}, {
				// Picture date (script start or picture capture)
				flex: 1,	
				labelWidth: 150,				
				xtype:				'combo',
				mode:					'local',
				value:				'capture',
				triggerAction:		'all',
				forceSelection:	true,
				editable:			false,
				fieldLabel:			i18n.gettext('Picture date'),
				name:					'cfgcapturedelaydate',
				displayField:		'name',
				valueField:			'value',
				queryMode:			'local',
				store:				
					Ext.create('Ext.data.Store', {
						fields : ['name', 'value'],
						data   : [
							{name : i18n.gettext('Capture time'),   value: 'capture'},
							{name : i18n.gettext('Script start time'),  value: 'script'}
						]
					})							
			}]	
		}, {
			// Define the timezone of the device used for capture
			flex: 1,	
			width: 				450,
			name:					'cfgcapturetimezone',			
			xtype: 				'configcapturetimezone'			
		},	{
			xtype: 'container',
			layout: {
				type:'hbox',
				align: 'stretch',
				pack: 'start'			
			},				
			items   : [{		
				// Picture date (script start or picture capture)
				flex: 1,	
				xtype:				'combo',
				mode:					'local',
				value:				'fr_FR.utf8',
				triggerAction:		'all',
				forceSelection:	true,
				editable:			false,
				fieldLabel:			i18n.gettext('Language'),
				name:					'cfgsourcelanguage',
				displayField:		'name',
				valueField:			'value',
				queryMode:			'local',
				store:				
					Ext.create('Ext.data.Store', {
						fields : ['name', 'value'],
						data   : [
							{name : i18n.gettext('French'),   value: 'fr_FR.utf8'},
							{name : i18n.gettext('English'),  value: 'en_GB.utf8'}
						]
					})	
			}, {
				flex: 1,	
				labelWidth: 200,													
				// Activate email alerts
				xtype: 'checkboxfield',
				uncheckedValue: 'off',	
				inputValue: 'on',					
				name: 'cfgemailerroractivate',
				fieldLabel: i18n.gettext('Email alerts')
			}]		
		}, {
			xtype: 'container',
			layout: {
				type:'hbox',
				align: 'stretch',
				pack: 'start'			
			},				
			items   : [{		
				flex: 1,	
				// Activate debug
				xtype: 'checkboxfield',
				uncheckedValue: 'off',	
				inputValue: 'on',					
				name: 'cfgsourcedebug',
				fieldLabel: i18n.gettext('Debug')
			}, {
				flex: 1,	
				labelWidth: 200,				
				// Activate debug
				xtype: 'checkboxfield',
				uncheckedValue: 'off',	
				inputValue: 'on',					
				name: 'cfgnocapture',
				fieldLabel: i18n.gettext('Block capture')
			}]		
			
		}]
});



