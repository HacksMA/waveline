/**
 * Created by Admin on 11.02.2017.
 */
window.onscroll = function () {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    var clientview = window.innerWidth * 0.1;
    var elem = document.getElementsByClassName("HotAction")[0];
    if (scrolled >= clientview) {
        elem.style.position = "fixed";
        elem.style.top = "5vw";
    }
    else{
        elem.style.position = "absolute";
        elem.style.top = "15vw"
    }
}