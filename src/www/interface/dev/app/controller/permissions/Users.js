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
console.log('Log: Load: Webcampak.controller.permissions.Users');
Ext.define('Webcampak.controller.permissions.Users', {
	extend: 'Ext.app.Controller',
    
	stores: [
		'permissions.Users',
		'permissions.Companies',
		'permissions.groups.Groups',
		'permissions.users.UserAvailableSources',
		'permissions.users.UserSources'	
	],

	models: ['permissions.User'],

	views: [
		'permissions.UsersWindow',	
		'permissions.users.UsersList',
		'permissions.users.UsersCompaniesList',
		'permissions.users.UsersGroupsList',
		'permissions.users.UserAvailableSources',
		'permissions.users.UserSources',
		'permissions.users.AddUser'		
	],

	refs: [
		{ref: 'usersPanel',					selector: 'panel'},
		{ref: 'usersList',					selector: 'userlist'},
		{ref: 'usersWindow',					selector: 'userswindow'},		
		{ref: 'userscompaniesList',		selector: 'userscompanieslist'},
		{ref: 'usersgroupsList',			selector: 'usersgroupslist'},
		{ref: 'useravailablesources',		selector: 'useravailablesources'},		
		{ref: 'usersources',					selector: 'usersources'},
		{ref: 'permissionsadduser', 		selector: 'permissionsadduser', 	autoCreate: true, xtype: 'permissionsadduser'}										
		
	],

	init: function() {
		console.log('Log: Controller->Permissions->Users: Controller init: function()');
		this.control({
			'userlist button[action=openAddUserWindow]': 					{click: 				this.openAddUserWindow		},
			'userlist button[action=deleteUser]': 								{click: 				this.deleteUser				},
			'userlist button[action=reloadUsers]': 							{click: 				this.reloadUsers				},			
			'permissionsadduser button[action=closeAddUserWindow]': 		{click: 				this.closeAddUserWindow		},	
			'permissionsadduser button[action=addUser]': 					{click: 				this.addUser					},				
			'userlist': 																{selectionchange: this.onUserSelect				},
			'usersources dataview': 												{drop: 				this.dropSourceIntoUser		}
		});
	},

	openAddUserWindow: function() {
		console.log('Log: Controller->Permissions->Users: openAddUserWindow: function()');  
		this.getPermissionsadduser().getComponent('permissionsadduserform').down('#adduserusername').setValue('');
		this.getPermissionsadduser().getComponent('permissionsadduserform').down('#adduserpassword').setValue('');
		this.getPermissionsadduser().getComponent('permissionsadduserform').down('#adduseremail').setValue('');
		this.getPermissionsadduser().getComponent('permissionsadduserform').down('#adduserfirstname').setValue('');
		this.getPermissionsadduser().getComponent('permissionsadduserform').down('#adduserlastname').setValue('');
		this.getPermissionsadduser().getComponent('permissionsadduserform').down('#addusercompany').setValue('');
		this.getPermissionsadduser().getComponent('permissionsadduserform').down('#addusergroup').setValue('');
		this.getPermissionsadduser().getComponent('permissionsadduserform').down('#adduserinterface').setValue('no');
		this.getPermissionsadduser().show();		
	},

	reloadUsers: function() {
		console.log('Log: Controller->Permissions->Users: reloadUsers: function()');   
		this.getPermissionsUsersStore().load();
	},

	closeAddUserWindow: function() {
		console.log('Log: Controller->Permissions->Users: closeAddUserWindow: function()');   
		this.getPermissionsadduser().hide();		
	},
	
	addUser: function() {		
		console.log('Log: Controller->Permissions->Users: addUser: function()');
		var key, vals = this.getPermissionsadduser().getComponent('permissionsadduserform').getValues();	
		this.getPermissionsUsersStore().insert(0, 
			[{
				username: 		vals['adduserusername'],
				password: 		vals['adduserpassword'],
				email: 			vals['adduseremail'],
				firstname: 		vals['adduserfirstname'],
				lastname: 		vals['adduserlastname'],
				company: 		vals['addusercompany'],
				groupname: 		vals['addusergroup'],
				admin: 			vals['adduserinterface']
			}]
		);	
		this.getPermissionsadduser().hide();
	},	

	dropSourceIntoUser: function (node, data) {
		console.log('Log: Controller->Permissions->Users: dropSourceIntoUser()');    			
		var currentStore = this.getPermissionsUsersUserSourcesStore();
		var cpt = 0;
		for(var rec in data.records) {
			if(data.records.hasOwnProperty(rec)){
				currentStore.add(
				[{
					sourceid: data.records[cpt].get('sourceid')
				}]);
				console.log("Log: Controller->Permissions->Users: dropSourceIntoUser() - Push source ID: " + data.records[0].get('sourceid'));
				++cpt;
			}
		}
      console.log("Log: Controller->Permissions->Users: dropSourceIntoUser() - Pushed " + cpt + " sources(s) into user");
		this.getPermissionsUsersUserSourcesStore().load();
	},

/*
	addUser: function() {
		console.log('Log: Controller->Permissions->Users: addUser: function()');    	
		this.getPermissionsUsersStore().insert(0, 'Webcampak.model.permissions.User');
		this.getUsersList().editingPlugin.startEdit(0, 0);		
	},
*/
	onUserSelect: function(selModel, selection) {
		console.log('Log: Controller->Permissions->Users: onUserSelect: function()'); 
		// Enable delete button
		this.getUsersList().down('#delete').setDisabled(false);	
//		this.getPermissionsUsersStore().load();


		//If selected group has just been removed, user has to select another group.
		if (selection == "") {
			console.log('Log: Controller->Permissions->Users: onUserSelect: No user selected'); 
		} else {
			//Insert group ID as ExtraParam when group is selected
			console.log('Log: Controller->Permissions->Users: onUserSelect: Selected user is:' + selection[0].get('firstname') + " " + selection[0].get('lastname') + " (" + selection[0].get('username') + ")");
			var currentUserId = selection[0].get('id');
	     	Ext.getStore('permissions.users.UserAvailableSources').getProxy().setExtraParam('userid', currentUserId);	     	
	     	Ext.getStore('permissions.users.UserSources').getProxy().setExtraParam('userid', currentUserId);				

			//We reload the store taking user id in consideratio (via ExtraParam)
			console.log('Log: Controller->Permissions->Users: onUserSelect: Reload Stores: AvailableSources, UserSources'); 
			this.getPermissionsUsersUserAvailableSourcesStore().load();
			this.getPermissionsUsersUserSourcesStore().load();	
			
			this.getUsersWindow().getComponent('usersourcescenter').setTitle(i18n.gettext('Manage sources for') + ' ' + selection[0].get('firstname') + " " + selection[0].get('lastname') + " (" + selection[0].get('username') + ")");
			this.getUsersWindow().getComponent('usersourcescenter').getComponent('useravailablesources').show();	
			this.getUsersWindow().getComponent('usersourcescenter').getComponent('usersources').show();	

			Ext.getStore('permissions.users.UserAvailableSources').getProxy().setExtraParam('deleteuser', 'no');	     				     	     	
			
		}
	}, 
    
	deleteUser: function() {
		console.log('Log: Controller->Permissions->Users: deleteUser: function()');
		var selection = this.getUsersList().getSelectionModel().getSelection()[0];
		var currentStore = this.getPermissionsUsersStore();
		if (selection) {
			Ext.Msg.show({
				title: i18n.gettext('Delete Record ?'),
				msg: i18n.gettext('You are deleting a record permanently, this cannot be undone. Proceed ?'),
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(btn){
					if(btn === 'yes') {
						console.log('Log: Controller->Permissions->Users: deleteUser: currentStore.remove(selection):');	    	
						currentStore.remove(selection);
					}
				}
			}); 
		}
    },    

	updateUser: function(button) {
		var win    = button.up('window'),
			form   = win.down('form'),
			record = form.getRecord(),
			values = form.getValues();
		record.set(values);
		win.close();
		this.getPermissionsUsersStore().sync();
		this.getPermissionsUsersStore().load();		
	}
});
