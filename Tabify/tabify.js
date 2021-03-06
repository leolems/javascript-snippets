/*=====================================================================================
		Library for generating tab structures
		requires: jQuery
		Author:	L.Lems
		
		Note: NOT suited for old browsers   ( because of the forEach )
======================================================================================*/
;(function($) {
	if (typeof _tabs === "object") {
		console.log('_tabs object allready exists?, exit')
		return;
	}

	/*===========================================================================
	==-- 					inner functions (hidden)
	===========================================================================*/
	var inside = {};

	inside.myRandomString = function(neverused) {
		var d=new Date(), uniqueid=d.getTime().toString(36), tstring="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ00",
		ret=tstring.substr(Math.floor(Math.random() * 62),1) + tstring.substr(Math.floor(Math.random() * 62),1) + uniqueid + tstring.substr(Math.floor(Math.random() * 62),1);
		return (ret);
	};	

	inside.makeArray = function(element) {
		var result = [];
		if ($.isArray(element)) { result = element; } else { result[0] = element;  }
		return result;
	};
	

	/*----------------------------------------------------------------------------------------------------
		input:		either tabtitle OR 
					jquery object pointing to a tab (li)  OR
					an id from the tab itself is allowed e.g. ('#MyTab')
		
		return:		array of jquery objects pointing to the li elements 			
	-----------------------------------------------------------------------------------------------------*/
	inside.getTabObject = function($tab) {
		var arrp, retarr=[],tmp;
		if ($tab instanceof jQuery) { 
			arrp = inside.makeArray($tab);
			arrp.forEach(function(elem,index,array){
				// the object was a correct li, so add it
				if (elem[0].tagName === "LI") { 
					retarr.push(elem);
				}
				if (elem.tagName === "DIV") { 
					// this is a jquery reference to the tab-content item, we need to find the correct li element
					tmp = $('#t-'+elem.prop("id"));
					// if the li is found, then check it and add it to the array
					if (tmp.length>0 && tmp[0].tagName === "LI") {
						retarr.push(tmp[0]);
					}
				}
			});
			if (retarr.length === 1) { 
				return retarr[0];			// return just one element !!
			} else {
				return retarr;				// return the array
			}
		}
		
		// check if we have string types 
		if ( ($.isArray($tab) && $tab.length > 0 && typeof $tab[0] === "string") || (typeof $tab === "string") ) {
			arrp = inside.makeArray($tab);
			arrp.forEach(function(elem,index,array){
				tmp=[];
				if (elem.slice(0,1) === "#") {
					// the string is a tagid to the tab-content 
					tmp = $('#t-'+elem.slice(1)).parent();
				} else {
					tmp = $('.tabs-menu a[title="'+elem+'"]').parent();
				}
				if (tmp.length>0 && tmp[0].tagName === "LI") {
					retarr.push(tmp);
				}
			});
			if (retarr.length === 1) { 
				return retarr[0];				// return just one element !!
			} else {
				if (retarr.length === 0) {
					return $();					// nothing found, return empty jquery object
				} else {
					return retarr;				// return the array
				}
			}		
		}
		return $();															// empty jquery object !!
	};


	/* create a pubic DOM variable called _tabs */
	window._tabs = { version: "20161006" };
	
	/*=====================================================================================================
	==--						Tabify a container
	======================================================================================================*/
	_tabs.tabify = function() {
		var $newTabs=[];

		//create tabs and tab structure
		$('.tabs').each( function () {
			var $tabs = $(this);
		
			// check if allready tab-ified
			if ($tabs.parent().hasClass('tab-container')) {
				return true;
			}
			// store it for later use to handle other items
			$newTabs.push($tabs);
			// put on the wrapper !
			$tabs.wrap('<div class="tab-container"></div>');
			var $container = $tabs.parent();
			var $list = $container.children('ul:first');
			if ($list.length === 0) {
				$container.prepend('<ul class="tabs-menu"></ul>');
				$list = $container.children('ul:first-child');
			}	
			$tabs.children('.tab-content').each( function(){
				var $tab = $(this);
				var newid = $tab.attr('id');
				if ( !(typeof newid === "string" && newid !== "") ) {
					newid = inside.myRandomString();
				}
				//var newid = inside.myRandomString();
				var theTitle = $tab.attr('title');
				$list.append('<li><a href="#" id="t-'+newid+'" title="'+theTitle+'">'+theTitle+'</a></li>');
				$tab.attr('id',newid).attr('title','');		// set new id anr remove the title
			});
		});
		
		// handle the rest off the actions needed to activate the tabs
		$.each($newTabs, function() {
			var $newtab = $(this);
			// make all tab content divs hidden
			$newtab.find('.tab-content').hide();
			// make first tab visible (active)
			$newtab.children('.tab-content:first').show();
			$newtab.parent().children('ul.tabs-menu').each( function() { 
				$(this).children('li:first').addClass("current");  
				$(this).find('li a').off('click.tabclick').on('click.tabclick',function(event) {
					event.preventDefault();
					var _t = $(this).parent();
					if ( ! _t.hasClass("disabled") )	{
						_tabs.activateTab(_t);		
					}	
				});
			});
		});
	};	

	
	// either tabtitle or a jquery object pointing to a tab(li)
	_tabs.activateFirstTab = function($tab) {
		$tab = inside.getTabObject($tab);
		if ($.isArray($tab) && $tab.length > 0) {
			// we could get an array with multiple tabs...., but we only can activate ONE ?!, SO we will take the first item !!
			// the rest will be ignored
			$tab = $tab[0];
		}
		var ft = $tab.siblings().not('.disabled').first();
		return _tabs.activateTab(ft);
	};
	
	// either tabtitle or a jquery object pointing to a tab(li)
	_tabs.activatePrevTab = function($tab) {
		$tab = inside.getTabObject($tab);
		if ($.isArray($tab) && $tab.length > 0) {
			// we could get an array with multiple tabs...., but we only can activate ONE ?!, SO we will take the first item !!
			// the rest will be ignored
			$tab = $tab[0];
		}

		if ($tab instanceof jQuery) {
			var tab = $tab.prevAll().not('.disabled').first();
			if (tab.length !== 0) {
				return _tabs.activateTab(tab);
			}
		}	
		return false;
	};

	// either tabtitle or a jquery object pointing to a tab(li)
	_tabs.activateNextTab = function($tab) {
		$tab = inside.getTabObject($tab);
		if ($.isArray($tab) && $tab.length > 0) {
			// we could get an array with multiple tabs...., but we only can activate ONE ?!, SO we will take the first item !!
			// the rest will be ignored
			$tab = $tab[0];
		}
		var tab = $tab.nextAll().not('.disabled').first();
		if (tab.length !== 0) {
			return _tabs.activateTab(tab);
		}
		return false;
	};
	
	
	// either tabtitle or a jquery object pointing to a tab(li)
	_tabs.activateTab = function($tab,pEnable) {
		var enableTab = false;
		if (typeof pEnable === "boolean") {
			enableTab = pEnable;
		}
		
		
		$tab = inside.getTabObject($tab);
		if ($.isArray($tab) && $tab.length > 0) {
			// we could get an array with multiple tabs...., but we only can activate ONE ?!, SO we will take the first item !!
			// the rest will be ignored
			$tab = $tab[0];
		}
		if ($tab.length > 0) {
			// enable, the tab
			if (enableTab) {
				$tab.removeClass("disabled");
			}
			
			// jquery object
			if ($tab.hasClass("disabled")) {
				// we cannot activate it because its disabled !!!!
				// we will TRY to activate the previous enabled tab instead
				console.log('tab cannot be activated (disabled)')
				return _tabs.activatePrevTab($tab);
			}
			var $link = $tab.find('a').first();
			$tab.siblings().removeClass("current");
			$tab.addClass("current");
			var tabid = "#"+$link.attr("id").substring(2);
			$(tabid).parent().children('.tab-content').hide();
			$(tabid).show();
			return true;
		}
		return false;
	};
	
	// either tabtitle or a jquery object pointing to a tab(li)
	_tabs.disableTab = function($tab) {
		var $arrtabs,ret=false;
		$arrtabs = inside.makeArray(inside.getTabObject($tab));
		$arrtabs.forEach(function($elem,index,array){		
			var $toDisable = $elem.not('.current');
			if ($toDisable.length > 0) {
				$toDisable.addClass("disabled");
				ret=true;
			}
		});
		return ret;
	};

	
	// either tabtitle or a jquery object pointing to a tab(li)
	_tabs.enableTab = function($tab) {
		var $arrtabs,ret=false;
		$arrtabs = inside.makeArray(inside.getTabObject($tab));
		$arrtabs.forEach(function($elem,index,array){
			if ($elem.length > 0) {
				$elem.removeClass("disabled");
				ret=true;
			}
		});
		return ret;
	};	
})(jQuery); 
