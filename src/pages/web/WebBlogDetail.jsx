import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
import HomeLayouts from "../../layouts/HomeLayouts";
import Cookies from "js-cookie";

export default function WebBlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const cacheKey = `blog-detail-${slug}`;
    const cacheData = sessionStorage.getItem(cacheKey);

    if (cacheData) {
      const parsed = JSON.parse(cacheData);
      setBlog(parsed.blog);
      setRelatedBlogs(parsed.related);
    } else {
      fetchBlog();
    }

    // Simpan slug yang sudah dikunjungi ke cookie (misalnya untuk rekomendasi di masa depan)
    const visited = Cookies.get("visitedBlogs");
    let visitedArray = visited ? JSON.parse(visited) : [];

    if (!visitedArray.includes(slug)) {
      visitedArray.push(slug);
      Cookies.set("visitedBlogs", JSON.stringify(visitedArray), { expires: 7 });
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/web/blog/${slug}`);
      setBlog(res.data.blog);
      setRelatedBlogs(res.data.related);

      // Simpan ke sessionStorage
      sessionStorage.setItem(
        `blog-detail-${slug}`,
        JSON.stringify({
          blog: res.data.blog,
          related: res.data.related,
        })
      );
    } catch (error) {
      console.error("Gagal memuat detail artikel:", error);
    }
  };

  const imgUrl = (path) =>
    path ? `${import.meta.env.VITE_BASE_URL}/${path}` : null;

  if (!blog) {
    return (
      <HomeLayouts>
        <div className="text-center py-20 text-gray-600">Memuat artikel...</div>
      </HomeLayouts>
    );
  }

  return (
    <HomeLayouts>
      {/* HERO */}
      <section
        className="relative h-64 md:h-96 flex items-center justify-center bg-black text-white"
        style={{
          backgroundImage: `url(${imgUrl(blog.image)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 px-6 text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-lg">
            {blog.title}
          </h1>
          <p className="text-gray-300 text-sm">
            Dipublikasikan: {new Date(blog.date_published).toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* KONTEN DAN RELATED TOPICS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Konten Artikel */}
        <article className="lg:col-span-2">
          <div
            className="prose lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>

        {/* Related Topics */}
        {relatedBlogs.length > 0 && (
          <aside>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Topik Terkait</h3>
            <div className="space-y-4">
              {relatedBlogs.map((item) => (
                <Link
                  to={`/blog/${item.slug}`}
                  key={item.id}
                  className="block bg-white hover:bg-gray-50 border rounded-lg overflow-hidden shadow transition"
                >
                  {item.image && (
                    <img
                      src={imgUrl(item.image)}
                      alt={item.title}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h4 className="text-md font-semibold text-gray-800 mb-1 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {new Date(item.date_published).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </section>
    </HomeLayouts>
  );
}
