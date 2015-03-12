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
console.log('Log: Load: Webcampak.view.permissions.sources.AddSource');
Ext.define('Webcampak.view.permissions.sources.AddSource' ,{
	extend: 'Ext.window.Window', 
	alias: 'widget.permissionsaddsource',
	 
	iconCls: 'icon-source',  	
	title: i18n.gettext('Add a Source'),
	width: 400,
	items: [{
		bodyPadding: '12 10 10',		
		xtype: 'form',	
		itemId: 'permissionsaddsourceform',
		items: [{
			flex: 1,				
			name: 'addsourceid',
			itemId: 'addsourceid',
			xtype: 'numberfield',
			fieldLabel: i18n.gettext('Source ID'),
			minValue: 0		
		}, {
			flex: 1,				
			name: 'addsourcename',
			itemId: 'addsourcename',
			xtype: 'textfield',
			fieldLabel: i18n.gettext('Source Name'),
			allowBlank: false		
		}, {
			flex: 1,				
			name: 'addsourceweight',
			itemId: 'addsourceweight',
			xtype: 'numberfield',
			fieldLabel: i18n.gettext('Weight'),
			minValue: 0			
		}],
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			items: [{
				text: i18n.gettext('Add'),
				xtype: 'button',
				action: 'addSource'
			}, '-', {
				text: i18n.gettext('Cancel'),
				xtype: 'button',
				action: 'closeAddSourceWindow'
			}] 
		}]			
	}]
});



