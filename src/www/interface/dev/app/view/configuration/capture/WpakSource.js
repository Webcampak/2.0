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
console.log('Log: Load: Webcampak.view.configuration.capture.WpakSource');
Ext.define('Webcampak.view.configuration.capture.WpakSource' ,{
//	extend: 'Ext.form.Panel', 
	extend: 'Ext.form.FieldSet',
	alias: 'widget.configcapturewpaksource',

	layout: 'fit',
	items   : [{
		labelWidth: 		200,
		flex: 				1,
		xtype:				'combo',
		mode:					'local',
		value:				'rec',
		triggerAction:		'all',
		forceSelection:	true,
		editable:			false,
		fieldLabel:			i18n.gettext('Capture type'),
		name:					'cfgsourcewpaktype',
		displayField:		'name',
		valueField:			'value',
		queryMode:			'local',
		store:				Ext.create('Ext.data.Store', {
			fields : ['name', 'value'],
			data   : [
				{name : i18n.gettext('Get: Pictures copied from an other source'),   	value: 'get'	},
				{name : i18n.gettext('Receive: Pictures sent by another source'),  		value: 'rec'	}
			]
		})	
	},	{
		labelWidth: 200,		
		flex: 1,	
		fieldLabel:		i18n.gettext('Select source to get from'),
		name: 'cfgsourcewpakgetsourceid',		
		xtype: 'configcaptureallowedsources'		
	}, {
		xtype: 'checkboxfield',
		labelWidth: 200,		
		uncheckedValue: 'off',
		inputValue: 'on',
		name: 'cfgsourcewpakprocessraw',
		fieldLabel: i18n.gettext('Process RAW files')
	}]
});



