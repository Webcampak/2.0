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
console.log('Log: Load: Webcampak.view.configuration.capture.InstantCapture');
Ext.define('Webcampak.view.configuration.capture.InstantCapture' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.configcaptureinstantcapture',

	items   : [{
		flex: 1,	
		xtype: 'label',
		html: '<b>' + i18n.gettext('Warning') + ':</b> ' + i18n.gettext('instant capture is likely to interfere with regular capture. Only use it during configuration phases. Image will be displayed at the bottom of this page')
	}, {	
		text: i18n.gettext('Capture Picture'),
		xtype: 'button',
		iconCls: 'icon-webcampak',
		action: 'instantCapture'							
	}]
});



