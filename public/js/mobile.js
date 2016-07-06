window.onload = function () {
    if (document.documentElement.clientWidth <= 800 || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
        //var currloc:string = window.location.href;
        //var newloc:string = newloc[newloc.length - 1] == '/' ? currloc + "m" : currloc + "/m";
        //window.location.href = newloc;
        var iconRack = document.getElementById("iconRack");
        var topSpan = document.getElementById("top-span");
        var bottomSpan = document.getElementById("bottom-span");
        iconRack.style.visibility = "hidden";
        topSpan.style.height = "0px";
        bottomSpan.style.height = "0px";
    }
};
//# sourceMappingURL=mobile.js.map