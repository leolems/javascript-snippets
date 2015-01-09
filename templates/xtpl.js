/*---------------------------------------------------------------------------
//   Micro JavaScript Templating   xtpl (minified version += version)
//
// 		note: 	Original JS code by John Resig - MIT Licensed
//				reworked by Author: Leo Lems - http://2basix.nl 
//
// 		xtpl += version 
//			size: 1364 bytes of code
---------------------------------------------------------------------------*/
String.prototype.arrsplit||(String.prototype.arrsplit=function(t){var e,r,o,n,l,s=[],i=[];for(s[0]=this,o=t&&!t.propertyIsEnumerable("length")&&"object"==typeof t&&"number"==typeof t.length?t.length:1,e=0;o>e;e++){for(i=[],n=s.length,r=0;n>r;r++)l=s[r].split(t[e]),i=i.concat(l);s=i}return s}),function(){this.xtpl=function(t,e){var r="",o="";try{var n=/{%=\s*(.+?)\s*%}/g,l=/{%=\s*\(\s*(.+?)\s*\)\s*%}/g,s=t.replace(/[\r\t\v\n\b]/g,"");if(t.search("{%if}")>-1&&(s=s.split("{%if}").join("{%js if(").split("{if%}").join("){ js%}").split("{%endif%}").join("{%js } js%}").split("{%else%}").join("{%js } else { js%}")),s.search("{%js")>-1){s=s.arrsplit(["{%js","js%}"]);var i,p;for(p=s.length,i=0;p>i;i++)i%2&&(s[i]="{%js"+s[i].replace(n,"xtplData.$1")+"js%}");s=s.join("")}var a="var p='"+s.split("'").join("\\'").split("{%js").join("';").split("js%}").join("; p+='")+"'; return p;",c=Function("xtplData",a.replace(l,"'; p+=(xtplData.$1); p+='").replace(n,"'; p+=((xtplData.$1)?xtplData.$1:''); p+='"))}catch(j){return o="xtpl: There is an error inside the template string.",window.console&&window.console.log&&(console.log(o),console.log("Template: "+t)),""}if(!e)return c;try{r=c(e)}catch(j){return o="xtpl: Error occured when generating the HTML from the template.",window.console&&window.console.log&&(console.log(o),console.log("Template: "+t)),""}return r}}();
