/* =========================================================
   FAEZAPROJECT V2
   SERVICE DETAIL
   ========================================================= */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {

        const technicalService =
            FAEZA_SERVICES.find(function (service) {
                return service.id === "technical";
            });

        if (!technicalService) {
            return;
        }


        const serviceCard =
            document.querySelector(
                '.service-card[data-service-id="technical"]'
            );

        if (!serviceCard) {
            return;
        }


        const consultationLink =
            serviceCard.querySelector("a");

        if (!consultationLink) {
            return;
        }


        /* =================================================
           CREATE MODAL
           ================================================= */

        const modal =
            document.createElement("div");

        modal.className =
            "service-modal";

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        modal.innerHTML = `
            <div
                class="service-modal-content"
                role="dialog"
                aria-modal="true"
                aria-labelledby="service-modal-title"
            >

                <button
                    type="button"
                    class="service-modal-close"
                    aria-label="Tutup"
                >
                    ×
                </button>

                <div class="service-modal-icon">
                    ${technicalService.icon}
                </div>

                <h2 id="service-modal-title">
                    ${technicalService.title}
                </h2>

                <p class="service-modal-description">
                    ${technicalService.description}
                </p>

                <div class="service-detail-grid">

                    ${technicalService.items.map(function (item) {

                        return `
                            <article
                                class="service-detail-card"
                                data-service="${item.id}"
                            >

                                <div class="service-detail-card-icon">
                                    ${item.icon}
                                </div>

                                <h3>
                                    ${item.title}
                                </h3>

                                <p>
                                    ${item.description}
                                </p>

                            </article>
                        `;

                    }).join("")}

                </div>

                <a
                    href="#"
                    class="service-modal-action"
                    id="service-modal-whatsapp"
                >
                    Konsultasi via WhatsApp
                </a>

            </div>
        `;

        document.body.appendChild(modal);


        /* =================================================
           ELEMENTS
           ================================================= */

        const closeButton =
            modal.querySelector(
                ".service-modal-close"
            );

        const whatsappButton =
            modal.querySelector(
                "#service-modal-whatsapp"
            );


        let selectedService =
            technicalService.title;


        /* =================================================
           OPEN MODAL
           ================================================= */

        function openModal() {

            modal.classList.add("is-open");

            modal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";
        }


        /* =================================================
           CLOSE MODAL
           ================================================= */

        function closeModal() {

            modal.classList.remove("is-open");

            modal.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.style.overflow =
                "";
        }


        /* =================================================
           MAIN SERVICE BUTTON
           ================================================= */

        consultationLink.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                selectedService =
                    technicalService.title;

                openModal();
            }
        );


        /* =================================================
           SUB SERVICE SELECTION
           ================================================= */

        const detailCards =
            modal.querySelectorAll(
                ".service-detail-card"
            );

        detailCards.forEach(function (card) {

            card.addEventListener(
                "click",
                function () {

                    const serviceId =
                        this.dataset.service;

                    const selected =
                        technicalService.items.find(
                            function (item) {
                                return (
                                    item.id ===
                                    serviceId
                                );
                            }
                        );

                    if (!selected) {
                        return;
                    }

                    selectedService =
                        selected.title;

                    detailCards.forEach(
                        function (item) {
                            item.style.borderColor =
                                "";
                        }
                    );

                    this.style.borderColor =
                        "var(--color-accent)";
                }
            );

        });


        /* =================================================
           WHATSAPP
           ================================================= */

        whatsappButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                if (
                    window.FaezaWhatsApp &&
                    typeof window.FaezaWhatsApp.open ===
                    "function"
                ) {

                    window.FaezaWhatsApp.open(
                        "Assalamu'alaikum FaezaProject, " +
                        "saya ingin berkonsultasi mengenai " +
                        selectedService +
                        "."
                    );

                }

            }
        );


        /* =================================================
           CLOSE BUTTON
           ================================================= */

        closeButton.addEventListener(
            "click",
            closeModal
        );


        /* =================================================
           CLICK OUTSIDE
           ================================================= */

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {
                    closeModal();
                }

            }
        );


        /* =================================================
           ESCAPE
           ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    modal.classList.contains("is-open")
                ) {

                    closeModal();

                }

            }
        );

    });

})();
