'use strict';

// Includes

// Extend basics
// String capitalisation function
String.prototype.cap = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
// String separation function
// Breaks a string at a specified separator
String.prototype.sepAfter = function( separator ) {
    return this.substring( this.indexOf( separator ) + 1 );
};
String.prototype.sepBefore = function( separator ) {
    return this.substring( 0, this.indexOf( separator ) );
};
String.prototype.insert = function( index, str ) {
    return this.slice( 0, index ) + str + this.slice( index, this.length );
};

// Inserts an element into an array
Array.prototype.insert = function( i, el ) {
    if ( typeof( i ) !== 'number' ) {
        i = this.indexOf( i ) + 1;
    }
    var arr = [];
    if ( typeof( el ) !== 'object' ) {
        arr.push( el );
    } else {
        arr = el;
    }
    return arr.forEach( function( index ) {
        this.splice( i, 0, index );
        i = i + 1;
    }, this );
};

// Utility functions
var utils = function( grunt ) {

    return {

        // Quick string space fill function
        strFill : function( str, len ) {
            while ( str.length < len ) {
                str += ' ';
            }

            return str;
        }

    };
};

// Expose an init function to pass in grunt
module.exports = {
    init : utils
};



