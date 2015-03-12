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
console.log('Log: Load: Webcampak.controller.dashboard.SourcePictureFiles');
Ext.define('Webcampak.controller.dashboard.SourcePictureFiles', {
    extend: 'Ext.app.Controller',

	stores: [
		'dashboard.SourcePictureFiles',
		'permissions.sources.Sources'		
	],

	models: [
		'dashboard.SourcePictureFiles',
		'permissions.Source'		
	],

	views: [
		'dashboard.sourcepicturefiles.SourcePictureFilesWindow',
		'dashboard.sourcepicturefiles.SourcePictureFiles',
		'dashboard.sourcepicturefiles.SourcesList'			
	],

	refs: [
		{ref: 'sourcepicturefileswindow', 		selector: 'sourcepicturefileswindow', 		autoCreate: true, 	xtype: 'sourcepicturefileswindow'},
		{ref: 'sourcepicturefiles', 				selector: 'sourcepicturefiles', 				autoCreate: true, 	xtype: 'sourcepicturefiles'}
	],	

	onLaunch: function() {
		console.log('Log: Controller->Dashboard->SourcePictures: Controller onLaunch: function()');

/*
		//Show Files Graph window (stats about number of pictures per source per day)
		if(!this.getSourcepicturefileswindow().isVisible()) {
			this.getSourcepicturefileswindow().show();
			console.log('Log: Controller->Menu: openPhotos - getSourcepicturefileswindow().show()');	
			//Load the sources store
			this.getPermissionsSourcesSourcesStore().on('load',this.loadGraphContent,this,{single:true});
			this.getPermissionsSourcesSourcesStore().load();
		} else {
			this.getSourcepicturefileswindow().hide();
			console.log('Log: Controller->Menu: openPhotos - getSourcepicturefileswindow().hide()');			
		}		
*/	
	},
    
	init: function() {
		console.log('Log: Controller->Dashboard->SourcePicturesFiles: Controller init: function()');
		// Start listening for events on views
		this.control({			
			'sourcepicturefileswindow button[action=reload]': 	{click: 	this.reloadGraph},
			'sourcepicturefileswindow button[action=save]': 	{click: 	this.saveGraph},
			'sourcepicturefileswindow': 								{resize: this.windowResize},
			'statssourceslistpicturefiles': 							{select: this.onSourceSelected}																			
		});
	},

	windowResize: function() {
		console.log('Log: Controller->Dashboard->SourcePicturesFiles: windowResize: function()');			
		//this.getPermissionsSourcesSourcesStore()
		Ext.getStore('permissions.sources.Sources').on('load',this.loadGraphContent,this,{single:true});
		Ext.getStore('permissions.sources.Sources').load();			
	},

	loadGraphContent: function() {
		console.log('Log: Controller->Dashboard->SourcePicturesFiles: loadGraphContent: function()');
		
		this.getSourcepicturefiles().axes.items[1].setTitle(Ext.getStore('permissions.sources.Sources').first().get('name'));
		Ext.getStore('dashboard.SourcePictureFiles').getProxy().setExtraParam('sourceid', Ext.getStore('permissions.sources.Sources').first().get('sourceid'));	

		this.getDashboardSourcePictureFilesStore().load();
	},

	onSourceSelected: function(selModel, selection) {
		console.log('Log: Controller->Dashboard->SourcePicturesFiles: onSourceSelected: function()'); 
		console.log('Log: Controller->Dashboard->SourcePicturesFiles: onSourceSelected: Selected name is:' + selection[0].get('name'));
		console.log('Log: Controller->Dashboard->SourcePicturesFiles: onSourceSelected: Selected Sourceid is:' + selection[0].get('sourceid'));	
		Ext.getStore('dashboard.SourcePictureFiles').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));		

		this.getSourcepicturefiles().axes.items[1].setTitle(selection[0].get('name'));				

		this.getDashboardSourcePictureFilesStore().load();
	},

	reloadGraph: function() {
		console.log('Log: Controller->Dashboard->SourcePictures: Controller reloadGraph: function()');
		this.getDashboardSourcePictureFilesStore().load();		
	},
	
	saveGraph: function() {
		console.log('Log: Controller->Dashboard->SourcePictures: Controller saveGraph: function()');
		currentChart = this.getSourcepicturefiles();
		Ext.MessageBox.confirm(i18n.gettext('Confirm Download'), i18n.gettext('Would you like to download the chart as an image?'), function(choice){
			if(choice == 'yes'){
				currentChart.save({
					type: 'image/png'
				});
			}
		});		
	}
});
