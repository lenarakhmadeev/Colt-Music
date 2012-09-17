module.exports = function(grunt) {
  // TODO jasmine

  /*
    *run:development
    run:production

    Должный запускать одностраничник и слушать изменения

    Coffee, less(sass), handlebars, jasmine, lint(coffee)




  */
  //  Phantomjs
  // Todo RequerJS

  // Load modules
  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-sass');

  // Project configuration.
  grunt.initConfig({

    clean: {
      build: 'build'
    },

    copy: {
      build: {
        files: {
          'build': 'app/**/*.!(coffee|sass|scss)'
        }
      }
    },

    coffee: {
      build: {
        options: {
          base_path: 'app/js',
          preserve_dirs: true
        },

        src: 'app/js/**/*.coffee',
        dest: 'build/js'
      }
    },

    server: {
      port: 8000,
      base: 'build'
    },

    sass: {
      build: {
        src: 'app/css/**/*.scss',
        dest: 'build/css/all.css'
      }
    },

    watch: {
      files: 'app/**',
      tasks: 'build'
    }



  });

  grunt.registerTask('build', 'clean:build sass:build coffee:build copy:build');
  grunt.registerTask('run', 'build server watch');

};
