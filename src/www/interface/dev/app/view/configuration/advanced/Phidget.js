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
console.log('Log: Load: Webcampak.view.configuration.advanced.Phidget');
Ext.define('Webcampak.view.configuration.advanced.Phidget' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.configadvancedphidget',

	layout: 'fit',
	items   : [{
		flex: 1,	
		labelWidth: 300,		
		xtype: 'checkboxfield',
		uncheckedValue: 'off',	
		inputValue: 'on',					
		name: 'cfgphidgeterroractivate',
		fieldLabel: i18n.gettext('Powercycle camera in case of failure')
	}, {
		labelWidth: 300,
		flex: 1,				
		name: 'cfgphidgetfailure',
		xtype: 'numberfield',
		minValue: 0,
		fieldLabel: i18n.gettext('Number of failure before camera powercycle')
	}, {
		labelWidth: 300,
		flex: 1,				
		name: 'cfgphidgetcameraport',
		xtype: 'numberfield',
		minValue: 0,
		fieldLabel: i18n.gettext('Phidget camera port')
	}, {
		flex: 1,	
		labelWidth: 300,		
		xtype: 'checkboxfield',
		uncheckedValue: 'off',	
		inputValue: 'on',					
		name: 'cfgphidgetsensorsgraph',
		fieldLabel: i18n.gettext('Generate Phidget sensor graph')
	}, {
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',		pack: 'start'},	
		items   : [
			{width: 305,	xtype: 'label',							html: i18n.gettext('Send sensor to:')															}, 			
			{flex: 1,		xtype: 'configpicturesftpserver', 	name: 'cfgftpphidgetserverid'																		}, 
			{width: 100,	xtype: 'label',							html: i18n.gettext('Number of retry:')															}, 						
			{width: 50,		xtype: 'numberfield', 					name : 'cfgftpphidgetserverretry', minValue: 0, maxValue: 4, allowBlank: false	}
		]	
	}]
});

