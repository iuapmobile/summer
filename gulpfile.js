
//请求gulp插件
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

//var sass = require('gulp-sass');

var YOURPATH = {
	gitPath : '../../gityy',//改写成你的真实路径
	studioPath : '../../iUAPMobile-Standard-Summer-SR4-Windows/iUAPMobile'//改写成你的真实路径
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
	gulp.watch('dev/js/Frameworks/**/*.js', ['init','iuapmobile.frameworks.core']);
		
    gulp.watch('dev/js/summer.*.js', ['init','summer']);
	
	gulp.watch('dev/js/plugins/*.js', ['init','iuapmobile.frameworks.ui']);

	gulp.watch('dev/js/Frameworks/UM.Listview.js', ['init','iuapmobile.frameworks.listview']);

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
	console.log('iuapmobile.um.css update github dist end');

	//1 update github
	gulp.src(src).pipe(gulp.dest('dist/css/'));
	
	//2 update gityy
	var path1 = SYSPATH.git["tpl_ump_css"];
	var path3 = SYSPATH.git["tpl_files_css"];
	
	gulp.src(src).pipe(gulp.dest(path1)).pipe(gulp.dest(path3));
	console.log('iuapmobile.um.css is updated to gityy end');

	//3 update to studio
	var studio1 = SYSPATH.studio["tpl_ump_css"];
	var studio3  = SYSPATH.studio["tpl_files_css"];
	
	gulp.src(src).pipe(gulp.dest(studio1)).pipe(gulp.dest(studio3));
	console.log('iuapmobile.um.css is updated to studio end');
});
gulp.task('summer',function(){
	
	//1 update github
	var srcFiles = [];//需合并的源文件数组
	srcFiles.push("dev/js/summer.cordova.js");//1
	srcFiles.push("dev/js/summer.util.js");//2
	srcFiles.push("dev/js/summer.dom.js");//3
	srcFiles.push("dev/js/summer.native.js");//4
	srcFiles.push("dev/js/summer.bridge.js");//5

	var fileName =  "summer";//目标文件名
	var distPath = 'dist/js/';//目标文件夹
	//var distPath = 'test/**/**/css';
	gulp.src(srcFiles).pipe(concat(fileName+'.js')).pipe(gulp.dest(distPath));
	gulp.src(srcFiles).pipe(concat(fileName+'.min.js')).pipe(uglify()).pipe(gulp.dest(distPath));
	console.log('summer.js update github dist/js/ end at ' + (new Date()).toLocaleString());
	
	//2 update gityy
	var path1 = SYSPATH.git["tpl_ump_js"];
	var path2 = SYSPATH.git["tpl_ratchet_js"];
	var path3 = SYSPATH.git["tpl_files_js"];
	
	gulp.src(srcFiles).pipe(concat(fileName+'.js')).pipe(gulp.dest(path1)).pipe(gulp.dest(path2)).pipe(gulp.dest(path3));
	console.log('summer.js is updated to gityy end');
	
	//3 update to studio
	var studio1 = SYSPATH.studio["tpl_ump_js"];
	var studio2 = SYSPATH.studio["tpl_ratchet_js"];
	var studio3  = SYSPATH.studio["tpl_files_js"];
	
	//4
	var wzjc = SYSPATH.wzjc["scripts"];
	gulp.src(srcFiles).pipe(concat(fileName+'.js')).pipe(gulp.dest(studio1)).pipe(gulp.dest(studio2)).pipe(gulp.dest(studio3)).pipe(gulp.dest(wzjc));
	console.log('summer.js is updated to studio end');
});

