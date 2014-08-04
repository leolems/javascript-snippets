
/*----------------------------------------------------------
//   Micro JavaScript Templating   xtpl (minified version)
//   Leo Lems - http://2basix.nl 
// 		original code by John Resig - MIT Licensed
------------------------------------------------------------*/
// Here comes the magical function that will power your web-application
(function(){

	this.xtpl = function xtpl(templatestring, data){
		//======================================================================
		//==-- 2basix version  (improved code..)	
		//======================================================================
		var ret='', err='';
		
		// Generate a reusable function that will serve as a template generator.
		try{ 
				var rdata = /{%=\s*(.+?)\s*%}/g, 
					rfunc = /{%=\s*\(\s*(.+?)\s*\)\s*%}/g,
					pre_tpl =	"var arr=[]; arr.push('"+
								templatestring	.replace(/[\r\t\v\n\b]/g, "")
												.split("'").join("\\'")
												.split("{%js").join("');")
												.split("js%}").join("; arr.push('")
								+"'); return arr.join('');",
											
					xfn =   // Generate a reusable function that will serve as a template generator.
							new Function("xtplData", 
									pre_tpl.replace(rfunc, "',(xtplData.$1),'")		// take care off functions
										   .replace(rdata, "',(xtplData.$1)?xtplData.$1:'','")
							);

		} catch(err) { 
				txt="xtpl: There is an error inside the template string\n\n";
				txt+="Click OK to continue.\n\n";
				alert(txt); 
				return '';
		}
		if (!data) { return xfn }	// return the function !!!

		//=================================================
		try{ ret=xfn(data); } catch(err) { 
				txt="xtpl: Error occured when generating the HTML from the template \n\n";
				txt+="Click OK to continue.\n\n";
				alert(txt); 
				return '';
		}
 		return ret;
	};
})();

