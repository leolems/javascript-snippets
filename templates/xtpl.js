/*---------------------------------------------------------------------------
//   Micro JavaScript Templating   xtpl (minified version += version)
//
// 		note: 	Original JS code by John Resig - MIT Licensed
//				reworked by Author: Leo Lems - http://2basix.nl 
//
// 		xtpl += version 
//			size: 1364 bytes of code
---------------------------------------------------------------------------*/
//	split a string using an array (to split up by using multiple arguments)
String.prototype.arrsplit||(String.prototype.arrsplit=function(t){var e,o,r,n,l,s=[],i=[]
for(s[0]=this,r=t&&!t.propertyIsEnumerable("length")&&"object"==typeof t&&"number"==typeof t.length?t.length:1,e=0;r>e;e++){for(i=[],n=s.length,o=0;n>o;o++)l=s[o].split(t[e]),i=i.concat(l)
s=i}return s}),function(){this.xtpl=function(t,e){var o="",r=""
try{var n=/{%=\s*(.+?)\s*%}/g,l=/{%=\s*\(\s*(.+?)\s*\)\s*%}/g,s=t.replace(/[\r\t\v\n\b]/g,"")
if(t.search("{%if}")>-1&&(s=s.split("{%if}").join("{%js if(").split("{if%}").join("){ js%}").split("{%endif%}").join("{%js } js%}").split("{%else%}").join("{%js } else { js%}")),s.search("{%js")>-1){s=s.arrsplit(["{%js","js%}"])
var i,p
for(p=s.length,i=0;p>i;i++)i%2&&(s[i]="{%js"+s[i].replace(n,"xtplData.$1")+"js%}")
s=s.join("")}var a="var p='"+s.split("'").join("\\'").split("{%js").join("';").split("js%}").join("p+='")+"'; return p;",c=Function("xtplData",a.replace(l,"'+(xtplData.$1)+'").replace(n,"'+((xtplData.$1)?xtplData.$1:'')+'"))}catch(j){return r="xtpl: There is an error inside the template string.",window.console&&window.console.log&&(console.log(r),console.log("Template: "+t)),""}if(!e)return c
try{o=c(e)}catch(j){return r="xtpl: Error occured when generating the HTML from the template.",window.console&&window.console.log&&(console.log(r),console.log("Template: "+t)),""}return o}}();
