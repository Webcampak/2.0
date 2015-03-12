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
console.log('Log: Load: Webcampak.view.cloudconfiguration.ConfigurationWindow');
Ext.define('Webcampak.view.cloudconfiguration.ConfigurationWindow' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.cloudconfigurationwindow',
		
	iconCls: 'icon-cloudconfiguration',  	
	title: i18n.gettext('Configure your cloud settings'),
	layout: 'fit',
	width: 1000,
	height: 650,
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
		width: 300,
		title: i18n.gettext('Sources'),		
		xtype: 'cloudconfigurationsourcelist',
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			items: [{		
				text: i18n.gettext('Refresh'),
				iconCls: 'icon-reload',					
				xtype: 'button',
				action: 'reloadSources'
			}] 
		}]			
	}, {
		flex: 1,
		xtype: 'tabpanel',
		itemId: 'cloudconfigurationtabpanel',	
		title: i18n.gettext('Configuration of source ID: Name'),
		hidden: true,	
		dockedItems: [{
			xtype: 'panel',
			itemId: 'cloudconfigurationtabpanelreadonly',
			title: i18n.gettext('Your current permissions (Read-Only) do not allow you to update configuration'),			
			hidden: true,							
			dock: 'bottom'
		}],			
		items: [{
			title: i18n.gettext('Capture'),
			scroll: true,
			autoScroll: true,
			itemId: 'cloudconfigurationtabpanelcapture',				
			xtype: 'form',	
/*			dockedItems: [{
				xtype: 'toolbar',
				itemId: 'cloudconfigurationtabpanelcapturebuttons',
				hidden: true,							
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
			}],	*/							
			items :[{
				title: i18n.gettext('Source configuration'),
				xtype: 'cloudconfigcapturesource',
				margin: 5	
			}, {
				title: i18n.gettext('Capture calendar'),
				xtype: 'cloudconfigcapturecalendar',
				margin: 5
			}, {
				itemId: 'cloudconfigurationtabpanelcaptureinstantcapture',								
				title: i18n.gettext('Instant Capture'),
				hidden: true,
				xtype: 'cloudconfigcaptureinstantcapture',		
				margin: 5
			}]			
		}, {
			title: i18n.gettext('Pictures'),
			scroll: true,
			autoScroll: true,
			itemId: 'cloudconfigurationtabpanelpictures',				
			xtype: 'form',	
/*			dockedItems: [{
				xtype: 'toolbar',
				itemId: 'cloudconfigurationtabpanelpicturesbuttons',								
				hidden: true,							
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
			}],*/					
			items :[{
				title: i18n.gettext('Rotate picture'),
				xtype: 'cloudconfigpicturesrotate',
				margin: 5,		
				collapsible: true,
				collapsed: true						
			}, {				
				title: i18n.gettext('Crop picture'),
				xtype: 'cloudconfigpicturescrop',
				margin: 5,		
				collapsible: true,
				collapsed: true						
			}, {
				title: i18n.gettext('Insert Watermark'),
				xtype: 'cloudconfigpictureswatermark',
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Insert Text'),
				xtype: 'cloudconfigpicturestext',
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Static pictures (hotlink)'),
				xtype: 'cloudconfigpictureshotlink',
				margin: 5,				
				collapsible: true
			}, {
				title: i18n.gettext('Send pictures via FTP'),	
				xtype: 'cloudconfigpicturesftp',	
				margin: 5,				
				collapsible: true
			}]				
		},	 {
			title: i18n.gettext('Videos'),
			scroll: true,
			autoScroll: true,
			itemId: 'cloudconfigurationtabpanelvideos',				
			xtype: 'form',	
/*			dockedItems: [{
				xtype: 'toolbar',
				itemId: 'cloudconfigurationtabpanelvideosbuttons',								
				hidden: true,							
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
			}],	*/				
			items :[{
				title: i18n.gettext('Daily video creation'),
				xtype: 'cloudconfigvideosvideocreation',
				margin: 5,		
				collapsible: true
			}, {
				title: i18n.gettext('Advanced video settings'),
				xtype: 'cloudconfigvideosvideocreationadvanced',
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Insert Watermark'),
				xtype: 'cloudconfigvideoswatermark',
				margin: 5,				
				collapsible: true
			}, {
				title: i18n.gettext('Insert Text'),
				xtype: 'cloudconfigvideospreprocess',				
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Insert Soundtrack'),	
				xtype: 'cloudconfigvideosaudio',	
				margin: 5,				
				collapsible: true,
				collapsed: true		
			}, {
				title: i18n.gettext('Send videos via FTP'),	
				xtype: 'cloudconfigvideosftp',	
				margin: 5,				
				collapsible: true
			}]				
		}, {
			title: i18n.gettext('Custom Vids.'),
			scroll: true,
			autoScroll: true,
			itemId: 'cloudconfigurationtabpanelcustomvideos',				
			xtype: 'form',	
/*			dockedItems: [{
				xtype: 'toolbar',
				itemId: 'cloudconfigurationtabpanelcustomvideosbuttons',								
				hidden: true,							
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
			}],*/					
			items :[{
				title: i18n.gettext('Video settings'),
				xtype: 'cloudconfigvideosvideocreation',
				margin: 5,		
				collapsible: true
			}, {
				title: i18n.gettext('Advanced video settings'),
				xtype: 'cloudconfigvideosvideocreationadvanced',
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Insert Watermark'),
				xtype: 'cloudconfigvideoswatermark',
				margin: 5,				
				collapsible: true
			}, {
				title: i18n.gettext('Insert Text'),
				xtype: 'cloudconfigvideospreprocess',				
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Insert Soundtrack'),	
				xtype: 'cloudconfigvideosaudio',	
				margin: 5,				
				collapsible: true,
				collapsed: true			
			}, {
				title: i18n.gettext('Create a custom video'),	
				xtype: 'cloudconfigcustomvideoscreate',	
				margin: 5,				
				collapsible: true
			}]				
		}, {
			title: i18n.gettext('Advanced'),
			scroll: true,
			autoScroll: true,
			itemId: 'cloudconfigurationtabpaneladvanced',				
			xtype: 'form',	
/*			dockedItems: [{
				xtype: 'toolbar',
				itemId: 'cloudconfigurationtabpaneladvancedbuttons',								
				hidden: true,							
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
			}],	*/				
			items :[{
				title: i18n.gettext('Configuration of local FTP account'),
				xtype: 'cloudconfigadvancedlocalftp',
				margin: 5,		
				collapsible: true
			}, {
				title: i18n.gettext('Emails'),
				xtype: 'cloudconfigadvancedemail',
				margin: 5,				
				collapsible: true
			}]
		}, {
			title: i18n.gettext('FTP Servers'),
			scroll: true,
			autoScroll: true,
			itemId: 'cloudconfigurationtabpanelftpservers',				
			xtype: 'cloudconfigurationftpserverslist',
			dockedItems: [{
				xtype: 'toolbar',
				itemId: 'cloudconfigurationtabpanelftpserversbuttons',
				hidden: true,							
				dock: 'bottom',
				items: [{
					text: i18n.gettext('Add FTP Server'),
					iconCls: 'icon-add',					
					xtype: 'button',
					action: 'openAddFTPServerWindow'
				}, '-', {
					text: i18n.gettext('Delete FTP Server'),
					iconCls: 'icon-delete',					
					xtype: 'button',
					action: 'deleteFTPServer'
				}] 
			}]			
		}],
		dockedItems: [{
			xtype: 'toolbar',
			itemId: 'saveToolbar',		
			hidden: true,									
			dock: 'bottom',
			items: [{
				text: i18n.gettext('Save'),
				itemId: 'saveForm',								
				iconCls: 'icon-add',
				disabled: true,
				xtype: 'button',
				action: 'saveForm'
			}, '-', {
				text: i18n.gettext('Reset Form'),
				iconCls: 'icon-delete',					
				xtype: 'button',
				action: 'resetForm'
			}] 
		}]				
	}]
});




