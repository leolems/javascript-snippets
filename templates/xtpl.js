/*----------------------------------------------------------
//   Micro JavaScript Templating   xtpl (minified version)
//   Leo Lems - http://2basix.nl 
// 		original code by John Resig - MIT Licensed
------------------------------------------------------------*/
(function(){this.xtpl=function xtpl(templatestring,data){var ret='';var err='';try{var xfn=new Function("o","var arr=[]; with(o){arr.push('"+templatestring.replace(/[\r\t\n\b]/g,"").split("'").join("\\'").split("{%js").join("\t").replace(/{%=\s*\(\s*(.+?)\s*\)\s*%}/g,"',($1),'").replace(/{%=\s*(.+?)\s*%}/g,"',($1)?$1:'','").split("\t").join("');").split("js%}").join("; arr.push('")+"');} return arr.join('');")}catch(err){txt="xtpl: There is an error inside the template string\n\n";txt+="Click OK to continue.\n\n";alert(txt);return''}if(!data){return xfn}try{ret=xfn(data)}catch(err){txt="xtpl: Error occured when generating the HTML from the template \n\n";txt+="Click OK to continue.\n\n";alert(txt);return''}return ret}})();




// Here comes the magical function that will power your web-application
/*-------------------------------
(function(){
	this.xtpl = function xtpl(templatestring, data){
		//======================================================================
		//==-- 2basix version  (improved code..)	
		//======================================================================
		var ret='';
		var err='';
		
		// Generate a reusable function that will serve as a template generator.
		try{ 
			var xfn = new Function("o", 
						"var arr=[]; with(o){arr.push('"+
						templatestring
							.replace(/[\r\t\n\b]/g, "")
							.split("'").join("\\'") 
							.split("{%js").join("\t")						
							.replace(/{%=\s*\(\s*(.+?)\s*\)\s*%}/g, "',($1),'")		// take care off evaluations
							.replace(/{%=\s*(.+?)\s*%}/g, "',($1)?$1:'','")
							.split("\t").join("');")
							.split("js%}").join("; arr.push('")
						+"');} return arr.join('');");
		} catch(err) { 
			txt="xtpl: There is an error inside the template string\n\n";
			txt+="Click OK to continue.\n\n";
			alert(txt); 
			return '';
		}				
		//=================================================
		if (!data) { return xfn }	// return the function !!!
		try{ ret=xfn(data); } catch(err) { 
				txt="xtpl: Error occured when generating the HTML from the template \n\n";
				txt+="Click OK to continue.\n\n";
				alert(txt); 
				return '';
		}
 		return ret;
	};
})();

-------------------------------------*/
