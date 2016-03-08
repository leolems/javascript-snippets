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


// This is UTF-16 proof
function blender16(str) {
	var nw="",len,i;
	var a1,a2,a3,b1,b2,b3,c1,c2,c3;
	var a,b,c;
	
	len=str.length;
	for (i=0; i<len-2 ; i+=3) {
		a = str.charCodeAt(i);
		b = str.charCodeAt(i+1);
		c = str.charCodeAt(i+2);
			
		a3 = (a & 65280);
		a2 = (a & 240) >> 4;
		a1 = (a & 15) << 4;
		b3 = (b & 65280);
		b2 = (b & 240) >> 4;
		b1 = (b & 15) << 4;
		c3 = (c & 65280);
		c2 = (c & 240) >> 4;
		c1 = (c & 15) << 4;
		nw += String.fromCharCode(c3^c1^b2)+String.fromCharCode(b3^a1^c2)+String.fromCharCode(a3^b1^a2);	
	}
	if (i<len) {
		if ((i+2<=len) ) {
			a = str.charCodeAt(i);
			a3 = (a & 65280);
			a2 = (a & 240) >> 4;
			a1 = (a & 15) << 4;
			nw += String.fromCharCode(a3^a1^a2);
			i++;
		}
		a = str.charCodeAt(i);
		a3 = (a & 65280); 
		a2 = (a & 240) >> 4;
		a1 = (a & 15) << 4;
		nw += String.fromCharCode(a3^a1^a2);
	}
 	return nw;
}

