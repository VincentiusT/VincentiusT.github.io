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

    function resetScreenshotScrollers(panelEl) {
        if (!panelEl) {
            return;
        }
        var scrollers = panelEl.querySelectorAll("[data-game-ss]");
        for (var i = 0; i < scrollers.length; i++) {
            scrollers[i].scrollLeft = 0;
        }
    }

    function bindWheelScroll(scroller) {
        scroller.addEventListener(
            "wheel",
            function (e) {
                if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                    return;
                }
                if (e.deltaY === 0) {
                    return;
                }
                var maxScroll = scroller.scrollWidth - scroller.clientWidth;
                if (maxScroll <= 0) {
                    return;
                }
                var next = scroller.scrollLeft + e.deltaY;
                if (next < 0 || next > maxScroll) {
                    if (
                        (next < 0 && scroller.scrollLeft <= 0) ||
                        (next > maxScroll && scroller.scrollLeft >= maxScroll)
                    ) {
                        return;
                    }
                }
                e.preventDefault();
                scroller.scrollLeft += e.deltaY;
            },
            { passive: false }
        );
    }

    function initScreenshotScrollers() {
        var scrollers = document.querySelectorAll("[data-game-ss]");
        for (var i = 0; i < scrollers.length; i++) {
            bindWheelScroll(scrollers[i]);
            var images = scrollers[i].querySelectorAll("img");
            for (var j = 0; j < images.length; j++) {
                images[j].draggable = false;
            }
        }
    }

    window.openGameDetail = function (detailId) {
        hideAll();
        var panel = document.getElementById(detailId);
        if (panel) {
            panel.style.display = "block";
            resetScreenshotScrollers(panel);
        }
        if (typeof window.jQuery !== "undefined") {
            window.jQuery("#gameDetailModal").modal("show");
        }
    };

    window.onload = function () {
        hideAll();
        initScreenshotScrollers();
    };
})();
