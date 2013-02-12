/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */


var GithubApi = require( 'github' );


/**
 * Create the github API object and initialise
 */

var github = module.exports = new GithubApi( require( './../config').githubapi.apiOpts );
