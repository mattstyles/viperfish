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
var viperfish = require( './viperfish' );

/**
 * Config object
 *
 * @type {Object}
 */
viperfish.config = module.exports = {

    // GithubApi config options
    githubapi : {

        apiOpts : {
            version     : '3.0.0',
            timeout     : 5000
        },

        contentOpts : {
            user        : 'mattstyles',
            repo        : 'vfj-content'
        }
    }

};