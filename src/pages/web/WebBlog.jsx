import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import api from "../../api";
import HomeLayouts from "../../layouts/HomeLayouts";
import Slider from "react-slick";
import { motion } from "framer-motion";

export default function WebBlog() {
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPage = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get(`/web/blog?page=${currentPage}`);
        setBlogs(res.data.data);
        setTotalPages(res.data.last_page);
      } catch (error) {
        console.error("Gagal mengambil data blog:", error);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  const imgUrl = (path) =>
    path ? `${import.meta.env.VITE_BASE_URL}/${path}` : null;

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const paginate = (pageNumber) => {
    navigate(`/blog?page=${pageNumber}`);
    window.location.reload(); // <--- INI agar reload secara penuh
  };

  return (
    <HomeLayouts>
      {/* HERO SLIDER */}
      {blogs.length > 0 && (
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-0">
          <div className="max-w-6xl mx-auto">
            <Slider {...sliderSettings}>
              {blogs.slice(0, 3).map((blog) => (
                <div key={blog.id} className="relative h-[420px] md:h-[480px] rounded-xl overflow-hidden">
                  <img
                    src={imgUrl(blog.image)}
                    alt={blog.title}
                    className="w-full h-full object-cover brightness-75"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
                  <div className="absolute inset-0 flex flex-col justify-end md:justify-center p-6 md:p-12 text-white z-10">
                    <div className="max-w-2xl">
                      <h3 className="text-2xl md:text-4xl font-bold mb-3 drop-shadow-lg">{blog.title}</h3>
                      <p className="text-sm md:text-base text-gray-200 mb-4 line-clamp-3 italic drop-shadow">
                        {blog.description || "Artikel menarik dari Haka Rental untuk Anda simak!"}
                      </p>
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
                      >
                        Baca Selengkapnya
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      )}

      {/* DAFTAR ARTIKEL */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Artikel Terbaru</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                className="bg-white rounded-xl shadow hover:shadow-md transition duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {blog.image && (
                  <img
                    src={imgUrl(blog.image)}
                    alt={blog.title}
                    className="w-full h-52 object-cover rounded-t-xl"
                    loading="lazy"
                  />
                )}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{blog.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(blog.date_published).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-sm rounded ${currentPage === 1
                  ? "bg-gray-200 text-gray-500"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                Sebelumnya
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-2 text-sm font-semibold rounded ${currentPage === i + 1
                    ? "bg-blue-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-sm rounded ${currentPage === totalPages
                  ? "bg-gray-200 text-gray-500"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                Berikutnya
              </button>
            </div>
          )}
        </div>
      </section>
    </HomeLayouts>
  );
}
