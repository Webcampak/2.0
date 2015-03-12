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
console.log('Log: Load: WebcampakMobile.view.pictures.DrawWindow');
Ext.define('WebcampakMobile.view.pictures.DrawWindow', {

	extend: 'Ext.form.Panel',
	xtype: 'drawWindow',

	config: {
			modal: true,
			hideOnMaskTap: true,
			showAnimation: {
				type: 'popIn',
				duration: 250,
				easing: 'ease-out'
			},
			hideAnimation: {
				type: 'popOut',
				duration: 250,
				easing: 'ease-out'
			},
			centered: true,
			width: Ext.os.deviceType == 'Phone' ? 260 : 400,
			height: Ext.os.deviceType == 'Phone' ? 220 : 400,
			styleHtmlContent: true,		
			items: [{
				xtype: 'fieldset',
				defaults: {
					labelWidth: '35%'
				},
				title: i18n.gettext('Draw Color'),
				items: [{
					/*xtype: "colorpickerfield",*/
					xtype: "selectfield",
					options: [
						{text: 'Yellow', value: 'yellow'},
						{text: 'Black', value: 'black'},
						{text: 'Blue', value: 'blue'},
						{text: 'Red', value: 'red'},
						{text: 'Green', value: 'green'}
					],											
					label: "Color Picker",
					name: "color-picker"				 											 								
				}]									
      	}, {
				xtype: 'fieldset',
				defaults: {
					labelWidth: 200
				},
				title: i18n.gettext('Draw Size'),
				items: [{
					xtype: 'sliderfield',
					name: 'drawslider'
				}]
			}],			
			scrollable: true
	}
});
