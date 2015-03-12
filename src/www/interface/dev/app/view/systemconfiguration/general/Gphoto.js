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
console.log('Log: Load: Webcampak.view.systemconfiguration.general.Gphoto');
Ext.define('Webcampak.view.systemconfiguration.general.Gphoto' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.systemconfigurationgeneralgphoto',

	items   : [{
		labelWidth: 220,		
		xtype: 'checkboxfield',
		uncheckedValue: 'off',	
		inputValue: 'on',					
		name: 'cfggphotoports',
		fieldLabel: i18n.gettext('Lookup for camera automatically')
	}, {
		flex:					1,
		labelWidth: 		220,		
		fieldLabel: 		i18n.gettext('Type of DSLR cameras'),
		xtype:				'combo',
		mode:					'local',
		value:				'different',
		triggerAction:		'all',
		forceSelection:	true,
		editable:			false,
		name:					'cfggphotoportscameras',
		displayField:		'name',
		valueField:			'value',
		queryMode:			'local',
		store:				
			Ext.create('Ext.data.Store', {
				fields : ['name', 'value'],
				data   : [
					{name : i18n.gettext('Different DSLR cameras'),  value: 'different'},
					{name : i18n.gettext('Identical DSLR cameras'),  value: 'identical'}
				]
		})		
	}]
});


