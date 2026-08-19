/* =========================================================
   FAEZAPROJECT V2
   PORTFOLIO
   ========================================================= */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {

        const portfolioGrid =
            document.querySelector(".portfolio-grid");

        if (!portfolioGrid) {
            return;
        }


        /*
         * Portfolio masih menggunakan placeholder.
         *
         * Nanti data asli bisa dipindahkan ke:
         *
         * assets/portfolio/
         *
         * tanpa mengubah struktur website.
         */


        const portfolioItems = [

            {
                title: "Project 01",
                category: "Digital & Multimedia",
                image: ""
            },

            {
                title: "Project 02",
                category: "Event Organizer",
                image: ""
            },

            {
                title: "Project 03",
                category: "Muslim Wear",
                image: ""
            },

            {
                title: "Project 04",
                category: "Home & Technical",
                image: ""
            }

        ];


        function renderPortfolio() {

            /*
             * Untuk sekarang kita tidak mengganti
             * HTML portfolio yang sudah ada.
             *
             * Fungsi ini menjadi pondasi untuk
             * portfolio dinamis berikutnya.
             */

            portfolioGrid.dataset.items =
                portfolioItems.length;

        }


        renderPortfolio();

    });

})();
