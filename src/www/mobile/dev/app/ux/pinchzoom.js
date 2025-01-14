/**
 * Pinch Zoom Image
 * creates a pinch zoom able image in a scrollable container
 *
 * Can be uses with dynamic size from the height width of the container
 *
 * @example
 *     {
 *         flex: 1,
 *         xtype: 'pinchzoomimage',
 *         src: '/resources/images/casinomenu.jpg'
 *     }
 *
 * or with fixed sizes
 *
 * {
 *         xtype: 'pinchzoomimage',
 *         src: '/resources/images/casinomenu.jpg',
 *         width: 320,
 *         height: 440
 *     }
 *
 *
 * @author     Nils Dehl <mail@nils-dehl.de>
 * @www     http://www.nils-dehl.de
 *
 * @version: 1.0.0
 */
Ext.define('Ux.PinchZoomImage', {
    extend: 'Ext.Container',
    xtype: 'pinchzoomimage',
    alias: 'widget.pinchzoomimage',


    config: {
        /**
         * Image src url
         *
         * @type String
         */
        src: '',


        /**
         * height of the pinchzoom image
         *
         * @type int
         */
        height: null,


        /**
         * width of the pinchzoom image
         *
         * @type int
         */
        width: null,


        scrollable: true,
        listeners: {
            painted: 'initImage'
        }
    },


    /**
     * init the image in the scrollable container
     *
     * @param {} newImageSrc
     */
    initImage: function(newImageSrc) {
        var height = this.getHeight() || this.element.getHeight(),
            width = this.getWidth() || this.element.getWidth(),
            src = this.getSrc() || newImageSrc,
            image = null;


            if (Ext.isString(src) && src !== '') {
            image = Ext.create('Ext.Img', {
                // set mode auf empty to create a real image tag
                mode: '',
                height: height,
                width: width,
                src: src,
                listeners: {
                    pinch: {
                        element: 'element',
                        fn: this.onImagePinch


                    },
                    doubletap: {
                        element: 'element',
                        fn: this.onImageDoubletap
                    },
                    load: function() {
								Ext.Viewport.setMasked(false);                       
                    }                    
                }
            });


            this.add(image);
        }
    },


    /**
     * reset the image to initial size
     *
     * @param {} e
     */
    onImageDoubletap: function(e) {
        var initialWidth  = this.getInitialConfig('width'),
            initialHeight = this.getInitialConfig('height'),
            container     = this,
            image         = this.element;




        container.setWidth(initialWidth);
        container.setHeight(initialHeight);
        image.setWidth(initialWidth);
        image.setHeight(initialHeight);
    },


    /**
     * on image pinch scale the image size
     * and set the scroller to a new position
     *
     * @param {} e eventobject
     */
    onImagePinch: function(e) {
        var initialWidth  = this.getInitialConfig('width'),
            initialHeight = this.getInitialConfig('height'),
            newWidth      = initialWidth * e.scale,
            newHeight     = initialHeight * e.scale,
            container     = this,
            image         = this.element,
            scroller = this.up('container').getScrollable().getScroller(),
            pos = scroller.getMaxPosition();




        container.setWidth(newWidth);
        container.setHeight(newHeight);
        image.setWidth(newWidth);
        image.setHeight(newHeight);
        scroller.scrollTo(pos.x/2, pos.y/2);
    },


    /**
     * if set Src is called and an
     * old image exist destroy the old
     * one and add the new one
     *
     * @param {} newImageSrc
     * @param {} oldImageSrc
     */
    applySrc: function(newImageSrc) {
        var oldImage = this.down('img');


        if (Ext.isObject(oldImage)) {
            oldImage.destroy();
        }


        this.initImage(newImageSrc);
    }


});  