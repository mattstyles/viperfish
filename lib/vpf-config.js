/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

/**
 * Viperfish config file
 */
var vpf = require('./vpf-core'),
    hljs = require('highlight.js');

/**
 * Config object
 * --
 * @type {Object}
 */
vpf.config = module.exports = {

    // Module Options
    moduleOpts: {
        nav         : [],
        port        : 3001,
        customPath  : '/public/',
        favicon     : 'favicon.png',
        logo        : 'logo.png'
    },

    // Template Options
    tmplOpts: {

        engine  : 'hogan',
        path    : './default/'

    },

    // Marked Config Options
    markedOpts : {

        gfm         : true,
        tables      : true,
        breaks      : false,
        pedantic    : false,
        sanitize    : false,
        smartLists  : true,
        langPrefix  : 'language-',
        highlight   : function ( code, lang ) {
            // Javascript highlighting
            if ( lang === 'javascript' ) {
                return hljs.highlight(lang, code).value;
            }
            return code;
        }
    }

};
