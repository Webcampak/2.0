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
console.log('Log: Load: WebcampakMobile.view.pictures.CommentWindow');
Ext.define('WebcampakMobile.view.pictures.CommentWindow', {

	extend: 'Ext.form.Panel',
	xtype: 'commentWindow',

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
		scrollable: true,
		items: [{
				xtype: 'container',	
				width: 350,				
				layout: 'hbox',
				items: [{	
					xtype : 'button',
					align : 'left',
					ui    : 'action',
					id		: 'closeCommentButton',
					text  : i18n.gettext('Cancel')			
				}, {		
					xtype : 'spacer',
					flex: 1		
				}, {		
					xtype : 'button',
					align : 'right',
					ui    : 'action',
					id		: 'saveCommentButton',
					text  : i18n.gettext('Save')
				}]
			},	{
				xtype: 'fieldset',
				defaults: {
					labelWidth: '35%'
				},
				title: i18n.gettext('Picture'),
				items: [{
					xtype: 'textfield',
					name: 'picturetime',
					disabled: true,
					width: 350
				}]
			},	{
				xtype: 'fieldset',
				defaults: {
					labelWidth: '35%'
				},
				title: i18n.gettext('Comment'),
				items: [{
					xtype: 'textareafield',
					maxRows: 6,
					name: 'commentcontent',
					width: 350
				}]
		}],
		listeners: {
			delegate: 'textfield',
			keyup: 'onKeyUp'
		},
		record: null
	},


	updateRecord: function(newRecord) {
		console.log('Log: View->pictures->CommentWindow - updateRecord() function');    	    	    	    	    	    			
		this.setRecord(newRecord);
	},

	onKeyUp: function() {
		console.log('Log: View->pictures->CommentWindow - onKeyUp() function');    	    	    	    	    	    			    			
		this.fireEvent('change', this);
	}

});
