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
console.log('Log: Load: Webcampak.controller.system.System');
Ext.define('Webcampak.controller.system.System', {
	extend: 'Ext.app.Controller',

	stores: [
		'system.SystemGeneral',	
		'system.SystemEmail',			
		'configuration.Timezone'				
	],

	models: [			
		'system.SystemGeneral',	
		'system.SystemEmail',
		'configuration.Timezone'															
	],

	views: [
		'systemconfiguration.ConfigurationWindow',	
		'systemconfiguration.general.FTP',
		'systemconfiguration.general.Gphoto',
		'systemconfiguration.general.Network',
		'systemconfiguration.general.Statistics',
		'systemconfiguration.general.Timezone',
		'systemconfiguration.general.Phidget',		
		'systemconfiguration.email.Email',
		'configuration.capture.Timezone'	
	],

	config: {
        sigpad: null
	},

	refs: [
		{ref: 'systemconfigurationgeneralstatistics', 	selector: 'systemconfigurationgeneralstatistics'},	
		{ref: 'systemconfigurationgeneralphidget', 	selector: 'systemconfigurationgeneralphidget'},			
		{ref: 'systemconfigurationgeneralftp',				selector: 'systemconfigurationgeneralftp'},
		{ref: 'systemconfigurationgeneralgphoto',			selector: 'systemconfigurationgeneralgphoto'},
		{ref: 'systemconfigurationgeneralnetwork',		selector: 'systemconfigurationgeneralnetwork'},
		{ref: 'systemconfigurationgeneraltimezone',		selector: 'systemconfigurationgeneraltimezone'},
		{ref: 'systemconfigurationemailemail',				selector: 'systemconfigurationemailemail'},		
		{ref: 'systemconfigurationwindow',					selector: 'systemconfigurationwindow'}																																																																					
	],

	init: function() {
		console.log('Log: Controller->System->systemconfiguration: Controller init: function()');
		this.control({
			'systemconfigurationwindow': 										{resize: 			this.windowResize			},
			'#systemconfigurationtabpanel': 									{tabchange: 		this.onTabSelected		},				
			'systemconfigurationwindow button[action=saveForm]': 		{click: 				this.saveForm				},
			'systemconfigurationwindow button[action=resetForm]': 	{click: 				this.resetForm				}						
		});
	},
	windowResize: function() {
		console.log('Log: Controller->System->systemconfiguration: windowResize: function()');
		this.getSystemSystemGeneralStore().on('load',this.loadGeneralTab,this,{single:true});
		this.getSystemSystemGeneralStore().load();		
		
	},

	onTabSelected: function(tabPanel, newCard, oldCard) {
		console.log('Log: Controller->Configuration->Configuration: onTabSelected: function()');
		this.getSystemconfigurationwindow().getComponent('systemconfigurationtabpanel').hide();
		this.loadTabContent(newCard.initialConfig.itemId);
	},	

	resetForm: function() {
		console.log('Log: Controller->System->systemconfiguration: resetForm: function()');
		this.loadTabContent(this.getSystemconfigurationwindow().getComponent('systemconfigurationtabpanel').getActiveTab().initialConfig.itemId);		
	},	

	loadTabContent: function(selectedTab) {
		console.log('Log: Controller->System->systemconfiguration: loadTabContent: function()');		
		if (selectedTab == "systemconfigurationtabpanelgeneral") {
			console.log('Log: Controller->System->systemconfiguration: loadTabContent: Loading General panel content');		
	     	this.getSystemSystemGeneralStore().on('load',this.loadGeneralTab,this,{single:true});
			this.getSystemSystemGeneralStore().load();	
		} else if (selectedTab == "systemconfigurationtabpanelemail") {
			console.log('Log: Controller->System->systemconfiguration: loadTabContent: Loading Email panel content');		
	     	this.getSystemSystemEmailStore().on('load',this.loadEmailTab,this,{single:true});
			this.getSystemSystemEmailStore().load();	
		}
	},	
	
	loadGeneralTab: function () {
		console.log('Log: Controller->System->systemconfiguration: loadGeneralTab: function()');
		this.getSystemconfigurationwindow().getComponent('systemconfigurationtabpanel').show();
		
		//Load store into the form
		currentConfig = this.getSystemSystemGeneralStore().last();
		this.getSystemconfigurationwindow().getComponent('systemconfigurationtabpanel').getComponent('systemconfigurationtabpanelgeneral').loadRecord(currentConfig);
	},

	loadEmailTab: function () {
		console.log('Log: Controller->System->systemconfiguration: loadEmailTab: function()');
		this.getSystemconfigurationwindow().getComponent('systemconfigurationtabpanel').show();
		
		//Load store into the form
		currentConfig = this.getSystemSystemEmailStore().last();
		this.getSystemconfigurationwindow().getComponent('systemconfigurationtabpanel').getComponent('systemconfigurationtabpanelemail').loadRecord(currentConfig);
	},

	saveForm: function() {
		console.log('Log: Controller->System->systemconfiguration: saveForm: function()');
		if (this.getSystemconfigurationwindow().getComponent('systemconfigurationtabpanel').getActiveTab().initialConfig.itemId == "systemconfigurationtabpanelgeneral") {
			console.log('Log: Controller->System->systemconfiguration: saveForm: - Saving content from General tab');			
			//this.getSystemSystemGeneralStore().on('insert',this.loadTabContent('systemconfigurationtabpanelgeneral'),this,{single:true});
			this.getSystemSystemGeneralStore().insert(0, this.getSystemconfigurationwindow().getComponent('systemconfigurationtabpanel').getComponent('systemconfigurationtabpanelgeneral').getValues());
		}
		if (this.getSystemconfigurationwindow().getComponent('systemconfigurationtabpanel').getActiveTab().initialConfig.itemId == "systemconfigurationtabpanelemail") {
			console.log('Log: Controller->System->systemconfiguration: saveForm: - Saving content from General tab');				
			//this.getSystemSystemEmailStore().on('insert',this.loadTabContent('systemconfigurationtabpanelemail'),this,{single:true});
			this.getSystemSystemEmailStore().insert(0, this.getSystemconfigurationwindow().getComponent('systemconfigurationtabpanel').getComponent('systemconfigurationtabpanelemail').getValues());
		}		
	}
		
});
  
                  