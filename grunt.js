module.exports = function (grunt) {

	// Load modules
	grunt.loadNpmTasks('grunt-contrib');
	grunt.loadNpmTasks('grunt-coffee');
	grunt.loadNpmTasks('grunt-compass');


	// Project configuration.
	grunt.initConfig({

		clean: {
			build: 'build'
		},

		copy: {
			build: {
				files: {
					'build/': 'app/**/*.!(coffee|sass|scss)'
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

	grunt.registerTask('build', 'clean:build coffee:build copy:build compass:build concat:css');
	grunt.registerTask('run', 'build server watch');

};
