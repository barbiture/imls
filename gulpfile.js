var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	rigger = require('gulp-rigger'),
	watch = require('gulp-watch'),
	stylus = require('gulp-stylus'),
	prefixer = require('gulp-autoprefixer'),
	minifyCss = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant');
//+-----------------------------------------------------------------+

gulp.task('html', function(){
	gulp.src('src/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('build/'))
		.pipe(browserSync.stream());
});
gulp.task('styl', function(){
	gulp.src('src/styles/*.styl')
		// .pipe(rigger())
		.pipe(stylus({
		// compress: true,
		'include css': true
	}))
		// .pipe(minifyCss())
		// .pipe(prefixer())
		.pipe(gulp.dest('build/css/'))
		.pipe(browserSync.stream());
});
gulp.task('css', function(){
	gulp.src('src/styles/css/*.css')
		// .pipe(rigger())
		// .pipe(prefixer())
		.pipe(gulp.dest('build/css/'))
		.pipe(browserSync.stream());
});
gulp.task('img', function(){
	gulp.src('src/images/**/*')
		// .pipe(imagemin({
		// 	progressive: true,
		// 	svgoPlugins: [{removeViewBox: false}],
		// 	use: [pngquant()]
		// }))
		.pipe(gulp.dest('build/images/'))
		.pipe(browserSync.stream());
});

gulp.task('js', function(){
	gulp.src('src/js/*.js')
		.pipe(rigger())
		.pipe(gulp.dest('build/js/'))
		.pipe(browserSync.stream());
});
gulp.task('fonts', function(){
	gulp.src('src/fonts/**/*.*')
		.pipe(gulp.dest('build/fonts/'))
		.pipe(browserSync.stream());
});

//+----------------------------------------------------------------+
gulp.task('build', ['html', 'styl', 'css', 'js', 'fonts', 'img']);

//----------------------------------------------------------------//

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: "./build"
		},
		host: "localhost",
		port: 8090,
		tunnel: false,
		directory: true,
		// browser: "FirefoxNightly"
		browser: "Firefox"
		
});

	gulp.watch('src/**/*.html', ['html']);
	gulp.watch('src/styles/**/*.styl', ['styl']);
	gulp.watch('src/styles/css/**/*.css', ['css']);
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('src/images/**/*.*', ['img']);
	// gulp.watch('src/files/**/*.*', ['img']);
	gulp.watch('src/fonts/**/*.*', ['fonts']);

});
