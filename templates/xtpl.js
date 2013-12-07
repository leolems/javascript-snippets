/*----------------------------------------------------------
//   Micro JavaScript Templating   xtpl (minified version)
//   Leo Lems - http://2basix.nl - MIT Licensed
------------------------------------------------------------*/
(function(){this.xtpl=function xtpl(templatestring,data){var ret='',xfn=new Function("o","var arr=['"+templatestring.replace(/[\r\t\n]/g,"").split("'").join("\\'").replace(/{%=\s*\(\s*(.+?)\s*\)\s*%}/g,"',($1),'").replace(/{%=\s*(.+?)\s*%}/g,"',(o.$1)?o.$1:'','")+"']; return arr.join('');");if(!data){return xfn}return xfn(data)}})();