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
console.log('Log: Load: Webcampak.controller.permissions.Sources');
Ext.define('Webcampak.controller.permissions.Sources', {
	extend: 'Ext.app.Controller',
    
	stores: [
		'permissions.sources.Sources',
		'permissions.sources.SourceAvailableUsers', 
		'permissions.sources.SourceMembers'	
	],

	models: ['permissions.Source'],

	views: [
		'permissions.SourcesWindow',
		'permissions.sources.SourcesList',	
		'permissions.sources.SourceAvailableUsers', 
		'permissions.sources.SourceMembers',
		'permissions.sources.AddSource'					
	],

	refs: [
		{ref: 'sourcesList',					selector: 'sourcelist'},
		{ref: 'sourcesWindow',				selector: 'sourcewindow'},	
		{ref: 'sourceAvailableusers',		selector: 'sourceavailableusers'},
		{ref: 'sourceMembers',				selector: 'sourcemembers'},
		{ref: 'permissionsaddsource', 	selector: 'permissionsaddsource',	autoCreate: true, xtype: 'permissionsaddsource'}																	
	],

	init: function() {
		console.log('Log: Controller->Permissions->Sources: Controller init: function()');
		this.control({
			'sourcewindow button[action=openAddSourceWindow]': 				{click: 					this.openAddSourceWindow		},
			'sourcewindow button[action=deleteSource]':							{click: 					this.deleteSource					},
			'permissionsaddsource button[action=closeAddSourceWindow]': 	{click: 					this.closeAddSourceWindow		},	
			'permissionsaddsource button[action=addSource]': 					{click: 					this.addSource						},				
			'sourcelist': 																	{selectionchange: 	this.onSourceSelect				},
			'sourcemembers dataview': 													{drop: 					this.dropUserIntoSource			}
		});
	},

	openAddSourceWindow: function() {
		console.log('Log: Controller->Permissions->Companies: openAddSourceWindow: function()');  
		this.getPermissionsaddsource().getComponent('permissionsaddsourceform').down('#addsourcename').setValue('');
		this.getPermissionsaddsource().getComponent('permissionsaddsourceform').down('#addsourceid').setValue('');
		this.getPermissionsaddsource().getComponent('permissionsaddsourceform').down('#addsourceweight').setValue('');				
		this.getPermissionsaddsource().show();		
	},

	closeAddSourceWindow: function() {
		console.log('Log: Controller->Permissions->Companies: closeAddSourceWindow: function()');   
		this.getPermissionsaddsource().hide();		
	},
	
	addSource: function() {		
		console.log('Log: Controller->Permissions->Companies: addSource: function()');
		var key, vals = this.getPermissionsaddsource().getComponent('permissionsaddsourceform').getValues();	
		this.getPermissionsSourcesSourcesStore().insert(0, 
			[{
				sourceid: 	vals['addsourceid'],
				name: 		vals['addsourcename'],
				weight: 		vals['addsourceweight']
			}]
		);	
		this.getPermissionsaddsource().hide();
	},	

/*
	addSource: function() {
		console.log('Log: Controller->Permissions->Sources: addSource: function()');
		this.getPermissionsSourcesSourcesStore().insert(0, 'Webcampak.model.permissions.Source');
		this.getSourcesList().editingPlugin.startEdit(0, 0);
	},
*/
	dropUserIntoSource: function (node, data) {
		console.log('Log: Controller->Permissions->Sources: dropUserIntoSource()');    			
		var currentStore = this.getPermissionsSourcesSourceMembersStore();
		var cpt = 0;
		for(var rec in data.records) {
			if(data.records.hasOwnProperty(rec)){
				currentStore.add(
				[{
					mid: data.records[cpt].get('id'), 
					username: data.records[cpt].get('username'), 
					password: data.records[cpt].get('password')
				}]);
				console.log("Log: Controller->Permissions->Sources: dropUserIntoSource() - Push user ID: " + data.records[0].get('id'));
				++cpt;
			}
		}
      console.log("Log: Controller->Permissions->Sources: dropUserIntoSource() - Pushed " + cpt + " user(s) into source");
		this.getPermissionsSourcesSourceMembersStore().load();      
	},

	onSourceSelect: function(selModel, selection) {
		console.log('Log: Controller->Permissions->Sources: onSourceSelect: function()'); 
		// Enable delete button
		this.getSourcesWindow().down('#delete').setDisabled(false);	

		//If selected source has just been removed, user has to select another source.
		if (selection == "") {
			console.log('Log: Controller->Permissions->Sources: onSourceSelect: No source selected'); 
		} else {
			//Insert source ID as ExtraParam when source is selected
			console.log('Log: Controller->Permissions->Sources: onSourceSelect: Selected source is:' + selection[0].get('name'));
			var currentSourceId = selection[0].get('sourceid');
	     	Ext.getStore('permissions.sources.SourceAvailableUsers').getProxy().setExtraParam('sid', currentSourceId);
	     	Ext.getStore('permissions.sources.SourceMembers').getProxy().setExtraParam('sid', currentSourceId);
	
			//We reload the store taking source id in consideratio (via ExtraParam)
			console.log('Log: Controller->Permissions->Sources: onSourceSelect: Reload Stores: AvailableUsers, SourceMembers'); 
			this.getPermissionsSourcesSourceAvailableUsersStore().load();
			this.getPermissionsSourcesSourceMembersStore().load();
						
			// By default, configuration boxes are closed when no source is selected
			// Add source name in configuration boxes title
			// Expand configuration boxes
			this.getSourcesWindow().getComponent('sourcenmemberscenter').show();				
			this.getSourcesWindow().getComponent('sourcenmemberscenter').getComponent('sourcenamemembers').setTitle(i18n.gettext('Manage members of') + ' ' + selection[0].get('name') + ' ' + i18n.gettext('source'));
			this.getSourcesWindow().getComponent('sourcenmemberscenter').getComponent('sourcenamemembers').expand();	

	     	//Add Extra parameter to deny page deletion except if user press "Delete" button
			Ext.getStore('permissions.sources.SourceAvailableUsers').getProxy().setExtraParam('deleteuser', 'no');	     				     	     	

		}
	}, 
    
	deleteSource: function() {
		console.log('Log: Controller->Permissions->Sources: deleteSource: function()');
		var selection = this.getSourcesList().getSelectionModel().getSelection()[0];
		var currentStore = this.getPermissionsSourcesSourcesStore();
		if (selection) {
			Ext.Msg.show({
				title: i18n.gettext('Delete Record ?'),
				msg: i18n.gettext('You are deleting a record permanently, this cannot be undone. Proceed ?'),
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(btn){
					if(btn === 'yes') {
						console.log('Log: Controller->Permissions->Sources: deleteSource: currentStore.remove(selection):');	    	
						currentStore.remove(selection);
					}
				}
			}); 
		}
    },    

	updateSource: function(button) {
		var win    = button.up('window'),
			form   = win.down('form'),
			record = form.getRecord(),
			values = form.getValues();
		record.set(values);
		win.close();
		this.getPermissionsSourcesSourcesStore().sync();
	}
});
