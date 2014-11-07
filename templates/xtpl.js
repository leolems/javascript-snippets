/*----------------------------------------------------------
//   Micro JavaScript Templating   xtpl (minified version += version)
//   Leo Lems - http://2basix.nl 
// 		note: Original JS code by John Resig - MIT Licensed
// 		xtpl += version 
//			size: 744 bytes of code
//			author: L.Lems
------------------------------------------------------------*/
(function(){this.xtpl=function(t,n){var r="",i="",s="";try{var o=/{%=\s*(.+?)\s*%}/g,u=/{%=\s*\(\s*(.+?)\s*\)\s*%}/g,a="var p='"+t.replace(/[\r\t\v\n\b]/g,"").split("'").join("\\'").split("{%js").join("';").split("js%}").join("; p+='")+"'; return p;";var f=new Function("xtplData",a.replace(u,"'; p+=(xtplData.$1); p+='").replace(o,"'; p+=((xtplData.$1)?xtplData.$1:''); p+='"))}catch(i){s="xtpl: There is an error inside the template string.";if(window.console&&window.console.log){console.log(s);console.log("Template: "+t)}return""}if(!n){return f}try{r=f(n)}catch(i){s="xtpl: Error occured when generating the HTML from the template.";if(window.console&&window.console.log){console.log(s);console.log("Template: "+t)}return""}return r}})();

