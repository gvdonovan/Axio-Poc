var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var modRewrite = require('connect-modrewrite');

/**
 * Serve
 */
gulp.task('serve', ['build'], function () {
    browserSync.init({
        open: true,
        port: 9000,
        server: {
            baseDir: 'www/',
            index: "index.html",

            /*
            middleware: function (req, res, next) {
              res.setHeader('Access-Control-Allow-Origin', '*');
              next();
            }
            */


            middleware: [
              modRewrite([
                '^([^.]+)$ /index.html [L]'
              ])
            ]

        }                
    });    
});

gulp.task('watch', ['serve'], function () {
    gulp.watch("www/*.html").on('change', browserSync.reload);
});
