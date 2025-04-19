import { useState, useEffect } from "react";
import api from "../api";
import { getToken } from "../auth";
import MainLayout from "../layouts/MainLayout";
import Swal from "sweetalert2";

export default function Metadata() {
  const [form, setForm] = useState({
    id: "",
    phone: "",
    email: "",
    address: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    website_name: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchMetadata = async () => {
    try {
      const res = await api.get("/admin/metadata", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      const data = Array.isArray(res.data) ? res.data[0] : res.data;
      if (data) setForm(data);
    } catch (err) {
      console.error("Gagal mengambil metadata:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetadata();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isUpdate = !!form.id;
    const endpoint = isUpdate ? `/admin/metadata/${form.id}` : `/admin/metadata`;
    const method = isUpdate ? "put" : "post";
  
    try {
      const response = await api[method](endpoint, form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
  
      Swal.fire({
        icon: "success",
        title: isUpdate ? "Metadata berhasil diperbarui!" : "Metadata berhasil dibuat!",
        showConfirmButton: false,
        timer: 1500,
      });
  
      if (!isUpdate && response.data?.id) {
        setForm((prev) => ({ ...prev, id: response.data.id }));
      }
    } catch (err) {
      console.error("Gagal menyimpan metadata:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan saat menyimpan metadata.",
      });
    }
  };

  return (
    <MainLayout>
      {loading ? (
      <div className="text-center py-20 text-gray-600 text-lg">Loading metadata...</div>
    ) : (
      <div className="max-w-4xl mx-auto text-gray-800 py-10">
        <h2 className="text-2xl font-bold mb-6">
          {form.id ? "Edit Metadata" : "Buat Metadata"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          {[
            { label: "Phone", name: "phone", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Address", name: "address", type: "text" },
            { label: "Facebook", name: "facebook", type: "text" },
            { label: "Instagram", name: "instagram", type: "text" },
            { label: "Twitter", name: "twitter", type: "text" },
            { label: "LinkedIn", name: "linkedin", type: "text" },
            { label: "Website Name", name: "website_name", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name] || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            {form.id ? "Perbarui Metadata" : "Buat Metadata"}
          </button>
        </form>
      </div>
    )}
    </MainLayout>
  );
}
