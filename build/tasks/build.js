var gulp = require('gulp');
var wiredep = require('wiredep');
var inject = require('gulp-inject');
var order = require('gulp-order');
var paths = require('../paths');

/**
 * Wire Bower dependencies and inject application js
 */
gulp.task('build', ['vendor-js', 'vendor-css', 'vendor-fonts'], function () {
    return gulp
        // Source index.html
        .src(paths.client + 'index.html')
        // Wire bower components
        .pipe(wiredep.stream({
            options: paths.bower,
            fileTypes: {
                html: {
                    replace: {
                        js: function (filePath) {
                            return '<script src="' + 'vendor/js/' + filePath.split('/').pop() + '"></script>';
                        },
                        css: function (filePath) {
                            return '<link rel="stylesheet" href="' + 'vendor/css/' + filePath.split('/').pop() + '"/>';
                        }
                    }
                }
            }
        }))
        // Wire lib/**.js
        .pipe(inject(gulp.src(paths.lib + '*.js', {
            read: false
        }), {
            name: 'lib',
            relative: true
        }))
        // Wire app/**.js
        .pipe(inject(gulp.src(paths.source)
            .pipe(order(['**/app.module.js', '**/*.module.js', '**/*.js']), {
                read: false,
                name: 'inject'
            }), {
                relative: true
            }))
        .pipe(gulp.dest(paths.client))
        .pipe(gulp.dest(paths.client));
});

/**
 * Copy Bower js 
 */
gulp.task('vendor-js', function () {    
    return gulp
        .src(wiredep(paths.bower).js)
        .pipe(gulp.dest(paths.vendor + 'js/'));
});

/**
 * Copy Bower css
 */
gulp.task('vendor-css', function () {
    return gulp
        .src(wiredep(paths.bower).css)
        .pipe(gulp.dest(paths.vendor + 'css/'));
});

/**
 * Copy Bower fonts
 */
gulp.task('vendor-fonts', function () {

    var fonts = [
        './bower_components/font-awesome/fonts/fontawesome-webfont.*',
        './bower_components/bootstrap/fonts/glyphicons-halflings-regular.*'
    ];

    return gulp
        .src(fonts)
        .pipe(gulp.dest(paths.vendor + 'fonts/'));
});