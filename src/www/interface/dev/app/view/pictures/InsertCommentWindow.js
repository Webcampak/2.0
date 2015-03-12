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
console.log('Log: Load: Webcampak.view.pictures.InsertCommentWindow');
Ext.define('Webcampak.view.pictures.InsertCommentWindow' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.picturesinsertcommentwindow',
	
	iconCls: 'icon-photos',  	
	title: i18n.gettext('Comment a picture'),
	maximizable: true,
	width: 400,
	height: 300,
	minWidth: 300,
	minHeight: 200,
	layout: 'fit',
	items: [{
		xtype: 'form',
		itemId: 'commentpanel',		
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
			fieldLabel: i18n.gettext('Picture'),
			itemId: 'commentpicture',					
			name: 'commentpicture',
			readOnly: true, 
			readOnlyCls: 'x-item-disabled'
		}, {
			xtype: 'textarea',
			fieldLabel: i18n.gettext('Message text'),
			hideLabel: true,
			itemId: 'commentcontent',								
			name: 'commentcontent',
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
			text: i18n.gettext('Save'),
			xtype: 'button',
			iconCls: 'icon-add',								
			action: 'saveComment'
		},{
			minWidth: 80,
			text: i18n.gettext('Cancel'),
			xtype: 'button',
			iconCls: 'icon-delete',								
			action: 'closeComment'
		},{
			minWidth: 80,
			text: i18n.gettext('Delete Comment'),
			xtype: 'button',
			iconCls: 'icon-recycle',								
			action: 'deleteComment'
		}]
	}]
});






 





