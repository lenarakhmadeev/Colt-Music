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


		requirejs: {
			dist: {
				options: {
					optimize: "none",

					//If using UglifyJS for script optimization, these config options can be
					//used to pass configuration values to UglifyJS.
					//See https://github.com/mishoo/UglifyJS for the possible values.
//					uglify: {
//						toplevel: true,
//						ascii_only: true,
//						beautify: true,
//						max_line_length: 1000,
//
//						//How to pass uglifyjs defined symbols for AST symbol replacement,
//						//see "defines" options for ast_mangle in the uglifys docs.
//						defines: {
//							DEBUG: ['name', 'false']
//						},
//
//						//Custom value supported by r.js but done differently
//						//in uglifyjs directly:
//						//Skip the processor.ast_mangle() part of the uglify call (r.js 2.0.5+)
//						no_mangle: true
//					},


					baseUrl: "build/scripts",
					name: "config",
					mainConfigFile: "build/scripts/config.js",
					out: "dist/optimized.js",
					excludeShallow: [
						'http://vk.com/js/api/xd_connection'
					],
					optimizeAllPluginResources: true
				}
			}
		},

		watch: {
			files: 'app/**',
			tasks: 'build'
		}

	});

	grunt.registerTask('build', 'clean:build coffee:build copy:build compass:build concat:css');
	grunt.registerTask('run', 'build server watch');

	grunt.registerTask('dist', 'requirejs:dist');

};
