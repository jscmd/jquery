module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkg,

        download: {
            options: {
                dest: 'src'
            },
            js: {
                options: {
                    transform: function(code) {
                        return [
                            'define(function(require, exports, module) {',
                            "var jQuery = require('$');",
                            code.replace(/window\.jQuery/g, "jQuery"),
                            "});"
                        ].join('\n');
                    }
                },
                url: 'https://raw.github.com/vsn4ik/bootstrap-submenu/v<%= pkg.version%>/dist/js/bootstrap-submenu.js',
                name: 'bootstrap-submenu.js'
            },
            css: {
                url: 'https://raw.github.com/vsn4ik/bootstrap-submenu/v<%= pkg.version%>/dist/css/bootstrap-submenu.css',
                name: "bootstrap-submenu.css"
            }
        }
    });

    grunt.loadTasks('../_tasks/download/tasks');
    grunt.registerTask('default', ['download']);
};
