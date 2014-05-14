/*----------------------------------------------------------
//   Micro JavaScript Templating   xtpl (minified version)
//   Leo Lems - http://2basix.nl - MIT Licensed
------------------------------------------------------------*/
/*  old version 
(function(){this.xtpl=function xtpl(templatestring,data){var ret='',xfn=new Function("o","var arr=['"+templatestring.replace(/[\r\t\n]/g,"").split("'").join("\\'").replace(/{%=\s*\(\s*(.+?)\s*\)\s*%}/g,"',($1),'").replace(/{%=\s*(.+?)\s*%}/g,"',(o.$1)?o.$1:'','")+"']; return arr.join('');");if(!data){return xfn}return xfn(data)}})();
*/

/*----------------------------------------------------------
//   Micro JavaScript Templating   xtpl (minified version)
//   Leo Lems - http://2basix.nl 
// 		original code by John Resig - MIT Licensed
// 		723 bytes
------------------------------------------------------------*/
(function(){this.xtpl=function xtpl(a,b){var c='',err='';try{var d=/{%=\s*(.+?)\s*%}/g,rfunc=/{%=\s*\(\s*(.+?)\s*\)\s*%}/g,pre_tpl="var arr=[]; arr.push('"+a.replace(/[\r\t\v\n\b]/g,"").split("'").join("\\'").split("{%js").join("');").split("js%}").join("; arr.push('")+"'); return arr.join('');",xfn=new Function("xtplData",pre_tpl.replace(rfunc,"',(xtplData.$1),'").replace(d,"',(xtplData.$1)?xtplData.$1:'','"))}catch(err){txt="xtpl: There is an error inside the template string\n\n";txt+="Click OK to continue.\n\n";alert(txt);return''}if(!b){return xfn}try{c=xfn(b)}catch(err){txt="xtpl: Error occured when generating the HTML from the template \n\n";txt+="Click OK to continue.\n\n";alert(txt);return''}return c}})();


