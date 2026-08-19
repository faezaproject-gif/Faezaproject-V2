/* =========================================================
   FAEZAPROJECT V2
   SMOOTH SCROLL
   ========================================================= */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {

        const links =
            document.querySelectorAll(
                'a[href^="#"]'
            );

        links.forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(targetId);

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const header =
                        document.getElementById(
                            "site-header"
                        );

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });

    });

})();
