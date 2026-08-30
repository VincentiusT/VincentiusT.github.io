(function () {
    "use strict";
    var nav = document.querySelector(".navbar.navbar--await-reveal");
    if (!nav) return;

    Promise.all([
        document.readyState === "complete"
            ? Promise.resolve()
            : new Promise(function (resolve) {
                  window.addEventListener("load", resolve, { once: true });
              }),
        document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()
    ]).then(function () {
        requestAnimationFrame(function () {
            nav.classList.add("navbar--revealed");
        });
    });
})();
