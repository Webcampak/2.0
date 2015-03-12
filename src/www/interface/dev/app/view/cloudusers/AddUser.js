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
console.log('Log: Load: Webcampak.view.cloudusers.AddUser');
Ext.define('Webcampak.view.cloudusers.AddUser' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.cloudusersAddUser',
	 
	iconCls: 'icon-user',  	
	title: i18n.gettext('Add a Webcampak Cloud User'),
	layout: 'fit',
	width: 600,
	height: 700,
	//height: 300,
	items: [{
		bodyPadding: '12 10 10',		
		xtype: 'form',	
		//layout: 'fit',	
		height: 350,
		itemId: 'cloudadduserform',
		items: [{
			xtype: 'label',											
			html: '<b>' + i18n.gettext('User details') + '</b>', 
			padding: 2			
		}, {
			xtype: 'container',
			layout: {type:'hbox',	align: 'stretch',		pack: 'start'},
			items   : [{
				flex: 1,				
				name: 'cloudadduserusername',
				itemId: 'cloudadduserusername',
				xtype: 'textfield',
				fieldLabel: i18n.gettext('Username'),
				vtype: 'alphanum',
				allowBlank: false,
				padding: 2
			}, {
				flex: 1,				
				name: 'cloudadduserpassword',
				itemId: 'cloudadduserpassword',
				xtype: 'textfield',
				fieldLabel: i18n.gettext('Password'),
				minLength: 8,
				allowBlank: false,
				padding: 2					
			}]	
		}, {
			xtype: 'container',
			layout: {type:'hbox',	align: 'stretch',		pack: 'start'},
			items   : [{			
				flex: 1,				
				name: 'cloudadduseremail',
				itemId: 'cloudadduseremail',
				xtype: 'textfield',
				fieldLabel: i18n.gettext('Email'),
				allowBlank: false,
				vtype: 'email',
				padding: 2		
			}]										
		}, {
			xtype: 'container',
			layout: {type:'hbox',	align: 'stretch',		pack: 'start'},
			items   : [{				
				flex: 1,				
				name: 'cloudadduserfirstname',
				itemId: 'cloudadduserfirstname',
				xtype: 'textfield',
				fieldLabel: i18n.gettext('Firstname'),
				padding: 2			
			}, {
				flex: 1,				
				name: 'cloudadduserlastname',
				itemId: 'cloudadduserlastname',
				xtype: 'textfield',
				fieldLabel: i18n.gettext('Lastname'),
				padding: 2		
			}]						
		}, {
			xtype: 'container',
			layout: {type:'hbox',	align: 'stretch',		pack: 'start'},
			items   : [{		
				fieldLabel: i18n.gettext('Language'),
				flex:					1,
				padding: 			2,								
				xtype:				'combo',
				mode:					'local',
				value:				'fr_FR.utf8',
				triggerAction:		'all',
				forceSelection:	true,
				editable:			false,
				name:					'cloudadduserlanguage',
				itemId: 				'cloudadduserlanguage',
				displayField:		'name',
				valueField:			'value',
				queryMode:			'local',
				store:				
					Ext.create('Ext.data.Store', {
						fields : ['name', 'value'],
						data   : [
							{name : i18n.gettext('French'),   value: 'fr_FR.utf8'},
							{name : i18n.gettext('English'),  value: 'en_GB.utf8'}
						]
					})	
			}]						
		}, {
			xtype: 'container',
			layout: {type:'hbox',	align: 'stretch',		pack: 'start'},
			items   : [{				
				flex: 1,				
				name: 'cloudaddusercompanyid',
				itemId: 'cloudaddusercompanyid',
				xtype: 'userscompanieslist',
				fieldLabel: i18n.gettext('Company'),
				padding: 2					
			}, {
				flex: 1,				
				name: 'cloudaddusergroupid',
				itemId: 'cloudaddusergroupid',
				xtype: 'usersgroupslist',
				fieldLabel: i18n.gettext('Group'),
				padding: 2		
			}]	
		}, {
			flex: 1,				
			itemId: 'cloudadduserinterface',
			fieldLabel: i18n.gettext('Enable Interface'),
			name: 'cloudadduserinterface',
			xtype: 'checkboxfield',
			uncheckedValue: 'no',	
			inputValue: 'yes',
			padding: 2					
		}, {
			xtype: 'label',											
			html: '<b>' + i18n.gettext('Administrative details') + '</b>', 
			padding: 2	
		}, {
			xtype: 'container',
			layout: {type:'hbox',	align: 'stretch',		pack: 'start'},
			items   : [{			
				flex: 1,				
				name: 'cloudadduserinvoice',
				itemId: 'cloudadduserinvoice',
				xtype: 'textfield',
				fieldLabel: i18n.gettext('Invoice #'),
				padding: 2		
			}, {
				name:	'cloudaddaccounttype',		
				itemId: 'cloudaddaccounttype',	
				xtype: 'combo',		
				fieldLabel:	i18n.gettext('Account Type'),
				flex: 1,
				mode:	'local',					
				value:	'webfile',	
				triggerAction:	'all',	
				queryMode: 'local',
				forceSelection: true, 		
				editable: false,		
				displayField: 'name', 	
				valueField: 'value',
				store:				
					Ext.create('Ext.data.Store', {
						fields : ['name', 'value'],
						data   : [
							{name : i18n.gettext('Cloud Mini'), 	value: 'mini'},
							{name : i18n.gettext('Cloud Base'), 	value: 'base'}
						]
					})				
			}]
		}, {
			xtype: 'container',
			layout: {type:'hbox',	align: 'stretch',		pack: 'start'},
			items   : [{			
				flex: 1,				
				name: 'cloudadduserexpiry',
				format: 'd/m/Y',
				itemId: 'cloudadduserexpiry',
				xtype: 'datefield',
				fieldLabel: i18n.gettext('Account Expiry date'),
				padding: 2		
			}]
		}, {
			xtype: 'label',											
			html: '<b>' + i18n.gettext('Source details') + '</b>', 
			padding: 2	
		}, {
			xtype: 'container',
			layout: {type:'hbox',	align: 'stretch',		pack: 'start'},
			items   : [{			
				flex: 1,				
				name: 'cloudaddsourcename',
				itemId: 'cloudaddsourcename',
				xtype: 'textfield',
				fieldLabel: i18n.gettext('Source Name'),
				allowBlank: false,				
				padding: 2		
			}, {
				name:	'cloudaddsourcetype',		
				itemId: 'cloudaddsourcetype',	
				xtype: 'combo',		
				fieldLabel:	i18n.gettext('Source Type'),
				flex: 1,
				mode:	'local',					
				value:	'webfile',	
				triggerAction:	'all',	
				queryMode: 'local',
				forceSelection: true, 		
				editable: false,		
				displayField: 'name', 	
				valueField: 'value',
				store:				
					Ext.create('Ext.data.Store', {
						fields : ['name', 'value'],
						data   : [
							{name : i18n.gettext('Internet Picture (HTTP ou FTP)'), 							value: 'webfile'	},
							{name : i18n.gettext('Video Streaming (RTSP)'), 									value: 'rtsp'		}
						]
					})				
				}]
		}, {
			xtype: 'container',
			layout: {type:'hbox',	align: 'stretch',		pack: 'start'},
			items   : [{			
				flex: 1,				
				name: 'cloudaddsourceurl',
				itemId: 'cloudaddsourceurl',
				xtype: 'textfield',
				fieldLabel: i18n.gettext('Source URL'),
				padding: 2		
			}]																
		}, {
			text: i18n.gettext('Generate Email'),
			xtype: 'button',
			action: 'generateEmail',
			padding: 2					
		}, {
			xtype: 'container',
			layout: {type:'hbox',	align: 'stretch',		pack: 'start'},
			items   : [{			
				flex: 1,				
				name: 'cloudaddemailsubject',
				itemId: 'cloudaddemailsubject',
				xtype: 'textfield',
				fieldLabel: i18n.gettext('Email Subject'),
				allowBlank: false,				
				padding: 2		
			}]
		}, {
			xtype: 'container',
			layout: {type:'hbox',	align: 'stretch',		pack: 'start'},
			items   : [{			
				flex: 1,				
				name: 'cloudaddemailcontent',
				itemId: 'cloudaddemailcontent',
				xtype: 'textarea',
				height: 200,
				fieldLabel: i18n.gettext('Email Content'),
				allowBlank: false,				
				padding: 2		
			}]
		}],
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			items: [{
				text: i18n.gettext('Create & Send email'),
				itemId: 'addUser',				
				iconCls: 'icon-add',
				disabled: true,				
				xtype: 'button',
				action: 'addUser'
			}, '-', {
				text: i18n.gettext('Cancel'),
				xtype: 'button',
				iconCls: 'icon-delete',				
				action: 'closeAddUserWindow'
			}] 
		}]			
	}]
});



