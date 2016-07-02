var gulp = require('gulp');
//var sass = require('gulp-sass');
gulp.task('default',function(){
    console.log('begin ...');
});
gulp.task('uglify',function(){
  //do something
   console.log('uglify123');
});
gulp.task('umcss',function(){
	//gulp.src('dev/scss/um.scss').pipe(sass()).pipe(gulp.dest('dist/css/'));
	var src = 'dev/css/iuapmobile.um.css'
	
	//1 update github
	gulp.src(src).pipe(gulp.dest('dist/css/'));
	
	//2 update gityy
	var path1 = '../../gityy/publibs/resources/designer/templates/system/webtemplates/frametemplate/ump/projects/default/css';
	var path2 = '../../gityy/publibs/resources/designer/templates/system/webtemplates/frametemplate/ratchet/projects/default/css';
	var path3 = '../../gityy/publibs/resources/designer/templates/system/webtemplates/files/css';
	gulp.src(src).pipe(gulp.dest(path1)).pipe(gulp.dest(path2)).pipe(gulp.dest(path3));
	
	//3 update to studio
	var studio1 = '../../iUAPMobile-Standard-Summer-SR3-Windows/iUAPMobile/MOB/designer/templates/system/webtemplates/frametemplate/ump/projects/default/css';
	var studio2 = '../../iUAPMobile-Standard-Summer-SR3-Windows/iUAPMobile/MOB/designer/templates/system/webtemplates/frametemplate/ratchet/projects/default/css';
	var studio3 = '../../iUAPMobile-Standard-Summer-SR3-Windows/iUAPMobile/MOB/designer/templates/system/webtemplates/files/css';
	gulp.src(src).pipe(gulp.dest(studio1)).pipe(gulp.dest(studio2)).pipe(gulp.dest(studio3));
	
	//4 update to wzjc
	var wzjc = '../wzjc/src/script';
	gulp.src(src).pipe(gulp.dest(wzjc));
});
gulp.task('summer',function(){
	
	//1 update github
	gulp.src('dev/js/summer.js').pipe(gulp.dest('dist/js/'));
	
	//2 update gityy
	var path1 = '../../gityy/publibs/resources/designer/templates/system/webtemplates/frametemplate/ump/projects/default/js';
	var path2 = '../../gityy/publibs/resources/designer/templates/system/webtemplates/frametemplate/ratchet/projects/default/js';
	var path3 = '../../gityy/publibs/resources/designer/templates/system/webtemplates/files/js';
	gulp.src('dev/js/summer.js').pipe(gulp.dest(path1)).pipe(gulp.dest(path2)).pipe(gulp.dest(path3));
	
	//3 update to studio
	var studio1 = '../../iUAPMobile-Standard-Summer-SR3-Windows/iUAPMobile/MOB/designer/templates/system/webtemplates/frametemplate/ump/projects/default/js';
	var studio2 = '../../iUAPMobile-Standard-Summer-SR3-Windows/iUAPMobile/MOB/designer/templates/system/webtemplates/frametemplate/ratchet/projects/default/js';
	var studio3 = '../../iUAPMobile-Standard-Summer-SR3-Windows/iUAPMobile/MOB/designer/templates/system/webtemplates/files/js';
	
	//4
	var wzjc = '../wzjc/src/script';
	gulp.src('dev/js/summer.js').pipe(gulp.dest(studio1)).pipe(gulp.dest(studio2)).pipe(gulp.dest(studio3)).pipe(gulp.dest(wzjc));
});

gulp.watch('dev/js/summer.js', ['summer']);
gulp.watch('dev/css/iuapmobile.um.css', ['umcss']);