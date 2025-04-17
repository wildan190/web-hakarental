import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { getToken } from "../auth";
import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  // Ganti sesuai URL storage Laravel-mu
  const IMAGE_BASE_URL = "https://frankly-perfect-swan.ngrok-free.app/storage/";

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
      <div className="mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

        {data ? (
          <div className="mt-8">
            <p className="text-xl text-gray-800">{data.message}</p>

            <h3 className="mt-6 text-2xl font-semibold text-gray-800">Artikel Saya</h3>
            <ul className="space-y-4 mt-4">
              {data.blogs.map((blog) => (
                <li
                  key={blog.id}
                  className="bg-white p-4 rounded shadow-md border border-gray-200"
                >
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h4>

                  {blog.image && (
                    <img
                      src={`${IMAGE_BASE_URL}${blog.image}`}
                      alt={blog.title}
                      className="mb-4 w-full max-h-64 object-cover rounded"
                    />
                  )}

                  <div
                    className="text-gray-700 mb-4"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Diterbitkan: {blog.date_published}</span>
                    <span className="capitalize">{blog.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
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
