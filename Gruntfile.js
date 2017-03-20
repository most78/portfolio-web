module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    connect: {
      server: {
        options: {
          livereload: false,
          base: 'build',
          port: 8000
        }
      }
    },
    // Use npm packages and nodejs module
    browserify: {
      dist: {
        files: {
          'build/js/build.js': ['src/js/*.js']
        },
        // Add npm packages require
        options: {
          require: ['jquery'],
          transform: [
            ['babelify', {
              presets: ['es2015']
            }]
          ]
        }
      }
    },
    uglify: {
      dist: {
        options: {
          sourceMapName: 'build/js/build.min.map',
        },
        files: [{
          src: 'build/js/build.js',
          dest: 'build/js/build.min.js'
        }]
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      dist: {
        files: {
          'build/css/style.min.css': 'build/css/style.css'
        }
      }
    },
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      dist: {
        files: {
          'build/*.html': 'build/*.html'
        }
      }
    },
    eslint: {
      all: ['Gruntfile.js', 'src/**/*.js']
    },
    sass: {
      options: {
        style: 'expanded'
      },
      dist: {
        files: {
          'build/css/style.css': 'src/scss/*.scss'
        }
      }
    },
    pug: {
      compile: {
        options: {
          data: {
            debug: true
          }
        },
        files: {
          'build/index.html': ['src/pug/*.pug']
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['Gruntfile.js', 'src/js/*.js', 'src/scss/*.scss', 'src/pug/*.pug', 'src/js/*.js'],
        tasks: ['eslint', 'less', 'pug', 'browserify', 'uglify', 'cssmin'],
        options: {
          livereload: true,
        }
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Start web server
  grunt.registerTask('server', ['connect:server','watch']);
  // Start web server
  grunt.registerTask('build', [
    'eslint', 'sass', 'pug', 'browserify', 'uglify', 'cssmin', 'htmlmin']);
};

