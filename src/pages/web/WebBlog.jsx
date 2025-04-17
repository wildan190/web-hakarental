import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import HomeLayouts from "../../layouts/HomeLayouts";

export default function WebBlog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/web/blog");
        setBlogs(res.data);
      } catch (error) {
        console.error("Gagal mengambil data blog:", error);
      }
    };

    fetchBlogs();
  }, []);

  const imgUrl = (path) =>
    path ? `${import.meta.env.VITE_BASE_URL}/${path}` : null;

  return (
    <HomeLayouts>
      <section className="py-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Artikel Terbaru</h2>
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded shadow p-5">
              {blog.image && (
                <img
                  src={imgUrl(blog.image)}
                  alt={blog.title}
                  className="w-full h-64 object-cover rounded mb-4"
                />
              )}
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                Dipublikasikan: {new Date(blog.date_published).toLocaleDateString()}
              </p>
              <Link
                to={`/blog/${blog.slug}`}
                className="text-blue-600 hover:underline text-sm"
              >
                Baca Selengkapnya →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </HomeLayouts>
  );
}
