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
             * Jika tidak ada ID
             */

            if (!blogId) {

                title.textContent =
                    "Artikel tidak ditemukan";

                category.textContent =
                    "Blog";

                content.innerHTML = `
                    <p>
                        Artikel yang Anda cari
                        belum tersedia.
                    </p>
                `;

                return;
            }


            /*
             * Cari artikel
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
             * Artikel tidak ditemukan
             */

            if (!blog) {

                title.textContent =
                    "Artikel tidak ditemukan";

                category.textContent =
                    "Blog";

                content.innerHTML = `
                    <p>
                        Maaf, artikel tersebut
                        belum tersedia.
                    </p>
                `;

                return;
            }


            /*
             * Isi informasi artikel
             */

            title.textContent =
                blog.title;

            category.textContent =
                blog.category;


            const formattedDate =
                new Date(
                    blog.date
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


            image.src =
                blog.image;

            image.alt =
                blog.title;


            /*
             * SEO description
             */

            if (description) {

                description.setAttribute(
                    "content",
                    blog.excerpt
                );

            }


            document.title =
                blog.title +
                " | FaezaProject";

/*
 * ARTICLE CONTENT
 */

const articleContent =
    FAEZA_BLOG_CONTENT[blog.id];


if (articleContent) {

    let html = `
        <p class="article-intro">
            ${articleContent.intro}
        </p>
    `;


    articleContent.sections.forEach(
        function (section) {

            html += `
                <section class="article-section">

                    <h2>
                        ${section.title}
                    </h2>
            `;


            section.paragraphs.forEach(
                function (paragraph) {

                    html += `
                        <p>
                            ${paragraph}
                        </p>
                    `;

                }
            );


            html += `
                </section>
            `;

        }
    );


    content.innerHTML = html;

} else {

    content.innerHTML = `
        <p>
            ${blog.excerpt}
        </p>
    `;

}

            content.innerHTML = `

                <p>
                    ${blog.excerpt}
                </p>

                <h2>
                    Informasi ${blog.title}
                </h2>

                <p>
                    FaezaProject menghadirkan
                    informasi yang membantu
                    masyarakat mendapatkan
                    referensi dan solusi sesuai
                    kebutuhan.
                </p>

                <p>
                    Pastikan Anda selalu
                    menggunakan informasi dari
                    sumber yang terpercaya dan
                    melakukan pengecekan kembali
                    sebelum mengambil keputusan.
                </p>

            `;


            /*
             * WhatsApp
             */

            const whatsapp =
                document.getElementById(
                    "article-whatsapp"
                );


            if (
                whatsapp &&
                window.FaezaWhatsApp
            ) {

                whatsapp.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        if (
                            typeof
                            window.FaezaWhatsApp.open ===
                            "function"
                        ) {

                            window.FaezaWhatsApp.open(
                                "Assalamu'alaikum FaezaProject, " +
                                "saya ingin berkonsultasi " +
                                "mengenai artikel: " +
                                blog.title
                            );

                        }

                    }
                );

            }

        }
    );

})();
