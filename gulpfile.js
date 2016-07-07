
//请求gulp插件
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

//var sass = require('gulp-sass');

var YOURPATH = {
	gitPath : '../../gityy',//改写成你的真实路径
	studioPath : '../../iUAPMobile-Standard-Summer-SR3-Windows/iUAPMobile'//改写成你的真实路径
};
var SYSPATH = {
	git:{},
	studio:{},
	wzjc:{}
};
gulp.task('init',function(){
	//1、css git path
	SYSPATH.git["tpl_ump_css"] = YOURPATH.gitPath + '/publibs/resources/designer/templates/system/webtemplates/frametemplate/ump/projects/default/css';
	SYSPATH.studio["tpl_ratchet_css"] = YOURPATH.gitPath + '/publibs/resources/designer/templates/system/webtemplates/frametemplate/ratchet/projects/default/css';
	SYSPATH.git["tpl_files_css"] = YOURPATH.gitPath + '/publibs/resources/designer/templates/system/webtemplates/files/css';
	
	//2、css studio path
	SYSPATH.studio["tpl_ump_css"] = YOURPATH.studioPath + '/MOB/designer/templates/system/webtemplates/frametemplate/ump/projects/default/css';
	SYSPATH.studio["tpl_ratchet_css"] = YOURPATH.studioPath + '/MOB/designer/templates/system/webtemplates/frametemplate/ratchet/projects/default/css';
	SYSPATH.studio["tpl_files_css"] = YOURPATH.studioPath + '/MOB/designer/templates/system/webtemplates/files/css';
	
	
	//3、js git path
	SYSPATH.git["tpl_ump_js"] = YOURPATH.gitPath + '/publibs/resources/designer/templates/system/webtemplates/frametemplate/ump/projects/default/js';
	SYSPATH.git["tpl_ump_js_fw"] = SYSPATH.git["tpl_ump_js"] + '/frameworks';
	SYSPATH.git["tpl_ratchet_js"] = YOURPATH.gitPath + '/publibs/resources/designer/templates/system/webtemplates/frametemplate/ratchet/projects/default/js';
	SYSPATH.git["tpl_files_js"] = YOURPATH.gitPath + '/publibs/resources/designer/templates/system/webtemplates/files/js';

	
	//4 js studio path
	SYSPATH.studio["tpl_ump_js"] = YOURPATH.studioPath + '/MOB/designer/templates/system/webtemplates/frametemplate/ump/projects/default/js';
	SYSPATH.studio["tpl_ratchet_js"] = YOURPATH.studioPath + '/MOB/designer/templates/system/webtemplates/frametemplate/ratchet/projects/default/js';
	SYSPATH.studio["tpl_files_js"] = YOURPATH.studioPath + '/MOB/designer/templates/system/webtemplates/files/js';
	SYSPATH.studio["tpl_ump_js_fw"] = SYSPATH.studio["tpl_ump_js"] + '/frameworks';

	
	//5
	SYSPATH.wzjc["scripts"] = '../wzjc/src/script';
	  console.log('init ok');
});


gulp.task('default',function(){
	
    gulp.watch('dev/js/summer.js', ['init','summer']);
	
	gulp.watch('dev/js/plugins/*.js', ['init','iuapmobile.frameworks.ui']);
	
	//监听umcss
	gulp.watch('dev/css/iuapmobile.um.css', ['init','umcss']);
	
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
	var path1 = SYSPATH.git["tpl_ump_css"];
	var path3 = SYSPATH.git["tpl_files_css"];
	
	gulp.src(src).pipe(gulp.dest(path1)).pipe(gulp.dest(path3));
	
	//3 update to studio
	var studio1 = SYSPATH.studio["tpl_ump_css"];
	var studio3  = SYSPATH.studio["tpl_files_css"];
	
	gulp.src(src).pipe(gulp.dest(studio1)).pipe(gulp.dest(studio3));
	
	return;
});
gulp.task('summer',function(){
	
	//1 update github
	gulp.src('dev/js/summer.js').pipe(gulp.dest('dist/js/'));
	
	//2 update gityy

	var path1 = SYSPATH.git["tpl_ump_js"];
	var path2 = SYSPATH.git["tpl_ratchet_js"];
	var path3 = SYSPATH.git["tpl_files_js"];
	console.log(path3);
	gulp.src('dev/js/summer.js').pipe(gulp.dest(path1)).pipe(gulp.dest(path2)).pipe(gulp.dest(path3));
	console.log('update gityy end');
	
	//3 update to studio
	var studio1 = SYSPATH.studio["tpl_ump_js"];
	var studio2 = SYSPATH.studio["tpl_ratchet_js"];
	var studio3  = SYSPATH.studio["tpl_files_js"];
	
	//4
	var wzjc = SYSPATH.wzjc["scripts"];
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
	var path11 = SYSPATH.git["tpl_ump_js_fw"];
	var path3 = SYSPATH.git["tpl_files_js"];


	gulp.src(distPath+fileName+".js").pipe(gulp.dest(path11)).pipe(gulp.dest(path3));
	gulp.src(distPath+fileName+".min.js").pipe(gulp.dest(path11)).pipe(gulp.dest(path3));
	console.log('update gityy end');

	//3 update to studio
	var studio11  = SYSPATH.studio["tpl_ump_js_fw"];
	var studio3  = SYSPATH.studio["tpl_files_js"];
	
	gulp.src(distPath+fileName+".js").pipe(gulp.dest(studio11)).pipe(gulp.dest(studio3));
	gulp.src(distPath+fileName+".min.js").pipe(gulp.dest(studio11)).pipe(gulp.dest(studio3));
	console.log('update studio end');
});

