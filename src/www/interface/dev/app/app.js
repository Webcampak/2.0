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
if (!window.console) console = {log: function() {}};
console.log('Log: Load: app.js');

//--START INITIAL EXTJS MODIFICATION / RE-DECALRATION
Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath('Ext.ux', 'app/ux');

/*
// Modification to show an error in case REST request failed
Ext.override(Ext.data.reader.Reader, {
	readRecords: function(data) {
		var errormessage = data.message;
		var data = this.callOverridden(arguments);
		if (data.success == false) {			
			Ext.Msg.alert("Error", errormessage);
		}
		return data;
	}
}); 
*/

// Used to display a popup message after successful create/delete/updated
//Taken from Sencha examples (extjs/examples/shared/examples.js)
Ext.customPopup = function(){
    var msgCt;
    function createBox(t, s){
       return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
    }
    return {
        msg : function(title, format){
            if(!msgCt){
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
            var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(msgCt, createBox(title, s), true);
            m.hide();
            m.slideIn('t').ghost("t", { delay: 1000, remove: true});
        }
    };
}();


// Used to add splash screen when loading application
// Taken from http://blog.newbridgegreen.com/extjs-4-splash-screen/
var splashscreen;
Ext.onReady(function() {
	splashscreen = Ext.getBody().mask(i18n.gettext('Loading application ...'), 'splashscreen');	// Start the mask on the body and get a reference to the mask
	splashscreen.addCls('splashscreen');     																	// Add a new class to this mask as we want it to look different from the default.
	Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {    										// Insert a new div before the loading icon where we can place our logo.
		cls: 'x-splash-icon'
	});
});


//--END INITIAL EXTJS MODIFICATION / RE-DECALRATION
Ext.application({
	name: 'Webcampak' ,

	autoCreateViewport: true,
    
	controllers: [
		'Menu', 
		'permissions.Users', 
		'permissions.Companies', 
		'permissions.Groups', 
		'permissions.Sources',
		'pictures.Pictures',
		'videos.Videos',
		'configuration.Configuration',
		'cloud.CloudUsers',
		'cloud.CloudConfiguration',
		'system.System',
		'log.Log',
		'dashboard.SourcePictureFiles',
		'dashboard.SourcePictureSizes',
		'dashboard.SourceDiskUsage',
		'dashboard.SystemStats',
		'connecteddevices.ConnectedDevices'		
	]

});