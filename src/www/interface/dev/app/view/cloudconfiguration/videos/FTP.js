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
console.log('Log: Load: Webcampak.view.cloudconfiguration.videos.FTP');
Ext.define('Webcampak.view.cloudconfiguration.videos.FTP' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.cloudconfigvideosftp',

	layout: 'fit',
	items   : [{
			xtype: 'container',
			layout: {type:'hbox',	align: 'stretch',		pack: 'start'},				
			items   : [
				{width: 180,	xtype: 'label',							html: i18n.gettext('Send AVI video files to:'), 	padding: 2	}, 			
				{flex: 1,		xtype: 'cloudconfigpicturesftpserver', 	name: 'cfgftpmainserveraviid'}, 
				{width: 100,	xtype: 'label',							html: i18n.gettext('Number of retry:'), 	padding: 2	}, 						
				{width: 50,		xtype: 'numberfield', 					name : 'cfgftpmainserveraviretry', minValue: 0, maxValue: 4, allowBlank: false}
			]			
	},	{
			xtype: 'container',
			layout: {type:'hbox',	align: 'stretch',		pack: 'start'},	
			items   : [
				{width: 180,	xtype: 'label',							html: i18n.gettext('Send MP4 video files to:'), 	padding: 2	}, 			
				{flex: 1,		xtype: 'cloudconfigpicturesftpserver', 	name: 'cfgftpmainservermp4id'}, 
				{width: 100,	xtype: 'label',							html: i18n.gettext('Number of retry:'), 	padding: 2	}, 						
				{width: 50,		xtype: 'numberfield', 					name : 'cfgftpmainservermp4retry', minValue: 0, maxValue: 4, allowBlank: false}
			]		
	},	{
			xtype: 'container',
			layout: {type:'hbox',	align: 'stretch',		pack: 'start'},	
			items   : [
				{width: 180,	xtype: 'label',							html: i18n.gettext('Send hotlink AVI video files to:'), 	padding: 2	}, 			
				{flex: 1,		xtype: 'cloudconfigpicturesftpserver', 	name: 'cfgftphotlinkserveraviid'}, 
				{width: 100,	xtype: 'label',							html: i18n.gettext('Number of retry:'), 	padding: 2	}, 						
				{width: 50,		xtype: 'numberfield', 					name : 'cfgftphotlinkserveraviretry', minValue: 0, maxValue: 4, allowBlank: false}
			]	
	},	{
			xtype: 'container',
			layout: {type:'hbox',	align: 'stretch',		pack: 'start'},		
			items   : [
				{width: 180,	xtype: 'label',							html: i18n.gettext('Send hotlink MP4 video files to:'), 	padding: 2	}, 			
				{flex: 1,		xtype: 'cloudconfigpicturesftpserver', 	name: 'cfgftphotlinkservermp4id'}, 
				{width: 100,	xtype: 'label',							html: i18n.gettext('Number of retry:'), 	padding: 2	}, 						
				{width: 50,		xtype: 'numberfield', 					name : 'cfgftphotlinkservermp4retry', minValue: 0, maxValue: 4, allowBlank: false}
			]
	}]
});

