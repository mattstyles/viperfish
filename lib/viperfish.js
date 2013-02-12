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



exports.index = function( err, res) {
    res.render('index', { title: 'Viperfish' });
};
