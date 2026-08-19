/* =========================================================
   FAEZAPROJECT V2
   BLOG SYSTEM
   ========================================================= */

(function () {

    "use strict";


    document.addEventListener(
        "DOMContentLoaded",
        function () {


            const blogGrid =
                document.querySelector(
                    ".blog-grid"
                );


            /*
             * Jika halaman tidak mempunyai
             * blog grid, hentikan script.
             */

            if (!blogGrid) {
                return;
            }


            /*
             * Pastikan data blog tersedia.
             */

            if (
                typeof FAEZA_BLOGS ===
                "undefined"
            ) {

                console.error(
                    "FAEZA_BLOGS tidak ditemukan."
                );

                return;
            }


            /*
             * Format tanggal Indonesia
             */

            function formatDate(
                dateString
            ) {

                const date =
                    new Date(
                        dateString
                    );


                if (
                    Number.isNaN(
                        date.getTime()
                    )
                ) {

                    return dateString;

                }


                return date.toLocaleDateString(
                    "id-ID",
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                );

            }


            /*
             * Buat satu kartu blog
             */

            function createBlogCard(
                blog
            ) {

                const article =
                    document.createElement(
                        "article"
                    );


                article.className =
                    "blog-card";


                article.dataset.blogId =
                    blog.id;


                /*
                 * Image
                 */

                const imageWrapper =
                    document.createElement(
                        "div"
                    );


                imageWrapper.className =
                    "blog-image";


                const image =
                    document.createElement(
                        "img"
                    );


                image.src =
                    blog.image;


                image.alt =
                    blog.title;


                image.loading =
                    "lazy";


                /*
                 * Jika gambar gagal
                 * dimuat, tampilkan
                 * placeholder.
                 */

                image.addEventListener(
                    "error",
                    function () {

                        image.style.display =
                            "none";

                        imageWrapper.textContent =
                            blog.category;

                    }
                );


                imageWrapper.appendChild(
                    image
                );


                /*
                 * Content
                 */

                const content =
                    document.createElement(
                        "div"
                    );


                content.className =
                    "blog-content";


                /*
                 * Category
                 */

                const category =
                    document.createElement(
                        "span"
                    );


                category.className =
                    "blog-category";


                category.textContent =
                    blog.category;


                /*
                 * Date
                 */

                const date =
                    document.createElement(
                        "time"
                    );


                date.dateTime =
                    blog.date;


                date.textContent =
                    formatDate(
                        blog.date
                    );


                /*
                 * Title
                 */

                const title =
                    document.createElement(
                        "h3"
                    );


                title.textContent =
                    blog.title;


                /*
                 * Description
                 */

                const excerpt =
                    document.createElement(
                        "p"
                    );


                excerpt.textContent =
                    blog.excerpt;


                /*
                 * Link
                 */

                const link = document.createElement("a");

link.href =
    "blog-detail.html?id=" +
    encodeURIComponent(blog.id);

link.className =
    "blog-read-more";

link.textContent =
    "Baca selengkapnya";

link.setAttribute(
    "aria-label",
    "Baca selengkapnya: " + blog.title
);


                /*
                 * Gabungkan content
                 */

                content.appendChild(
                    category
                );

                content.appendChild(
                    date
                );

                content.appendChild(
                    title
                );

                content.appendChild(
                    excerpt
                );

                content.appendChild(
                    link
                );


                /*
                 * Gabungkan card
                 */

                article.appendChild(
                    imageWrapper
                );

                article.appendChild(
                    content
                );


                return article;

            }


            /*
             * Render semua artikel
             */

            function renderBlogs() {

                /*
                 * Kosongkan blog grid
                 * agar kartu lama dari
                 * index.html tidak double.
                 */

                blogGrid.innerHTML =
                    "";


                FAEZA_BLOGS.forEach(
                    function (blog) {

                        const card =
                            createBlogCard(
                                blog
                            );


                        blogGrid.appendChild(
                            card
                        );

                    }
                );


                /*
                 * Debug sederhana
                 */

                console.log(
                    "FaezaProject Blog:",
                    FAEZA_BLOGS.length,
                    "artikel berhasil ditampilkan."
                );

            }


            /*
             * Jalankan
             */

            renderBlogs();

        }
    );

})();