gulp.task('iuapmobile.frameworks.ui',function(){
	
	//1 update github
	var srcFiles = ["dev/js/plugins/base.js", "dev/js/plugins/collapse.js", "dev/js/plugins/jquery.elastic.js", "dev/js/plugins/modal.js", "dev/js/plugins/progress.js", "dev/js/plugins/pageTransition.js", "dev/js/plugins/table.js", "dev/js/plugins/water.js", "dev/js/plugins/imgmark.js", "dev/js/plugins/grade.js", "dev/js/plugins/action.js"];
	var fileName =  "iuapmobile.frameworks.ui";
	var distPath = 'dist/js/Frameworks/';
	gulp.src(srcFiles).pipe(concat(fileName+'.js')).pipe(gulp.dest(distPath));
	gulp.src(srcFiles).pipe(concat(fileName+'.min.js')).pipe(uglify()).pipe(gulp.dest(distPath));
	console.log('iuapmobile.frameworks.ui.js update github dist end');

	//2 update gityy
	var path11 = SYSPATH.git["tpl_ump_js_fw"];
	var path3 = SYSPATH.git["tpl_files_js"];


	gulp.src(srcFiles).pipe(concat(fileName+'.js')).pipe(gulp.dest(path11)).pipe(gulp.dest(path3));
	gulp.src(srcFiles).pipe(concat(fileName+'.min.js')).pipe(gulp.dest(path11)).pipe(gulp.dest(path3));
	console.log('iuapmobile.frameworks.ui.js update to gityy end');

	//3 update to studio
	var studio11  = SYSPATH.studio["tpl_ump_js_fw"];
	var studio3  = SYSPATH.studio["tpl_files_js"];
	
	gulp.src(srcFiles).pipe(concat(fileName+'.js')).pipe(gulp.dest(studio11)).pipe(gulp.dest(studio3));
	gulp.src(srcFiles).pipe(concat(fileName+'.min.js')).pipe(gulp.dest(studio11)).pipe(gulp.dest(studio3));
	console.log('iuapmobile.frameworks.ui.js update to studio end');
});

gulp.task('iuapmobile.frameworks.listview',function(){
	
	//1 update github
	var srcFiles = ["dev/js/Frameworks/UM.Listview.js"];
	var fileName =  "iuapmobile.frameworks.listview";
	var distPath = 'dist/js/Frameworks/';
	gulp.src(srcFiles).pipe(concat(fileName+'.js')).pipe(gulp.dest(distPath));
	gulp.src(srcFiles).pipe(concat(fileName+'.min.js')).pipe(uglify()).pipe(gulp.dest(distPath));
	console.log('iuapmobile.frameworks.listview.js update to '+distPath+' at ' + (new Date()).toLocaleString());

	//2 update gityy
	var path11 = SYSPATH.git["tpl_ump_js_fw"];
	var path3 = SYSPATH.git["tpl_files_js"];


	            //gulp.src(distPath+fileName+".js").pipe(gulp.dest(path11)).pipe(gulp.dest(path3));
	gulp.src(srcFiles).pipe(concat(fileName+'.js')).pipe(gulp.dest(path11)).pipe(gulp.dest(path3));
	            //gulp.src(distPath+fileName+".min.js").pipe(gulp.dest(path11)).pipe(gulp.dest(path3));
	gulp.src(srcFiles).pipe(concat(fileName+'.min.js')).pipe(gulp.dest(path11)).pipe(gulp.dest(path3));
	console.log('iuapmobile.frameworks.listview.js update to ' + path11 + ' at ' + (new Date()).toLocaleString());
	console.log('iuapmobile.frameworks.listview.js update to ' + path3 + ' at ' + (new Date()).toLocaleString());

	//3 update to studio
	var studio11  = SYSPATH.studio["tpl_ump_js_fw"];
	var studio3  = SYSPATH.studio["tpl_files_js"];
	
	gulp.src(srcFiles).pipe(concat(fileName+'.js')).pipe(gulp.dest(studio11)).pipe(gulp.dest(studio3));
	gulp.src(srcFiles).pipe(concat(fileName+'.min.js')).pipe(gulp.dest(studio11)).pipe(gulp.dest(studio3));
	console.log('iuapmobile.frameworks.listview.js update to ' + studio11 + ' at ' + (new Date()).toLocaleString());
	console.log('iuapmobile.frameworks.listview.js update to ' + studio3 + ' at ' + (new Date()).toLocaleString());

});


