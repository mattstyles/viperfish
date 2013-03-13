module.exports = function(grunt) {

    // Grunt Init
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

        // Keep code tight
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },

            // Lint the gruntfile
            gruntfile: {
                src: 'Gruntfile.js'
            },

            // Linting ready for production -- i.e. all the library files
            prod: {
                src: [ 'lib/**/*.js' ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task.
    grunt.registerTask('default', 'lint test');

};