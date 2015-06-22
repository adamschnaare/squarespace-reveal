(function () {
    'use strict';
    var LIVERELOAD_PORT = 35729;
    var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
    var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    module.exports = function (grunt) {
        // show elapsed time at the end
        require('time-grunt')(grunt);
        // load all grunt tasks
        require('load-grunt-tasks')(grunt);

        // configurable paths
        var yeomanConfig = {
            app: 'src',
            dist: 'dist',
            temp: '.tmp'
        };

        grunt.initConfig({
            yeoman: yeomanConfig,
            watch: {
                options: {
                    nospawn: true,
                    livereload: {liveCSS: false}
                },
                livereload: {
                    options: {
                        livereload: true
                    },
                    files: [
                        '<%= yeoman.app %>/*.html',
                        '<%= yeoman.app %>/**/*.js',
                        '<%= yeoman.app %>/**/*.css'
                    ]
                }
            },
            connect: {
                options: {
                    port: 9000,
                    // change this to '0.0.0.0' to access the server from outside
                    hostname: 'localhost'
                },
                livereload: {
                    options: {
                        middleware: function (connect) {
                            return [
                                lrSnippet,
                                mountFolder(connect, yeomanConfig.temp),
                                mountFolder(connect, yeomanConfig.dist),
                                mountFolder(connect, '/'),
                                mountFolder(connect, '.')
                            ];
                        }
                    }
                },
                test: {
                    options: {
                        open: {
                            target: 'http://localhost:<%= connect.options.port %>/'
                        },
                        middleware: function (connect) {
                            return [
                                mountFolder(connect, yeomanConfig.temp),
                                mountFolder(connect, yeomanConfig.dist),
                                mountFolder(connect, '.')
                            ];
                        },
                        keepalive: true
                    }
                }
            },
            clean: {
                dist: ['.tmp', '<%= yeoman.dist %>/*']
            },
            concat: {
                styles: {
                    src: [
                        'bower_components/reveal-js/css/reveal.min.css',
                        'bower_components/reveal-js/css/theme/default.css',
                        'bower_components/reveal-js/lib/css/zenburn.css',
                        '<%= yeoman.app %>/styles/custom.css'
                    ],
                    dest: '<%= yeoman.temp %>/built.css'
                },
                scripts: {
                    src: [
                        '<%= yeoman.app %>/scripts/print-pdf.js',
                        'bower_components/jquery/dist/jquery.min.js',
                        'bower_components/reveal-js/js/reveal.min.js',
                        '<%= yeoman.app %>/scripts/custom.js'
                    ],
                    dest: '<%= yeoman.temp %>/built.js'
                }
            },
            includes: {
                files: {
                    src: ['<%= yeoman.app %>/ssReveal-footer.html','<%= yeoman.app %>/ssReveal-header.html'], // Source files
                    dest: '<%= yeoman.dist %>', // Destination directory
                    flatten: true,
                    cwd: '.'
                }
            }
        });

        // Polymer Yeoman Tasks
        grunt.registerTask('build', [
            'clean:dist',
            'concat:styles',
            'concat:scripts',
            'includes'
        ]);
        grunt.registerTask('serve', [
            'clean:dist',
            'concat:styles',
            'concat:scripts',
            'includes',
            'connect:test'
        ]);
        grunt.registerTask('default', [
            // 'test'
            'build'
        ]);
    };
}());
