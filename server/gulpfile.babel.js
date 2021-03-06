/* eslint-disable */
const del = require('del');
const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '/dist');
const welcome = path.join(__dirname, 'public', 'index.html');
const dataFile = path.join(__dirname, 'data', 'restaurants.json');

const prepareDist = () => {
    if (fs.existsSync(target)) {
        del.sync([target]);
    }

    fs.mkdirSync(target);
    fs.copyFileSync(dataFile, path.join(target, 'restaurants.json'));
    fs.copyFileSync(welcome, path.join(target, 'index.html'));
};

gulp.task('package', () => {    
    prepareDist();

    return gulp.src('src/*.js')
        .pipe(sourcemaps.init())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(target));
});

gulp.task('package-debug', () => {
    prepareDist();

    return gulp.src('src/*.js')
        .pipe(sourcemaps.init())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(target));
});

gulp.task('default', gulp.series('package'));
