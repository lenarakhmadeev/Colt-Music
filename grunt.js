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
  grunt.loadNpmTasks('grunt-compass');
  // grunt.loadNpmTasks('grunt-reload');
  

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
          base_path: 'app/scripts',
          preserve_dirs: true
        },

        src: 'app/scripts/**/*.coffee',
        dest: 'build/scripts'
      }
    },

    server: {
      port: 8000,
      base: 'build'
    },

     compass: {
        build: {
            src: 'app/styles',
            dest: 'build/styles',
            linecomments: true,
            forcecompile: true,
			images: 'build/images',
			relativeassets: true
        }
    },

    concat: {
      css: {
        src: 'build/styles/**/*.css',
        dest: 'build/styles/all.css'
      }
    },

    watch: {
      files: 'app/**',
      tasks: 'build'
    }



  });

  grunt.registerTask('build', 'clean:build compass:build coffee:build copy:build concat:css');
  grunt.registerTask('run', 'build server watch');

};
