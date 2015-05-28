/*=====================================================================================
		Library for generating tab structures
	
		requires: jQuery
		
		Author:	L.Lems
======================================================================================*/

	var _tabs = { version: "1.1", versiondate:"20150528" };
	
	_tabs.myRandomString = function(neverused) {
		var d=new Date(), uniqueid=d.getTime().toString(36), tstring="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ00",
		ret=tstring.substr(Math.floor(Math.random() * 62),1) + tstring.substr(Math.floor(Math.random() * 62),1) + uniqueid + tstring.substr(Math.floor(Math.random() * 62),1);
		return (ret);
	};	
	
	_tabs.makeArray = function(element) {
		var result = [];
		if ($.isArray(element)) { result = element; } else { result[0] = element;  }
		return result;
	};
	
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
					newid = _tabs.myRandomString();
				}
				//var newid = _tabs.myRandomString();
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
				$(this).find('li a').click(function(event) {
					event.preventDefault();
					var _t = $(this).parent();
					if ( ! _t.hasClass("disabled") )	{
						_tabs.activateTab(_t);		
					}	
				});
			});
		});
	};	

	
	/*----------------------------------------------------------------------------------------------------
		input:		either tabtitle OR 
					jquery object pointing to a tab (li)  OR
					an id from the tab itself is allowed e.g. ('#MyTab')
		
		return:		array of jquery objects pointing to the li elements 			
	-----------------------------------------------------------------------------------------------------*/
	_tabs.getTabObject = function($tab) {
		var arrp, retarr=[],tmp;
		if ($tab instanceof jQuery) { 
			arrp = _tabs.makeArray($tab);
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
			arrp = _tabs.makeArray($tab);
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

	
	// either tabtitle or a jquery object pointing to a tab(li)
	_tabs.activateFirstTab = function($tab) {
		$tab = _tabs.getTabObject($tab);
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
		$tab = _tabs.getTabObject($tab);
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
		$tab = _tabs.getTabObject($tab);
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
	_tabs.activateTab = function($tab) {
		$tab = _tabs.getTabObject($tab);
		if ($.isArray($tab) && $tab.length > 0) {
			// we could get an array with multiple tabs...., but we only can activate ONE ?!, SO we will take the first item !!
			// the rest will be ignored
			$tab = $tab[0];
		}
		if ($tab.length > 0) {
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
		$arrtabs = _tabs.makeArray(_tabs.getTabObject($tab));
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
		$arrtabs = _tabs.makeArray(_tabs.getTabObject($tab));
		$arrtabs.forEach(function($elem,index,array){
			if ($elem.length > 0) {
				$elem.removeClass("disabled");
				ret=true;
			}
		});
		return ret;
		
	};
	
	