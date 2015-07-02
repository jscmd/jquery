module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  function repl(code, filename) {
    var id = pkg.family + '/' + pkg.name + '/' + pkg.version + '/' + filename;
    code = code.replace(/&&\s*define\.amd\s*/, '');
    code = code.replace(/define\(\s*"jquery/, 'define("' + id);
    //code = code + '\n;$.noConflict();\n';
    return code;
  }

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src'
      },
      /*tmp: {
        options: {
          dest: '.tmp'
        },
        url: 'http://code.jquery.com/jquery-<%= pkg.version %>.js',
        name: 'jquery.js'
      },*/
      src: {
        options: {
          transform: function(code) {
            return code.replace(/factory\(\s*global\s*\)/, 'factory( global, true)');
          }
        },
        url: 'http://code.jquery.com/jquery-<%= pkg.version %>.js',
        name: 'jquery.js'
      }
    },

    wrap: {
      src: {
        src: ['src/jquery.js'],
        dest: 'dist/jquery-debug.js',
        options: {
          separator: '',
          // compile (edit) content with function
          compiler: function(content, options) {
            return repl(content, 'jquery-debug');
          }
        }
      },
      min: {
        src: ['dist/jquery.js'],
        dest: 'dist/jquery.js',
        options: {
          separator: '',
          // compile (edit) content with function
          compiler: function(content, options) {
            return repl(content, 'jquery');
          }
        }
      }
    },

    uglify: {
      min: {
        files: {
          'dist/jquery.js': ['src/jquery.js']
        }
      }
    }
  });

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.loadTasks('../node_modules/grunt-wrap-combo/tasks');
  grunt.loadTasks('../node_modules/grunt-contrib-uglify/tasks');
  grunt.registerTask('build', ['download:src', 'wrap:src', 'uglify:min','wrap:min']);
};
