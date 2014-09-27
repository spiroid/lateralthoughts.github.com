'use strict';
// generated on 2014-05-27 using generator-gulp-webapp 0.1.0
var gulp = require('gulp');

// load plugins
var $     = require('gulp-load-plugins')(),
    del   = require('del'),
    gutil = require('gulp-load-utils')(['log']),
    _     = { app: 'app', dist: 'dist' };


//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//| ✓ styles
//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// Process less stylesheet to css
// app/styles/ -> ./tmp/styles
gulp.task('styles', function () {
    return gulp.src(['app/styles/main.less', 'app/styles/bootstrap.less'])
        .pipe($.plumber())
        .pipe($.less({}))
        .pipe($.autoprefixer('last 2 versions'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size());
});


//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//| ✓ scripts
//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// Validate javascript files with jshint
gulp.task('scripts', function () {
    return gulp.src(['app/scripts/**/*.js'])
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.size());
});


//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//| ✓ assemble.io
//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//  - pages
//  - partials
//  - layouts
gulp.task('assemble', function () {
    return gulp.src('app/templates/pages/*.hbs')
        .pipe($.plumber())
        .pipe($.assemble({
            data: 'data/*.json',
            partials: 'app/templates/partials/*.hbs',
            layoutdir: 'app/templates/layouts/'
        }).on("error", gutil.log))
        .pipe(gulp.dest('.tmp/'));
});


//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//| ✓ html
//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
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
gulp.task('html', ['styles', 'scripts', 'assemble'], function () {
    var assets = $.useref.assets({searchPath: '{.tmp,app}'})

    return gulp.src('.tmp/*.html')
        .pipe($.plumber())
        .pipe(assets)
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.size())
        .pipe(gulp.dest('dist'));
});


//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//| ✓ images
//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// Optimize image size
// app/images/bin/**/* -> dist/images
// exclude svg images as because of a svgo lib bug : https://github.com/svg/svgo/issues/142
// it is already fixed but will only be available in version 0.6
gulp.task('images', ['svg'], function () {
    return gulp.src('app/images/**/*.{png,jpg,jpeg,gif,ico}')
        .pipe($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//| ✓ svg
//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
gulp.task('svg', function () {
    return gulp.src(['app/images/**/*.svg'],
                    { dot: true, base: './app' })
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});


//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//| ✓ fonts
//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
gulp.task('fonts', function () {
    return $.bowerFiles()
        .pipe($.plumber())
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.addSrc('app/fonts/**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});


//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//| ✓ other resources
//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
gulp.task('extras', function () {
    return gulp.src(['app/*.*',
                     'app/css/**/*.*',
                     'app/js/**/*.*',
                     '!app/*.html', 'CNAME'],
                    { dot: true, base: './app' })
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});


//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//| ✓ bower (Inject Bower components)
//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.less')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src(['app/templates/**/*.hbs'])
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/templates'));
});


//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//| ✓ watch
//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
gulp.task('watch', ['serve'], function () {
    var server = $.livereload();

    // watch for changes
    gulp.watch([
        '.tmp/*.html',
        '.tmp/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*',
        'app/css/**/*.*',
        'app/js/**/*.*',
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch(['app/templates/pages/*.hbs',
                'app/templates/layouts/*.hbs',
                'app/templates/partials/*.hbs'], ['assemble']);
    gulp.watch('app/styles/**/*.less', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});


//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//| ✓ clean
//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
gulp.task('clean', function (cb) {
    del(['.tmp', 'dist'], cb);
});


//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//| ✓ server
//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
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

gulp.task('serve', ['connect', 'styles', 'assemble'], function () {
    require('opn')('http://localhost:9000');
});


//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//| ✓ Macro tasks
//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
gulp.task('build', ['images', 'fonts', 'extras', 'html']);


//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//| ✓ default
//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
