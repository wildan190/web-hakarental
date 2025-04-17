import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../api";
import Swal from "sweetalert2";

export default function Faqs() {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", id: null });
  const [isEditing, setIsEditing] = useState(false);

  const getToken = () => localStorage.getItem("token");

  const fetchFaqs = async () => {
    try {
      const res = await api.get("/admin/faqs", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setFaqs(res.data);
    } catch (err) {
      Swal.fire("Gagal", "Gagal memuat FAQ.", "error");
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing ? `/admin/faqs/${form.id}` : "/admin/faqs";
      const method = isEditing ? "put" : "post";

      await api[method](url, form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      Swal.fire({
        icon: "success",
        title: isEditing ? "Berhasil Diperbarui" : "Berhasil Ditambahkan",
        timer: 1500,
        showConfirmButton: false,
      });

      setForm({ title: "", description: "", id: null });
      setIsEditing(false);
      fetchFaqs();
    } catch (err) {
      Swal.fire("Gagal", "Gagal menyimpan FAQ.", "error");
    }
  };

  const handleEdit = (faq) => {
    setForm({ ...faq });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, hapus!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/admin/faqs/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });

        Swal.fire("Dihapus!", "FAQ telah dihapus.", "success");
        fetchFaqs();
      } catch (err) {
        Swal.fire("Gagal", "Gagal menghapus FAQ.", "error");
      }
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Kelola FAQ</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8 space-y-4">
          <div>
            <label className="block font-medium mb-1">Pertanyaan</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded"
              placeholder="Contoh: Bagaimana cara pemesanan?"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Jawaban</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded"
              placeholder="Contoh: Anda bisa memesan melalui form kontak atau WhatsApp kami."
              rows={4}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {isEditing ? "Update FAQ" : "Tambah FAQ"}
          </button>
        </form>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white p-4 rounded shadow flex justify-between items-start"
            >
              <div>
                <h3 className="font-bold text-lg text-blue-700">{faq.title}</h3>
                <p className="text-gray-700">{faq.description}</p>
              </div>

              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={() => handleEdit(faq)}
                  className="bg-yellow-400 text-white text-sm px-3 py-1 rounded hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
