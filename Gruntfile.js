module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-html-minify');
	grunt.loadNpmTasks('grunt-devserver');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	// generated source location (must end with slash!)
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
		},

		uglify: {
			compressJs: {
				files: [{
					expand: true,
					cwd: finalSiteFolder,
					src: ['js/*.js'],
					dest: finalSiteFolder
				}]
			}
		},

		html_minify: {
			options: {},
			compressHtml: {
				files: [{
					expand: true,
					cwd: finalSiteFolder,
					src: ['*.html'],
					dest: finalSiteFolder
				}]
			}
		},
		cssmin: {
			compressCss: {
				expand: true,
				cwd: finalSiteFolder + 'css/',
				src: ['*.css', '!*.min.css'],
				dest: finalSiteFolder + 'css/'
			}
		},
		imagemin: { 
			compressPics: {
				expand: true,
				cwd: finalSiteFolder + 'img/',
				src: ['**/*.{png,jpg,gif}'],
				dest: finalSiteFolder + 'img/'
			}
		}
	});

	grunt.registerTask('default', [
		'includereplace:resolve', 
		'copy:main', 
		'uglify:compressJs', 
		//'html_minify:compressHtml', // regression on team page!
		'cssmin:compressCss', 
		'imagemin:compressPics', 
		'devserver'
	]);

	grunt.registerTask('deploy', [
		'includereplace:resolve', 
		'copy:main',
		'uglify:compressJs',
		//'html_minify:compressHtml', // regression on team page!
		'cssmin:compressCss',
		'imagemin:compressPics'
	]);
};