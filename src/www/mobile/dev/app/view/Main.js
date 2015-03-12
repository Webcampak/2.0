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
console.log('Log: Load: WebcampakMobile.view.Main');
Ext.define('WebcampakMobile.view.Main', {
	extend: 'Ext.Container',
	xtype: 'main',	

	requires: [
		'WebcampakMobile.view.Sources',
		'WebcampakMobile.view.source.DatePicker',
		'WebcampakMobile.view.pictures.Show',
		'WebcampakMobile.view.pictures.Card',
		'WebcampakMobile.view.pictures.EmailWindow',	
		'WebcampakMobile.view.pictures.CommentWindow',	
		'WebcampakMobile.view.pictures.DrawWindow',			
		'WebcampakMobile.view.pictures.FreeDrawComponent',									
		'WebcampakMobile.view.videos.Card',
		'WebcampakMobile.view.videos.VideoList',
		'WebcampakMobile.view.videos.Watch',
		'WebcampakMobile.view.settings.Settings',	
		'Ext.tab.Panel'
	],



	config: {
		fullscreen: true,
		layout: 'vbox',
		defaults: {flex: 1}, 
		items: [{
			xtype: 'titlebar',	
			id: 'maintoolbar',
			height: 40,
			docked: 'top',
			title : i18n.gettext('Webcampak Mobile'),
			items: [{				
				xtype : 'button',
				align : 'left',
				ui    : 'action',
				id		: 'viewSources',
				text  : i18n.gettext('Hide Sources')
			}, {
				xtype : 'button',
				align : 'right',
				ui    : 'action',
				id		: 'openSettings',		
				text  : i18n.gettext('Settings')					
			}]
		}, {
			id: 'mainwindow',	
			flex: 1,
			layout: 'hbox',
			items: [{
				id: 'mainwindowsources',
				xtype: 'sources',
				width: 300
			}, {
				xtype: 'tabpanel',
				id: 'mainwindowpanel',				
				flex: 1,
				hidden: true,
				tabBarPosition: 'bottom',
				items: [
					{ xclass: 'WebcampakMobile.view.pictures.Card'	},
					{ xclass: 'WebcampakMobile.view.videos.Card'		}
				]				
			}, {
				xtype: 'container',
				id: 'launchscreen',
				cls : 'card',
				flex: 1,				
				scrollable: true,
				html: '<div><img src="/images/wpaklogo500x85.png"><br /><h2>' + i18n.gettext('Welcome to Webcampak') + '</h2><div class="feature main"><img src="/images/pda92x92.png" width="52"><p>' + i18n.gettext('This is Webcampak Mobile &#8212; an easy-to use simplified version of Webcampak aimed to be used on smartphones and tablets.') + '</p></div><div class="feature"><img src="/images/desktop92x92.png" width="52"><p>' + i18n.gettext('Webcampak is also available on your desktop, with a fully featured web-based application to be used with your favorite Web browser.') + '</p></div><footer>' + i18n.gettext('Learn more at <a href="http://www.webcampak.com" target="blank">webcampak.com</a>') + '</footer>'	
			}]
		}]	
	}
});
