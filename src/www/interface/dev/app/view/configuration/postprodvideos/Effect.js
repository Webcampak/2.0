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
console.log('Log: Load: Webcampak.view.configuration.postprodvideos.Effect');
Ext.define('Webcampak.view.configuration.postprodvideos.Effect' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.configpostprodvideoseffect',
	layout: 'fit',
	items   : [{
		name:	'cfgvideoeffect',	labelWidth: 140,	xtype: 'combo',		fieldLabel:	i18n.gettext('Video effect'),		flex: 1,
		mode:	'local',					value:	'no',	triggerAction:	'all',	queryMode: 'local',
		forceSelection: true, 		editable: false,		displayField: 'name', 	valueField: 'value',
		store:				
			Ext.create('Ext.data.Store', {
				fields : ['name', 'value'],
				data   : [
					{name : i18n.gettext('No effect'),		value: 'no'},
					{name : i18n.gettext('Tilt Shift'),		value: 'tiltshift'},
					{name : i18n.gettext('charcoal'),		value: 'charcoal'},
					{name : i18n.gettext('colorin'),			value: 'colorin'},
					{name : i18n.gettext('sketch'),			value: 'sketch'}
				]
			})	     						
	}]
});



