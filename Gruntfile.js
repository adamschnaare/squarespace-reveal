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
                        '<%= yeoman.dist %>/styles/custom.css'
                    ],
                    dest: '<%= yeoman.temp %>/built.css'
                }
            },
            uglify: {
                scripts: {
                    files: {
                        '<%= yeoman.temp %>/built.js': [
                            '<%= yeoman.dist %>/scripts/print-pdf.js',
                            'bower_components/jquery/dist/jquery.min.js',
                            'bower_components/reveal-js/lib/js/head.min.js',
                            'bower_components/reveal-js/js/reveal.min.js',
                            '<%= yeoman.dist %>/scripts/custom.js'
                        ]
                    }
                }
            },
            includes: {
                files: {
                    src: ['<%= yeoman.app %>/squarespace-reveal.html','<%= yeoman.app %>/index.html'], // Source files
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
            'uglify:scripts',
            'includes'
        ]);
        grunt.registerTask('serve', [
            'clean:dist',
            'concat:styles',
            'uglify:scripts',
            'includes',
            'connect:test'
        ]);
        grunt.registerTask('default', [
            // 'test'
            'build'
        ]);
    };
}());
