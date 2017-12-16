const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const gutil = require('gulp-util');
const pump = require('pump');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', (run) => {
  pump([
    gulp.src('app/styles/**/*.scss'),
    $.plumber(),
    $.sourcemaps.init(),
    $.sass.sync({
          outputStyle: 'expanded',
          precision: 10,
          includePaths: ['.']
        }).on('error', $.sass.logError),
    $.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}),
    $.sourcemaps.write(),
    gulp.dest('.tmp/styles'),
    reload({stream: true})
    ],
    run
  );
});

gulp.task('scripts', (run) => {
  pump ([
    gulp.src(['app/scripts/**/*.js','!./app/scripts/vendor/**.js']),
    $.plumber(),
    $.sourcemaps.init(),
    $.babel(),
    $.sourcemaps.write('.'),
    gulp.dest('.tmp/scripts'),
    reload({stream: true})
    ],
    run
  );
});

function lint(files, options) {
  return gulp.src(files)
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint(options))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('app/scripts/**/*.js', {
    fix: true
  })
    .pipe(gulp.dest('app/scripts'));
});
gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js', {
    fix: true,
    env: {
      mocha: true
    }
  })
    .pipe(gulp.dest('test/spec/**/*.js'));
});

gulp.task('html', ['styles', 'scripts'], (run) => {
  pump ([
    gulp.src('app/*.html'),
    $.useref({searchPath: ['.tmp', 'app', '.']}),
    $.if('*.html', $.htmlmin({collapseWhitespace: true})),
    $.if('*.js', $.uglify()),
    $.if('*.css', $.cssnano({safe: true, autoprefixer: false})),
    gulp.dest('docs')
    ],
    run
  );
});

gulp.task('images', (run) => {
  pump ([
    gulp.src('app/images/**/*'),
      $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })),
    gulp.dest('docs/images')
    ],
    run
  );
});

gulp.task('fonts', (run) => {
  pump ([
    gulp.src('app/fonts/**/*'),
    gulp.dest('.tmp/fonts'),
    gulp.dest('docs/fonts'),
    ],
  run
  );
});

gulp.task('extras', (run) => {
  pump ([
    gulp.src([
    'app/*.*',
    '!app/*.html'
      ], {
        dot: true
      }),
    gulp.dest('docs')
    ],
  run
  );
});

gulp.task('other', (run) => {
  pump([
    gulp.src('app/other/**/*.*'),
    gulp.dest('docs/other/')
    ],
    run
  );
});

gulp.task('clean', del.bind(null, ['.tmp', 'docs']));

gulp.task('serve', ['styles', 'scripts', 'fonts', 'other'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app']
    }
  });

  gulp.watch([
    'app/*.html',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/fonts/**/*', ['fonts']);
});



gulp.task('serve:docs', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['docs']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras', 'other'], (run) => {
  pump ([
    gulp.src('docs/**/*'),
    $.size({title: 'build', gzip: true})
    ],
    run
  );
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});