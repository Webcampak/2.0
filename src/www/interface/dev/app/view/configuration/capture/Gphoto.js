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
console.log('Log: Load: Webcampak.view.configuration.capture.Gphoto');
Ext.define('Webcampak.view.configuration.capture.Gphoto' ,{
//	extend: 'Ext.form.Panel', 
	extend: 'Ext.form.FieldSet',
	alias: 'widget.configcapturegphoto',

	layout: 'fit',
	items   : [{
		labelWidth: 200,		
		flex: 1,		
		name: 'cfgsourcegphotocameramodel',
		xtype: 'textfield',
		fieldLabel: i18n.gettext('Camera Model'),
		emptyText: i18n.gettext('Multi-Camera environment only')
	},	{
		labelWidth: 200,		
		flex: 1,	
		name: 'cfgsourcegphotocameraportdetail',		
		xtype: 'configcapturecameraport'		
	},	{
		labelWidth: 200,		
		flex: 1,	
		name: 'cfgsourcegphotoowner',
		xtype: 'textfield',
		fieldLabel: i18n.gettext('Camera Owner (TAG)'),
		emptyText: i18n.gettext('Multi-Camera environment only'),
		vtype: 'alpha'
	}, {
		xtype: 'checkboxfield',
		labelWidth: 200,		
		uncheckedValue: 'off',
		inputValue: 'on',
		name: 'cfgsourcegphotoraw',
		fieldLabel: i18n.gettext('Process RAW files')		
/*	}, {
		xtype: 'checkboxfield',
		labelWidth: 200,		
		uncheckedValue: 'off',
		inputValue: 'on',
		name: 'cfgsourcegphotorawmainftp',
		fieldLabel: i18n.gettext('Enable RAW primary FTP')
	}, {
		xtype: 'checkboxfield',
		labelWidth: 200,		
		uncheckedValue: 'off',
		inputValue: 'on',
		name: 'cfgsourcegphotorawsecondftp',
		fieldLabel: i18n.gettext('Enable RAW secondary FTP')*/
	}]

});



