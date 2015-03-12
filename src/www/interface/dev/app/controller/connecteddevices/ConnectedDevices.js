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
console.log('Log: Load: Webcampak.controller.connecteddevices.ConnectedDevices');
Ext.define('Webcampak.controller.connecteddevices.ConnectedDevices', {
	extend: 'Ext.app.Controller',

	stores: [
		'connecteddevices.ConnectedDevices'		
	],

	models: [			
		'connecteddevices.ConnectedDevices'
	],

	views: [
		'connecteddevices.ConnectedDevicesWindow'	
	],

	refs: [
		{ref: 'connecteddeviceswindow', 				selector: 'connecteddeviceswindow'}																																																																							
	],

	init: function() {
		console.log('Log: Controller->Log->Log: Controller init: function()');
		this.control({
			'connecteddeviceswindow': 														{resize: 			this.loadingCompleted},			
			'connecteddeviceswindow button[action=reloadConnectedDevices]': 	{click: 				this.reloadConnectedDevices}
		});
	},
	
	loadingCompleted: function() {
		console.log('Log: Controller->ConnectedDevices->ConnectedDevices: loadingCompleted: function()');
		currentConfig = this.getConnecteddevicesConnectedDevicesStore().last();
		if (currentConfig	!== undefined) {
			this.getConnecteddeviceswindow().getComponent('gphotopanel').down('#gphotolist').setValue(currentConfig.data.gphotolist);		
			this.getConnecteddeviceswindow().getComponent('gphotocapabilitiespanel').down('#gphotocapabilities').setValue(currentConfig.data.gphotocapabilities);
					
			this.getConnecteddeviceswindow().getComponent('lsusbpanel').down('#lsusb').setValue(currentConfig.data.lsusb);	
				
			this.getConnecteddeviceswindow().getComponent('videostdpanel').down('#videostd0').setValue(currentConfig.data.videostd0);
			this.getConnecteddeviceswindow().getComponent('videostdpanel').down('#videostd1').setValue(currentConfig.data.videostd1);
			this.getConnecteddeviceswindow().getComponent('videostdpanel').down('#videostd2').setValue(currentConfig.data.videostd2);
			this.getConnecteddeviceswindow().getComponent('videostdpanel').down('#videostd3').setValue(currentConfig.data.videostd3);
			this.getConnecteddeviceswindow().getComponent('videostdpanel').down('#videostd4').setValue(currentConfig.data.videostd4);
			this.getConnecteddeviceswindow().getComponent('videostdpanel').down('#videostd5').setValue(currentConfig.data.videostd5);
			this.getConnecteddeviceswindow().getComponent('videostdpanel').down('#videostd6').setValue(currentConfig.data.videostd6);
			this.getConnecteddeviceswindow().getComponent('videostdpanel').down('#videostd7').setValue(currentConfig.data.videostd7);
			this.getConnecteddeviceswindow().getComponent('videostdpanel').down('#videostd8').setValue(currentConfig.data.videostd8);
			this.getConnecteddeviceswindow().getComponent('videostdpanel').down('#videostd9').setValue(currentConfig.data.videostd9);
			
				
			this.getConnecteddeviceswindow().getComponent('videoadvpanel').down('#videoadv0').setValue(currentConfig.data.videoadv0);	
			this.getConnecteddeviceswindow().getComponent('videoadvpanel').down('#videoadv1').setValue(currentConfig.data.videoadv1);	
			this.getConnecteddeviceswindow().getComponent('videoadvpanel').down('#videoadv2').setValue(currentConfig.data.videoadv2);	
			this.getConnecteddeviceswindow().getComponent('videoadvpanel').down('#videoadv3').setValue(currentConfig.data.videoadv3);	
			this.getConnecteddeviceswindow().getComponent('videoadvpanel').down('#videoadv4').setValue(currentConfig.data.videoadv4);	
			this.getConnecteddeviceswindow().getComponent('videoadvpanel').down('#videoadv5').setValue(currentConfig.data.videoadv5);	
			this.getConnecteddeviceswindow().getComponent('videoadvpanel').down('#videoadv6').setValue(currentConfig.data.videoadv6);	
			this.getConnecteddeviceswindow().getComponent('videoadvpanel').down('#videoadv7').setValue(currentConfig.data.videoadv7);	
			this.getConnecteddeviceswindow().getComponent('videoadvpanel').down('#videoadv8').setValue(currentConfig.data.videoadv8);	
			this.getConnecteddeviceswindow().getComponent('videoadvpanel').down('#videoadv9').setValue(currentConfig.data.videoadv9);		
		}	
	},

	reloadConnectedDevices: function() {
		console.log('Log: Controller->ConnectedDevices->ConnectedDevices: reloadConnectedDevices: function()');		
		this.getConnecteddevicesConnectedDevicesStore().on('load',this.loadingCompleted,this,{single:true});
		this.getConnecteddevicesConnectedDevicesStore().load();
	}
	
});
  
                  