gulp.task('iuapmobile.frameworks.core',function(){
	
	//1 update github
	//type "Container\UMP.Container.src.js" ^ "Container\UMP.Services.UMCtx.js" ^ "Container\UMP.Services.Cache.js" ^ "Container\UMP.Services.UMSQLite.js" ^ "Container\UMP.Services.UMNetwork.js" ^ "Container\UMP.Services.Console.js" ^ "Container\UMP.Services.Resource.js" ^ "Container\UMP.Services.UMView.js" ^ "Container\UMP.Services.UMDevice.js" ^ "Container\UMP.Services.UMCamera.js" ^ "Container\UMP.Services.UMJS.js" ^ "Container\UMP.Services.UMAnimation.js" ^ "Container\UMP.Services.UMFile.js" ^ Container\UMP.Container.Menu.js ^ "Container\UMP.Container.Validator.js" ^ Container\UMP.Services.DebugMgr.js > ..\..\assets2\Frameworks\UMP.Container.js

	//type %frmp%json.js ^ %frmp%UMP.MACore.js ^ %frmp%UMP.Container.js ^ %frmp%UMP.UI.Mvc.Controller.js ^ dev\js\Frameworks\UM.Base.js ^ dev\js\Frameworks\UM.Graphics.js> release\js\Frameworks\iuapmobile.frameworks.core-2.7.0.js
	//type %frmp%json.js ^ %frmp%UMP.MACore.js ^ %frmp%UMP.Container.js ^ %frmp%UMP.UI.Mvc.Controller.js ^ dev\js\Frameworks\UM.Base.js ^ dev\js\Frameworks\UM.Graphics.js> release\js\Frameworks\iuapmobile.frameworks.core-2.7.0.js
	var srcFiles = [];//需合并的源文件数组
	srcFiles.push("dev/js/Frameworks/json.js");//1
	srcFiles.push("dev/js/Frameworks/UMP.MACore.js");//2
	
	srcFiles.push("dev/js/Frameworks/Container/UMP.Container.src.js");//3-1
	srcFiles.push("dev/js/Frameworks/Container/UMP.Services.UMCtx.js");//3-2
	srcFiles.push("dev/js/Frameworks/Container/UMP.Services.Cache.js");//3-3
	srcFiles.push("dev/js/Frameworks/Container/UMP.Services.UMSQLite.js");//3-4
	srcFiles.push("dev/js/Frameworks/Container/UMP.Services.UMNetwork.js");//3-5
	srcFiles.push("dev/js/Frameworks/Container/UMP.Services.Console.js");//3-6
	srcFiles.push("dev/js/Frameworks/Container/UMP.Services.Resource.js");//3-7
	srcFiles.push("dev/js/Frameworks/Container/UMP.Services.UMView.js");//3-8
	srcFiles.push("dev/js/Frameworks/Container/UMP.Services.UMDevice.js");//3-9
	srcFiles.push("dev/js/Frameworks/Container/UMP.Services.UMCamera.js");//3-10
	srcFiles.push("dev/js/Frameworks/Container/UMP.Services.UMJS.js");//3-11
	srcFiles.push("dev/js/Frameworks/Container/UMP.Services.UMAnimation.js");//3-12
	srcFiles.push("dev/js/Frameworks/Container/UMP.Services.UMFile.js");//3-13
	srcFiles.push("dev/js/Frameworks/Container/UMP.Container.Menu.js");//3-14
	srcFiles.push("dev/js/Frameworks/Container/UMP.Container.Validator.js");//3-15
	srcFiles.push("dev/js/Frameworks/Container/UMP.Services.DebugMgr.js");//3-16
	
	srcFiles.push("dev/js/Frameworks/UMP.UI.Mvc.Controller.js");//4
	srcFiles.push("dev/js/Frameworks/UM.Base.js");//5
	srcFiles.push("dev/js/Frameworks/UM.Graphics.js");//6
	
	

	
	
	
	var fileName =  "iuapmobile.frameworks.core";//目标文件名
	var distPath = 'dist/js/Frameworks/';//目标文件夹
	
	gulp.src(srcFiles).pipe(concat(fileName+'.js')).pipe(gulp.dest(distPath));
	gulp.src(srcFiles).pipe(concat(fileName+'.min.js')).pipe(uglify()).pipe(gulp.dest(distPath));
	console.log('iuapmobile.frameworks.core.js build to github dist......end');

	//2 update git.yonyou.com
	var path11 = SYSPATH.git["tpl_ump_js_fw"];
	var path3 = SYSPATH.git["tpl_files_js"];
	    gulp.src(srcFiles).pipe(concat(fileName+'.js')).pipe(gulp.dest(path11)).pipe(gulp.dest(path3));
	gulp.src(srcFiles).pipe(concat(fileName+'.min.js')).pipe(gulp.dest(path11)).pipe(gulp.dest(path3));
	console.log('iuapmobile.frameworks.core.js update to git.yonyou.com......end');

	//3 update to studio
	var studio11  = SYSPATH.studio["tpl_ump_js_fw"];
	var studio3  = SYSPATH.studio["tpl_files_js"];
	     gulp.src(srcFiles).pipe(concat(fileName+'.js')).pipe(gulp.dest(studio11)).pipe(gulp.dest(studio3));
	gulp.src(srcFiles).pipe(concat(fileName+'..min.js')).pipe(gulp.dest(studio11)).pipe(gulp.dest(studio3));
	console.log('iuapmobile.frameworks.core.js update to studio......end');
});
