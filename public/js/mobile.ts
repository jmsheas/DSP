window.onload = function():void
{
    if(screen.width <= 800 || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i))
    {
        var currloc:string = window.location.href;
        var newloc:string = newloc[newloc.length - 1] == '/' ? currloc + "m" : currloc + "/m";
        window.location.href = newloc;
    }
}


