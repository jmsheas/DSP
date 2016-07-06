window.onresize = function (event:Event):void
{
    var logo:HTMLElement = document.getElementById("logo-nav");
    var leftmost:HTMLElement = document.getElementById("first-nav");
    var logoRect:ClientRect = logo.getBoundingClientRect();
    var leftRect:ClientRect = leftmost.getBoundingClientRect();

    if(logoRect.right >= leftRect.left)
    {
        logo.style.visibility = "hidden";
    }
    else
    {
        logo.style.visibility = "visible";
    }
}