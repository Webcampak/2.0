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
console.log('Log: Load: Webcampak.view.dashboard.sourcediskusage.SourceDiskUsageWindow');
Ext.define('Webcampak.view.dashboard.sourcediskusage.SourceDiskUsageWindow' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.sourcediskusagewindow',
	
	width: 800,
	height: 300,
	hidden: false,
	maximizable: true,
	minimizable: true,
	closeAction : 'hide',
	title: i18n.gettext('Graph: Disk usage per source'),
	layout: 'fit',
	tbar: [{
		text: i18n.gettext('Save Chart'),
		action: 'save'	
	}, {
		text: i18n.gettext('Reload Data'),
		action: 'reload'
	}, '|', {
		xtype: 'statssourceslist'
	}, {
		fieldLabel: 		i18n.gettext('Range'),
		action: 				'updateRange',	
		xtype:				'combo',
		mode:					'local',
		value:				'day',
		triggerAction:		'all',
		forceSelection:	true,
		editable:			false,
		displayField:		'name',
		valueField:			'value',
		queryMode:			'local',
		store:				
			Ext.create('Ext.data.Store', {
				fields : ['name', 'value'],
				data   : [
					{name : i18n.gettext('Day'),   value: 'day'},
					{name : i18n.gettext('Month'), value: 'month'},
					{name : i18n.gettext('Year'),  value: 'year'}				
				]
			})
	}],
	items: [{
		xtype: 'sourcediskusage'
	}]	
});

 





