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
console.log('Log: Load: WebcampakMobile.view.pictures.EmailWindow');
Ext.define('WebcampakMobile.view.pictures.EmailWindow', {

	extend: 'Ext.form.Panel',
	xtype: 'emailWindow',

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
		height: Ext.os.deviceType == 'Phone' ? 220 : 500,
		styleHtmlContent: true,			
		scrollable: true,
		items: [{
				xtype: 'container',	
				layout: 'hbox',
				width: 350,
				items: [{	
					xtype : 'button',
					align : 'left',
					ui    : 'action',
					id		: 'closeEmailButton',
					text  : i18n.gettext('Cancel')			
				}, {		
					xtype : 'spacer',
					flex: 1		
				}, {		
					xtype : 'button',
					align : 'right',
					ui    : 'action',
					id		: 'sendEmailButton',
					text  : i18n.gettext('Send')
				}]
			},	{			
				xtype: 'fieldset',
				defaults: {
					labelWidth: '35%',
					width: 350
				},
				title: i18n.gettext('Email'),
				items: [{
					xtype: 'emailfield',
					label: i18n.gettext('To'),
					name: 'emailsendto'
				}, {
					xtype: 'textfield',
					label: i18n.gettext('Subject'),
					name: 'emailsubject'
				}]
			},	{
				xtype: 'fieldset',
				defaults: {
					labelWidth: '35%',
					width: 350
				},
				title: i18n.gettext('Picture'),
				items: [{
					xtype: 'textfield',
					name: 'emailpicture',
					disabled: true
				}]
			},	{
				xtype: 'fieldset',
				title: i18n.gettext('Email Content'),
				defaults: {
					labelWidth: '35%',
					width: 350
				},
				items: [{
					xtype: 'textareafield',
					maxRows: 6,
					name: 'emailcontent'
				}]
		}],
		listeners: {
			delegate: 'textfield',
			keyup: 'onKeyUp'
		},
		record: null
	},


	updateRecord: function(newRecord) {
		console.log('Log: View->pictures->EmailWindow - updateRecord() function');    	    	    	    	    	    			
		this.setRecord(newRecord);
	},
	
	onKeyUp: function() {
		console.log('Log: View->pictures->EmailWindow - onKeyUp() function');    	    	    	    	    	    			    			
		this.fireEvent('change', this);
	}

});
