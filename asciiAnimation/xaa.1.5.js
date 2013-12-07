/*
	xaa (eXtreme Ascii Animations)
	author: 	Leo Lems ( http://2basix.nl )
	version:	Version 1.5 (20120207)

	$('#ldr').xaa({interval:300,maxitems:3});
	// blinking dollar char
	$('#ldr').xaa({interval:300,maxitems:1,lchar:'$'});
	//knightrider kinda thing (all frames)
	$('#ldr').xaa({interval:40,lchar:['-------','=------','|=-----','=|=----','-=|=---','--=|=--','---=|=-','----=|=','-----=|','------=','-------','-------','------=','-----=|','----=|=','---=|=-','--=|=--','-=|=---','=|=----','|=-----','=------','-------']});
	//count back if end is reached (knightrider with half of its data !)
	$('#ldr').xaa({interval:100,countdown:true,lchar:['-------','=------','|=-----','=|=----','-=|=---','--=|=--','---=|=-','----=|=','-----=|','------=','-------']});
	//just array
	$('#ldr').xaa({lchar:['&#9776;','&#9777;','&#9779;','&#9783;','&#9782;','&#9780;','&#9776;'],interval:300});
	$('#ldr').xaa({interval:100,lnsize:6,lchar:['------======','==------====','====------==','======------']});
	
*/

/*
		TTD
				if start does not find the element anymore, then clear the timer ???
				?? i think not possible because he cannot find the id
	
*/		

