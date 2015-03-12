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
console.log('Log: Load: Webcampak.view.configuration.videos.Youtube');
Ext.define('Webcampak.view.configuration.videos.Youtube' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.configvideosyoutube',

	layout: 'fit',
	items   : [{
		labelWidth: 180,
		flex: 1,				
		name: 'cfgvideoyoutubeupload',
		xtype: 'checkboxfield',
		fieldLabel: i18n.gettext('Upload video to Youtube'),
		uncheckedValue: 'off',	
		inputValue: 'on'			
	},	{
		name:	'cfgvideoyoutubecategory',	labelWidth: 180,	xtype: 'combo',		fieldLabel:	'Category',		flex: 1,
		mode:	'local',					value:	'Entertainment',	triggerAction:	'all',	queryMode: 'local',
		forceSelection: true, 		editable: false,		displayField: 'name', 	valueField: 'value',
		store:				
			Ext.create('Ext.data.Store', {
				fields : ['name', 'value'],
				data   : [
					{name : i18n.gettext('Film'),					value: 'Film'},
					{name : i18n.gettext('Autos'),				value: 'Autos'},
					{name : i18n.gettext('Music'),				value: 'Music'},
					{name : i18n.gettext('Animals'),				value: 'Animals'},
					{name : i18n.gettext('Sports'),				value: 'Sports'},
					{name : i18n.gettext('Travel'),				value: 'Travel'},
					{name : i18n.gettext('Shortmov'),			value: 'Shortmov'},
					{name : i18n.gettext('Games'),				value: 'Games'},
					{name : i18n.gettext('Comedy'),				value: 'Comedy'},
					{name : i18n.gettext('People'),				value: 'People'},
					{name : i18n.gettext('News'),					value: 'News'},
					{name : i18n.gettext('Entertainment'),		value: 'Entertainment'},
					{name : i18n.gettext('Education'),			value: 'Education'},
					{name : i18n.gettext('Howto'),				value: 'Howto'},
					{name : i18n.gettext('Nonprofit'),			value: 'Nonprofit'}
				]
		})	
	}]
});



