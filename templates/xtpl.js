/*---------------------------------------------------------------------------
//   Micro JavaScript Templating   xtpl (minified version += version)
//
// 		note: 	Original JS code by John Resig - MIT Licensed
//				reworked by Author: Leo Lems - http://2basix.nl 
//
// 		xtpl += version 		size: 1314 bytes of real code
//
// version 2	20201014		With thanks to Attila borzaka
---------------------------------------------------------------------------*/
String.prototype.arrsplit||(String.prototype.arrsplit=function(t){var e,r,o,n=[];for(t&&!t.propertyIsEnumerable("length")&&"object"==typeof t&&"number"==typeof t.length?n=t:n.push(t),r=n.length,o=this,e=0;r>e;e++)o=o.split(n[e]).join("\x1F");return o.split("\x1F")}),function(){this.xtpl=function(t,e,r){var o="",n="";try{var s=/{%=\s*(.+?)\s*%}/g,l=/{%=\s*\(\s*(.+?)\s*\)\s*%}/g,i=t.replace(/[\r\t\v\n\b]/g,"");if(t.search("{%if}")>-1&&(i=i.split("{%if}").join("{%js if(").split("{if%}").join("){ js%}").split("{%endif%}").join("{%js } js%}").split("{%else%}").join("{%js } else { js%}")),i.search("{%js")>-1){i=i.arrsplit(["{%js","js%}"]);var p,a;for(a=i.length,p=0;a>p;p++)p%2&&(i[p]="{%js"+i[p].replace(s,"xtplData.$1")+"js%}");i=i.join("")}var c="var p='"+i.split("'").join("\\'").split("{%js").join("';").split("js%}").join("p+='")+"'; return p;",j=Function("xtplData",c.replace(l,"'+(xtplData.$1)+'").replace(s,"'+((xtplData.$1)?xtplData.$1:'')+'"))}catch(g){return n="xtpl: There is an error inside the template string.",window.console&&window.console.log&&(console.log(n),console.log("Template: "+t)),""}if(!e)return j;try{o=j(e)}catch(g){return n="xtpl: Error occured when generating the HTML from the template.",window.console&&window.console.log&&(console.log(n),console.log("Template: "+t)),""}return o}}();
