import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import HomeLayouts from "../../layouts/HomeLayouts";

export default function WebBlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/web/blog/${slug}`);
        setBlog(res.data);
      } catch (error) {
        console.error("Gagal memuat detail artikel:", error);
      }
    };

    fetchBlog();
  }, [slug]);

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
      <div className="max-w-3xl mx-auto py-10">
        {blog.image && (
          <img
            src={imgUrl(blog.image)}
            alt={blog.title}
            className="w-full h-64 object-cover rounded mb-6"
          />
        )}
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          Dipublikasikan: {new Date(blog.date_published).toLocaleDateString()}
        </p>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </HomeLayouts>
  );
}
