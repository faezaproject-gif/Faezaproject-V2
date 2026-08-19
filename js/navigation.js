/* =========================================================
   FAEZAPROJECT V2
   NAVIGATION
   ========================================================= */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {

        const header = document.getElementById("site-header");
        const menuToggle = document.getElementById("menu-toggle");
        const navigation = document.getElementById("main-navigation");

        if (!header || !menuToggle || !navigation) {
            return;
        }


        /* =================================================
           OPEN / CLOSE MOBILE MENU
           ================================================= */

        function openMenu() {

            header.classList.add("menu-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Tutup menu"
            );
        }


        function closeMenu() {

            header.classList.remove("menu-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Buka menu"
            );
        }


        function toggleMenu() {

            const isOpen =
                header.classList.contains("menu-open");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }


        /* =================================================
           BUTTON MENU
           ================================================= */

        menuToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                toggleMenu();
            }
        );


        /* =================================================
           NAVIGATION LINK
           ================================================= */

        const navigationLinks =
            navigation.querySelectorAll("a");

        navigationLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMenu();
                }
            );

        });


        /* =================================================
           ESCAPE KEY
           ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {
                    closeMenu();
                }

            }
        );


        /* =================================================
           CLICK OUTSIDE
           ================================================= */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !header.contains(event.target) &&
                    header.classList.contains("menu-open")
                ) {

                    closeMenu();
                }

            }
        );


        /* =================================================
           RESIZE
           ================================================= */

        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 760) {
                    closeMenu();
                }

            }
        );

    });

})();
