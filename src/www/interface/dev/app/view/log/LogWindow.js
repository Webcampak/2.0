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
console.log('Log: Load: Webcampak.view.log.LogWindow');
Ext.define('Webcampak.view.log.LogWindow' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.logwindow',
		
	iconCls: 'icon-logs',  	
	title: i18n.gettext('Webcampak Logs'),
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
		xtype: 'logsourcelist'
	}, {
		flex: 1,
		xtype: 'tabpanel',
		itemId: 'logtabpanel',	
		title: i18n.gettext('Log of source ID: Name'),
		hidden: true,	
		items: [{
			title: i18n.gettext('Capture Logs'),
			scroll: true,
			autoScroll: true,
			itemId: 'logtabpanelcapture',				
			xtype: 'loglogfile',	
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				items: [{
					text: i18n.gettext('Refresh'),
					iconCls: 'icon-reload',
					xtype: 'button',
					action: 'reloadLogs'
				}] 
			}]
		}, {
			title: i18n.gettext('Daily Video logs'),
			scroll: true,
			autoScroll: true,
			itemId: 'logtabpanelvideos',				
			xtype: 'loglogfile',	
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				items: [{
					text: i18n.gettext('Refresh'),
					iconCls: 'icon-reload',					
					xtype: 'button',
					action: 'reloadLogs'
				}] 
			}]	
		},	 {
			title: i18n.gettext('Custom Video Logs'),
			scroll: true,
			autoScroll: true,
			itemId: 'logtabpanelcustomvideos',				
			xtype: 'loglogfile',	
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				items: [{
					text: i18n.gettext('Refresh'),
					iconCls: 'icon-reload',					
					xtype: 'button',
					action: 'reloadLogs'
				}] 
			}]		
		}, {
			title: i18n.gettext('Post-prod logs'),
			scroll: true,
			autoScroll: true,
			itemId: 'logtabpanelpostprodvideos',				
			xtype: 'loglogfile',	
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				items: [{
					text: i18n.gettext('Refresh'),
					iconCls: 'icon-reload',					
					xtype: 'button',
					action: 'reloadLogs'
				}] 
			}]			
		}, {
			title: i18n.gettext('Latest configuration changes'),
			scroll: true,
			autoScroll: true,
			itemId: 'logtabpaneledit',				
			xtype: 'loglogfile',	
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				items: [{
					text: i18n.gettext('Refresh'),
					iconCls: 'icon-reload',					
					xtype: 'button',
					action: 'reloadLogs'
				}] 
			}]			
		}]		
	}]
});




