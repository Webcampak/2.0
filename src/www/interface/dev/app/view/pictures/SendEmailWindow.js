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
console.log('Log: Load: Webcampak.view.pictures.SendEmailWindow');
Ext.define('Webcampak.view.pictures.SendEmailWindow' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.picturessendemailwindow',
	
	iconCls: 'icon-photos',  	
	title: i18n.gettext('Send Picture by email'),
	maximizable: true,
	width: 750,
	height: 500,
	minWidth: 300,
	minHeight: 200,
	layout: 'fit',
	items: [{
		xtype: 'form',
		itemId: 'emailpanel',		
		plain: true,
		border: 0,
		bodyPadding: 5,
		fieldDefaults: {
			labelWidth: 55,
			anchor: '100%'
		},
		layout: {
			type: 'vbox',
			align: 'stretch'  
		},
		items: [{
			xtype: 'textfield',
			fieldLabel: i18n.gettext('Send To'),
			itemId: 'emailsendto',			
			allowBlank: false,								
			name: 'emailsendto'
		}, {
			xtype: 'textfield',
			fieldLabel: i18n.gettext('Subject'),
			itemId: 'emailsubject',	
			allowBlank: false,																					
			name: 'emailsubject'
		}, {
			xtype: 'textfield',
			fieldLabel: i18n.gettext('Picture'),
			itemId: 'emailpicture',					
			name: 'emailpicture',
			readOnly: true, 
			readOnlyCls: 'x-item-disabled'
		}, {
			xtype: 'textarea',
			fieldLabel: i18n.gettext('Message text'),
			hideLabel: true,
			itemId: 'emailcontent',		
			allowBlank: false,										
			name: 'emailcontent',
			style: 'margin:0', 
			flex: 1  
		}]		
	}],	
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		ui: 'footer',
		layout: {
			pack: 'center'
		},
		items: [{
			minWidth: 80,
			text: i18n.gettext('Send Email'),
			xtype: 'button',
			iconCls: 'icon-add',											
			action: 'sendEmail'
		},{
			minWidth: 80,
			text: i18n.gettext('Cancel'),
			xtype: 'button',
			iconCls: 'icon-delete',				
			action: 'closeEmail'
		}]
	}]
});






 





