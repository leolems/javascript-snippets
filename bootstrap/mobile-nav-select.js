/*-------------------------------------------------------
Author: Leo Lems (2basix)
Version: 2.3.2 Bootstrap
requires: Whacky framework JS from 2basix
  This can be replaced by the template snippet also in the javascript repo


Purpose:

  Create a selectbox to replace a  nav ul li
  The nav has to have a class called makemobile

  This is just a code snippet
---------------------------------------------------------*/
	
	
	// mobile nav
	if (true) {
//	if (screen.width<600) {	
		function setMobileMenu(e){ var i=$(e).val(); window.location.href=i;}
		
		selecttpl = "<nav class=\"visible-phone\"><span style=\"font-weight:bold;\">Menu:</span> <select class=\"{%=selectclass%}\" id=\"{%=id%}\">{%=options%}</select></nav>";
		optiontpl = "<option value=\"{%=link%}\">{%=text%}</option>";
//		$("nav").each( function(i) {
		$("nav.makemobile").each( function(i) {
			navitem = $(this);
			$(this).find("ul").each( function(j){
				var li_items=[{link:"#",text:"--"}];
				var rnd=_wf.randomString().r_data;
				$(this).find("li").each( function(itm) {
					var lnk = $(this).find('a');
					li_items.push({link:lnk.attr('href'), text:lnk.html()});
				});
				
				var ret=_wf.render({templatestring:optiontpl, data:li_items});
				if (ret.r_isok) {
					var mergedata = {	selectclass: "mobilemenu",
										id: rnd,
										options: ret.r_data				};
										
					var newselect=_wf.render({templatestring:selecttpl, data:mergedata});
					if (newselect.r_isok) {
						navitem.before(newselect.r_data).attr('class','hidden-phone');
						$("select.mobilemenu").change(function(){setMobileMenu(this);})
					}
				}
			})
		});
	}	
