/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

var config = require('../vpf-config');


module.exports = function ( req, res ) {
    res.send('Im a category page for ' + req.param('category'));
};