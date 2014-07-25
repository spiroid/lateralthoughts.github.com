'use strict';
// generated on 2014-05-27 using generator-gulp-webapp 0.1.0
var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();
var gutil = require('gulp-load-utils')(['log']);

// Process less stylesheet to css
// app/styles/ -> ./tmp/styles
gulp.task('styles', function () {
    var l = $.less({});
    l.on('error',function(e) {
        gutil.log(e);
        l.end();
    });

    return gulp.src(['app/styles/main.less', 'app/styles/bootstrap.less'])
        .pipe(l)
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size());
});


// Validate javascript files with jshint
gulp.task('scripts', function () {
    return gulp.src(['app/scripts/**/*.js'])
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.size());
});

// Process html template files
gulp.task('fileinclude', function() {
    return gulp.src(['app/templates/*.html'])
        .pipe($.fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('.tmp/'))
        .pipe($.size());
});


// Build final html files for delivery
// Which means it uses gulp useref plugin
// to process resources list in build blocks
// <!-- build:<type>(alternate search path) <path> -->
// ... HTML Markup, list of script / link tags.
// <!-- endbuild -->
//
// The transform operations are
//  - js files minification with uglify https://github.com/terinjokes/gulp-uglify/
//  - css files minification with csso https://github.com/ben-eb/gulp-csso
//
// At the end of the transformation pipe, useref concatanates the result
// following rules described by the building blocks
gulp.task('html', ['styles', 'scripts', 'fileinclude'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('.tmp/*.html')
        .pipe($.useref.assets({searchPath: '{.tmp,app}'}).on("error", gutil.log))
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});


// Optimize image size
// app/images/bin/**/* -> dist/images
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

gulp.task('fonts', function () {
    return $.bowerFiles()
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.addSrc('app/fonts/**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('extras', function () {
    return gulp.src(['app/*.*', '!app/*.html', 'CNAME'], { dot: true })
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('old-resources', function () {
    return gulp.src(['app/css/**/*.*',
                     'app/img/**/*.*',
                     'app/font/**/*.*',
                     'app/js/**/*.*'],
                    { base: './app' })
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['html', 'images', 'fonts', 'extras', 'old-resources']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('app'))
        .use(connect.static('.tmp'))
        .use(connect.directory('.tmp'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect', 'styles', 'fileinclude'], function () {
    require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.less')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/templates/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/templates'));
});

gulp.task('watch', ['serve'], function () {
    var server = $.livereload();

    // watch for changes
    gulp.watch([
        '.tmp/*.html',
        '.tmp/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*',
        'app/css/**/*.*',
        'app/img/**/*.*',
        'app/font/**/*.*',
        'app/js/**/*.*',
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/templates/**/*.html', ['fileinclude']);
    gulp.watch('app/styles/**/*.less', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});
