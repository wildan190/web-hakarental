import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
import HomeLayouts from "../../layouts/HomeLayouts";
import Cookies from "js-cookie";
import {
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Share2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function WebBlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [copied, setCopied] = useState(false);

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

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Gagal menyalin link:", e);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: `Baca: ${blog.title}`,
          url: currentUrl,
        });
      } catch (e) {
        console.warn("Native share dibatalkan atau error", e);
      }
    }
  };

  if (!blog) {
    return (
      <HomeLayouts>
        <div className="text-center py-20 text-gray-600">Memuat artikel...</div>
      </HomeLayouts>
    );
  }

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(blog.title || "");

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
  };

  return (
    <HomeLayouts>
      {/* HERO - jauh lebih luas ke bawah */}
      <section
        className="relative flex items-center justify-center bg-black text-white min-h-[800px] md:min-h-[900px] pt-16 pb-24"
        style={{
          backgroundImage: `url(${imgUrl(blog.image)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 px-6 text-center max-w-3xl w-full">
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-4 drop-shadow-xl">
            {blog.title}
          </h1>
          <p className="text-gray-300 text-sm mb-8">
            Dipublikasikan: {new Date(blog.date_published).toLocaleDateString()}
          </p>

          {/* Share Buttons */}
          <div className="mt-2 flex flex-wrap justify-center gap-3 items-center text-sm overflow-x-auto">
            {navigator.share && (
              <button
                onClick={handleNativeShare}
                className="flex shrink-0 items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-5 py-3 rounded-md"
                aria-label="Bagikan secara native"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            )}
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-2 border px-5 py-3 rounded-md hover:bg-gray-100 bg-white text-gray-800"
              aria-label="Share ke Facebook"
            >
              <Facebook className="w-5 h-5" />
              Facebook
            </a>
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-2 border px-5 py-3 rounded-md hover:bg-gray-100 bg-white text-gray-800"
              aria-label="Share ke X/Twitter"
            >
              <Twitter className="w-5 h-5" />
              X
            </a>
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-2 border px-5 py-3 rounded-md hover:bg-gray-100 bg-white text-gray-800"
              aria-label="Share ke LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-2 border px-5 py-3 rounded-md hover:bg-gray-100 bg-white text-gray-800"
              aria-label="Share ke WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5" />
              WhatsApp
            </a>
            <button
              onClick={handleCopy}
              className="flex shrink-0 items-center gap-2 border px-5 py-3 rounded-md hover:bg-gray-100 bg-white text-gray-800"
              aria-label="Salin link"
            >
              <Copy className="w-5 h-5" />
              {copied ? "Tersalin!" : "Salin Link"}
            </button>
          </div>
        </div>
      </section>

      {/* KONTEN DAN RELATED TOPICS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <article className="lg:col-span-2">
          <div
            className="prose lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>

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
