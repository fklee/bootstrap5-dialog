// Gulpfile.js

"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    minifyCSS = require("gulp-minify-css"),
    notify = require("gulp-notify"),
    clean = require("gulp-clean"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps')
    ;

gulp.task("sass-map", function (cb) {

    return   gulp.src("src/scss/bootstrap-dialog.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("dist/css"))
        .pipe(gulp.dest("src/css"));


});

gulp.task("minify-css", function(cb){

    return gulp.src("src/css/bootstrap-dialog.css")
        .pipe(rename("bootstrap-dialog.min.css"))
        .pipe(minifyCSS())
        .pipe(gulp.dest("dist/css"))
        .pipe(notify({
            message: "Minify task completed."
        }));

})

gulp.task("js", function (cb) {
    return gulp.src(["src/js/bootstrap-dialog.js"])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("dist/js"))
        .pipe(rename("bootstrap-dialog.min.js"))
        .pipe(gulp.dest("dist/js"))
        .pipe(notify({
            message: "JS task completed."
        }));
});

gulp.task("clean", function (cb) {
    return gulp.src(["dist/","src/css/","examples/libs/"], { read: false, allowEmpty: true })
        .pipe(clean())
        .pipe(notify({
                message: "Clean task completed."
            }));
});

gulp.task("copy", function(cb) {

    return gulp.src([
        'dist/css/bootstrap-dialog.css',
        'dist/css/bootstrap-dialog.min.css',

        'dist/js/bootstrap-dialog.js',
        'dist/js/bootstrap-dialog.min.js',

        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        ])
        .pipe(gulp.dest('examples/libs/'));
});

gulp.task("copy-dev", function(cb) {

    return gulp.src([
        'src/css/bootstrap-dialog.css',
        'src/js/bootstrap-dialog.js',

        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/bootstrap/dist/css/bootstrap.css',
    ])
        .pipe(gulp.dest('examples/libs/'));
});

gulp.task("watch", function (){
    watch(['src/js/bootstrap-dialog.js', 'src/scss/bootstrap-dialog.scss'],
        gulp.series("sass-map", "js", "minify-css", "copy-dev"));
})

gulp.task("copy-dist", function (){
    return gulp.src([
        'dist/css/bootstrap-dialog.min.css',
        'dist/js/bootstrap-dialog.min.js',

        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
    ])
        .pipe(gulp.dest('examples/libs/'));
});

gulp.task("default", gulp.series("clean", "sass-map", "js", "minify-css", "copy"));
gulp.task("dist", gulp.series("clean", "sass-map", "js", "minify-css", "copy-dist"));