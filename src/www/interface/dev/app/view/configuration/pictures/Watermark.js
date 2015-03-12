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
console.log('Log: Load: Webcampak.view.configuration.pictures.Watermark');
Ext.define('Webcampak.view.configuration.pictures.Watermark' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.configpictureswatermark',

	layout: 'fit',
	items   : [{
		labelWidth: 180,
		flex: 1,				
		name: 'cfgpicwatermarkactivate',
		xtype: 'checkboxfield',
		fieldLabel: i18n.gettext('Insert a watermark')
	},	{
		labelWidth: 180,		
		flex: 1,				
		name: 'cfgpicwatermarkfile',
		xtype: 'configpictureswatermarkfile'
	},	{
		labelWidth: 180,		
		flex: 1,				
		name : 'cfgpicwatermarkdissolve',
		xtype: 'sliderfield',
		fieldLabel: i18n.gettext('Transparency'),
		minValue: 0,
		maxValue: 100
	},	{
		labelWidth: 180,		
		flex: 1,
		xtype: 'fieldcontainer',			
		fieldLabel: i18n.gettext('Location of the watermark'),
		combineErrors: false,
		layout: {type:'hbox',	pack: 'start'},				
		items: [
			{html: 'X: ',						xtype: 'label',			width: 20,	padding: 2				}, 		
			{name : 'cfgpicwatermarkpositionx',	xtype: 'numberfield',	width: 60,	minValue: 0		}, 
			{html: 'Y: ',						xtype: 'label',			width: 20,	padding: 2				}, 				
			{name : 'cfgpicwatermarkpositiony',	xtype: 'numberfield',	width: 60, 	minValue: 0		}
		]
	}]
});



