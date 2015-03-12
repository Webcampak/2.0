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
console.log('Log: Load: Webcampak.view.configuration.capture.Webcam');
Ext.define('Webcampak.view.configuration.capture.Webcam' ,{
//	extend: 'Ext.form.Panel', 
	extend: 'Ext.form.FieldSet',
	alias: 'widget.configcapturewebcam',

	layout: 'fit',
	items   : [{
		labelWidth: 200,		
		flex: 1,				
		name: 'cfgsourcewebcamsize',
		xtype: 'textfield',
		fieldLabel: i18n.gettext('Native Webcam definition')
	},	{
		labelWidth: 200,		
		flex: 1,				
		name: 'cfgsourcewebcamcamid',
		xtype: 'configcapturewebcamport'
	},	{
		labelWidth: 200,		
		flex: 1,				
		name : 'cfgsourcewebcambright',
		xtype: 'sliderfield',
		fieldLabel: i18n.gettext('Brightness'),
		minValue: 0,
		maxValue: 100
	},	{
		labelWidth: 200,		
		flex: 1,				
		name : 'cfgsourcewebcamcontrast',
		xtype: 'sliderfield',
		fieldLabel: i18n.gettext('Contrast'),
		minValue: 0,
		maxValue: 100
	},	{
		labelWidth: 200,		
		flex: 1,				
		name : 'cfgsourcewebcamsaturation',
		xtype: 'sliderfield',
		fieldLabel: i18n.gettext('Saturation'),
		minValue: 0,
		maxValue: 100
	},	{
		labelWidth: 200,		
		flex: 1,				
		name : 'cfgsourcewebcamgain',
		xtype: 'sliderfield',
		fieldLabel: i18n.gettext('Gain'),
		minValue: 0,
		maxValue: 100
	}]
});



