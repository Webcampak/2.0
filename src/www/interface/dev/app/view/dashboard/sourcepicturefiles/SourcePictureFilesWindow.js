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
console.log('Log: Load: Webcampak.view.dashboard.sourcepicturefiles.SourcePictureFilesWindow');
Ext.define('Webcampak.view.dashboard.sourcepicturefiles.SourcePictureFilesWindow' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.sourcepicturefileswindow',
	
	width: 800,
	height: 300,
	y: 370,
	hidden: false,
	maximizable: true,
	minimizable: true,
	closeAction : 'hide',
	title: i18n.gettext('Graph: Number of pictures per sources per day'),
	layout: 'fit',
	tbar: [{
		text: i18n.gettext('Save Chart'),
		action: 'save'
	}, {
		text: i18n.gettext('Reload Data'),
		action: 'reload'
	}, '|', {
		xtype: 'statssourceslistpicturefiles'		
	}],
	items: [{
		xtype: 'sourcepicturefiles'
	}]	
});

 





