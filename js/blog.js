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

            if (!blogGrid) {
                return;
            }


            function formatDate(dateString) {

                const date =
                    new Date(dateString);

                return date.toLocaleDateString(
                    "id-ID",
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                );
            }


            function renderBlogs() {

                blogGrid.innerHTML =
                    FAEZA_BLOGS
                        .map(function (blog) {

                            return `
                                <article
                                    class="blog-card"
                                    data-blog-id="${blog.id}"
                                >

                                    <div class="blog-image">

                                        ${
                                            blog.image
                                            ? `
                                                <img
                                                    src="${blog.image}"
                                                    alt="${blog.title}"
                                                    loading="lazy"
                                                >
                                            `
                                            : `
                                                <span>
                                                    ${blog.category}
                                                </span>
                                            `
                                        }

                                    </div>

                                    <div class="blog-content">

                                        <span class="blog-category">
                                            ${blog.category}
                                        </span>

                                        <time
                                            datetime="${blog.date}"
                                        >
                                            ${formatDate(blog.date)}
                                        </time>

                                        <h3>
                                            ${blog.title}
                                        </h3>

                                        <p>
                                            ${blog.excerpt}
                                        </p>

                                        <a
                                            href="${blog.url}"
                                            data-blog="${blog.id}"
                                        >
                                            Baca selengkapnya
                                        </a>

                                    </div>

                                </article>
                            `;

                        })
                        .join("");
            }


            renderBlogs();

        }
    );

})();
