import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { getToken } from "../auth";
import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const IMAGE_BASE_URL = "https://old-powerpoint-mambo-intake.trycloudflare.com/storage/";

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setData(res.data);
    } catch (err) {
      console.error("Gagal fetch dashboard:", err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <MainLayout>
      <div className="mt-10 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Selamat Datang 👋</h2>
        {data ? (
          <>
            <p className="text-lg text-gray-600">{data.message}</p>

            <h3 className="mt-10 text-2xl font-semibold text-gray-800">Artikel Saya</h3>

            {data.blogs.length === 0 ? (
              <p className="text-gray-500 mt-4">Belum ada artikel ditulis.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {data.blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden border"
                  >
                    {blog.image && (
                      <img
                        src={`${IMAGE_BASE_URL}${blog.image}`}
                        alt={blog.title}
                        className="w-full h-48 object-cover"
                      />
                    )}

                    <div className="p-4 flex flex-col h-full">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                        {blog.title}
                      </h4>

                      {/* Preview singkat konten: STRIP HTML dan potong jadi pendek */}
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                        {stripHtml(blog.content).slice(0, 120)}...
                      </p>

                      <div className="mt-auto flex justify-between items-center text-xs text-gray-500">
                        <span>Diterbitkan: {blog.date_published}</span>
                        <span className="capitalize px-2 py-0.5 rounded bg-gray-100">
                          {blog.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 animate-spin"></div>
            <p className="mt-4 text-gray-600">Memuat data, harap tunggu...</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

// Helper: Strip tag HTML dari konten blog
function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}
