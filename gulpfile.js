const gulp = require('gulp');
const nodemon = require('nodemon');
const gulpMocha = require('gulp-mocha');
const env = require('gulp-env');
const supertest = require('supertest');

gulp.task('default', function() {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 8000
    },
    ignore: ['./node_modules']
  })
  .on('restart', function() {
    console.log('...Restarting');
  });
});

gulp.task('test', function(params) {
  env({vars: {ENV: 'Test'}})
  gulp.src('tests/*.js', {read: false})
    .pipe(gulpMocha({reporter: 'nyan'}))
})
