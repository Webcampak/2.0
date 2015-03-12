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
console.log('Log: Load: Webcampak.controller.permissions.Groups');
Ext.define('Webcampak.controller.permissions.Groups', {
	extend: 'Ext.app.Controller',
    
	stores: [
		'permissions.groups.Groups', 
		'permissions.groups.GroupAvailableUsers', 
		'permissions.groups.GroupMembers',
		'permissions.groups.GroupPages',
		'permissions.groups.GroupAvailablePages'		
	],

	models: ['permissions.Group'],

	views: [
		'permissions.GroupsWindow', 
		'permissions.groups.GroupsList', 
		'permissions.groups.GroupAvailableUsers', 
		'permissions.groups.GroupMembers',
		'permissions.groups.GroupPages',		
		'permissions.groups.GroupAvailablePages',
		'permissions.groups.AddGroup'				
	],

	refs: [
		{ref: 'groupsPanel', 			selector: 'panel'},
		{ref: 'groupsList',				selector: 'grouplist'},
		{ref: 'groupsWindow',			selector: 'groupwindow'},
		{ref: 'groupAvailableusers',	selector: 'groupavailableusers'},
		{ref: 'groupAvailablepages',	selector: 'groupavailablepages'},		
		{ref: 'groupMembers',			selector: 'groupmembers'},
		{ref: 'groupPages',				selector: 'grouppages'},
		{ref: 'permissionsaddgroup', 	selector: 'permissionsaddgroup', 	autoCreate: true, xtype: 'permissionsaddgroup'}								
	],


	init: function() {
		console.log('Log: Controller->Permissions->Groups: Controller init: function()');
		this.control({
			'groupwindow button[action=openAddGroupWindow]': 				{click: 					this.openAddGroupWindow	},
			'groupwindow button[action=deleteGroup]': 						{click: 					this.deleteGroup			},
			'groupwindow button[action=addPage]': 								{click: 					this.addPage				},
			'groupwindow button[action=deletePage]': 							{click: 					this.deletePage			},	
			'permissionsaddgroup button[action=closeAddGroupWindow]': 	{click: 					this.closeAddGroupWindow	},	
			'permissionsaddgroup button[action=addGroup]': 					{click: 					this.addGroup					},							
			'grouplist': 																{selectionchange: 	this.onGroupSelect		},
			'groupmembers dataview': 												{drop: 					this.dropUserIntoGroup	},
			'grouppages dataview': 													{drop: 					this.dropPageIntoGroup	}
		});

	},

	openAddGroupWindow: function() {
		console.log('Log: Controller->Permissions->Companies: openAddGroupWindow: function()');  
		this.getPermissionsaddgroup().getComponent('permissionsaddgroupform').down('#addgroupname').setValue('');					 
		this.getPermissionsaddgroup().show();		
	},

	closeAddGroupWindow: function() {
		console.log('Log: Controller->Permissions->Companies: closeAddGroupWindow: function()');   
		this.getPermissionsaddgroup().hide();		
	},
	
	addGroup: function() {		
		console.log('Log: Controller->Permissions->Companies: addGroup: function()');
		var key, vals = this.getPermissionsaddgroup().getComponent('permissionsaddgroupform').getValues();
		this.getPermissionsGroupsGroupsStore().insert(0, [{name: vals['addgroupname']}]);		
		this.getPermissionsaddgroup().hide();
	},

	dropUserIntoGroup: function (node, data) {
		console.log('Log: Controller->Permissions->Groups: dropUserIntoGroup()');    			
		var currentStore = this.getPermissionsGroupsGroupMembersStore();
		var cpt = 0;
		for(var rec in data.records) {
			if(data.records.hasOwnProperty(rec)){
				currentStore.add(
				[{
					mid: data.records[cpt].get('id'), 
					username: data.records[cpt].get('username'), 
					password: data.records[cpt].get('password')
				}]);
				console.log("Log: Controller->Permissions->Groups: dropUserIntoGroup() - Push user ID: " + data.records[0].get('id'));
				++cpt;
			}
		}
      console.log("Log: Controller->Permissions->Groups: dropUserIntoGroup() - Pushed " + cpt + " user(s) into group");
		this.getPermissionsGroupsGroupMembersStore().load();		      
	},

	dropPageIntoGroup: function (node, data) {
		console.log('Log: Controller->Permissions->Groups: dropPageIntoGroup()');    			
		var currentStore = this.getPermissionsGroupsGroupPagesStore();
		var cpt = 0;
		for(var rec in data.records) {
			if(data.records.hasOwnProperty(rec)){
				currentStore.add(
				[{
					pid: data.records[cpt].get('id')
				}]);
				console.log("Log: Controller->Permissions->Groups: dropPageIntoGroup() - Push page ID: " + data.records[0].get('id'));
				++cpt;
			}
		}
      console.log("Log: Controller->Permissions->Groups: dropUserIntoGroup() - Pushed " + cpt + " page(s) into group");
		this.getPermissionsGroupsGroupPagesStore().load();	      
	},
   
	addMemberToGroup: function(node, data, dropRec, dropPosition) {
		console.log('Log: Controller->Permissions->Groups: addMemberToGroup() - SelectionChange Event');
	},

/*
	addGroup: function() {
		console.log('Log: Controller->Permissions->Groups: addGroup: function()');    	
		this.getPermissionsGroupsGroupsStore().insert(0, 'Webcampak.model.permissions.Group');
		this.getGroupsList().editingPlugin.startEdit(0, 0);		
	},
*/
	onGroupSelect: function(selModel, selection) {
		console.log('Log: Controller->Permissions->Groups: onGroupSelect: function()'); 
		// Enable delete button
		this.getGroupsWindow().down('#delete').setDisabled(false);	

		//If selected group has just been removed, user has to select another group.
		if (selection == "") {
			console.log('Log: Controller->Permissions->Groups: onGroupSelect: No group selected'); 
		} else {
			//Insert group ID as ExtraParam when group is selected
			console.log('Log: Controller->Permissions->Groups: onGroupSelect: Selected group is:' + selection[0].get('name'));
			var currentGroupId = selection[0].get('id');
	     	Ext.getStore('permissions.groups.GroupAvailableUsers').getProxy().setExtraParam('gid', currentGroupId);
	     	Ext.getStore('permissions.groups.GroupAvailablePages').getProxy().setExtraParam('gid', currentGroupId);	     	
	     	Ext.getStore('permissions.groups.GroupMembers').getProxy().setExtraParam('gid', currentGroupId);
	     	Ext.getStore('permissions.groups.GroupPages').getProxy().setExtraParam('gid', currentGroupId);	
	
			//We reload the store taking group id in consideratio (via ExtraParam)
			console.log('Log: Controller->Permissions->Groups: onGroupSelect: Reload Stores: AvailableUsers, GroupMembers, AvailablePages, GroupPages'); 
			this.getPermissionsGroupsGroupAvailableUsersStore().load();
			this.getPermissionsGroupsGroupAvailablePagesStore().load();
			this.getPermissionsGroupsGroupMembersStore().load();				
			this.getPermissionsGroupsGroupPagesStore().load();		
						
			// By default, configuration boxes are closed when no group is selected
			// Add group name in configuration boxes title
			// Expand configuration boxesgroupnmemberscenter
			this.getGroupsWindow().getComponent('groupnmemberscenter').show();				
			this.getGroupsWindow().getComponent('groupnmemberscenter').getComponent('groupnamemembers').setTitle(i18n.gettext('Manage members of') + ' ' + selection[0].get('name') + ' ' + i18n.gettext('group'));
			this.getGroupsWindow().getComponent('groupnmemberscenter').getComponent('groupmanagepages').setTitle(i18n.gettext('Manage pages access for') + ' ' + selection[0].get('name') + ' ' + i18n.gettext('group'));
	     	
	     	//Add Extra parameter to deny page deletion except if user press "Delete" button
			Ext.getStore('permissions.groups.GroupAvailablePages').getProxy().setExtraParam('deletepage', 'no');	     				     	     	

		}
	}, 
    
	deleteGroup: function() {
		console.log('Log: Controller->Permissions->Groups: deleteGroup: function()');
		var selection = this.getGroupsList().getSelectionModel().getSelection()[0];
		var currentStore = this.getPermissionsGroupsGroupsStore();
		if (selection) {
			Ext.Msg.show({
				title: i18n.gettext('Delete Record ?'),
				msg: i18n.gettext('You are deleting a record permanently, this cannot be undone. Proceed ?'),
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(btn){
					if(btn === 'yes') {
						console.log('Log: Controller->Permissions->Groups: deleteGroup: currentStore.remove(selection):');	    	
						currentStore.remove(selection);
					}
				}
			}); 
		}
    },    

	updateGroup: function(button) {
		var win    = button.up('window'),
			form   = win.down('form'),
			record = form.getRecord(),
			values = form.getValues();
		record.set(values);
		win.close();
		this.getPermissionsGroupsGroupsStore().sync();
	},

	addPage: function() {
		console.log('Log: Controller->Permissions->Groups: addPage: function()');    	
		this.getPermissionsGroupsGroupAvailablePagesStore().insert(0, 'Webcampak.model.permissions.Page');
		this.getGroupAvailablepages().editingPlugin.startEdit(0, 0);			
		
		//this.getPermissionsGroupsGroupAvailablePagesStore().insert(0, 'Webcampak.model.permissions.Page');
	},

	deletePage: function() {
		console.log('Log: Controller->Permissions->Groups: deletePage: function()');
		Ext.getStore('permissions.groups.GroupAvailablePages').getProxy().setExtraParam('deletepage', 'yes');	     			
		var selection = this.getGroupAvailablepages().getSelectionModel().getSelection()[0];
		var currentStore = this.getPermissionsGroupsGroupAvailablePagesStore();
		if (selection) {
			Ext.Msg.show({
				title: i18n.gettext('Delete Record ?'),
				msg: i18n.gettext('You are deleting a record permanently, this cannot be undone. Proceed ?'),
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(btn){
					if(btn === 'yes') {
						console.log('Log: Controller->Permissions->Groups: deletePage: currentStore.remove(selection):');	    	
						currentStore.remove(selection);
					}
				}
			}); 
		}
    },    

	updatePage: function(button) {
		var win    = button.up('window'),
			form   = win.down('form'),
			record = form.getRecord(),
			values = form.getValues();
		record.set(values);
		win.close();
		this.getPermissionsGroupsGroupAvailablePagesStore().sync();
	}
	
});
                  