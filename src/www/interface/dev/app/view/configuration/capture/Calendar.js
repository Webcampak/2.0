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
console.log('Log: Load: Webcampak.view.configuration.capture.Calendar');
Ext.define('Webcampak.view.configuration.capture.Calendar' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.configcapturecalendar',

	items   : [{
		// Activate calendar
		//padding: 5,
		xtype: 'checkboxfield',
		uncheckedValue: 'off',
		inputValue: 'on',		
		name: 'cfgcroncalendar',
		fieldLabel: i18n.gettext('Activate calendar'),
		boxLabel: i18n.gettext('If disabled, the system will capture 24/7')	
	},	{ // MONDAY
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',	pack: 'start'},				
		items   : [
			{flex: 1,	name: 'cfgcapturedayenable1',		xtype: 'checkboxfield',	uncheckedValue: 'off',	inputValue: 'on',	fieldLabel: i18n.gettext('Monday')		}, 
			{width: 60,												xtype: 'label',											html: i18n.gettext('Between'), 	padding: 2					}, 
			{width: 50,	name : 'cfgcapturestarthour1',	xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 23										}, 
			{width: 10,												xtype: 'label',											html: ':',								padding: 2					}, 
			{width: 50,	name : 'cfgcapturestartminute1', xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 59										},
			{width: 30,												xtype: 'label',											html: i18n.gettext('and'),			padding: 2					}, 
			{width: 50,	name : 'cfgcapturesendhour1',		xtype: 'numberfield',									minValue: 0,	maxValue: 23										}, 
			{width: 10,												xtype: 'label',											html: ':',								padding: 2					}, 
			{width: 50,	name : 'cfgcapturesendminute1',	xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 59										}
		]
	}, { // TUESDAY
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',	pack: 'start'},				
		items   : [
			{flex: 1,	name: 'cfgcapturedayenable2',		xtype: 'checkboxfield',	uncheckedValue: 'off',	inputValue: 'on',	fieldLabel: i18n.gettext('Tuesday')		}, 
			{width: 60,												xtype: 'label',											html: i18n.gettext('Between'), 	padding: 2					}, 
			{width: 50,	name : 'cfgcapturestarthour2',	xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 23										}, 
			{width: 10,												xtype: 'label',											html: ':',								padding: 2					}, 
			{width: 50,	name : 'cfgcapturestartminute2', xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 59										},
			{width: 30,												xtype: 'label',											html: i18n.gettext('and'),			padding: 2					}, 
			{width: 50,	name : 'cfgcapturesendhour2',		xtype: 'numberfield',									minValue: 0,	maxValue: 23										}, 
			{width: 10,												xtype: 'label',											html: ':',								padding: 2					}, 
			{width: 50,	name : 'cfgcapturesendminute2',	xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 59										}
		]		
	}, { // WEDNESDAY
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',	pack: 'start'},				
		items   : [
			{flex: 1,	name: 'cfgcapturedayenable3',		xtype: 'checkboxfield',	uncheckedValue: 'off',	inputValue: 'on',	fieldLabel: i18n.gettext('Wednesday')	}, 
			{width: 60,												xtype: 'label',											html: i18n.gettext('Between'), 	padding: 2					}, 
			{width: 50,	name : 'cfgcapturestarthour3',	xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 23										}, 
			{width: 10,												xtype: 'label',											html: ':',								padding: 2					}, 
			{width: 50,	name : 'cfgcapturestartminute3', xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 59										},
			{width: 30,												xtype: 'label',											html: i18n.gettext('and'),			padding: 2					}, 
			{width: 50,	name : 'cfgcapturesendhour3',		xtype: 'numberfield',									minValue: 0,	maxValue: 23										}, 
			{width: 10,												xtype: 'label',											html: ':',								padding: 2					}, 
			{width: 50,	name : 'cfgcapturesendminute3',	xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 59										}
		]					
	}, { //THURSDAY
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',	pack: 'start'},				
		items   : [
			{flex: 1,	name: 'cfgcapturedayenable4',		xtype: 'checkboxfield',	uncheckedValue: 'off',	inputValue: 'on',	fieldLabel: i18n.gettext('Thursday')	}, 
			{width: 60,												xtype: 'label',											html: i18n.gettext('Between'), 	padding: 2					}, 
			{width: 50,	name : 'cfgcapturestarthour4',	xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 23										}, 
			{width: 10,												xtype: 'label',											html: ':',								padding: 2					}, 
			{width: 50,	name : 'cfgcapturestartminute4', xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 59										},
			{width: 30,												xtype: 'label',											html: i18n.gettext('and'),			padding: 2					}, 
			{width: 50,	name : 'cfgcapturesendhour4',		xtype: 'numberfield',									minValue: 0,	maxValue: 23										}, 
			{width: 10,												xtype: 'label',											html: ':',								padding: 2					}, 
			{width: 50,	name : 'cfgcapturesendminute4',	xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 59										}
		]				
	}, { // FRIDAY
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',	pack: 'start'},				
		items   : [
			{flex: 1,	name: 'cfgcapturedayenable5',		xtype: 'checkboxfield',	uncheckedValue: 'off',	inputValue: 'on',	fieldLabel: i18n.gettext('Friday')		}, 
			{width: 60,												xtype: 'label',											html: i18n.gettext('Between'), 	padding: 2					}, 
			{width: 50,	name : 'cfgcapturestarthour5',	xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 23										}, 
			{width: 10,												xtype: 'label',											html: ':',								padding: 2					}, 
			{width: 50,	name : 'cfgcapturestartminute5', xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 59										},
			{width: 30,												xtype: 'label',											html: i18n.gettext('and'),			padding: 2					}, 
			{width: 50,	name : 'cfgcapturesendhour5',		xtype: 'numberfield',									minValue: 0,	maxValue: 23										}, 
			{width: 10,												xtype: 'label',											html: ':',								padding: 2					}, 
			{width: 50,	name : 'cfgcapturesendminute5',	xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 59										}
		]					
	}, { // SATURDAY
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',	pack: 'start'},				
		items   : [
			{flex: 1,	name: 'cfgcapturedayenable6',		xtype: 'checkboxfield',	uncheckedValue: 'off',	inputValue: 'on',	fieldLabel: i18n.gettext('Saturday')	}, 
			{width: 60,												xtype: 'label',											html: i18n.gettext('Between'), 	padding: 2					}, 
			{width: 50,	name : 'cfgcapturestarthour6',	xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 23										}, 
			{width: 10,												xtype: 'label',											html: ':',								padding: 2					}, 
			{width: 50,	name : 'cfgcapturestartminute6', xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 59										},
			{width: 30,												xtype: 'label',											html: i18n.gettext('and'),			padding: 2					}, 
			{width: 50,	name : 'cfgcapturesendhour6',		xtype: 'numberfield',									minValue: 0,	maxValue: 23										}, 
			{width: 10,												xtype: 'label',											html: ':',								padding: 2					}, 
			{width: 50,	name : 'cfgcapturesendminute6',	xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 59										}
		]				
	}, { // SUNDAY
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',	pack: 'start'},				
		items   : [
			{flex: 1,	name: 'cfgcapturedayenable7',		xtype: 'checkboxfield',	uncheckedValue: 'off',	inputValue: 'on',	fieldLabel: i18n.gettext('Sunday')		}, 
			{width: 60,												xtype: 'label',											html: i18n.gettext('Between'), 	padding: 2					}, 
			{width: 50,	name : 'cfgcapturestarthour7',	xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 23										}, 
			{width: 10,												xtype: 'label',											html: ':',								padding: 2					}, 
			{width: 50,	name : 'cfgcapturestartminute7', xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 59										},
			{width: 30,												xtype: 'label',											html: i18n.gettext('and'),			padding: 2					}, 
			{width: 50,	name : 'cfgcapturesendhour7',		xtype: 'numberfield',									minValue: 0,	maxValue: 23										}, 
			{width: 10,												xtype: 'label',											html: ':',								padding: 2					}, 
			{width: 50,	name : 'cfgcapturesendminute7',	xtype: 'numberfield',		allowBlank: false,	minValue: 0,	maxValue: 59										}
		]						
	}]
});



