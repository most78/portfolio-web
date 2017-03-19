module.exports = function (grunt) {
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
            transform: [['babelify', {presets: ['es2015']}]]
          }
        }
      },
      
      
      
      
      
      
      
      
    });
};