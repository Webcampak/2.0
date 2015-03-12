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
console.log('Log: Load: Webcampak.view.systemconfiguration.ConfigurationWindow');
Ext.define('Webcampak.view.systemconfiguration.ConfigurationWindow' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.systemconfigurationwindow',
		
	iconCls: 'icon-configgeneral',  	
	title: i18n.gettext('Configure Webcampak system settings'),
	layout: 'fit',
	width: 600,
	height: 600, 
	maximizable: true,
	minimizable: true,
	closeAction : 'hide',
	scroll: true,
	autoScroll: true,	
	layout: {
		type:'hbox',
		align: 'stretch',
		pack: 'start'		
	},		
	items: [{
		flex: 1,
		xtype: 'tabpanel',
		itemId: 'systemconfigurationtabpanel',	
		hidden: true,	
		items: [{
			title: i18n.gettext('General'),
			scroll: true,
			autoScroll: true,
			itemId: 'systemconfigurationtabpanelgeneral',				
			xtype: 'form',	
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'bottom',
				items: [{
					text: i18n.gettext('Save'),
					iconCls: 'icon-add',					
					xtype: 'button',
					action: 'saveForm'
				}, '-', {
					text: i18n.gettext('Reset Form'),
					iconCls: 'icon-delete',					
					xtype: 'button',
					action: 'resetForm'
				}] 
			}],					
			items :[{
				title: i18n.gettext('Network'),
				xtype: 'systemconfigurationgeneralnetwork',
				margin: 5	
			}, {
				title: i18n.gettext('Timezone'),
				xtype: 'systemconfigurationgeneraltimezone',
				margin: 5
			}, {
				title: i18n.gettext('Gphoto'),
				xtype: 'systemconfigurationgeneralgphoto',
				margin: 5
			}, {
				title: i18n.gettext('Global FTP accound (resources)'),
				xtype: 'systemconfigurationgeneralftp',
				margin: 5	
			}, {
				title: i18n.gettext('Statistics'),
				xtype: 'systemconfigurationgeneralstatistics',
				margin: 5	
			}, {
				title: i18n.gettext('Phidget'),
				xtype: 'systemconfigurationgeneralphidget',
				margin: 5	
			}]		
		}, {
			title: i18n.gettext('Email'),
			scroll: true,
			autoScroll: true,
			itemId: 'systemconfigurationtabpanelemail',				
			xtype: 'form',	
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'bottom',
				items: [{
					text: i18n.gettext('Save'),
					iconCls: 'icon-add',					
					xtype: 'button',
					action: 'saveForm'
				}, '-', {
					text: i18n.gettext('Reset Form'),
					iconCls: 'icon-delete',					
					xtype: 'button',
					action: 'resetForm'
				}] 
			}],					
			items :[{
				title: i18n.gettext('Email Configuration'),
				xtype: 'systemconfigurationemailemail',
				margin: 5	
			}]		
		}]	
	}]
});




