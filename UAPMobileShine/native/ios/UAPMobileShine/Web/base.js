 
function getReturn(name) {
	var c =	eval(name);
	if(c==undefined) return;
	if (typeof c == 'object') {
		ret.get(name, json2str(c));
	} else {
		ret.get(name, c);
	}
}

function json2str(o) {
            var arr = [];
          var fmt = function(s) {
             if (typeof s == 'object' && s != null) return json2str(s);
               return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
            }
           for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));
          return '{' + arr.join(',') + '}';
  }