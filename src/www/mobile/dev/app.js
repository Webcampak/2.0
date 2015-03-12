console.log('Log: Load: app.js');
//--START INITIAL MODIFICATIONS / RE-DECALRATION
Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath('Ext.ux', 'app/ux');
Ext.Loader.setPath('Ux.PinchZoomImage', 'app/ux/pinchzoom.js');
//Ext.Loader.setPath('Ux.ColorPicker', 'app/ux/colorpicker.js');
//Ext.Loader.setPath({'Ext': 'touch/src'});
//--END INITIAL MODIFICATIONS / RE-DECALRATION


Ext.application({
	name: 'WebcampakMobile',
	
	requires: [
		'Ext.Button',
		'Ext.LoadMask',	
		'Ext.Toolbar',			
		'Ext.Container',
		'Ext.MessageBox',
		'Ext.Img',
		'Ext.Video',		
		'Ext.Spacer',	
		'Ext.TitleBar',		
		'Ext.Panel',	
		'Ext.navigation.View',	
		'Ext.data.Store',		
		'Ext.data.proxy.Rest',		
		'Ext.tab.Panel',				
		'Ext.form.Panel',
		'Ext.form.FieldSet',
		'Ext.field.Email',
		'Ext.field.Toggle',
		'Ext.field.TextArea',		
		'Ext.field.Slider',		
		'Ext.field.Select',				
		'Ux.PinchZoomImage'
//		'Ux.ColorPicker'		
	],

	models: ['Source'],
	stores: ['Sources'],
	views: ['Main'],
	controllers: ['Application'],
	
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('WebcampakMobile.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