;(function( $ ){

	var self,
	__d=null;

	function isThisArray(it) {
		return (it && !(it.propertyIsEnumerable('length')) && typeof it === 'object' && typeof it.length === 'number');
	}
	
var methods = {
	init : function( arg ) {
         
		var 	$this = $(this),
				data = __d,
				i,
				p=-1,
				rtimer=false,
				xobj={};
        
		// If the plugin hasn't been initialized yet
		// characters: http://www.edlazorvfx.com/ysu/html/ascii.html
		if (__d===null) {
			__d={	interval:400,
						cnt:0,
						lchar:'&'+'#9776;',
						maxitems:5,
						countdown:false,
						hd:null,
						lnsize:-1,
						act: []
				};
		}
		 
		// find out if element has an id
		xobj.id= $this.attr("id");
		xobj.interval=__d.interval;
		xobj.maxitems=__d.maxitems;
		xobj.lnsize=__d.lnsize;
		xobj.cd=false;
		xobj.add=1;
		if (typeof xobj.id === "undefined") {
			// the element had no id, so create a unique
			xobj.id="_xaa_"+__d.cnt;
			$this.attr("id",xobj.id);
			__d.cnt++;
		} else {
			// EVERY rloader has an id !!!
			i=__d.act.length-1;
			if (i>=0) {
				do {
					if (__d.act[i].id===xobj.id) {
						p=i;
					}	
				} while (i--);
			}
		}

		if (arg) {
			if (typeof arg.countdown === "boolean") {
				xobj.cd=arg.countdown;
			} else {
				xobj.cd= (p<0) ? __d.countdown : __d.act[p].cd; 
			}
			if (typeof arg.lchar === "string" || isThisArray(arg.lchar) ) {
				xobj.lchar=arg.lchar;
			} else {
				xobj.lchar= (p<0) ? __d.lchar : __d.act[p].lchar; 
			}

			if (isThisArray(arg.lchar)) {
				if (xobj.lchar.length===1) {
					// only one element in array so treat it as a single character
					xobj.lchar=xobj.lchar[0];
					xobj.maxitems=arg.maxitems;
				} else {
					// multiple entries, so maxitems = length array
					xobj.maxitems=xobj.lchar.length;
				}
			} else {
				if (typeof arg.maxitems === "number") {
					if (arg.maxitems<0) { arg.maxitems=1;}
					xobj.maxitems=arg.maxitems;
				} else {
//					xobj.maxitems= (p<0) ? __d.maxitems : __d.act[p].maxitems; 
					xobj.maxitems= __d.maxitems;		// fall back to default 
				}
			}
			
			if (typeof arg.lnsize === "number") {
				if (arg.lnsize>0) {
					xobj.lnsize=arg.lnsize;
				}	
			} else {
				xobj.lnsize= __d.lnsize;	// fall back to the default linesize (always)
			}
			
			if (typeof arg.interval === "number") {
				if (arg.interval<40) { arg.interval=40;}
				xobj.interval=arg.interval;
				rtimer=true;
			} else {
				xobj.interval= (p<0) ? __d.interval : __d.act[p].interval; 
			}
			
			// we can hd more arg here, maxitems, interval !
			
		} else { 
			// no arguments
			xobj.lchar=__d.lchar;
			
			// what if present, but stopped
			if (p<0) {
				// not present
				xobj.lchar=__d.lchar;
			} else {
				xobj.lchar=__d.act[p].lchar;
				xobj.maxitems=__d.act[p].maxitems;
				xobj.interval=__d.act[p].interval;
				xobj.cd=__d.act[p].cd;
				if (isThisArray(xobj.lchar)) {
					if (xobj.lchar.length===1) {
						xobj.lchar=xobj.lchar[0];
					} else {
						xobj.maxitems=xobj.lchar.length;
					}
				}	
			}				
		}
			
		if (p>=0) {
			__d.act[p].lchar=xobj.lchar;
			__d.act[p].maxitems=xobj.maxitems;
			__d.act[p].lnsize=xobj.lnsize;
			__d.act[p].interval=xobj.interval;
			__d.act[p].cd=xobj.cd;
			if (__d.act[p].hd!==null) {
				// it is currently running
				if (rtimer) {
					clearInterval(__d.act[p].hd);
					__d.act[p].hd=setInterval("$('#"+xobj.id+"').xaa('animate');", xobj.interval);
				}
			} else {
				__d.act[p].hd=setInterval("$('#"+xobj.id+"').xaa('animate');", xobj.interval);
			}
		} else {
			xobj.cnt=0;
			if (!isThisArray(xobj.lchar)) {xobj.cnt=1;}
			xobj.hd = setInterval("$('#"+xobj.id+"').xaa('animate');", xobj.interval);
			__d.act.push(xobj);
		}
		xobj=null;
		return self;
    },
	destroyall : function( ) {
		// destroy ALL animations, so stop all timers and remove all from memory
		if (__d!==null) {
			if (__d.act!==null) {
				var i,element,maxi;
				maxi=__d.act.length;
				for(i=0;i<maxi;i++) {
					element=__d.act[i];
					// remove timer
					if (element.hd!==null) { clearInterval(element.hd); }
					element.lchar=null;	// remove the chars
					// clear the html
					$('#'+element.id).html('');
					// clear the complete element
					__d.act[i]=null;
				}
				// remove the active elements
				__d.act=null;
				// remove the loader content
			}
			__d=null;
		}	
		return self;
	},
	remove : function() {
		if (__d!==null) {
			if (__d.act!==null) {		
				//===========================
				// there is animation data
				//===========================
				var $this = $(this);
				var i,theid;
				var destroy=null;
				
				theid = $this.attr("id");
				i=__d.act.length-1;
				if (i>=0) {
					do {
						if (__d.act[i] !== null) {
							if (__d.act[i].id===theid) {
								destroy=__d.act[i];
								if (__d.act[i].hd!==null) {
									clearInterval(__d.act[i].hd);
									__d.act[i].hd=null;
								}
								$this.html("");
								break;
							}
						}
					} while (i--);
				}	
				if (destroy!==null) {
					__d.act=$.grep(__d.act, function(val) { return val !== destroy; });
				}
			}	
		}
		return self;
    },
	start : function() {
		if (__d!==null) {
			if (__d.act!==null) {		
				//===========================
				// there is animation data
				//===========================
				var $this = $(this);
				var i,theid;
				theid = $this.attr("id");
				i=__d.act.length-1;
				if (i>=0) {
					do {
						if (__d.act[i] !== null) {
							if (__d.act[i].id===theid) {

								if (__d.act[i].hd!==null) {
									clearInterval(__d.act[i].hd);
									__d.act[i].hd=setInterval("$('#"+theid+"').xaa('animate');", __d.act[i].interval);
								} else {
									__d.act[i].hd=setInterval("$('#"+theid+"').xaa('animate');", __d.act[i].interval);
								}

								break;
							}
						}
					} while (i--);
				}	
			}	
		}
		return self;
    },
    animate : function() {
		var $this = $(this);

		if (__d!==null) {	
			//==================================================================
			// this was an animation call, so animation should be done now
			//==================================================================
			var i,fnd,element,j,out,chars,arr,mi,totlen;
			var theid=$this.attr("id");

			fnd=false;
			i=__d.act.length-1;
			if (i>=0) {
				do {
					if (__d.act[i] !== null) {
						if (__d.act[i].id===theid) {
							fnd=true;
							out="";
							element=__d.act[i];
							arr=isThisArray(element.lchar);
							
							//===========================================
							//== Blinking
							//===========================================
							if (element.maxitems===1) {
								// blink
								if (element.cnt===1) {
									if (arr) {
										$this.html(element.lchar[0]);
									} else {	
										$this.html(element.lchar);
									}	
									element.cnt=0;
								} else {
									$this.html("&nbsp;");
									element.cnt=1;
								}
								continue;
							}
							//===========================================
							
							if (element.add>0) {
								// the counter goes UP so add = +1
								if (arr) {
									// add items or go further in array
									if (element.cnt>=element.maxitems) {
										if (element.cd) {
											// countdown, so change direction
											element.add=-1;
											element.cnt-=2;
											if (element.cnt<0) {element.cnt=0;}
										} else {
											element.cnt=0;
										}	
									}
								
								} else {
									// add items or go further in array
									if (element.cnt>element.maxitems) {
										if (element.cd) {
											// countdown, so change direction
											element.add=-1;
											element.cnt-=2;
											if (element.cnt<1) {element.cnt=1;}
										} else {
											element.cnt=1;
										}	
									}
								}
							} else {
								// the counter goes DOWN so add = -1
								if (arr) {
									// remove items or go back in array
									// this can only happen in countdown mode 
									if (element.cnt<0) {
										// always go back to adding
										element.add=1;
										element.cnt=1;
									}

								} else {
									// remove items or go back in array
									// this can only happen in countdown mode 
									if (element.cnt<1) {
										// always go back to adding
										element.add=1;
										element.cnt=2;
									}
								}	
							}						
							
							// count alway starts at 0 !!!
							var elcnt;
							if (arr) {
								elcnt=element.cnt;
								for (j=0;j<=elcnt;j++) {
									chars=element.lchar;
									if (isThisArray(chars)) {
										// chars are an array
										
										out=element.lchar[elcnt];
									} else {
										out=out+element.lchar;
									}
								}
							} else {
								elcnt=element.cnt;
								for (j=1;j<=elcnt;j++) {
									chars=element.lchar;
									if (isThisArray(chars)) {
										// chars are an array
										
										out=element.lchar[elcnt];
									} else {
										out=out+element.lchar;
									}
								}
							}
							
							if (element.lnsize>0 && out.length > element.lnsize) {
								// we have a linesize that means 'out' should be divided into multiline divs to create a frame
								var newout="";
								while (out.length>0) {
									newout+='<div class="xaaline">'+out.substr(0,element.lnsize)+'</div>';
									if (out.length>element.lnsize) {
										out=out.substr(element.lnsize);
									} else { out=""; }	
								}
								$this.html(newout);
							} else {
								$this.html(out);
							}	
							element.cnt+=element.add;
							// i found the element inside the array
						}
					}
				} while(i--);	
			}	
		}
		return self;
	},
    stop : function( ) {
		if (__d!==null) {	
			//===========================
			// there was animation data
			//===========================
			var $this = $(this);
			var i,theid;
			
			theid = $this.attr("id");
			i=__d.act.length-1;
			if (i>=0) {
				do {
					if (__d.act[i] !== null) {
						if (__d.act[i].id===theid) {
							clearInterval(__d.act[i].hd);
							__d.act[i].hd=null;
							break;
						}
					}
				} while (i--);
			}	
		}
		return self;
    }
  };

  $.fn.xaa = function( method ) {
	self = this;
	var xx,ii;
    if ( methods[method] ) {
		// process the each here
		xx=this.length;
		for (ii=0;ii<xx;ii++) {
			methods[method].apply( this[ii], Array.prototype.slice.call( arguments, 1 ));
		}
      return self;
//      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
		// process the each here
		xx=this.length;
		for (ii=0;ii<xx;ii++) {
			methods.init.apply( this[ii], arguments );
		};
      return self;
//      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.xaa' );
    }    
  };

})( jQuery );
