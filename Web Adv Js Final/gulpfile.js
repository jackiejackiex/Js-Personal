'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create(),
    sourcemaps = require('gulp-sourcemaps')

var paths = {
    css:{
        src: 'project/*.css',
        dest: 'project/'
    },
    js:{
        src: 'project/*.js',
        dest: 'project/'
    },
    html:{
        src: 'project/*.html',
        dest: 'project/'
    },
    img:{
        src: 'project/assets/*(.png, .jpg, .svg)',
        dest: 'project/assets'
    }
}

function styles(){
    return gulp
        .src(paths.css.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.css.dest))
        .pipe(browserSync.stream())
} 

function scripts(){
    return gulp
        .src(paths.js.src)
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.stream())
}

function html(){
    return gulp
        .src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream())
}

function images(){
    return gulp
        .src(paths.img.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.img.dest))
        .pipe(browserSync.stream())
}

function watch(){
    browserSync.init({
        server:{
            baseDir: './project'
        }
    })
    gulp.watch(paths.css.src, styles)
}


