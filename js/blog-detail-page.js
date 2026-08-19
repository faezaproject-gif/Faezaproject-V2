/* =========================================================
   FAEZAPROJECT V2
   BLOG DETAIL PAGE
   FINAL VERSION
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       INITIALIZE
       ===================================================== */

    function initBlogDetail() {

        /* -------------------------------------------------
           AMBIL ID DARI URL
           ------------------------------------------------- */

        const params =
            new URLSearchParams(
                window.location.search
            );

        const blogId =
            params.get("id");


        /* -------------------------------------------------
           ELEMENT HALAMAN
           ------------------------------------------------- */

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


        /* -------------------------------------------------
           CEK ELEMENT
           ------------------------------------------------- */

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


        /* -------------------------------------------------
           CEK ID
           ------------------------------------------------- */

        if (!blogId) {

            showError(
                "Artikel tidak ditemukan."
            );

            return;
        }


        /* -------------------------------------------------
           CEK DATA BLOG
           ------------------------------------------------- */

        if (
            !Array.isArray(
                window.FAEZA_BLOGS
            )
        ) {

            showError(
                "Data artikel belum tersedia."
            );

            console.error(
                "window.FAEZA_BLOGS tidak ditemukan."
            );

            return;
        }


        /* -------------------------------------------------
           CARI ARTIKEL
           ------------------------------------------------- */

        const blog =
            window.FAEZA_BLOGS.find(
                function (item) {

                    return (
                        item.id ===
                        blogId
                    );

                }
            );


        /* -------------------------------------------------
           ARTIKEL TIDAK DITEMUKAN
           ------------------------------------------------- */

        if (!blog) {

            showError(
                "Artikel yang Anda cari tidak tersedia."
            );

            return;
        }


        /* -------------------------------------------------
           JUDUL
           ------------------------------------------------- */

        title.textContent =
            blog.title;


        /* -------------------------------------------------
           KATEGORI
           ------------------------------------------------- */

        category.textContent =
            blog.category;


        /* -------------------------------------------------
           TANGGAL
           ------------------------------------------------- */

        date.textContent =
            formatDate(
                blog.date
            );


        /* -------------------------------------------------
           GAMBAR
           ------------------------------------------------- */

        image.src =
            blog.image;

        image.alt =
            blog.title;


        /* -------------------------------------------------
           FALLBACK GAMBAR
           ------------------------------------------------- */

        image.addEventListener(
            "error",
            function () {

                image.style.display =
                    "none";

            }
        );


        /* -------------------------------------------------
           SEO DESCRIPTION
           ------------------------------------------------- */

        if (description) {

            description.setAttribute(
                "content",
                blog.excerpt || ""
            );

        }


        /* -------------------------------------------------
           BROWSER TITLE
           ------------------------------------------------- */

        document.title =
            blog.title +
            " | FaezaProject";


        /* -------------------------------------------------
           RENDER CONTENT
           ------------------------------------------------- */

        renderArticle(
            blog,
            content
        );


        /* -------------------------------------------------
           WHATSAPP
           ------------------------------------------------- */

        setupWhatsApp(
            blog
        );

    }


    /* =====================================================
       FORMAT DATE
       ===================================================== */

    function formatDate(
        dateString
    ) {

        if (!dateString) {
            return "";
        }


        const date =
            new Date(
                dateString +
                "T00:00:00"
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return dateString;

        }


        return new Intl.DateTimeFormat(
            "id-ID",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        ).format(date);

    }


    /* =====================================================
       RENDER ARTICLE
       ===================================================== */

    function renderArticle(
        blog,
        content
    ) {


        /* -------------------------------------------------
           CEK BLOG CONTENT
           ------------------------------------------------- */

        if (
            !window.FAEZA_BLOG_CONTENT ||
            typeof
                window.FAEZA_BLOG_CONTENT !==
                "object"
        ) {

            content.innerHTML = `

                <p class="article-intro">
                    ${escapeHTML(
                        blog.excerpt || ""
                    )}
                </p>

                <p>
                    Konten artikel sedang
                    dipersiapkan oleh
                    FaezaProject.
                </p>

            `;

            console.warn(
                "window.FAEZA_BLOG_CONTENT tidak ditemukan."
            );

            return;
        }


        /* -------------------------------------------------
           AMBIL CONTENT BERDASARKAN ID
           ------------------------------------------------- */

        const article =
            window.FAEZA_BLOG_CONTENT[
                blog.id
            ];


        /* -------------------------------------------------
           CONTENT TIDAK ADA
           ------------------------------------------------- */

        if (!article) {

            content.innerHTML = `

                <p class="article-intro">
                    ${escapeHTML(
                        blog.excerpt || ""
                    )}
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


        /* -------------------------------------------------
           INTRO
           ------------------------------------------------- */

        let html = "";


        if (article.intro) {

            html += `

                <p class="article-intro">
                    ${escapeHTML(
                        article.intro
                    )}
                </p>

            `;

        }


        /* -------------------------------------------------
           SECTION
           ------------------------------------------------- */

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
                                ${escapeHTML(
                                    section.title ||
                                    ""
                                )}
                            </h2>

                    `;


                    /* -------------------------------------
                       PARAGRAPH
                       ------------------------------------- */

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
                                        ${escapeHTML(
                                            paragraph
                                        )}
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


        /* -------------------------------------------------
           TAMPILKAN
           ------------------------------------------------- */

        content.innerHTML =
            html;

    }


    /* =====================================================
       WHATSAPP
       ===================================================== */

    function setupWhatsApp(
        blog
    ) {

        const button =
            document.getElementById(
                "article-whatsapp"
            );


        if (!button) {
            return;
        }


        /*
         * GANTI NOMOR INI DENGAN
         * NOMOR WHATSAPP FAEZAPROJECT
         */

        const phone =
            "628XXXXXXXXXX";


        const message =
            "Assalamu'alaikum FaezaProject.%0A%0A" +
            "Saya ingin konsultasi mengenai artikel:%0A" +
            blog.title;


        button.href =
            "https://wa.me/" +
            phone +
            "?text=" +
            message;

        button.target =
            "_blank";

        button.rel =
            "noopener noreferrer";

    }


    /* =====================================================
       ESCAPE HTML
       ===================================================== */

    function escapeHTML(
        value
    ) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =====================================================
       ERROR
       ===================================================== */

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

                <p class="article-intro">
                    ${escapeHTML(
                        message
                    )}
                </p>

                <p>
                    Silakan kembali ke
                    halaman Blog dan pilih
                    artikel lainnya.
                </p>

                <a
                    href="index.html#blog"
                    class="blog-back-link"
                >
                    ← Kembali ke Blog
                </a>

            `;

        }

    }


    /* =====================================================
       START
       ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initBlogDetail
        );

    } else {

        initBlogDetail();

    }

})();
