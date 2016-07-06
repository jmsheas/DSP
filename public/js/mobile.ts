window.onload = function():void
{
    if(document.documentElement.clientWidth <= 800 || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i))
    {
        //var currloc:string = window.location.href;
        //var newloc:string = newloc[newloc.length - 1] == '/' ? currloc + "m" : currloc + "/m";
        //window.location.href = newloc;

        var iconRack:HTMLElement = document.getElementById("iconRack");
        var topSpan:HTMLElement = document.getElementById("top-span");
        var bottomSpan:HTMLElement = document.getElementById("bottom-span");

        iconRack.style.visibility = "hidden";
        topSpan.style.height = "0px";
        bottomSpan.style.height = "0px";
    }
}


