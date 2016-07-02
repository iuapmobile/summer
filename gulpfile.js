var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//var sass = require('gulp-sass');
gulp.task('default',function(){
    gulp.watch('dev/js/summer.js', ['summer']);
	
	gulp.watch('dev/js/plugins/*.js', ['iuapmobile.frameworks.ui']);
	
	//监听umcss
	gulp.watch('dev/css/iuapmobile.um.css', ['umcss']);
	
	return;
	
	gulp.watch('dev/js/Frameworks/*.js', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		//gulp.src(event.path).pipe(gulp.dest('dest/**/'))
    });
	
	
	
	
	
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
	
	return;
	//wzjc没有使用um.css
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
	console.log('update gityy end');
	
	//3 update to studio
	var studio1 = '../../iUAPMobile-Standard-Summer-SR3-Windows/iUAPMobile/MOB/designer/templates/system/webtemplates/frametemplate/ump/projects/default/js';
	var studio2 = '../../iUAPMobile-Standard-Summer-SR3-Windows/iUAPMobile/MOB/designer/templates/system/webtemplates/frametemplate/ratchet/projects/default/js';
	var studio3 = '../../iUAPMobile-Standard-Summer-SR3-Windows/iUAPMobile/MOB/designer/templates/system/webtemplates/files/js';
	
	//4
	var wzjc = '../wzjc/src/script';
	gulp.src('dev/js/summer.js').pipe(gulp.dest(studio1)).pipe(gulp.dest(studio2)).pipe(gulp.dest(studio3)).pipe(gulp.dest(wzjc));
	console.log('update studio end');
});

gulp.task('iuapmobile.frameworks.ui',function(){
	
	//1 update github
	var srcFiles = ["dev/js/plugins/base.js", "dev/js/plugins/collapse.js", "dev/js/plugins/jquery.elastic.js", "dev/js/plugins/modal.js", "dev/js/plugins/progress.js", "dev/js/plugins/pageTransition.js", "dev/js/plugins/table.js", "dev/js/plugins/water.js", "dev/js/plugins/imgmark.js", "dev/js/plugins/grade.js", "dev/js/plugins/action.js"];
	var fileName =  "iuapmobile.frameworks.ui";
	var distPath = 'dist/js/Frameworks/';
	gulp.src(srcFiles).pipe(concat(fileName+'.js')).pipe(gulp.dest(distPath));
	gulp.src(srcFiles).pipe(concat(fileName+'.min.js')).pipe(uglify()).pipe(gulp.dest(distPath));
	console.log('update github end');
	
	//2 update gityy
	var path1 = '../../gityy/publibs/resources/designer/templates/system/webtemplates/frametemplate/ump/projects/default/js/frameworks';
	var path3 = '../../gityy/publibs/resources/designer/templates/system/webtemplates/files/js';
	gulp.src(distPath+fileName+".js").pipe(gulp.dest(path1)).pipe(gulp.dest(path3));
	gulp.src(distPath+fileName+".min.js").pipe(gulp.dest(path1)).pipe(gulp.dest(path3));
	console.log('update gityy end');
	
	//3 update to studio
	var studio1 = '../../iUAPMobile-Standard-Summer-SR3-Windows/iUAPMobile/MOB/designer/templates/system/webtemplates/frametemplate/ump/projects/default/js/frameworks';
	var studio3 = '../../iUAPMobile-Standard-Summer-SR3-Windows/iUAPMobile/MOB/designer/templates/system/webtemplates/files/js';
	gulp.src(distPath+fileName+".js").pipe(gulp.dest(studio1)).pipe(gulp.dest(studio3));
	gulp.src(distPath+fileName+".min.js").pipe(gulp.dest(studio1)).pipe(gulp.dest(studio3));
	console.log('update studio end');
});

