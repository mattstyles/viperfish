'use strict';
/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

/**
 * Requires
 */
var vpf = require('./vpf-core');


/**
 * Utils
 * --
 * Various utility functions and classes for operating the main viperfish library
 * @type {Object}
 */
vpf.utils = {

    /**
     * Config utility functions
     */
    config: {
        /**
         * Registers the data within the config object
         * @param data - list of nav items
         */
        setNav: function ( data ) {
            // No need to iterate over members
            vpf.config.moduleOpts.nav = data.nav;
        }
    }

};