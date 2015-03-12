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
console.log('Log: Load: WebcampakMobile.view.Sources');
var sourceListTpl = new Ext.XTemplate(
	'<div class="headshot" style="background: url(<tpl if="this.isPicture(latestpicturedisp)">{latestpicturedisp}&w=100<tpl else>/interface/images/webcampak-logo100x98.png</tpl>) no-repeat; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;"></div>',
	'{[this.formatName(values.name)]}',
	'<span>{[this.formatDate(values.latestpicture)]}</span>',
	{
		// XTemplate configuration:
		disableFormats: true,
		isPicture: function(latestpicturedisp){
			console.log('Log: View->Sources - isPicture() function - checking:' + latestpicturedisp);
			if (latestpicturedisp != '0') { 
				console.log('Log: View->Sources - isPicture() function - ' + latestpicturedisp + ' contains a picture');
				return latestpicturedisp == latestpicturedisp;
			}
		},
		formatDate: function(latestpicture){
			console.log('Log: View->Sources - formatDate() function - Convert picture name into date');
			if (latestpicture != '0') { 			
				var currentPictureMonth = latestpicture.substring(4, 6) - 1; // TO BE INVESTIGATED
				var currentPictureDate = new Date(latestpicture.substring(0, 4), currentPictureMonth, latestpicture.substring(6, 8), latestpicture.substring(8, 10), latestpicture.substring(10, 12), latestpicture.substring(12, 14), 0);		
				return dateFormat(currentPictureDate);
			} else {
				return i18n.gettext('No picture captured');
			}
		},
		formatName: function(name) {
			if (name.length > 22) {
				name = name.substring(0, 22) + '...';
				return name;
			} else {
				return name;				
			}
		}   	
	}
); 
Ext.define('WebcampakMobile.view.Sources', {
	extend: 'Ext.dataview.List',
	xtype: 'sources',

	config: {
		//title: 'Webcampak Mobile',
		cls: 'x-sources',

		store: 'Sources',

		itemTpl: sourceListTpl  
    }
});
