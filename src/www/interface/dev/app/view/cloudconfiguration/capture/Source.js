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
console.log('Log: Load: Webcampak.view.cloudconfiguration.capture.Source');
Ext.define('Webcampak.view.cloudconfiguration.capture.Source' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.cloudconfigcapturesource',

	layout: 'fit',
		items   : [
		// Activate source
		{name:	'cfgsourceactive',	xtype: 'checkboxfield', fieldLabel: i18n.gettext('Activate Source'), uncheckedValue: 'off',	inputValue: 'on'}, 
		{	
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
				minValue: 1,
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
							{name : i18n.gettext('Minutes'),   value: 'minutes'}
						]
					})		
			}]            									
		}, {
			// Define the timezone of the device used for capture
			flex: 				1,	
			width: 				450,
			name:					'cfgcapturetimezone',			
			xtype: 				'cloudconfigcapturetimezone'
		}]
});



