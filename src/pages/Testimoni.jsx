import { useState, useEffect } from "react";
import api from "../api";
import { getToken } from "../auth";
import HomeLayouts from "../layouts/HomeLayouts";
import Swal from "sweetalert2";
import MainLayout from "../layouts/MainLayout";

export default function Testimoni() {
  const [testimonis, setTestimonis] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    rate: 5,
    feedback: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchTestimonis = async () => {
    try {
      const res = await api.get("/admin/testimoni", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setTestimonis(res.data);
    } catch (err) {
      Swal.fire("Gagal", "Gagal memuat data testimoni.", "error");
    }
  };

  useEffect(() => {
    fetchTestimonis();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = editingId ? `/admin/testimoni/${editingId}` : "/admin/testimoni";
    const method = editingId ? "put" : "post";

    try {
      await api[method](endpoint, form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      Swal.fire({
        icon: "success",
        title: editingId ? "Testimoni diperbarui!" : "Testimoni ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });

      setForm({ name: "", email: "", rate: 5, feedback: "" });
      setEditingId(null);
      fetchTestimonis();
    } catch (err) {
      Swal.fire("Gagal", "Gagal menyimpan testimoni.", "error");
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      email: item.email,
      rate: item.rate,
      feedback: item.feedback,
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Testimoni ini akan dihapus permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/admin/testimoni/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      Swal.fire("Berhasil", "Testimoni berhasil dihapus.", "success");
      fetchTestimonis();
    } catch (err) {
      Swal.fire("Gagal", "Gagal menghapus testimoni.", "error");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto text-gray-800 py-10">
        <h2 className="text-2xl font-bold mb-6">Kelola Testimoni</h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <div>
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
            <input
              type="number"
              value={form.rate}
              min={1}
              max={5}
              onChange={(e) => setForm({ ...form, rate: e.target.value })}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Feedback</label>
            <textarea
              value={form.feedback}
              onChange={(e) => setForm({ ...form, feedback: e.target.value })}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={3}
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
            {editingId ? "Perbarui" : "Tambah"} Testimoni
          </button>
        </form>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Daftar Testimoni</h3>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 text-sm text-gray-800 rounded shadow">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2 border-b">Nama</th>
                  <th className="px-4 py-2 border-b">Email</th>
                  <th className="px-4 py-2 border-b">Rating</th>
                  <th className="px-4 py-2 border-b">Feedback</th>
                  <th className="px-4 py-2 border-b">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {testimonis.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">Belum ada testimoni</td>
                  </tr>
                ) : (
                  testimonis.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.email}</td>
                      <td className="px-4 py-2">{item.rate}</td>
                      <td className="px-4 py-2">{item.feedback}</td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
