/* =========================================================
   FAEZAPROJECT V2
   BLOG DETAIL
   ========================================================= */

(function () {
    "use strict";

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            const blogLinks =
                document.querySelectorAll(
                    "[data-blog]"
                );

            blogLinks.forEach(function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const blogId =
                            this.dataset.blog;

                        const blog =
                            FAEZA_BLOGS.find(
                                function (item) {
                                    return (
                                        item.id ===
                                        blogId
                                    );
                                }
                            );

                        /*
                         * Untuk sekarang artikel
                         * belum dibuat sebagai halaman
                         * terpisah.
                         *
                         * Sistem sudah disiapkan agar
                         * nanti bisa diarahkan ke:
                         *
                         * blog/panduan-umroh.html
                         */

                        if (
                            blog &&
                            blog.url === "#"
                        ) {
                            event.preventDefault();

                            console.log(
                                "Blog dipilih:",
                                blog.title
                            );
                        }

                    }
                );

            });

        }
    );

})();
