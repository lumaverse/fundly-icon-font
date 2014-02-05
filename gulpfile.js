var gulp = require('gulp'),
    p =    require('gulp-load-plugins')({camelize: true}),
    pkg =  require('./package.json');

// Parse the src stylesheet from IcoMoon and pull out the icon keys and content
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
    .pipe(p.ejs({
      icons: icons,
      contents: contents,
      version: pkg.version
    }))
    .pipe(p.rename('_variables.scss'))
    .pipe(gulp.dest('vendor/assets/stylesheets/fundly-icon-font/'));

  return gulp.src('vendor/assets/templates/icons.ejs')
    .pipe(p.ejs({
      icons: icons,
      contents: contents
    }))
    .pipe(p.rename('_icons.scss'))
    .pipe(gulp.dest('vendor/assets/stylesheets/fundly-icon-font/'));
});

// Build the CSS files from SASS, waiting first for the icons to be generated
gulp.task('styles', ['generateIconFiles', 'clean'], function(){
  return gulp.src('vendor/assets/stylesheets/fundly-icon-font-dist.scss')
    // .pipe(p.rubySass({ style: 'expanded' }))
    .pipe(p.sass({
      outputStyle: 'expanded'
    }))
    .pipe(p.rename('fundly-icon-font.css'))
    .pipe(gulp.dest('dist/'))
    .pipe(p.minifyCss())
    .pipe(p.rename('fundly-icon-font.min.css'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('moveFonts', ['clean'], function(){
  gulp.src(['src/fonts/*'])
    .pipe(gulp.dest('vendor/assets/fonts'));
  return gulp.src(['src/fonts/*'])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('moveAssets', ['clean'], function(){
  return gulp.src(['src/demo-files/*'])
    .pipe(gulp.dest('dist/demo-files'));
});

gulp.task('replace', ['clean'], function(){
  return gulp.src('src/demo.html')
    .pipe(p.replace(/icon-/g, 'f-icon-'))
    .pipe(p.replace(/href="style.css"/, 'href="fundly-icon-font.css"'))
    .pipe(p.rename('index.html'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function(){
  return gulp.src(['dist/', 'vendor/assets/fonts/'], {read: false})
    .pipe(p.clean());
});

gulp.task('open', ['styles', 'moveAssets', 'moveFonts', 'replace'], function(){
  gulp.src('dist/index.html')
    .pipe(p.open("<%file.path%>"), {app: 'google-chrome'});
});

gulp.task('build', ['open']);


// Bump Version Numbers
function bumpJsonVersions(type) {
  type = type || 'patch';

  gulp.src(['./bower.json', './package.json'])
    .pipe(p.bump({type: type}))
    .pipe(gulp.dest('./'))
    .pipe(bumpRubyVersion());
}

function bumpRubyVersion(){
  var map = require('map-stream');

  return map( function(file, cb) {
    var json = JSON.parse(file.contents.toString());

    console.log('Version bumped to:', json.version);

    gulp.src('lib/fundly/icon/font/version.rb')
      .pipe(p.replace(/VERSION.*\n/g, 'VERSION = "' + json.version + '"\n'))
      .pipe(gulp.dest('lib/fundly/icon/font/'));

    cb(null, file)
  });
}

gulp.task('bump:major', function(){ bumpJsonVersions('major'); });
gulp.task('bump:minor', function(){ bumpJsonVersions('minor'); });
gulp.task('bump:patch', function(){ bumpJsonVersions('patch'); });