/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

// Node requires for starting the server
var http        = require('http'),
    path        = require('path');

// Require Viperfish
var vp = require('./lib/viperfish');

// Create the server and start listening
http.createServer(vp).listen(vp.get('port'), function(){
  console.log("Express server listening on port " + vp.get('port'));
});
