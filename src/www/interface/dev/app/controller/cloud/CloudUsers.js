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
console.log('Log: Load: Webcampak.controller.cloud.CloudUsers');
Ext.define('Webcampak.controller.cloud.CloudUsers', {
	extend: 'Ext.app.Controller',

	stores: [
		'cloud.Users',
		'cloud.SubscriptionEmail',
		'permissions.sources.Sources'	
	],

	models: [
		'cloud.User',
		'cloud.SubscriptionEmail',
		'permissions.Source'			
	],

	views: [
		'cloudusers.CloudUsersWindow',
		'cloudusers.AddUser',
		'cloudusers.UsersList'			
	],

	refs: [
		{ref: 'cloudusersCloudUsersWindow',	selector: 'cloudusersCloudUsersWindow'																},
		{ref: 'cloudusersUsersList',			selector: 'cloudusersUsersList'																		},		
		{ref: 'cloudusersAddUser',				selector: 'cloudusersAddUser', 			autoCreate: true, xtype: 'cloudusersAddUser'	}							
	],


	init: function() {
		console.log('Log: Controller->Cloud->Cloud: Controller init: function()');
		this.control({
			'cloudusersCloudUsersWindow button[action=openAddUserWindow]': 	{click: 					this.openAddUserWindow		},
			'cloudusersCloudUsersWindow button[action=deleteCloudUser]': 		{click: 					this.deleteCloudUser			},
			'cloudusersCloudUsersWindow button[action=reloadUsers]': 			{click: 					this.reloadUsers				},			
			'cloudusersUsersList': 															{selectionchange: 	this.onCloudUserSelect		},				
			'cloudusersAddUser button[action=closeAddUserWindow]': 				{click: 					this.closeAddUserWindow		},			
			'cloudusersAddUser button[action=addUser]': 								{click: 					this.addUser					},
			'cloudusersAddUser button[action=generateEmail]': 						{click: 					this.loadEmail					}			
		});

	},

	onCloudUserSelect: function(selModel, selection) {
		console.log('Log: Controller->Cloud->CloudUsers: onCloudUserSelect: function()'); 
		// Enable delete button
		this.getCloudusersCloudUsersWindow().down('#delete').setDisabled(false);	
	},

	reloadUsers: function() {
		console.log('Log: Controller->Cloud->CloudUsers: reloadUsers: function()'); 
		this.getCloudUsersStore().load();
	},

	openAddUserWindow: function() {
		console.log('Log: Controller->Cloud->Cloud: openAddUserWindow: function()');
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var string_length = 10;
		var randomstring = '';
		for (var i=0; i<string_length; i++) {
			var rnum = Math.floor(Math.random() * chars.length);
			randomstring += chars.substring(rnum,rnum+1);
		}		
		this.getCloudusersAddUser().getComponent('cloudadduserform').down('#cloudadduserusername').setValue('');
		this.getCloudusersAddUser().getComponent('cloudadduserform').down('#cloudadduserpassword').setValue(randomstring);
		this.getCloudusersAddUser().getComponent('cloudadduserform').down('#cloudadduseremail').setValue('');
		this.getCloudusersAddUser().getComponent('cloudadduserform').down('#cloudadduserfirstname').setValue('');
		this.getCloudusersAddUser().getComponent('cloudadduserform').down('#cloudadduserlastname').setValue('');
		this.getCloudusersAddUser().getComponent('cloudadduserform').down('#cloudaddusercompanyid').setValue('6');
		this.getCloudusersAddUser().getComponent('cloudadduserform').down('#cloudaddusergroupid').setValue('6');
		this.getCloudusersAddUser().getComponent('cloudadduserform').down('#cloudadduserinterface').setValue('yes');
		this.getCloudusersAddUser().show();		
	},

	closeAddUserWindow: function() {
		console.log('Log: Controller->Cloud->Cloud: closeAddUserWindow: function()');   
		this.getCloudusersAddUser().hide();		
		this.getCloudusersAddUser().down('#addUser').setDisabled(true);			
	},

	loadEmail: function() {
		console.log('Log: Controller->Cloud->CloudUsers: loadEmail: function()'); 
		var key, vals = this.getCloudusersAddUser().getComponent('cloudadduserform').getValues();
		
		Ext.getStore('cloud.SubscriptionEmail').getProxy().setExtraParam('language', vals['cloudadduserlanguage']);					
		
		//Load the email template
		this.getCloudSubscriptionEmailStore().on('load',this.generateEmail,this,{single:true});
		this.getCloudSubscriptionEmailStore().load();
	},

	generateEmail: function() {
		console.log('Log: Controller->Cloud->CloudUsers: generateEmail: function()'); 

		currentEmailValue = this.getCloudSubscriptionEmailStore().last();
		var currentEmailSubject = currentEmailValue.getData()['subject'];
		var currentEmailContent = currentEmailValue.getData()['content'];		
		var currentServerUrl = currentEmailValue.getData()['serverurl'];		
				
		var key, vals = this.getCloudusersAddUser().getComponent('cloudadduserform').getValues();
		
		currentEmailContent = currentEmailContent.replace("#CUSTOMERFIRSTNAME#",vals['cloudadduserfirstname']);
		currentEmailContent = currentEmailContent.replace("#SERVERURL#",currentServerUrl);
		currentEmailContent = currentEmailContent.replace("#CUSTOMERUSERNAME#",vals['cloudadduserusername']);
		currentEmailContent = currentEmailContent.replace("#CUSTOMERPASSWORD#",vals['cloudadduserpassword']);
		currentEmailContent = currentEmailContent.replace("#CUSTOMERINVOICE#",vals['cloudadduserinvoice']);
				
		this.getCloudusersAddUser().getComponent('cloudadduserform').down('#cloudaddemailcontent').setValue(currentEmailContent);
		this.getCloudusersAddUser().getComponent('cloudadduserform').down('#cloudaddemailsubject').setValue(currentEmailSubject);
	
		// Enable add button
		this.getCloudusersAddUser().down('#addUser').setDisabled(false);	
	},
	
	addUser: function() {		
		console.log('Log: Controller->Cloud->Cloud: addUser: function()');
		var key, vals = this.getCloudusersAddUser().getComponent('cloudadduserform').getValues();
		//console.log(vals);
		this.getCloudUsersStore().insert(0, [{
			username: 	vals['cloudadduserusername'],
			password: 	vals['cloudadduserpassword'],
			email: 		vals['cloudadduseremail'],
			firstname: 	vals['cloudadduserfirstname'],
			lastname: 	vals['cloudadduserlastname'],
			companyid: 	vals['cloudaddusercompanyid'],
			groupid: 	vals['cloudaddusergroupid'],
			admin: 		vals['cloudadduserinterface'],
			invoice: 	vals['cloudadduserinvoice'],
			accounttype: vals['cloudaddaccounttype'],
			expirydate: new Date(vals['cloudadduserexpiry']).getTime(),
			sourcename: vals['cloudaddsourcename'],
			sourceurl: 	vals['cloudaddsourceurl'],
			sourcetype: 	vals['cloudaddsourcetype'],			
			language: 		vals['cloudadduserlanguage'],
			emailsubject: 	vals['cloudaddemailsubject'],
			emailcontent: 	vals['cloudaddemailcontent']									
		}]);		
		this.getCloudusersAddUser().hide();
		Ext.getStore('permissions.sources.Sources').load();
	},

	deleteCloudUser: function() {
		console.log('Log: Controller->Cloud->Cloud: deleteUser: function()');
		var selection = this.getCloudusersUsersList().getSelectionModel().getSelection()[0];
		var currentStore = this.getCloudUsersStore();
		if (selection) {
			Ext.Msg.show({
				title: i18n.gettext('Delete Record ?'),
				msg: i18n.gettext('You are deleting a record permanently, this cannot be undone. Proceed ?'),
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(btn){
					if(btn === 'yes') {
						console.log('Log: Controller->Cloud->Cloud: deleteUser: currentStore.remove(selection):');	    	
						currentStore.remove(selection);
					}
				}
			}); 
		}
    },

	updateCloudUser: function(button) {
		console.log('Log: Controller->Cloud->Cloud: updateCloudUser: function()');		
		var win    = button.up('window'),
			form   = win.down('form'),
			record = form.getRecord(),
			values = form.getValues();
		console.log(values);
		record.set(values);
		win.close();
		this.getCloudUsersStore().sync();
	}   
    	
});
                  