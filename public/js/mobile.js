window.onload = function () {
    if (screen.width <= 800 || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
        var currloc = window.location.href;
        var newloc = newloc[newloc.length - 1] == '/' ? currloc + "m" : currloc + "/m";
        window.location.href = newloc;
    }
};
//# sourceMappingURL=mobile.js.map