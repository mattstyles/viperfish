module.exports = function(grunt) {

    // Grunt Init
    grunt.initConfig({

        // ------------------------------------------------------
        // --
        // --   Meta
        // --
        // ------------------------------------------------------
        pkg: grunt.file.readJSON('package.json'),

        lint: {
            files: ['lib/**/*.js']
        },

        watch: {
            files: '<config:lint.files>',
            tasks: 'default'
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true
            },

            globals: {
                exports: true
            }
        }

    });

    // Default task.
    grunt.registerTask('default', 'lint test');

};