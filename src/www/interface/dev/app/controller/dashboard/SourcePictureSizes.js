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
console.log('Log: Load: Webcampak.controller.dashboard.SourcePictureSizes');
// START
// From http://programanddesign.com/js/human-readable-file-size-in-javascript/
function readableFileSize(size) {
    var units = ['MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = 0;
    while(size >= 1024) {
        size /= 1024;
        ++i;
    }
    return size.toFixed(1) + ' ' + units[i];
}
// END
Ext.define('Webcampak.controller.dashboard.SourcePictureSizes', {
    extend: 'Ext.app.Controller',

	stores: [
		'dashboard.SourcePictureSizes',
		'permissions.sources.Sources'		
	],

	models: [
		'dashboard.SourcePictureSizes',
		'permissions.Source'					
	],

	views: [
		'dashboard.sourcepicturesizes.SourcePictureSizesWindow',
		'dashboard.sourcepicturesizes.SourcePictureSizes',
		'dashboard.sourcepicturesizes.SourcesList'					
	],

	refs: [
		{ref: 'sourcepicturesizeswindow', 		selector: 'sourcepicturesizeswindow', 		autoCreate: true, 	xtype: 'sourcepicturesizeswindow'},
		{ref: 'sourcepicturesizes', 				selector: 'sourcepicturesizes', 				autoCreate: true, 	xtype: 'sourcepicturesizes'}
	],	

	onLaunch: function() {
		console.log('Log: Controller->Dashboard->SourcePictures: Controller onLaunch: function()');

/*
		//Show Sizes Graph window (stats about number of pictures per source per day)
		if(!this.getSourcepicturesizeswindow().isVisible()) {
			this.getSourcepicturesizeswindow().show();
			console.log('Log: Controller->Menu: openPhotos - getSourcepicturesizeswindow().show()');	
			//Load the sources store
			this.getPermissionsSourcesSourcesStore().on('load',this.loadGraphContent,this,{single:true});
			this.getPermissionsSourcesSourcesStore().load();
		} else {
			this.getSourcepicturesizeswindow().hide();
			console.log('Log: Controller->Menu: openPhotos - getSourcepicturesizeswindow().hide()');			
		}		
*/
	},
    
	init: function() {
		console.log('Log: Controller->Dashboard->SourcePictures: Controller init: function()');
		// Start listening for events on views
		this.control({			
			'sourcepicturesizeswindow button[action=reload]': 	{click: 	this.reloadGraph},
			'sourcepicturesizeswindow button[action=save]': 	{click: 	this.saveGraph},
			'sourcepicturesizeswindow': 								{resize: this.windowResize},
			'statssourceslistpicturesizes': 							{select: this.onSourceSelected}						
		});
	},

	windowResize: function() {
		console.log('Log: Controller->Dashboard->SourcePicturesSizes: windowResize: function()');
		Ext.getStore('permissions.sources.Sources').on('load',this.loadGraphContent,this,{single:true});
		Ext.getStore('permissions.sources.Sources').load();			
	},

	loadGraphContent: function() {
		console.log('Log: Controller->Dashboard->SourcePicturesSizes: loadGraphContent: function()');
		
		this.getSourcepicturesizes().axes.items[1].setTitle(Ext.getStore('permissions.sources.Sources').first().get('name'));
		Ext.getStore('dashboard.SourcePictureSizes').getProxy().setExtraParam('sourceid', Ext.getStore('permissions.sources.Sources').first().get('sourceid'));	

		this.getDashboardSourcePictureSizesStore().load();
	},

	onSourceSelected: function(selModel, selection) {
		console.log('Log: Controller->Dashboard->SourcePicturesSizes: onSourceSelected: function()'); 
		console.log('Log: Controller->Dashboard->SourcePicturesSizes: onSourceSelected: Selected name is:' + selection[0].get('name'));
		console.log('Log: Controller->Dashboard->SourcePicturesSizes: onSourceSelected: Selected Sourceid is:' + selection[0].get('sourceid'));	
		Ext.getStore('dashboard.SourcePictureSizes').getProxy().setExtraParam('sourceid', selection[0].get('sourceid'));		

		this.getSourcepicturesizes().axes.items[1].setTitle(selection[0].get('name'));				

		this.getDashboardSourcePictureSizesStore().load();
	},
/*
	loadGraphContent: function() {
		console.log('Log: Controller->Dashboard->SourcePictures: loadGraphContent: function()');
	
		// Start listening for events on views
		sourceStore = this.getPermissionsSourcesSourcesStore()
		for (var i = 0; i < sourceStore.getCount(); i++) {
			var sourceID = sourceStore.getAt(i).data.sourceid;
			this.getSourcepicturesizes().series.add({
            type: 'line',
				xField: 'date',
				yField: 'source' + sourceID,
				smooth: true,		
				highlight: {
					size: 7,
					radius: 7
				},
				tips: {
					trackMouse: true,
					width: 220,
					height: 25,
					renderer: function(storeItem, item) {
						this.setTitle(readableFileSize(item.value[1]) + ' ' + i18n.gettext('of pictures in') + ' ' + Ext.util.Format.dateRenderer('d M Y')(new Date(storeItem.get('date') + 43200000))); // We add 12 hours in miliseconds to be in the middle of the day
					}
				}			
			});			
		}
	},
*/
	reloadGraph: function() {
		console.log('Log: Controller->Dashboard->SourcePictures: Controller reloadGraph: function()');
		this.getDashboardSourcePictureSizesStore().load();		
	},
	
	saveGraph: function() {
		console.log('Log: Controller->Dashboard->SourcePictures: Controller saveGraph: function()');
		currentChart = this.getSourcepicturesizes();
		Ext.MessageBox.confirm(i18n.gettext('Confirm Download'), i18n.gettext('Would you like to download the chart as an image?'), function(choice){
			if(choice == 'yes'){
				currentChart.save({
					type: 'image/png'
				});
			}
		});		
	}
});
