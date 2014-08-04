
/*----------------------------------------------------------
//   Micro JavaScript Templating   xtpl (minified version)
//   Leo Lems - http://2basix.nl 
// 		original code by John Resig - MIT Licensed
//
//	This is the xtpl string addition variant (which was the fastest version of xtpl)
//	the JS code itself is only 681 bytes !!
//
// Here comes the magical function that will power your web-application (lean and mean) xtpl+=
------------------------------------------------------------*/
(function(){this.xtpl_add=function(t,n){var r="",i="";try{var s=/{%=\s*(.+?)\s*%}/g,o=/{%=\s*\(\s*(.+?)\s*\)\s*%}/g,u="var p='"+t.replace(/[\r\t\v\n\b]/g,"").split("'").join("\\'").split("{%js").join("';").split("js%}").join("; p+='")+"'; return p;";xfn=new Function("xtplData",u.replace(o,"'; p+=(xtplData.$1); p+='").replace(s,"'; p+=((xtplData.$1)?xtplData.$1:''); p+='"))}catch(i){txt="xtpl: There is an error inside the template string\n\n";txt+="Click OK to continue.\n\n";alert(txt);return""}if(!n){return xfn}try{r=xfn(n)}catch(i){txt="xtpl: Error occured when generating the HTML from the template \n\n";txt+="Click OK to continue.\n\n";alert(txt);return""}return r}})();
