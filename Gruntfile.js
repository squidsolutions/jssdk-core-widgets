module.exports = function(grunt) {
    grunt
            .initConfig({
                jshint : {
                    all : [ 'src/*.js' ]
                },
                clean : {
                    all : "dist/"
                },
                bower_concat : {
                    all : {
                        dest : 'build/_bower.js',
                        exclude : [ 'squid_api', "jquery",
                                    "underscore",
                                    "backbone"],
                        bowerOptions : {
                            relative : false
                        }
                    }
                },
                concat : {
                    options : {
                        stripBanners : true,
                    },
                        js : {
                            src : [ 'build/templates.js',
                                    'src/*.js' ],
                            dest : 'dist/squid_api_core-widgets.js',
                        },
                        css : {
                            src : [ 'src/*.css' ],
                            dest : 'dist/squid_api_core-widgets.css',
                        },
                    dev : {
                        files : {
                             'dist/squid_api_login.js': ['dist/squid_api_login_template.js','src/squid_api_login.js'],
                             'dist/squid_api_pagination.js': ['dist/squid_api_pagination_template.js','src/squid_api_pagination.js'],
                             'dist/squid_api_selector.js': ['dist/squid_api_selector_template.js','src/squid_api_selector.js'],
                             'dist/squid_api_status.js': ['dist/squid_api_status_template.js','src/squid_api_status.js'],
                             'dist/squid_api_switch.js': ['dist/squid_api_switch_template.js','src/squid_api_switch.js']
                        }
                    }
                },
                copy: {
                    devDist: {
                        files: [{
                            expand: true,
                            flatten: true,
                            src : [ 'src/*.js' ],
                            dest: 'dist'
                        }]
                    }
                },
                handlebars : {
                    options : {
                        namespace : 'squid_api.template',
                        processName : function(filePath) {
                            return filePath.replace(/^.*\//, '').replace(
                                    /\.hbs$/, '');
                        }
                    },
                    all : {
                        files : {
                            "build/templates.js" : [ "src/*.hbs" ]
                        }
                    },
                    dev:{
                        files : {
                            'dist/squid_api_login_template.js': ['src/squid_api_login.hbs'],
                            'dist/squid_api_pagination_template.js': ['src/squid_api_pagination.hbs'],
                            'dist/squid_api_selector_template.js': ['src/squid_api_selector.hbs'],
                            'dist/squid_api_status_template.js': ['src/squid_api_status.hbs'],
                            'dist/squid_api_switch_template.js': ['src/squid_api_switch.hbs']
                        }
                    }
                },
                watch : {
                    js : {
                        files : [ 'src/**/*.*' ],
                        tasks : [ 'default' ]
                    }
                }
            });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('devDist', [ 'jshint', 'clean', 'handlebars:dev',  'copy:devDist', 'concat:dev' ]);

    grunt.registerTask('default', [ 'jshint', 'clean', 'handlebars:all', 'concat:js', 'concat:css']);
};
