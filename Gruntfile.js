module.exports = function(grunt) {
    grunt
            .initConfig({
                jshint : {
                    all : [ 'src/*.js' ]
                },
                bower_concat : {
                    all : {
                        dest : 'dist/_bower.js',
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
                    all : {
                        src : [ 'dist/_bower.js',
                                'dist/templates.js',
                                'src/*.js' ],
                        dest : 'dist/squid_api_core-widgets.js',
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
                            "dist/templates.js" : [ "src/*.hbs" ]
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

    grunt.registerTask('default', [ 'jshint', 'bower_concat', 'handlebars', 'concat']);
};
