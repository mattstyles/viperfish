/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

// Requires
var marked = require('marked'),
    github = require( '../githubapi/githubapi'),
    config = require( '../vpf-config');


/**
 * Index route
 * @param req - the request passed via GET
 * @param res - the result of the GET call
 */
module.exports = function( req, res ) {
    // Add the path
//    config.githubapi.contentOpts.path = 'code/introducing-hogan/content.md';
    config.githubapi.contentOpts.path = 'main.json';

    // Now use the github api to go and get the data and then call display on success
    github.repos.getContent( config.githubapi.contentOpts, function ( err, res ) {
        if (err) {
            console.log('This is an error, should really be dealt with');
            return;
        }

        // If we got here then the content was retrieved so proceed to display it
        display(res.content);

    });

    // Send the data back via a template
    // Use marked to parse the returned markdown file
    var display = function ( data ) {
        var decoded = null,
            path = config.tmplOpts.path;

        // Set up the options for marked
        marked.setOptions(config.markedOpts);

        if (data) {
            decoded = new Buffer(data, 'base64').toString('utf8');
            res.render( path + 'main', {
                title: 'Viperfish',
                //content: marked(decoded),
                content: JSON.parse(decoded),
                partials: {                     // No need for path here as it is relative to path + 'main'
                    header    : 'header',
                    footer    : 'footer',
                    nav       : 'nav',
                    listPost  : 'listPost'
                }
            });
        } else {
            res.render( path + 'index', { title: 'Error', content: 'Something went wrong' });
        }
    };
};
