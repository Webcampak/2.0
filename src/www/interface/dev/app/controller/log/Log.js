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
console.log('Log: Load: Webcampak.controller.log.Log');
Ext.define('Webcampak.controller.log.Log', {
	extend: 'Ext.app.Controller',

	stores: [
		'permissions.sources.Sources',
		'log.LogFile'		
	],

	models: [			
		'permissions.Source',
		'log.LogFile'													
	],

	views: [
		'log.LogWindow',
		'log.SourcesList',
		'log.LogFile'
	],

	config: {
        sigpad: null
	},

	refs: [
		{ref: 'logWindow', 				selector: 'logwindow'}																																																																							
	],

	init: function() {
		console.log('Log: Controller->Log->Log: Controller init: function()');
		this.control({
			'logwindow': 										{resize: 			this.windowResize},
			'logsourcelist': 									{selectionchange:	this.onSourceSelect},
			'#logtabpanel': 									{tabchange: 		this.onTabSelected},				
			'logwindow button[action=reloadLogs]': 	{click: 				this.reloadLogs}
		});
	},
	windowResize: function() {
		console.log('Log: Controller->Log->Log: windowResize: function()');
	},

	reloadLogs: function() {
		console.log('Log: Controller->Log->Log: saveForm: function()');		
		if (this.getLogWindow().getComponent('logtabpanel').getActiveTab().initialConfig.itemId == "logtabpanelcapture") {
			console.log('Log: Controller->Log->Log: reloadLogs: - Reload capture logs');	
	     	Ext.getStore('log.LogFile').getProxy().setExtraParam('logfile', 'capture');
			this.getLogLogFileStore().on('load',this.loadCaptureTab,this,{single:true});
			this.getLogLogFileStore().load();
			
		} else if (this.getLogWindow().getComponent('logtabpanel').getActiveTab().initialConfig.itemId == "logtabpanelvideos") {
			console.log('Log: Controller->Log->Log: reloadLogs: - Reload videos logs');	
	     	Ext.getStore('log.LogFile').getProxy().setExtraParam('logfile', 'dailyvid');
			this.getLogLogFileStore().on('load',this.loadVideosTab,this,{single:true});
			this.getLogLogFileStore().load();	
			
		} else if (this.getLogWindow().getComponent('logtabpanel').getActiveTab().initialConfig.itemId == "logtabpanelcustomvideos") {
			console.log('Log: Controller->Log->Log: reloadLogs: - Reload custom videos logs');	
	     	Ext.getStore('log.LogFile').getProxy().setExtraParam('logfile', 'customvid');
			this.getLogLogFileStore().on('load',this.loadCustomVideosTab,this,{single:true});
			this.getLogLogFileStore().load();

		} else if (this.getLogWindow().getComponent('logtabpanel').getActiveTab().initialConfig.itemId == "logtabpanelpostprodvideos") {
			console.log('Log: Controller->Log->Log: reloadLogs: - Reload Post Prod videos logs');	
	     	Ext.getStore('log.LogFile').getProxy().setExtraParam('logfile', 'post');
			this.getLogLogFileStore().on('load',this.loadPostProdVideosTab,this,{single:true});
			this.getLogLogFileStore().load();	
		} else if (this.getLogWindow().getComponent('logtabpanel').getActiveTab().initialConfig.itemId == "logtabpaneledit") {
			console.log('Log: Controller->Log->Log: reloadLogs: - Reload Configuration changes (edit) logs');	
	     	Ext.getStore('log.LogFile').getProxy().setExtraParam('logfile', 'edit');
			this.getLogLogFileStore().on('load',this.loadEditTab,this,{single:true});
			this.getLogLogFileStore().load();	
		}
	},		
	
	onTabSelected: function(tabPanel, newCard, oldCard) {
		console.log('Log: Controller->Log->Log: onTabSelected: function()');
		this.getLogWindow().getComponent('logtabpanel').hide();
		this.loadTabContent(newCard.initialConfig.itemId);
	},	

	loadTabContent: function(selectedTab) {
		if (selectedTab == "logtabpanelcapture") {
			console.log('Log: Controller->Log->Log: loadTabContent: Loading Capture log content');
	     	Ext.getStore('log.LogFile').getProxy().setExtraParam('logfile', 'capture');
			this.getLogLogFileStore().on('load',this.loadCaptureTab,this,{single:true});
			this.getLogLogFileStore().load();
		} else if (selectedTab == "logtabpanelvideos") {
			console.log('Log: Controller->Log->Log: loadTabContent: Loading Videos log content');
	     	Ext.getStore('log.LogFile').getProxy().setExtraParam('logfile', 'dailyvid');
			this.getLogLogFileStore().on('load',this.loadVideosTab,this,{single:true});
			this.getLogLogFileStore().load();				
		} else if (selectedTab == "logtabpanelcustomvideos") {
			console.log('Log: Controller->Log->Log: loadTabContent: Loading Custom Videos log content');
	     	Ext.getStore('log.LogFile').getProxy().setExtraParam('logfile', 'customvid');
			this.getLogLogFileStore().on('load',this.loadCustomVideosTab,this,{single:true});
			this.getLogLogFileStore().load();
		} else if (selectedTab == "logtabpanelpostprodvideos") {
			console.log('Log: Controller->Log->Log: loadTabContent: Loading Custom Post-Prod Videos panel content');
	     	Ext.getStore('log.LogFile').getProxy().setExtraParam('logfile', 'post');
			this.getLogLogFileStore().on('load',this.loadPostProdVideosTab,this,{single:true});
			this.getLogLogFileStore().load();						
		}	else if (selectedTab == "logtabpaneledit") {
			console.log('Log: Controller->Log->Log: loadTabContent: Loading configuration changes content');
	     	Ext.getStore('log.LogFile').getProxy().setExtraParam('logfile', 'edit');
			this.getLogLogFileStore().on('load',this.loadEditTab,this,{single:true});
			this.getLogLogFileStore().load();						
		}			
	},	
	
	loadCaptureTab: function () {
		console.log('Log: Controller->Log->Log: loadCaptureTab: function()');
		//Display log bloc (hidden if no sources are selected)
		this.getLogWindow().getComponent('logtabpanel').show();
	},

	loadVideosTab: function () {
		console.log('Log: Controller->Log->Log: loadVideosTab: function()');
		//Display log bloc (hidden if no sources are selected)
		this.getLogWindow().getComponent('logtabpanel').show();
	},

	loadCustomVideosTab: function () {
		console.log('Log: Controller->Log->Log: loadCustomVideosTab: function()');
		//Display log bloc (hidden if no sources are selected)
		this.getLogWindow().getComponent('logtabpanel').show();
	},

	loadPostProdVideosTab: function () {
		console.log('Log: Controller->Log->Log: loadPostProdVideosTab: function()');
		//Display log bloc (hidden if no sources are selected)
		this.getLogWindow().getComponent('logtabpanel').show();
	},
	
	loadEditTab: function () {
		console.log('Log: Controller->Log->Log: loadEditTab: function()');
		//Display log bloc (hidden if no sources are selected)
		this.getLogWindow().getComponent('logtabpanel').show();
	},	

	onSourceSelect: function(selModel, selection) {
		console.log('Log: Controller->Log->Log: onSourceSelect: function()'); 
		if (selection == "") {
			console.log('Log: Controller->Log->Log: onSourceSelect: No source selected'); 
		} else {
			this.getLogWindow().getComponent('logtabpanel').setTitle(i18n.gettext('Log of') + ' ' + selection[0].get('name') + " (" + selection[0].get('sourceid') + ")");

			//Select Pictures tab by default when new source is selected			
			this.getLogWindow().getComponent('logtabpanel').setActiveTab('logtabpanelcapture');

	     	Ext.getStore('log.LogFile').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));
	     	Ext.getStore('log.LogFile').getProxy().setExtraParam('logfile', 'capture');
			this.getLogLogFileStore().on('load',this.loadCaptureTab,this,{single:true});
			this.getLogLogFileStore().load();
		}
	}
});
  
                  