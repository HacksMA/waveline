'use strict';

/**
 * Created by Admin on 11.02.2017.
 */
function setAnimation(el, name) {
    if (el.dataset.toggle == 0) {
        el.style.animation = name + 'On 1s normal forwards';
        el.dataset.toggle = 1;
    } else {
        el.style.animation = name + 'Off 1s normal forwards';
        el.dataset.toggle = 0;
    }
}

function Clock() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    hours < 10 ? hours = "0" + hours : hours;
    minutes < 10 ? minutes = "0" + minutes : minutes;
    seconds < 10 ? seconds = "0" + seconds : seconds;
    day < 10 ? day = "0" + day : day;
    month < 10 ? month = "0" + month : month;

    document.getElementById("clock_place").innerHTML = day + "-" + month + "-" + year + "<br>" + hours + ":" + minutes + ":" + seconds;
}

window.onload = function () {

    setInterval(Clock, 1000);
};

window.onscroll = function () {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    var clientview = window.innerWidth * 0.1;
    var elem = document.getElementsByClassName("HotAction")[0];
    if (scrolled >= clientview) {
        elem.style.position = "fixed";
        elem.style.top = "5vw";
    } else {
        elem.style.position = "absolute";
        elem.style.top = "15vw";
    }
};

//# sourceMappingURL=AdditionalScript-compiled.js.map