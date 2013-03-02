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
var vpf = require( './viperfish' );

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

    // GithubApi Config Options
    githubapi : {

        apiOpts : {
            version     : '3.0.0',
            timeout     : 5000
        },

        contentOpts : {
            user        : 'mattstyles',
            repo        : 'vpf-def',
            path        : null
        }
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
            if ( lang === 'js' ) {
                return highlighter.javascript(code);
            }
            return code;
        }
    }

};