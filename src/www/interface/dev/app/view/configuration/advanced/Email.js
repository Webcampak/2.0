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
console.log('Log: Load: Webcampak.view.configuration.advanced.Email');
Ext.define('Webcampak.view.configuration.advanced.Email' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.configadvancedemail',

	layout: 'fit',
	items   : [{
		labelWidth: 250,
		flex: 1,				
		name: 'cfgemailsendto',
		xtype: 'textfield',
		fieldLabel: i18n.gettext('Send email to')
	}, {
		labelWidth: 250,
		flex: 1,				
		name: 'cfgemailsendcc',
		xtype: 'textfield',
		fieldLabel: i18n.gettext('Send email to (CC)')
	}, {
		labelWidth: 250,
		flex: 1,				
		name: 'cfgemailreplyto',
		xtype: 'textfield',
		fieldLabel: i18n.gettext('Send email from (source email)')
	}, {
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',	pack: 'start'},				
		items   : [
			{width: 255,											xtype: 'label',			html: i18n.gettext('Number of failure before sending email:')},
			{width: 55,	name: 'cfgemailalertfailure', 	xtype: 'numberfield', 	minValue: 0},
			{width: 150,											xtype: 'label',			html: ' ' + i18n.gettext('send a reminder every:'), 	padding: 2	}, 	
			{width: 55,	name: 'cfgemailalertreminder', 	xtype: 'numberfield', 	minValue: 0},
			{width: 150,											xtype: 'label',			html: ' ' + i18n.gettext('failures (0 = never)'), 	padding: 2	}
		]
	}, {
		labelWidth: 250,
		flex: 1,				
		xtype: 'checkboxfield',
		uncheckedValue: 'off',
		inputValue: 'on',		
		name: 'cfgemailalwaysnotify',
		fieldLabel: i18n.gettext('Always notify when source is back'),		
		boxLabel: i18n.gettext('Send email when source comes back even if number of failure was low.')			
	}]
});

