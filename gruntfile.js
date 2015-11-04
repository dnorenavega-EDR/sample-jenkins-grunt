module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        "string-replace": {                 
            dev: {
                files: {
                    "/newrelic.js": "/newrelic.js"
                },
                options: {
                    replacements: [{
                        pattern: /$APPNAME/ig,
                        replacement: "services"
                    }, {
                        pattern: /$ENV/ig,
                        replacement: "nonprod"
                    }]
                }
            }
        },
        uglify: {
            prod: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                build: {
                    src: 'src/<%= pkg.name %>.js',
                    dest: 'build/<%= pkg.name %>.min.js'
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-string-replace');

    // Default task(s).
    grunt.registerTask('default', ['string-replace:dev']);
    grunt.registerTask('prod', ['uglify:prod']);
};
