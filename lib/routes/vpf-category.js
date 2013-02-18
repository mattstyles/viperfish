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
 * Category route
 * --
 * Fetches the category json file associated with the category being navigated to
 * @param req
 * @param res
 */
module.exports = function ( req, res ) {
    // Add the path
//    config.githubapi.contentOpts.path = 'code/introducing-hogan/content.md';
    config.githubapi.contentOpts.path = req.param('category') + '/category.json';
    console.log(config.githubapi.contentOpts.path);

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