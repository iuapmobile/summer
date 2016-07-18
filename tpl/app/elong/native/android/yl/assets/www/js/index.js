

summerready = function(){
    // here is your code...	
    //var y = $summer.offset($summer.byId('header')).h;
    var width=$summer.offset(document.getElementsByTagName("body")[0]).w;		
    var height = $summer.offset($summer.byId('main')).h;

    summer.openFrame({
        name: 'main',
        url: 'html/main.html',
        bounces: true,
        rect: {
            x: 0,
            y: 0,
            w: width,
            h: height
        }
    });
}