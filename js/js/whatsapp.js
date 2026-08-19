/* =========================================================
   FAEZAPROJECT V2
   WHATSAPP SYSTEM
   ========================================================= */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {

        /*
         * GANTI DENGAN NOMOR WHATSAPP FAEZAPROJECT
         *
         * Format:
         * 628xxxxxxxxxx
         *
         * Jangan gunakan:
         * +62
         * spasi
         * tanda -
         */

        const WHATSAPP_NUMBER = "6285715612700";


        /* =================================================
           DEFAULT MESSAGE
           ================================================= */

        const DEFAULT_MESSAGE =
            "Assalamu'alaikum FaezaProject, saya ingin berkonsultasi mengenai layanan FaezaProject.";


        /* =================================================
           CREATE WHATSAPP URL
           ================================================= */

        function createWhatsAppUrl(message) {

            const encodedMessage =
                encodeURIComponent(
                    message || DEFAULT_MESSAGE
                );

            return (
                "https://wa.me/" +
                WHATSAPP_NUMBER +
                "?text=" +
                encodedMessage
            );
        }


        /* =================================================
           GENERAL WHATSAPP BUTTON
           ================================================= */

        const whatsappButton =
            document.getElementById(
                "whatsapp-button"
            );

        if (whatsappButton) {

            whatsappButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    const url =
                        createWhatsAppUrl(
                            DEFAULT_MESSAGE
                        );

                    window.open(
                        url,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }
            );

        }


        /* =================================================
           SERVICE CONSULTATION
           ================================================= */

        const serviceLinks =
            document.querySelectorAll(
                ".service-card a[href='#contact']"
            );

        serviceLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    const card =
                        this.closest(
                            ".service-card"
                        );

                    const titleElement =
                        card
                            ? card.querySelector("h3")
                            : null;

                    const serviceName =
                        titleElement
                            ? titleElement.textContent.trim()
                            : "layanan FaezaProject";

                    const message =
                        "Assalamu'alaikum FaezaProject, " +
                        "saya ingin berkonsultasi mengenai layanan " +
                        serviceName +
                        ".";

                    const url =
                        createWhatsAppUrl(
                            message
                        );

                    window.open(
                        url,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }
            );

        });


        /* =================================================
           EXPOSE SYSTEM
           ================================================= */

        window.FaezaWhatsApp = {

            open: function (message) {

                const url =
                    createWhatsAppUrl(
                        message
                    );

                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );

            },

            createUrl: createWhatsAppUrl

        };

    });

})();
