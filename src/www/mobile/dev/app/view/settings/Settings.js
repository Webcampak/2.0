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
console.log('Log: Load: WebcampakMobile.view.settings.Settings');
Ext.define('WebcampakMobile.view.settings.Settings', {

	extend: 'Ext.form.Panel',
	xtype: 'settingsWindow',

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
				title: i18n.gettext('Language'),
				items: [{
					xtype: 'panel',
					width: 350,
					defaults: {
						xtype: 'button',
						style: 'margin: 0.1em',
						flex: 1
					}, 
					layout: {
						type: 'hbox'
					}, 
					items: [{ 
						itemId: 'flagfr',	
						xtype: 'button', 	
						iconCls: 'flag-fr',
						handler: function(){
							document.location.href = "index.html?lang=fr";         
						}				
					}, {
						itemId: 'flagen',	
						xtype: 'button', 	
						href: 'index.html?lang=en', 
						hrefTarget: '_self', 
						iconCls: 'flag-en',
						handler: function(){
							document.location.href = "index.html?lang=en";         
						}
					}, {
						itemId: 'flagpt',	
						xtype: 'button', 	
						href: 'index.html?lang=pt', 
						hrefTarget: '_self', 
						iconCls: 'flag-pt',
						handler: function(){
							document.location.href = "index.html?lang=pt";         
						}						 											 								
					}]					
				}]
      	}, {

				xtype: 'fieldset',
				defaults: {
					labelWidth: 200
				},
				title: i18n.gettext('Pictures'),
				items: [{
					xtype: 'togglefield',
					label: i18n.gettext('Optimize bandwidth'),
					name: 'enabletimthumb',
					id: 'timthumbToggle',
					value: 1,
      			width: 350
				}]
			}],			
			scrollable: true

	}
});
