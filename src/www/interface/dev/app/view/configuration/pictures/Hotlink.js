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
console.log('Log: Load: Webcampak.view.configuration.pictures.Hotlink');
Ext.define('Webcampak.view.configuration.pictures.Hotlink' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.configpictureshotlink',

	layout: 'fit',
	items   : [{
		labelWidth: 300,
		flex: 1,				
		name: 'cfghotlinksize1',
		xtype: 'textfield',
		fieldLabel: i18n.gettext('Hotlink 1 size')
	},	{
		labelWidth: 300,
		flex: 1,				
		name: 'cfghotlinksize2',
		xtype: 'textfield',
		fieldLabel: i18n.gettext('Hotlink 2 size')
	},	{
		labelWidth: 300,
		flex: 1,				
		name: 'cfghotlinksize3',
		xtype: 'textfield',
		fieldLabel: i18n.gettext('Hotlink 3 size')
	},	{
		labelWidth: 300,
		flex: 1,				
		name: 'cfghotlinksize4',
		xtype: 'textfield',
		fieldLabel: i18n.gettext('Hotlink 4 size')
	}, {
		flex: 1,		
		labelWidth: 300,				
		name: 'cfghotlinkerrorcreate',
		xtype: 'checkboxfield',
		uncheckedValue: 'off',
		inputValue: 'on',
		fieldLabel: i18n.gettext('Generate hotlink image in case of capture error')
	}]
});

