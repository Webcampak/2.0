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
console.log('Log: Load: Webcampak.controller.permissions.Companies');
Ext.define('Webcampak.controller.permissions.Companies', {
	extend: 'Ext.app.Controller',
    
	stores: ['permissions.Companies'],

	models: ['permissions.Company'],

	views: [
		'permissions.CompaniesList',
		'permissions.AddCompany'		
	],

	refs: [
		{ref: 'companiesPanel', 			selector: 'panel'},
		{ref: 'companiesList',				selector: 'companylist'},
		{ref: 'permissionsaddcompany', 	selector: 'permissionsaddcompany', 	autoCreate: true, xtype: 'permissionsaddcompany'}					
	],

	init: function() {
		console.log('Log: Controller->Permissions->Companies: Controller init: function()');
		this.control({
			'companylist button[action=openAddCompanyWindow]': 				{click: 					this.openAddCompanyWindow		},
			'companylist button[action=deleteCompany]': 							{click: 					this.deleteCompany				},
			'permissionsaddcompany button[action=closeAddCompanyWindow]': 	{click: 					this.closeAddCompanyWindow		},	
			'permissionsaddcompany button[action=addCompany]': 				{click: 					this.addCompany					},			 			
			'companylist': 																{selectionchange: 	this.onCompanySelect				}	
		});
	},

	openAddCompanyWindow: function() {
		console.log('Log: Controller->Permissions->Companies: openAddCompanyWindow: function()');  
		this.getPermissionsaddcompany().getComponent('permissionsaddcompanyform').down('#addcompanyname').setValue('');					 
		this.getPermissionsaddcompany().show();		
	},

	closeAddCompanyWindow: function() {
		console.log('Log: Controller->Permissions->Companies: closeAddCompanyWindow: function()');   
		this.getPermissionsaddcompany().hide();		
	},
	
	addCompany: function() {		
		console.log('Log: Controller->Permissions->Companies: addCompany: function()');
		var key, vals = this.getPermissionsaddcompany().getComponent('permissionsaddcompanyform').getValues();
		this.getPermissionsCompaniesStore().insert(0, [{name: vals['addcompanyname']}]);		
		this.getPermissionsaddcompany().hide();
	},

	onCompanySelect: function(selModel, selection) {
		console.log('Log: Controller->Permissions->Companies: onCompanySelect: function()'); 
		// Enable delete button
		this.getCompaniesList().down('#delete').setDisabled(false);						
	}, 
    
	deleteCompany: function() {
		console.log('Log: Controller->Permissions->Companies: deleteCompany: function()');
		var selection = this.getCompaniesList().getSelectionModel().getSelection()[0];
		var currentStore = this.getPermissionsCompaniesStore();
		if (selection) {
			Ext.Msg.show({
				title:'Delete Record?',
				msg: i18n.gettext('You are deleting a record permanently, this cannot be undone. Proceed ?'),
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(btn){
					if(btn === 'yes') {
						console.log('Log: Controller->Permissions->Companies: deleteCompany: currentStore.remove(selection):');	    	
						currentStore.remove(selection);
					}
				}
			}); 
		}
    },    

	updateCompany: function(button) {
		var win    = button.up('window'),
			form   = win.down('form'),
			record = form.getRecord(),
			values = form.getValues();
		record.set(values);
		win.close();
		this.getPermissionsCompaniesStore().sync();
	}
});
