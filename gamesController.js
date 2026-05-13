(function () {
    "use strict";

    function hideAll() {
        var modal = document.getElementById("gameDetailModal");
        if (!modal) {
            return;
        }
        var panels = modal.querySelectorAll(".modal-body > div.container[id]");
        for (var i = 0; i < panels.length; i++) {
            panels[i].style.display = "none";
        }
    }

    function getSlideshowRoot(el) {
        return el && el.closest ? el.closest("[data-game-slideshow]") : null;
    }

    function showSlidesForRoot(root, index) {
        if (!root) {
            return;
        }
        var slides = root.querySelectorAll(".game-slide");
        var dots = root.querySelectorAll(".game-slide-dot");
        var n = slides.length;
        if (n === 0) {
            return;
        }
        var i = ((index % n) + n) % n;
        root.dataset.slideIndex = String(i);
        for (var j = 0; j < n; j++) {
            slides[j].style.display = j === i ? "block" : "none";
        }
        for (var k = 0; k < dots.length; k++) {
            if (dots[k].classList) {
                dots[k].classList.toggle("active", k === i);
            }
        }
    }

    function resetSlideshowsInPanel(panelEl) {
        if (!panelEl) {
            return;
        }
        var roots = panelEl.querySelectorAll("[data-game-slideshow]");
        for (var r = 0; r < roots.length; r++) {
            showSlidesForRoot(roots[r], 0);
        }
    }

    window.gameSlideNav = function (el, delta) {
        var root = getSlideshowRoot(el);
        if (!root) {
            return;
        }
        var slides = root.querySelectorAll(".game-slide");
        var cur = parseInt(root.dataset.slideIndex || "0", 10);
        if (isNaN(cur)) {
            cur = 0;
        }
        var next = cur + delta;
        if (next >= slides.length) {
            next = 0;
        }
        if (next < 0) {
            next = slides.length - 1;
        }
        showSlidesForRoot(root, next);
    };

    window.gameSlideGo = function (el) {
        var root = getSlideshowRoot(el);
        if (!root) {
            return;
        }
        var idx = parseInt(el.getAttribute("data-slide"), 10);
        if (isNaN(idx)) {
            return;
        }
        showSlidesForRoot(root, idx);
    };

    window.openGameDetail = function (detailId) {
        hideAll();
        var panel = document.getElementById(detailId);
        if (panel) {
            panel.style.display = "block";
            resetSlideshowsInPanel(panel);
        }
        if (typeof window.jQuery !== "undefined") {
            window.jQuery("#gameDetailModal").modal("show");
        }
    };

    window.onload = function () {
        hideAll();
    };
})();
