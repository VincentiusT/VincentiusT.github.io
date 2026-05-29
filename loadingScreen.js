(function () {
    "use strict";

    var SESSION_KEY = "vt-loading-shown";
    var MIN_DISPLAY_MS = 500;
    var LOGO_BASE_WIDTH = 80;
    var LERP = 0.15;
    var start = Date.now();
    var loader = document.getElementById("loading-screen");
    var logoImg = document.getElementById("loading-screen-logo");

    if (!loader || !logoImg) {
        return;
    }

    function dismissLoaderInstantly() {
        document.body.classList.remove("is-loading");
        var nav = document.querySelector(".navbar.navbar--await-reveal");
        if (nav) {
            nav.classList.add("navbar--revealed");
            nav.classList.add("navbar--loader-complete");
        }
        loader.remove();
        logoImg.remove();
    }

    try {
        if (sessionStorage.getItem(SESSION_KEY)) {
            dismissLoaderInstantly();
            return;
        }
        sessionStorage.setItem(SESSION_KEY, "1");
    } catch (e) {
        // sessionStorage unavailable; show loader as usual
    }

    function dismissLoader() {
        var navbarLogo = document.getElementById("navbarLogo");

        if (!navbarLogo) {
            document.body.classList.remove("is-loading");
            var navFallback = document.querySelector(".navbar.navbar--await-reveal");
            if (navFallback) {
                navFallback.classList.add("navbar--revealed");
                navFallback.classList.add("navbar--loader-complete");
            }
            loader.remove();
            logoImg.remove();
            return;
        }

        var rect = navbarLogo.getBoundingClientRect();
        var centerY = rect.top + rect.height / 2;
        var targetWidth = rect.width;
        var targetScaleY = (centerY * 2) / window.innerHeight;
        var targetLogoScale = targetWidth / LOGO_BASE_WIDTH;

        document.body.classList.remove("is-loading");

        var nav = navbarLogo.closest(".navbar");
        if (nav) {
            requestAnimationFrame(function () {
                nav.classList.add("navbar--revealed");
            });
        }

        loader.style.transformOrigin = "top center";
        logoImg.style.animation = "none";

        var scaleY = 1;
        var logoScale = 1;

        function applyTransforms(currentScaleY, currentLogoScale) {
            loader.style.transform = "scaleY(" + currentScaleY + ")";
            var logoCenterY = (window.innerHeight / 2) * currentScaleY;
            logoImg.style.top = logoCenterY + "px";
            logoImg.style.left = "50%";
            logoImg.style.transform = "translate(-50%, -50%) scale(" + currentLogoScale + ")";
        }

        function step() {
            scaleY += (targetScaleY - scaleY) * LERP;
            logoScale += (targetLogoScale - logoScale) * LERP;

            applyTransforms(scaleY, logoScale);

            if (Math.abs(scaleY - targetScaleY) < 0.001) {
                applyTransforms(targetScaleY, targetLogoScale);
                if (nav) {
                    nav.classList.add("navbar--loader-complete");
                }
                loader.remove();
                logoImg.remove();
                return;
            }

            requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    Promise.all([
        new Promise(function (resolve) {
            if (document.readyState === "complete") {
                resolve();
            } else {
                window.addEventListener("load", resolve, { once: true });
            }
        }),
        document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()
    ]).then(function () {
        var elapsed = Date.now() - start;
        var remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
        setTimeout(dismissLoader, remaining);
    });
})();
