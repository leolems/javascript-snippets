
_rights.setScreenRights = function() {
    if (!(_usr && _usr.rights && _usr.rights.constructor == {}.constructor)) {
        console.warn("_usr.rights not found, no rights processing took place...");
        return; 
    }
    console.log("--------------------------------");
    
    $('[data-rights]').each(function (obj) {
        var $this = $(this);
        var val, role, objrights, varr, i, len, usrr, found;
        var haverights = false;
        var objarr;    
        // role1:rcupdax;role2:rc;role3;a
        val = $this.data("rights");
        console.log("on element", val);
        if (val && val!="") {
            // we have rights
            varr = val.toLowerCase().split(";");      // multiple roles with rights could have access
            len = varr.length;
            for (i = 0; i < len; i += 1) {
                // floctag:c
                objarr = varr[i].split(':');
                usrr = _usr.rights[objarr[0]];
                console.log("user test:",objarr[0],usrr);
                if (usrr !== undefined) {
                    usrr = usrr.trim();
                    console.log("user has rights: ["+usrr+"]");
                    // we have a user role security record, check it out :P
                    if (usrr == "") { console.log("sssskipping user has empty record..."); continue; }    // userrights record is empty, so skip to next
                    // every character should be present in the usrr
                    objrightsneeded = objarr[1].split("");
                    console.log("objrights needed",objarr[1]);
                    found = true;
                    objrightsneeded.forEach(function (ch) { if (usrr.indexOf(ch) == -1) { found = false; } });
                    if (found) { haverights = true; console.log("yes") }
                }
                if (haverights) { break; }
            }
            if (!haverights) { $this.hide(); }
        }
        
    })
}

