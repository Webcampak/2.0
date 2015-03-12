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
console.log('Log: Load: Webcampak.controller.dashboard.SystemStats');
Ext.define('Webcampak.controller.dashboard.SystemStats', {
    extend: 'Ext.app.Controller',

	stores: [
		'dashboard.SystemStats',
		'permissions.sources.Sources'		
	],

	models: [
		'dashboard.SystemStats'	
	],

	views: [
		'dashboard.systemstats.SystemStatsWindow',
		'dashboard.systemstats.SystemStatsBandwidth',
		'dashboard.systemstats.SystemStatsMemory',
		'dashboard.systemstats.SystemStatsDisk',	
		'dashboard.systemstats.SystemStatsCPU'											
	],

	refs: [
		{ref: 'systemstatswindow', 		selector: 'systemstatswindow', 		autoCreate: true, 	xtype: 'systemstatswindow'},
		{ref: 'systemstatsbandwidth', 	selector: 'systemstatsbandwidth', 	autoCreate: true, 	xtype: 'systemstatsbandwidth'},
		{ref: 'systemstatsmemory', 		selector: 'systemstatsmemory', 	autoCreate: true, 	xtype: 'systemstatsmemory'},
		{ref: 'systemstatsdisk', 			selector: 'systemstatsdisk', 	autoCreate: true, 	xtype: 'systemstatsdisk'},
		{ref: 'systemstatscpu', 			selector: 'systemstatscpu', 	autoCreate: true, 	xtype: 'systemstatscpu'}					
	],	

	onLaunch: function() {
		console.log('Log: Controller->Dashboard->SystemStats: Controller onLaunch: function()');
/*
		//Show Files Graph window (stats about size of pictures per day)
		if(!this.getSystemstatswindow().isVisible()) {
			this.getSystemstatswindow().show();
			console.log('Log: Controller->Menu: openPhotos - getSourcepicturefileswindow().show()');	
		} else {
			this.getSystemstatswindow().hide();
			console.log('Log: Controller->Menu: openPhotos - getSourcepicturefileswindow().hide()');			
		}		
*/	
	},
    
	init: function() {
		console.log('Log: Controller->Dashboard->SystemStats: Controller init: function()');
		// Start listening for events on views
		this.control({			
			'systemstatswindow button[action=reload]': 		{click: 	this.reloadGraph},
			'systemstatswindow button[action=save]': 			{click: 	this.saveGraph},
			'systemstatswindow combo[action=updateRange]': 	{select: this.onUpdateRange}				
		});
	},

	loadGraphContent: function() {
		console.log('Log: Controller->Dashboard->SystemStats: loadGraphContent: function()');
	
	},

	onUpdateRange: function(selModel, selection) {
		console.log('Log: Controller->Dashboard->SystemStats: onUpdateRange: function()');
		console.log('Log: Controller->Dashboard->SystemStats: onUpdateRange: Selected range is:' + selection[0].get('name'));

		Ext.getStore('dashboard.SystemStats').getProxy().setExtraParam('range', selection[0].get('value'));		

		//Load the latest picture for the selected source
		this.getDashboardSystemStatsStore().on('load',this.loadGraphContent,this,{single:true});
		this.getDashboardSystemStatsStore().load();
	
	},

	reloadGraph: function() {
		console.log('Log: Controller->Dashboard->SystemStats: Controller reloadGraph: function()');
		this.getDashboardSystemStatsStore().load();		
	}
});
