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
console.log('Log: Load: Webcampak.controller.dashboard.SourceDiskUsage');
Ext.define('Webcampak.controller.dashboard.SourceDiskUsage', {
    extend: 'Ext.app.Controller',

	stores: [
		'dashboard.SourceDiskUsage',
		'permissions.sources.Sources'
	],

	models: [
		'dashboard.SourceDiskUsage'	
	],

	views: [
		'dashboard.sourcediskusage.SourceDiskUsageWindow',
		'dashboard.sourcediskusage.SourceDiskUsage',
		'dashboard.sourcediskusage.SourcesList'	
	],

	refs: [
		{ref: 'sourcediskusagewindow', 		selector: 'sourcediskusagewindow', 		xtype: 'sourcediskusagewindow'},
		{ref: 'sourcediskusage', 				selector: 'sourcediskusage', 				xtype: 'sourcediskusage'},
		{ref: 'statssourceslist', 				selector: 'statssourceslist', 			xtype: 'statssourceslist'}		
	],	

	onLaunch: function() {
		console.log('Log: Controller->Dashboard->SourceDiskUsage: Controller onLaunch: function()');


/*
		//Show Files Graph window (stats about size of pictures per day)
		if(!this.getSourcediskusagewindow().isVisible()) {
			this.getSourcediskusagewindow().show();
			console.log('Log: Controller->Menu: openPhotos - getSourcepicturefileswindow().show()');	
			//Load the sources store
			this.getPermissionsSourcesSourcesStore().on('load',this.loadGraphContent,this,{single:true});
			this.getPermissionsSourcesSourcesStore().load();
		} else {
			this.getSourcediskusagewindow().hide();
			console.log('Log: Controller->Menu: openPhotos - getSourcepicturefileswindow().hide()');			
		}		
*/	
	},
    
	init: function() {
		console.log('Log: Controller->Dashboard->SourceDiskUsage: Controller init: function()');
		// Start listening for events on views
		this.control({			
			'sourcediskusagewindow button[action=reload]': 			{click: 	this.reloadGraph},
			'sourcediskusagewindow button[action=save]': 			{click: 	this.saveGraph},
			'statssourceslist': 												{select: this.onSourceSelected},	
			'sourcediskusagewindow combo[action=updateRange]': 	{select: this.onUpdateRange},
			'sourcediskusagewindow': 										{resize: this.windowResize}												
		});
	},

	loadGraphContent: function() {
		console.log('Log: Controller->Dashboard->SourceDiskUsage: loadGraphContent: function()');
	},

	windowResize: function() {
		console.log('Log: Controller->Dashboard->SourceDiskUsage: windowResize: function()');	
		this.getSourcediskusage().axes.items[1].setTitle(Ext.getStore('permissions.sources.Sources').first().get('name'));
		Ext.getStore('dashboard.SourceDiskUsage').getProxy().setExtraParam('sourceid', Ext.getStore('permissions.sources.Sources').first().get('sourceid'));	

		//Load the latest picture for the selected source
		this.getDashboardSourceDiskUsageStore().on('load',this.loadGraphContent,this,{single:true});
		this.getDashboardSourceDiskUsageStore().load();					
	},
	
	onUpdateRange: function(selModel, selection) {
		console.log('Log: Controller->Dashboard->SourceDiskUsage: onUpdateRange: function()');
		console.log('Log: Controller->Dashboard->SourceDiskUsage: onUpdateRange: Selected range is:' + selection[0].get('name'));

		Ext.getStore('dashboard.SourceDiskUsage').getProxy().setExtraParam('range', selection[0].get('value'));		

		//Load the latest picture for the selected source
		this.getDashboardSourceDiskUsageStore().on('load',this.loadGraphContent,this,{single:true});
		this.getDashboardSourceDiskUsageStore().load();
	
	},

	onSourceSelected: function(selModel, selection) {
		console.log('Log: Controller->Dashboard->SourceDiskUsage: onSourceSelected: function()'); 
		console.log('Log: Controller->Dashboard->SourceDiskUsage: onSourceSelected: Selected name is:' + selection[0].get('name'));
		console.log('Log: Controller->Dashboard->SourceDiskUsage: onSourceSelected: Selected Sourceid is:' + selection[0].get('sourceid'));	
		Ext.getStore('dashboard.SourceDiskUsage').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));		

		//Set Sourcename as the title		
//		this.getSourcediskusagewindow().setTitle(i18n.gettext('Graph: Disk usage per source') + " (" + selection[0].get('name') + ")");
		this.getSourcediskusage().axes.items[1].setTitle(selection[0].get('name'));
				

		//Load the latest picture for the selected source
		this.getDashboardSourceDiskUsageStore().on('load',this.loadGraphContent,this,{single:true});
		this.getDashboardSourceDiskUsageStore().load();
	},



	reloadGraph: function() {
		console.log('Log: Controller->Dashboard->SourceDiskUsage: Controller reloadGraph: function()');
		this.getDashboardSourceDiskUsageStore().load();		
	},
	
	saveGraph: function() {
		console.log('Log: Controller->Dashboard->SourceDiskUsage: Controller saveGraph: function()');
		currentChart = this.getSourcediskusage();
		Ext.MessageBox.confirm(i18n.gettext('Confirm Download'), i18n.gettext('Would you like to download the chart as an image?'), function(choice){
			if(choice == 'yes'){
				currentChart.save({
					type: 'image/png'
				});
			}
		});		
	}
});
