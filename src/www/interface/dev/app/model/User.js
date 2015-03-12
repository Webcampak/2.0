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
console.log('Log: Load: Webcampak.model.cloud.User');
Ext.define('Webcampak.model.cloud.User', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', 			type: 'int', 		useNull: true													}, 
		{name: 'username', 	type: 'string', 	defaultValue: i18n.gettext('NewUser')					}, 
		{name: 'password', 	type: 'string', 	defaultValue: i18n.gettext('NewPassword')				}, 
		{name: 'email', 		type: 'string', 	defaultValue: i18n.gettext('email@email.com')		}, 
		{name: 'firstname', 	type: 'string', 	defaultValue: i18n.gettext('Firstname')				}, 
		{name: 'lastname', 	type: 'string', 	defaultValue: i18n.gettext('Lastname')					}, 
		{name: 'company', 	type: 'int', 		defaultValue: '0'												},
		{name: 'groupid', 	type: 'int', 		defaultValue: '0'												},
		{name: 'cname', 		type: 'string'																			}, 
		{name: 'groupname', 	type: 'string', 	defaultValue: '0'												},
		{name: 'admin',		type: 'string', 	defaultValue: 'yes'											},
		{name: 'lang',			type: 'string', 	defaultValue: 'en'											},   	   	    	
		{name: 'invoice',		type: 'string', 	defaultValue: i18n.gettext('Invoice')					}, 		   	   	    	
		{name: 'expirydate',	type: 'int', 		defaultValue: '0'												}, 
		{name: 'lastlogin',	type: 'int', 		defaultValue: '0'												},
		{name: 'sourcename', type: 'string', 	defaultValue: i18n.gettext('New Source')				},
		{name: 'sourceurl', type: 'string', 	defaultValue: 'http://www.newsource.com/test.jpg'	}			   	   	    			
	]
});


