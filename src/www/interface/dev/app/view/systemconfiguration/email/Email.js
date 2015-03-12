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
console.log('Log: Load: Webcampak.view.systemconfiguration.email.Email');
Ext.define('Webcampak.view.systemconfiguration.email.Email' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.systemconfigurationemailemail',

	items   : [{
		labelWidth: 220,
		flex: 1,				
		name: 'cfgemailsendbcc',
		xtype: 'textfield',
		fieldLabel: i18n.gettext('Send a copy of all emails to (BCC)')
	}, {
		labelWidth: 220,
		flex: 1,				
		name: 'cfgemailsendfrom',
		xtype: 'textfield',
		fieldLabel: i18n.gettext('Send emails from (email address)') 
	}, {
		labelWidth: 220,
		flex: 1,				
		name: 'cfgemailreplyto',
		xtype: 'textfield',
		fieldLabel: i18n.gettext('Reply-to email')
	}, {
		flex: 1,	
		xtype: 'label',
		html: '<b>' + i18n.gettext('Outgoing email server') + ':</b> '
	}, {
		xtype: 'container',
		layout: {type:'hbox',	align: 'stretch',	pack: 'start'},				
		items   : [
			{width: 125,												xtype: 'label',		html: i18n.gettext('SMTP Server:')},
			{width: 200,	name: 'cfgemailsmtpserver', 		xtype: 'textfield'},
			{width: 30,													xtype: 'label',		html: ' ' + i18n.gettext('Port:'), 	padding: 2	}, 	
			{width: 55,		name: 'cfgemailsmtpserverport', 	xtype: 'numberfield', minValue: 0}
		]
	}, {
		flex: 1,	
		labelWidth: 120,		
		xtype: 'checkboxfield',
		uncheckedValue: 'off',	
		inputValue: 'on',					
		name: 'cfgemailsmtpstartttls',
		fieldLabel: i18n.gettext('SMTP Start TTLS')
	}, {	
		flex: 1,	
		labelWidth: 120,		
		xtype: 'checkboxfield',
		uncheckedValue: 'off',	
		inputValue: 'on',					
		name: 'cfgemailsmtpauth',
		fieldLabel: i18n.gettext('SMTP Auth')
	}, {
		labelWidth: 120,
		flex: 1,				
		name: 'cfgemailsmtpauthusername',
		xtype: 'textfield',
		fieldLabel: i18n.gettext('SMTP Auth Username')
	}, {
		labelWidth: 120,
		flex: 1,				
		name: 'cfgemailsmtpauthpassword',
		xtype: 'textfield',
		fieldLabel: i18n.gettext('SMTP Auth Password')
	}]
});



