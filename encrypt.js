function blender(str) {
	var nw="",len,i;
	len=str.length;
	for (i=0; i<len-2 ; i+=3) { 
		nw += str[i+1]+str[i]+str[i+2];	
	}
	if (i<len) {
		if ((i+2<=len) ) {
			nw += str[i+1]+str[i];    
		} else {
			nw += str.substr(i);
		}  
	} 
 	return nw;
}

function str2Bin(str) {
	var nw="",len,i;
	len=str.length;
	for (i=0; i<len ; i++) { 
		nw += str.charCodeAt(i).toString(2);
	}
	return nw
}


// this does not work on UNICODE characters because this only works with 8 bits
function blender2(str) {
	var nw="",len,i;
	var a1,a2,b1,b2,c1,c2;
	var a,b,c;
	
	len=str.length;
	for (i=0; i<len-2 ; i+=3) {
		a = str.charCodeAt(i);
		b = str.charCodeAt(i+1);
		c = str.charCodeAt(i+2);
		a2 = (a & 240) >> 4;
		a1 = (a & 15) << 4;
		b2 = (b & 240) >> 4;
		b1 = (b & 15) << 4;
		c2 = (c & 240) >> 4;
		c1 = (c & 15) << 4;
		nw += String.fromCharCode(c1^b2)+String.fromCharCode(a1^c2)+String.fromCharCode(b1^a2);	
	}
	if (i<len) {
		if ((i+2<=len) ) {
			a = str.charCodeAt(i);
			b = str.charCodeAt(i+1);
			a2 = (a & 240) >> 4;
			a1 = (a & 15) << 4;
			b2 = (b & 240) >> 4;
			b1 = (b & 15) << 4;
			nw += String.fromCharCode(b1^a2)+String.fromCharCode(a1^b2);    
		} else {
			a = str.charCodeAt(i);
			a2 = (a & 240) >> 4;
			a1 = (a & 15) << 4;
			nw += String.fromCharCode(a1^a2);
		}  
	}
 	return nw;
}

