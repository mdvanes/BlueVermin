/**
 * Created by m.van.es on 27-3-2015.
 */



module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        shell: {
            //options: {
            //    stderr: false,
            //    execOptions: {
            //        cwd: 'D:\\Everest\\Servers\\Blueriq-Server-9.4.1.0\\'
            //    }
            //},
            startblueriq: {
                options: {
                    stderr: false,
                    stdout: false,
                    execOptions: {
                        cwd: 'D:\\Everest\\Servers\\Blueriq-Server-9.4.1.0\\'
                    }
                },
                //command: 'test.bat'
                command: 'start.bat'
            }
        }
        //jshint: {
        //    all: [
        //        'Gruntfile.js',
        //        'tasks/*.js',
        //        'lib/stringTemplateEngine.js',
        //        '<%= nodeunit.tests %>'
        //    ],
        //    options: {
        //        jshintrc: '.jshintrc'
        //    }
        //},

        //// Before generating any new files, remove any previously-created files.
        //clean: {
        //    tests: ['tmp']
        //},
        //
        //// Unit tests.
        //nodeunit: {
        //    tests: ['test/*_test.js']
        //}

    });

    // Actually load this plugin's task(s).
    //grunt.loadTasks('tasks');
    //
    //// These plugins provide necessary tasks.
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-clean');
    //grunt.loadNpmTasks('grunt-contrib-nodeunit');
    //
    //// Whenever the "test" task is run, first clean the "tmp" dir, then run this
    //// plugin's task(s), then test the result.
    //grunt.registerTask('test', ['clean', 'kot2js', 'nodeunit']);

    // By default, lint and run all tests.
    //grunt.registerTask('default', ['jshint', 'test']);

    grunt.registerTask('blueriq', 'shell:startblueriq');

};