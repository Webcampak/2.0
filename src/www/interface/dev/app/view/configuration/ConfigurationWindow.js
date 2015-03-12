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
console.log('Log: Load: Webcampak.view.configuration.ConfigurationWindow');
Ext.define('Webcampak.view.configuration.ConfigurationWindow' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.configurationwindow',
		
	iconCls: 'icon-settings',  	
	title: i18n.gettext('Manage Webcampak Sources settings'),
	layout: 'fit',
	width: 1000,
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
		width: 300,
		title: i18n.gettext('Sources'),		
		xtype: 'configurationsourcelist'
	}, {
		flex: 1,
		xtype: 'tabpanel',
		itemId: 'configurationtabpanel',	
		title: i18n.gettext('Configuration of source ID: Name'),
		hidden: true,	
		items: [{
			title: i18n.gettext('Capture'),
			scroll: true,
			autoScroll: true,
			itemId: 'configurationtabpanelcapture',				
			xtype: 'form',					
			items :[{
				title: i18n.gettext('Source configuration'),
				xtype: 'configcapturesource',
				margin: 5			
			}, {
				title: i18n.gettext('Capture calendar'),
				xtype: 'configcapturecalendar',
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				itemId: 'configurationtabpanelcaptureinstantcapture',								
				title: i18n.gettext('Instant Capture'),
				xtype: 'configcaptureinstantcapture',		
				margin: 5,
				collapsible: true,
				collapsed: true				
			}, {
				title: i18n.gettext('Configuration of "<u>Compact or DSLR USB Camera (Gphoto2 PTP mode)</u>"'),
				xtype: 'configcapturegphoto',
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Configuration of "<u>Webcampak Source</u>"'),
				xtype: 'configcapturewpaksource',
				margin: 5,				
				collapsible: true,
				collapsed: true				
			}, {				
				title: i18n.gettext('Configuration of "<u>USB Webcam</u>"'),
				xtype: 'configcapturewebcam',
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Configuration of "<u>IP Camera (FTP) / Webcampak</u>"'),
				xtype: 'configcaptureipcamera',				
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Configuration of "<u>Internet Picture</u>" or "<u>Video Streaming</u>"'),	
				xtype: 'configcapturewebfile',	
				margin: 5,				
				collapsible: true,
				collapsed: true
				
			}, {
				title: i18n.gettext('Configuration of "<u>Sensor (Phidget)</u>"'),
				itemId: 'configurationtabpanelcapturephidget',				
				xtype: 'fieldset',
				margin: 5,				
				collapsible: true,
				collapsed: true,	
				items :[{
					xtype: 'configcapturephidget'
				}]
			}]			
		}, {
			title: i18n.gettext('Pictures'),
			scroll: true,
			autoScroll: true,
			itemId: 'configurationtabpanelpictures',				
			xtype: 'form',						
			items :[{
				title: i18n.gettext('Rotate picture'),
				xtype: 'configpicturesrotate',
				margin: 5,		
				collapsible: true,
				collapsed: true						
			}, {
				title: i18n.gettext('Crop picture'),
				xtype: 'configpicturescrop',
				margin: 5,		
				collapsible: true,
				collapsed: true						
			}, {
				title: i18n.gettext('Insert Watermark'),
				xtype: 'configpictureswatermark',
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Insert Text'),
				xtype: 'configpicturestext',
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Static pictures (hotlink)'),
				xtype: 'configpictureshotlink',
				margin: 5,				
				collapsible: true
			}, {
				title: i18n.gettext('Archives'),
				xtype: 'configpicturesarchive',				
				margin: 5,				
				collapsible: true,
				collapsed: false
			}, {
				title: i18n.gettext('Send pictures via FTP'),	
				xtype: 'configpicturesftp',	
				margin: 5,				
				collapsible: true
			}, {
				title: i18n.gettext('Copy pictures internally'),	
				xtype: 'configpicturessourcecopy',	
				margin: 5,
				collapsed: true,								
				collapsible: true				
			}]				
		},	 {
			title: i18n.gettext('Videos'),
			scroll: true,
			autoScroll: true,
			itemId: 'configurationtabpanelvideos',				
			xtype: 'form',					
			items :[{
				title: i18n.gettext('Daily video creation'),
				xtype: 'configvideosvideocreation',
				margin: 5,		
				collapsible: true
			}, {
				title: i18n.gettext('Advanced video settings'),
				xtype: 'configvideosvideocreationadvanced',
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Filter similar pictures'),
				xtype: 'configvideosfilter',
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Insert Watermark'),
				xtype: 'configvideoswatermark',
				margin: 5,				
				collapsible: true
			}, {
				title: i18n.gettext('Pre-processing manipulations (advanced)'),
				xtype: 'configvideospreprocess',				
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Add an audio file'),	
				xtype: 'configvideosaudio',	
				margin: 5,				
				collapsible: true,
				collapsed: true				
			}, {
				title: i18n.gettext('Upload to youtube'),	
				xtype: 'configvideosyoutube',	
				margin: 5,				
				collapsible: true,
				collapsed: true				
			}, {
				title: i18n.gettext('Send videos via FTP'),	
				xtype: 'configvideosftp',	
				margin: 5,				
				collapsible: true
			}]				
		}, {
			title: i18n.gettext('Custom Vids.'),
			scroll: true,
			autoScroll: true,
			itemId: 'configurationtabpanelcustomvideos',				
			xtype: 'form',						
			items :[{
				title: i18n.gettext('Video settings'),
				xtype: 'configvideosvideocreation',
				margin: 5,		
				collapsible: true
			}, {
				title: i18n.gettext('Advanced video settings'),
				xtype: 'configvideosvideocreationadvanced',
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Filter similar pictures'),
				xtype: 'configvideosfilter',
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Insert Watermark'),
				xtype: 'configvideoswatermark',
				margin: 5,				
				collapsible: true
			}, {
				title: i18n.gettext('Pre-processing manipulations (advanced)'),
				xtype: 'configvideospreprocess',				
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Add an audio file'),	
				xtype: 'configvideosaudio',	
				margin: 5,				
				collapsible: true,
				collapsed: true				
			}, {
				title: i18n.gettext('Upload to youtube'),	
				xtype: 'configvideosyoutube',	
				margin: 5,				
				collapsible: true,
				collapsed: true				
			}, {
				title: i18n.gettext('Create a custom video'),	
				xtype: 'configcustomvideoscreate',	
				margin: 5,				
				collapsible: true
			}]							
		}, {
			title: i18n.gettext('Post-prod Vids.'),
			scroll: true,
			autoScroll: true,
			itemId: 'configurationtabpanelpostprodvideos',				
			xtype: 'form',						
			items :[{
				title: i18n.gettext('Filter similar pictures'),
				xtype: 'configvideosfilter',
				margin: 5,		
				collapsible: true,
				collapsed: true				
			}, {
				title: i18n.gettext('Rotate picture'),
				xtype: 'configpicturesrotate',
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Zone selection within source picture (Crop)'),
				xtype: 'configpicturescrop',
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Activate transition (from Crop selection)'),
				xtype: 'configpostprodvideostransition',
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Resize Pictures'),
				xtype: 'configpostprodvideosresize',
				margin: 5,				
				collapsible: true,
				collapsed: true				
			}, {
				title: i18n.gettext('Add an effect'),
				xtype: 'configpostprodvideoseffect',				
				margin: 5,				
				collapsible: true,
				collapsed: true
			}, {
				title: i18n.gettext('Insert a Thumbnail'),	
				xtype: 'configpostprodvideosthumbnail',	
				margin: 5,				
				collapsible: true,
				collapsed: true				
			}, {
				title: i18n.gettext('Insert Watermark'),	
				xtype: 'configvideoswatermark',	
				margin: 5,				
				collapsible: true,
				collapsed: true				
			}, {
				title: i18n.gettext('Insert a legend'),	
				xtype: 'configpostprodvideostext',	
				margin: 5,				
				collapsible: true,
				collapsed: true				
			}, {
				title: i18n.gettext('Prepare Post-Prod pictures'),	
				xtype: 'configpostprodvideosprepare',	
				margin: 5,				
				collapsible: true
			}]					
		}, {
			title: i18n.gettext('Advanced'),
			scroll: true,
			autoScroll: true,
			itemId: 'configurationtabpaneladvanced',				
			xtype: 'form',						
			items :[{
				title: i18n.gettext('Configuration of local FTP account'),
				xtype: 'configadvancedlocalftp',
				margin: 5,		
				collapsible: true
			}, {
				title: i18n.gettext('Emails'),
				xtype: 'configadvancedemail',
				margin: 5,				
				collapsible: true
			}, {
				title: i18n.gettext('Phidget board'),
				xtype: 'configadvancedphidget',
				margin: 5,				
				collapsible: true
			}]
		}, {
			title: i18n.gettext('FTP Servers'),
			scroll: true,
			autoScroll: true,
			itemId: 'configurationtabpanelftpservers',				
			xtype: 'configurationftpserverslist',
			dockedItems: [{
				xtype: 'toolbar',
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




