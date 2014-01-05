module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-devserver');
	grunt.loadNpmTasks('grunt-contrib-copy');

	var finalSiteFolder = 'generated/';

	grunt.initConfig({
		// start web server on generated sources' folder
		devserver: {
			server: {
				options: {
					base: finalSiteFolder
				}
			}
		},

		// substitute in HTML files
		includereplace: {
			resolve: {
				options: {
					globals: {
						currentYear: new Date().getFullYear()
					}
				},
				src: '*.html',
			  	dest: finalSiteFolder
			}
		},

		// copy the rest
		copy: {
			main: {
				files: [
					{expand: true, src: ['css/**'], dest: finalSiteFolder},
					{expand: true, src: ['font/**'], dest: finalSiteFolder},
					{expand: true, src: ['img/**'], dest: finalSiteFolder},
					{expand: true, src: ['js/**'], dest: finalSiteFolder},
					{expand: true, src: ['CNAME'], dest: finalSiteFolder}
				]
			}
		}
	});

	grunt.registerTask('default', ['includereplace:resolve', 'copy:main', 'devserver']);
	grunt.registerTask('deploy', ['includereplace:resolve', 'copy:main']);
};