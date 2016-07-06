window.onresize = function (event) {
    var logo = document.getElementById("logo-nav");
    var leftmost = document.getElementById("first-nav");
    var logoRect = logo.getBoundingClientRect();
    var leftRect = leftmost.getBoundingClientRect();
    if (logoRect.right >= leftRect.left) {
        logo.style.visibility = "hidden";
    }
    else {
        logo.style.visibility = "visible";
    }
};
//# sourceMappingURL=navbar.js.map