/*---------------------------------------------------------------------------
//   Micro JavaScript Templating   xtpl (minified version += version)
//
// 		note: 	Original JS code by John Resig - MIT Licensed
//				reworked by Author: Leo Lems - http://2basix.nl 
//
// 		xtpl += version 
//			size: 1360 bytes of code
---------------------------------------------------------------------------*/
String.prototype.arrsplit||(String.prototype.arrsplit=function(t){var e,r,o,n,l,s=[],i=[]
for(s[0]=this,o=t&&!t.propertyIsEnumerable("length")&&"object"==typeof t&&"number"==typeof t.length?t.length:1,e=0;o>e;e++){for(i=[],n=s.length,r=0;n>r;r++)l=s[r].split(t[e]),i=i.concat(l)
s=i}return s}),function(){this.xtpl=function(t,e){var r="",o="",n=void 0
try{var l=/\{%=\s*(.+?)\s*%\}/g,s=/\{%=\s*\(\s*(.+?)\s*\)\s*%\}/g,i=t.replace(/[\r\t\v\n\b]/g,"")
if(t.search("{%if}")>-1&&(i=i.split("{%if}").join("{%js if(").split("{if%}").join("){ js%}").split("{%endif%}").join("{%js } js%}").split("{%else%}").join("{%js } else { js%}")),i.search("{%js")>-1){i=i.arrsplit(["{%js","js%}"])
var p,a=i.length
for(p=0;a>p;p++)p%2&&(i[p]="{%js"+i[p].replace(l,"xtplData.$1")+"js%}")
i=i.join("")}var c="var p='"+i.split("'").join("\\'").split("{%js").join("';").split("js%}").join("p+='")+"'; return p;"
n=Function("xtplData",c.replace(s,"'+(xtplData.$1)+'").replace(l,"'+((xtplData.$1)?xtplData.$1:'')+'"))}catch(j){return o="xtpl: There is an error inside the template string.",window.console&&window.console.log&&(console.log(o),console.log("Template: "+t)),""}if(!e)return n
try{r=n(e)}catch(g){return o="xtpl: Error occured when generating the HTML from the template.",window.console&&window.console.log&&(console.log(o),console.log("Template: "+t)),""}return r}}();
