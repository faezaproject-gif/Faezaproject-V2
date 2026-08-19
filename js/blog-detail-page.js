/* =========================================================
   FAEZAPROJECT V2
   BLOG DETAIL PAGE
   ========================================================= */

(function () {

    "use strict";

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            const params =
                new URLSearchParams(
                    window.location.search
                );

            const blogId =
                params.get("id");


            const title =
                document.getElementById(
                    "article-title"
                );

            const category =
                document.getElementById(
                    "article-category"
                );

            const date =
                document.getElementById(
                    "article-date"
                );

            const image =
                document.getElementById(
                    "article-image"
                );

            const content =
                document.getElementById(
                    "article-content"
                );

            const description =
                document.getElementById(
                    "meta-description"
                );


            /*
             * ELEMENT TIDAK LENGKAP
             */

            if (
                !title ||
                !category ||
                !date ||
                !image ||
                !content
            ) {

                console.error(
                    "Element blog detail tidak lengkap."
                );

                return;
            }


            /*
             * ID ARTIKEL TIDAK ADA
             */

            if (!blogId) {

                showError(
                    "Artikel tidak ditemukan."
                );

                return;
            }


            /*
             * DATA BLOG BELUM TERSEDIA
             */

            if (
                typeof FAEZA_BLOGS ===
                "undefined"
            ) {

                showError(
                    "Data artikel belum tersedia."
                );

                console.error(
                    "FAEZA_BLOGS tidak ditemukan."
                );

                return;
            }


            /*
             * CARI ARTIKEL
             */

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
             * ARTIKEL TIDAK DITEMUKAN
             */

            if (!blog) {

                showError(
                    "Artikel yang Anda cari tidak tersedia."
                );

                return;
            }


            /*
             * JUDUL
             */

            title.textContent =
                blog.title;


            /*
             * KATEGORI
             */

            category.textContent =
                blog.category;


            /*
             * TANGGAL
             */

            const formattedDate =
                new Date(
                    blog.date +
                    "T00:00:00"
                ).toLocaleDateString(
                    "id-ID",
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                );


            date.textContent =
                formattedDate;


            /*
             * GAMBAR
             */

            image.src =
                blog.image;

            image.alt =
                blog.title;


            /*
             * ERROR GAMBAR
             */

            image.addEventListener(
                "error",
                function () {

                    image.style.display =
                        "none";

                }
            );


            /*
             * SEO DESCRIPTION
             */

            if (description) {

                description.setAttribute(
                    "content",
                    blog.excerpt
                );

            }


            /*
             * TITLE BROWSER
             */

            document.title =
                blog.title +
                " | FaezaProject";


            /*
             * ISI ARTIKEL
             */

            renderArticle(
                blog
            );

        }
    );


    /*
     * RENDER ARTICLE
     */

    function renderArticle(
        blog
    ) {

        const content =
            document.getElementById(
                "article-content"
            );


        if (
            typeof FAEZA_BLOG_CONTENT ===
            "undefined"
        ) {

            content.innerHTML = `

                <p>
                    ${blog.excerpt}
                </p>

            `;

            console.warn(
                "FAEZA_BLOG_CONTENT tidak ditemukan."
            );

            return;
        }


        const article =
            FAEZA_BLOG_CONTENT[
                blog.id
            ];


        /*
         * BELUM ADA KONTEN DETAIL
         */

        if (!article) {

            content.innerHTML = `

                <p class="article-intro">
                    ${blog.excerpt}
                </p>

                <h2>
                    Informasi Artikel
                </h2>

                <p>
                    Artikel lengkap sedang
                    dipersiapkan oleh
                    FaezaProject.
                </p>

            `;

            return;
        }


        /*
         * INTRO
         */

        let html = `

            <p class="article-intro">
                ${article.intro}
            </p>

        `;


        /*
         * SECTION
         */

        if (
            Array.isArray(
                article.sections
            )
        ) {

            article.sections.forEach(
                function (section) {

                    html += `

                        <section
                            class="article-section"
                        >

                            <h2>
                                ${section.title}
                            </h2>

                    `;


                    if (
                        Array.isArray(
                            section.paragraphs
                        )
                    ) {

                        section.paragraphs.forEach(
                            function (
                                paragraph
                            ) {

                                html += `

                                    <p>
                                        ${paragraph}
                                    </p>

                                `;

                            }
                        );

                    }


                    html += `

                        </section>

                    `;

                }
            );

        }


        content.innerHTML =
            html;

    }


    /*
     * ERROR PAGE
     */

    function showError(
        message
    ) {

        const title =
            document.getElementById(
                "article-title"
            );

        const category =
            document.getElementById(
                "article-category"
            );

        const content =
            document.getElementById(
                "article-content"
            );


        if (title) {

            title.textContent =
                "Artikel Tidak Ditemukan";

        }


        if (category) {

            category.textContent =
                "Blog";

        }


        if (content) {

            content.innerHTML = `

                <p>
                    ${message}
                </p>

                <p>
                    Silakan kembali ke
                    halaman Blog dan pilih
                    artikel lainnya.
                </p>

            `;

        }

    }

})();
