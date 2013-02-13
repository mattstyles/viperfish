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
var marked = require('marked'),
    github = require( './githubapi/githubapi'),
    config = require( './config' );

/**
 * Create viperfish
 *
 * @type {Object}
 */
var viperfish = module.exports;


/**
 * Index route
 * @param err - handle an err (nothing at present)
 * @param res - the result of the GET call
 */
viperfish.index = function( err, res) {
    // Add the path
    viperfish.config.githubapi.contentOpts.path = 'code/introducing-hogan/content.md';

    // Now use the github api to go and get the data and then call display on success
    github.repos.getContent( viperfish.config.githubapi.contentOpts, function (err, res) {
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
        var decoded = null;

        if (data) {
            decoded = new Buffer(data, 'base64').toString('ascii');
            res.render('index', { title: 'Viperfish', content: marked(decoded) });
        } else {
            res.render('index', { title: 'Error', content: 'Something went wrong' });
        }
    };
};

