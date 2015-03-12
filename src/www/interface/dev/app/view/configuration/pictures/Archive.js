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
console.log('Log: Load: Webcampak.view.configuration.pictures.Archive');
Ext.define('Webcampak.view.configuration.pictures.Archive' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.configpicturesarchive',

	layout: 'fit',
	items   : [{
		flex: 1,		
		labelWidth: 250,				
		name: 'cfgsavepictures',
		xtype: 'checkboxfield',
		uncheckedValue: 'off',
		inputValue: 'on',		
		fieldLabel: i18n.gettext('Save pictures into archives'),
		boxLabel: i18n.gettext('Warning, if pictures are not saved it will not be possible to generate videos.')		
	},	{
		labelWidth: 250,
		flex: 1,				
		name: 'cfgarchivesize',
		xtype: 'textfield',
		fieldLabel: i18n.gettext('Resize pictures before saving')
	},	{
		labelWidth: 250,
		minValue: 0,		
		flex: 1,				
		name: 'cfgcaptureminisize',
		xtype: 'numberfield',
		fieldLabel: i18n.gettext('Minimum single picture size'),
		boxLabel: 'bytes'				
	},	{
		labelWidth: 250,
		minValue: 0,		 
		width: 100,				
		name: 'cfgcapturedeleteafterdays',
		xtype: 'numberfield',
		fieldLabel: i18n.gettext('Delete pictures after (days, 0 = no limit)')
	}, {
		flex: 1,		
		minValue: 0,		
		labelWidth: 250,				
		name: 'cfgcapturemaxdirsize',
		xtype: 'numberfield',
		fieldLabel: i18n.gettext('Maximum archive size (Mbytes, 0 = no limit)')
	}]
});

