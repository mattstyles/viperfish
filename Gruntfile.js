'use strict';

// Export grunt
module.exports = function(grunt) {

    // Include helpers
//    var utils   = require( './grunt/utils' ).init( grunt );
    var helpers = require( './grunt/helpers' ).init( grunt );

    // load all grunt tasks
    require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

    // ------------------------------------------------------
    // --
    // --   Task Config
    // --
    // ------------------------------------------------------
    grunt.initConfig({

        // ------------------------------------------------------
        // --
        // --   Meta
        // --
        // ------------------------------------------------------

        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        // ------------------------------------------------------
        // --
        // --   Task Config
        // --
        // ------------------------------------------------------

        // Keep shizzle tight
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },

            // Lint the gruntfile
            gruntfile: {
                src: 'Gruntfile.js'
            },

            // Project linting
            lib: {
                src: [ 'lib/**/*.js' ]
            }
        }

    });

    // ------------------------------------------------------
    // --
    // --   Load and register tasks
    // --
    // ------------------------------------------------------

    /**
     * Lint
     *
     * Runs jshint over the project
     */
    helpers.registerTask(
        'lint',
        'Runs jshint over the project',
        [   'jshint'    ]
    );

    /**
     * Default
     *
     * Just runs lint at the moment
     */
    helpers.registerTask(
        'default',
        'Alias for the lint task',
        [   'lint'  ]
    );
};