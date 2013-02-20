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

    // Template options
    tmplOpts: {

        path    : './defaults/'

    },

    // GithubApi config options
    githubapi : {

        apiOpts : {
            version     : '3.0.0',
            timeout     : 5000
        },

        contentOpts : {
            user        : 'mattstyles',
            repo        : 'vfj-content',
            path        : null
        }
    },

    // Marked config options
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
    },

    // Nav options - this is all wrong, they should be retrieved from the content (i.e. github repo)
    // This will work though to make it viable for v0.4.0
    nav : [
        { item : "git" },
        { item : "typography" },
        { item : "code" },
        { item : "soap" }
    ]
};