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
console.log('Log: Load: Webcampak.view.configuration.pictures.SourceCopy');
Ext.define('Webcampak.view.configuration.pictures.SourceCopy' ,{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.configpicturessourcecopy',

	layout: 'fit',
	items   : [{
			xtype: 'container',
			layout: {type:'hbox',	align: 'stretch',		pack: 'start'},	
			items   : [
				{width: 180,	xtype: 'label',								html: i18n.gettext('Copy pictures to:'), 	padding: 2	}, 			
				{flex: 1,		xtype: 'configcaptureallowedsources', 	name: 'cfgcopymainsourceid'}, 
				{width: 35,		xtype: 'label',								html: i18n.gettext('RAW:'), 					padding: 2	},
				{					xtype: 'checkboxfield',						name: 'cfgcopymainsourceraw', uncheckedValue: 'off', inputValue: 'on', padding: 2	},
				{width: 50,		xtype: 'label',								html: i18n.gettext('Enable:'), 					padding: 2	},
				{					xtype: 'checkboxfield',						name: 'cfgcopymainenable', uncheckedValue: 'off', inputValue: 'on', padding: 2	}				
			]					
	},	{		
			xtype: 'container',
			layout: {type:'hbox',	align: 'stretch',		pack: 'start'},
			items   : [
				{width: 180,	xtype: 'label',								html: i18n.gettext('Copy pictures to (secondary):'), 	padding: 2	}, 			
				{flex: 1,		xtype: 'configcaptureallowedsources', 	name: 'cfgcopysecondsourceid'}, 
				{width: 35,		xtype: 'label',								html: i18n.gettext('RAW:'), 					padding: 2	},
				{					xtype: 'checkboxfield',						name: 'cfgcopysecondsourceraw', uncheckedValue: 'off', inputValue: 'on', padding: 2	},
				{width: 50,		xtype: 'label',								html: i18n.gettext('Enable:'), 					padding: 2	},
				{					xtype: 'checkboxfield',						name: 'cfgcopysecondenable', uncheckedValue: 'off', inputValue: 'on', padding: 2	}				
			]				
	}]
});

