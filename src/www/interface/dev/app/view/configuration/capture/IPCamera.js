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
console.log('Log: Load: Webcampak.view.configuration.capture.IPCamera');
Ext.define('Webcampak.view.configuration.capture.IPCamera' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.configcaptureipcamera',

	layout: 'fit',
	items   : [{
		labelWidth: 		300,
		flex: 				1,
		xtype:				'combo',
		mode:					'local',
		value:				'exif',
		triggerAction:		'all',
		forceSelection:	true,
		editable:			false,
		fieldLabel:			i18n.gettext('Define picture date based upon'),
		name:					'cfgsourcecamiptemplate',
		displayField:		'name',
		valueField:			'value',
		queryMode:			'local',
		store:				Ext.create('Ext.data.Store', {
			fields : ['name', 'value'],
			data   : [
				{name : i18n.gettext('Date when file was save into /tmp/ directory'),   		value: 'filedate'			},
				{name : i18n.gettext('Picture filename (Webcampak) - (YYYYMMDDHHMMSS.jpg)'),  value: 'webcampak'		},		
				{name : i18n.gettext('Canon IP Camera - (YYYYMMDDHHMMSSxxx.jpg)'),  				value: 'canonipcamera'	},		
				{name : i18n.gettext('EXIF Metadata (date)'),  											value: 'exif'				}
			]
		})		
	},	{
		xtype: 'checkboxfield',
		labelWidth: 300,		
		uncheckedValue: 'off',
		inputValue: 'on',
		name: 'cfgsourcecamiplimiterotation',
		fieldLabel: i18n.gettext('Limit hotlink processing to one picture per rotation')
	},	{
		xtype: 'checkboxfield',
		labelWidth: 		300,		
		uncheckedValue: 'off',
		inputValue: 'on',		
		name: 'cfgsourcecamiphotlinkerror',
		fieldLabel: i18n.gettext('Take actions if no new pictures in /tmp/ directory.')
	}]

});



