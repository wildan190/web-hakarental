import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import api from "../../api";
import HomeLayouts from "../../layouts/HomeLayouts";
import Slider from "react-slick";
import { motion } from "framer-motion";

export default function WebBlog() {
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPage = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/web/blog?page=${currentPage}`);
        setBlogs(res.data.data);
        setTotalPages(res.data.last_page);
      } catch (error) {
        console.error("Gagal mengambil data blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  const imgUrl = (path) =>
    path ? `${import.meta.env.VITE_IMAGE_BASE_URL}/${path}` : null;

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    pauseOnHover: true,
    dotsClass: "slick-dots !bottom-4 md:!bottom-6",
    customPaging: () => (
      <button className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/50 hover:bg-white transition-colors duration-300" />
    ),
  };

  const paginate = (pageNumber) => {
    navigate(`/blog?page=${pageNumber}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  if (loading) {
    return (
      <HomeLayouts>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600">Memuat artikel...</p>
          </div>
        </div>
      </HomeLayouts>
    );
  }

  return (
    <HomeLayouts>
      {/* HERO SLIDER - Optimized for mobile */}
      {blogs.length > 0 && (
        <section className="relative">
          <div className="w-full">
            <Slider {...sliderSettings}>
              {blogs.slice(0, 3).map((blog) => (
                <div key={blog.id} className="relative">
                  <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                    <img
                      src={imgUrl(blog.image)}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    
                    {/* Content positioned at bottom for mobile, centered for desktop */}
                    <div className="absolute inset-0 flex items-end md:items-center p-4 sm:p-6 md:p-8 lg:p-12">
                      <div className="w-full max-w-4xl mx-auto text-white">
                        <div className="space-y-3 md:space-y-4">
                          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                            {blog.title}
                          </h1>
                          
                          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl leading-relaxed">
                            {truncateText(blog.description || "Artikel menarik dari Haka Rental untuk Anda simak!", 120)}
                          </p>
                          
                          <div className="pt-2 md:pt-4">
                            <Link
                              to={`/blog/${blog.slug}`}
                              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 md:py-3 md:px-6 rounded-full transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                            >
                              Baca Artikel
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      )}

      {/* ARTICLES GRID - Improved mobile layout */}
      <section className="bg-gray-50 py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Artikel Terbaru
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              Temukan informasi terkini dan tips menarik seputar rental kendaraan
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  {blog.image ? (
                    <img
                      src={imgUrl(blog.image)}
                      alt={blog.title}
                      className="w-full h-40 sm:h-44 md:h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-40 sm:h-44 md:h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="space-y-3">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                      {blog.title}
                    </h3>
                    
                    <div className="flex items-center text-xs sm:text-sm text-gray-500 space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <time>{formatDate(blog.date_published)}</time>
                    </div>
                    
                    {blog.description && (
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {truncateText(blog.description, 100)}
                      </p>
                    )}
                    
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm group/link transition-colors duration-300"
                    >
                      Baca Selengkapnya
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* PAGINATION - Mobile-friendly */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 sm:mt-16">
              {/* Mobile: Show only prev/next and current page info */}
              <div className="flex items-center gap-2 sm:hidden">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Sebelumnya
                </button>
                
                <span className="px-4 py-2 text-sm text-gray-600 font-medium">
                  {currentPage} / {totalPages}
                </span>
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow"
                  }`}
                >
                  Berikutnya
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Desktop: Show full pagination */}
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Sebelumnya
                </button>

                <div className="flex items-center space-x-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    // Show first page, last page, current page and adjacent pages
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={i}
                          onClick={() => paginate(pageNum)}
                          className={`w-10 h-10 text-sm font-semibold rounded-full transition-all duration-300 ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white shadow-lg transform scale-110"
                              : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                      return (
                        <span key={i} className="px-2 py-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow"
                  }`}
                >
                  Berikutnya
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </HomeLayouts>
  );
}