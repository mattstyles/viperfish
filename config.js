/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

/**
 * Custom config object
 * --
 * These settings will override the default settings
 * --
 * To use at the moment simply copy this into the public folder of the project and alter the settings as you need
 * This will be done automatically by the install process when there is one!
 * @type {Object}
 */

var hljs = require( 'highlight.js' );

module.exports = {
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
            if ( lang === 'javascript' ) {
              return hljs.highlight(lang, code).value;
            }
            return code;
        }
    }
};