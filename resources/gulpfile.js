'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var prettierPlugin = require('gulp-prettier-plugin');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(gulp.dest('../css'));
});

gulp.task('prettier', () => {
  return gulp.src(['./sass/**/*.scss'])
    .pipe(prettierPlugin(undefined, {
      "singleQuote": true,
      "bracketSpacing": true
    }))
    .pipe(gulp.dest(file => file.base))
});

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass', 'prettier']);
});