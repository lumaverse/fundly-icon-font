var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    minifyCSS = require('gulp-minify-css'),
    open = require('gulp-open'),
    clean = require('gulp-clean'),
    ejs = require('gulp-ejs');

gulp.task('styles', ['generateIconFiles'], function(){
  return gulp.src('vendor/assets/stylesheets/fundly-icon-font-dist.sass')
    .pipe(sass({ style: 'expanded' }))
    .pipe(rename('fundly-icon-font.css'))
    .pipe(gulp.dest('dist/'))
    .pipe(minifyCSS())
    .pipe(rename('fundly-icon-font.min.css'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('minify', function(){
  // return gulp.src('vendor/assets/stylesheets/fundly-icon-font-dist.sass')
  //   .pipe(sass({ style: 'expanded' }))
  //   .pipe(minifyCSS())
  //   .pipe(rename('fundly-icon-font.min.css'))
  //   .pipe(gulp.dest('dist/'));
});

gulp.task('moveFonts', function(){
  gulp.src(['src/fonts/*'])
    .pipe(gulp.dest('vendor/assets/fonts'));
  return gulp.src(['src/fonts/*'])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('moveAssets', function(){
  return gulp.src(['src/demo-files/*'])
    .pipe(gulp.dest('dist/demo-files'));
});

gulp.task('replace', function(){
  return gulp.src('src/demo.html')
    .pipe(replace(/icon-/g, 'f-icon-'))
    .pipe(replace(/href="style.css"/, 'href="fundly-icon-font.css"'))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function(){
  return gulp.src(['dist/', 'vendor/assets/fonts/'], {read: false})
    .pipe(clean());
});

gulp.task('open', function(){
  gulp.src('dist/index.html')
    .pipe(open("<%file.path%>"), {app: 'google-chrome'});
});

gulp.task('generateIconFiles', function(){
  var fs = require('fs'),
      str = fs.readFileSync('src/style.css'),
      icons, re, contents;

  icons = [];
  re = /icon-(.*):before/gi;

  while ((arr = re.exec(str)) !== null){
    icons.push(arr[1]);
  }

  contents = [];
  re = /content:\s(.*);\n/gi;
  while ((arr = re.exec(str)) !== null){
    contents.push(arr[1].slice(1, -1));
  }

  gulp.src('vendor/assets/templates/variables.ejs')
    .pipe(ejs({
      icons: icons,
      contents: contents
    }))
    .pipe(rename('_variables.sass'))
    .pipe(gulp.dest('vendor/assets/stylesheets/fundly-icon-font/'));

  return gulp.src('vendor/assets/templates/icons.ejs')
    .pipe(ejs({
      icons: icons,
      contents: contents
    }))
    .pipe(rename('_icons.sass'))
    .pipe(gulp.dest('vendor/assets/stylesheets/fundly-icon-font/'));
});

gulp.task('build', function(){
  gulp.run(
    'clean', 'styles', 'minify',
    'moveFonts', 'moveAssets', 'replace', 'open'
  );
});