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
console.log('Log: Load: Webcampak.view.cloudusers.UsersList');
Ext.define('Webcampak.view.cloudusers.UsersList' ,{
	extend: 'Ext.grid.Panel',
	alias : 'widget.cloudusersUsersList',

getLocaleShortDateString: function(d)
{
    var f={"ar-SA":"dd/MM/yy","bg-BG":"dd.M.yyyy","ca-ES":"dd/MM/yyyy","zh-TW":"yyyy/M/d","cs-CZ":"d.M.yyyy","da-DK":"dd-MM-yyyy","de-DE":"dd.MM.yyyy","el-GR":"d/M/yyyy","en-US":"dd/MM/yyyy","fi-FI":"d.M.yyyy","fr-FR":"dd/MM/yyyy","he-IL":"dd/MM/yyyy","hu-HU":"yyyy. MM. dd.","is-IS":"d.M.yyyy","it-IT":"dd/MM/yyyy","ja-JP":"yyyy/MM/dd","ko-KR":"yyyy-MM-dd","nl-NL":"d-M-yyyy","nb-NO":"dd.MM.yyyy","pl-PL":"yyyy-MM-dd","pt-BR":"d/M/yyyy","ro-RO":"dd.MM.yyyy","ru-RU":"dd.MM.yyyy","hr-HR":"d.M.yyyy","sk-SK":"d. M. yyyy","sq-AL":"yyyy-MM-dd","sv-SE":"yyyy-MM-dd","th-TH":"d/M/yyyy","tr-TR":"dd.MM.yyyy","ur-PK":"dd/MM/yyyy","id-ID":"dd/MM/yyyy","uk-UA":"dd.MM.yyyy","be-BY":"dd.MM.yyyy","sl-SI":"d.M.yyyy","et-EE":"d.MM.yyyy","lv-LV":"yyyy.MM.dd.","lt-LT":"yyyy.MM.dd","fa-IR":"MM/dd/yyyy","vi-VN":"dd/MM/yyyy","hy-AM":"dd.MM.yyyy","az-Latn-AZ":"dd.MM.yyyy","eu-ES":"yyyy/MM/dd","mk-MK":"dd.MM.yyyy","af-ZA":"yyyy/MM/dd","ka-GE":"dd.MM.yyyy","fo-FO":"dd-MM-yyyy","hi-IN":"dd-MM-yyyy","ms-MY":"dd/MM/yyyy","kk-KZ":"dd.MM.yyyy","ky-KG":"dd.MM.yy","sw-KE":"M/d/yyyy","uz-Latn-UZ":"dd/MM yyyy","tt-RU":"dd.MM.yyyy","pa-IN":"dd-MM-yy","gu-IN":"dd-MM-yy","ta-IN":"dd-MM-yyyy","te-IN":"dd-MM-yy","kn-IN":"dd-MM-yy","mr-IN":"dd-MM-yyyy","sa-IN":"dd-MM-yyyy","mn-MN":"yy.MM.dd","gl-ES":"dd/MM/yy","kok-IN":"dd-MM-yyyy","syr-SY":"dd/MM/yyyy","dv-MV":"dd/MM/yy","ar-IQ":"dd/MM/yyyy","zh-CN":"yyyy/M/d","de-CH":"dd.MM.yyyy","en-GB":"dd/MM/yyyy","es-MX":"dd/MM/yyyy","fr-BE":"d/MM/yyyy","it-CH":"dd.MM.yyyy","nl-BE":"d/MM/yyyy","nn-NO":"dd.MM.yyyy","pt-PT":"dd-MM-yyyy","sr-Latn-CS":"d.M.yyyy","sv-FI":"d.M.yyyy","az-Cyrl-AZ":"dd.MM.yyyy","ms-BN":"dd/MM/yyyy","uz-Cyrl-UZ":"dd.MM.yyyy","ar-EG":"dd/MM/yyyy","zh-HK":"d/M/yyyy","de-AT":"dd.MM.yyyy","en-AU":"d/MM/yyyy","es-ES":"dd/MM/yyyy","fr-CA":"yyyy-MM-dd","sr-Cyrl-CS":"d.M.yyyy","ar-LY":"dd/MM/yyyy","zh-SG":"d/M/yyyy","de-LU":"dd.MM.yyyy","en-CA":"dd/MM/yyyy","es-GT":"dd/MM/yyyy","fr-CH":"dd.MM.yyyy","ar-DZ":"dd-MM-yyyy","zh-MO":"d/M/yyyy","de-LI":"dd.MM.yyyy","en-NZ":"d/MM/yyyy","es-CR":"dd/MM/yyyy","fr-LU":"dd/MM/yyyy","ar-MA":"dd-MM-yyyy","en-IE":"dd/MM/yyyy","es-PA":"MM/dd/yyyy","fr-MC":"dd/MM/yyyy","ar-TN":"dd-MM-yyyy","en-ZA":"yyyy/MM/dd","es-DO":"dd/MM/yyyy","ar-OM":"dd/MM/yyyy","en-JM":"dd/MM/yyyy","es-VE":"dd/MM/yyyy","ar-YE":"dd/MM/yyyy","en-029":"MM/dd/yyyy","es-CO":"dd/MM/yyyy","ar-SY":"dd/MM/yyyy","en-BZ":"dd/MM/yyyy","es-PE":"dd/MM/yyyy","ar-JO":"dd/MM/yyyy","en-TT":"dd/MM/yyyy","es-AR":"dd/MM/yyyy","ar-LB":"dd/MM/yyyy","en-ZW":"M/d/yyyy","es-EC":"dd/MM/yyyy","ar-KW":"dd/MM/yyyy","en-PH":"M/d/yyyy","es-CL":"dd-MM-yyyy","ar-AE":"dd/MM/yyyy","es-UY":"dd/MM/yyyy","ar-BH":"dd/MM/yyyy","es-PY":"dd/MM/yyyy","ar-QA":"dd/MM/yyyy","es-BO":"dd/MM/yyyy","es-SV":"dd/MM/yyyy","es-HN":"dd/MM/yyyy","es-NI":"dd/MM/yyyy","es-PR":"dd/MM/yyyy","am-ET":"d/M/yyyy","tzm-Latn-DZ":"dd-MM-yyyy","iu-Latn-CA":"d/MM/yyyy","sma-NO":"dd.MM.yyyy","mn-Mong-CN":"yyyy/M/d","gd-GB":"dd/MM/yyyy","en-MY":"d/M/yyyy","prs-AF":"dd/MM/yy","bn-BD":"dd-MM-yy","wo-SN":"dd/MM/yyyy","rw-RW":"M/d/yyyy","qut-GT":"dd/MM/yyyy","sah-RU":"MM.dd.yyyy","gsw-FR":"dd/MM/yyyy","co-FR":"dd/MM/yyyy","oc-FR":"dd/MM/yyyy","mi-NZ":"dd/MM/yyyy","ga-IE":"dd/MM/yyyy","se-SE":"yyyy-MM-dd","br-FR":"dd/MM/yyyy","smn-FI":"d.M.yyyy","moh-CA":"M/d/yyyy","arn-CL":"dd-MM-yyyy","ii-CN":"yyyy/M/d","dsb-DE":"d. M. yyyy","ig-NG":"d/M/yyyy","kl-GL":"dd-MM-yyyy","lb-LU":"dd/MM/yyyy","ba-RU":"dd.MM.yy","nso-ZA":"yyyy/MM/dd","quz-BO":"dd/MM/yyyy","yo-NG":"d/M/yyyy","ha-Latn-NG":"d/M/yyyy","fil-PH":"M/d/yyyy","ps-AF":"dd/MM/yy","fy-NL":"d-M-yyyy","ne-NP":"M/d/yyyy","se-NO":"dd.MM.yyyy","iu-Cans-CA":"d/M/yyyy","sr-Latn-RS":"d.M.yyyy","si-LK":"yyyy-MM-dd","sr-Cyrl-RS":"d.M.yyyy","lo-LA":"dd/MM/yyyy","km-KH":"yyyy-MM-dd","cy-GB":"dd/MM/yyyy","bo-CN":"yyyy/M/d","sms-FI":"d.M.yyyy","as-IN":"dd-MM-yyyy","ml-IN":"dd-MM-yy","en-IN":"dd-MM-yyyy","or-IN":"dd-MM-yy","bn-IN":"dd-MM-yy","tk-TM":"dd.MM.yy","bs-Latn-BA":"d.M.yyyy","mt-MT":"dd/MM/yyyy","sr-Cyrl-ME":"d.M.yyyy","se-FI":"d.M.yyyy","zu-ZA":"yyyy/MM/dd","xh-ZA":"yyyy/MM/dd","tn-ZA":"yyyy/MM/dd","hsb-DE":"d. M. yyyy","bs-Cyrl-BA":"d.M.yyyy","tg-Cyrl-TJ":"dd.MM.yy","sr-Latn-BA":"d.M.yyyy","smj-NO":"dd.MM.yyyy","rm-CH":"dd/MM/yyyy","smj-SE":"yyyy-MM-dd","quz-EC":"dd/MM/yyyy","quz-PE":"dd/MM/yyyy","hr-BA":"d.M.yyyy.","sr-Latn-ME":"d.M.yyyy","sma-SE":"yyyy-MM-dd","en-SG":"d/M/yyyy","ug-CN":"yyyy-M-d","sr-Cyrl-BA":"d.M.yyyy","es-US":"M/d/yyyy"};
    var l=navigator.language?navigator.language:navigator['userLanguage'],y=d.getFullYear(),m=d.getMonth()+1,d=d.getDate();
    f=(l in f)?f[l]:"dd/MM/yyyy";
    function z(s){s=''+s;return s.length>1?s:'0'+s;}
    f=f.replace(/yyyy/,y);f=f.replace(/yy/,String(y).substr(2));
    f=f.replace(/MM/,z(m));f=f.replace(/M/,m);
    f=f.replace(/dd/,z(d));f=f.replace(/d/,d);
    return f;
},


	timestamprenderer: function(value, metaData) {
		value = parseInt(value);
		formatedDate =  new Date(value);
		currentDate = new Date();
		if (formatedDate > currentDate) {
			//return '<span style="color: #48c43e;">' + this.getLocaleShortDateString(formatedDate) + '</span>';		
			return '<span style="color: #48c43e;">' + this.getLocaleShortDateString(formatedDate) + '</span>';						
		} else {
			return '<span style="color: #e81818;">' + this.getLocaleShortDateString(formatedDate) + ' (expired)</span>';			
		}
	},

/*
	timestamprenderer: function(value, metaData) {
		//value = parseInt(value);
		formatedDate =  new Date(value);
		currentDate = new Date();
		if (formatedDate > currentDate) {
			return '<span style="color: #48c43e;">' + dateFormat(formatedDate) + '</span>';			
		} else {
			return '<span style="color: #e81818;">' + dateFormat(formatedDate) + ' (Expired)</span>';			
		}
	},
*/
	autoScroll: true,

	 selType: 'rowmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        })
    ],
 
	initComponent: function() {
    	
		this.store = 'cloud.Users';

	//store: 'cloud.Users',

	this.columns = [ 
        	{text: i18n.gettext('ID'), 					width: 40, 	sortable: true, 								dataIndex: 'id'																					}, 
        	{text: i18n.gettext('Username'),				flex: 1, 	sortable: true, 	allowBlank: false, 	dataIndex: 'username', 		field: {xtype: 'textfield'}								}, 
        	{text: i18n.gettext('Password'),				width: 80, 	sortable: true, 	allowBlank: false, 	dataIndex: 'password', 		field: {xtype: 'textfield'}								}, 
        	{text: i18n.gettext('Email'), 				flex: 1.5, 	sortable: true, 								dataIndex: 'email', 			field: {xtype: 'textfield',vtype: 'email'}			}, 
        	{text: i18n.gettext('Firstname'), 			flex: 1, 	sortable: true, 								dataIndex: 'firstname', 	field: {xtype: 'textfield'}								}, 
        	{text: i18n.gettext('Lastname'),				flex: 1,		sortable: true,								dataIndex: 'lastname',		field: {xtype: 'textfield'}								}, 
        	{text: i18n.gettext('Company'), 				flex: 1,		sortable: true,								dataIndex: 'cname',			field: {xtype: 'userscompanieslist'}					},      	
        	{text: i18n.gettext('Invoice'),				flex: 1,		sortable: true,								dataIndex: 'invoice',		field: {xtype: 'textfield'}								},
        	{text: i18n.gettext('Type'),					flex: 1,		sortable: true,								dataIndex: 'accounttype',	field: 
        		{
					xtype: 'combobox',
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
        		}								
        	}, 
//        	{text: i18n.gettext('Expire'),				flex: 1,		sortable: true,	dataIndex: 'expirydate',	field: {xtype: 'datefield', format: 'd/m/Y'}, renderer: this.timestamprenderer},  
        	{text: i18n.gettext('Expiry Date'),				flex: 1,		sortable: true,	dataIndex: 'expirydate',	field: {xtype: 'datefield', format: 'd/m/Y'}, renderer: this.timestamprenderer},  
        	{text: i18n.gettext('Enable Interface'),	flex: 1,		sortable: true,	dataIndex: 'admin',			field: {xtype: 'combobox', store: ['yes', 'no']}	}   	
    ],

    this.callParent(arguments);
    }            
});

	



                   