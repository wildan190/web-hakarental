import { useState, useEffect } from "react";
import api from "../api";
import { getToken } from "../auth";
import MainLayout from "../layouts/MainLayout";
import Swal from "sweetalert2";


export default function Galleries() {
  const [galleries, setGalleries] = useState([]);
  const [form, setForm] = useState({ title: "" });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchGalleries = async () => {
    try {
      const res = await api.get("/admin/galleries", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setGalleries(res.data);
    } catch (err) {
      alert("Gagal memuat data galeri.");
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const endpoint = editingId ? `/admin/galleries/${editingId}` : "/admin/galleries";
    const method = editingId ? "put" : "post";

    try {
      await api[method](endpoint, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });
      
      Swal.fire({
        icon: "success",
        title: editingId ? "Galeri berhasil diperbarui!" : "Galeri berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });

      setForm({ title: "" });
      setImageFile(null);
      setEditingId(null);
      fetchGalleries();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Gagal menyimpan data galeri.",
      });      
    }
  };

  const handleEdit = (gallery) => {
    setForm({ title: gallery.title });
    setEditingId(gallery.id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus galeri ini?",
      text: "Tindakan ini tidak dapat dibatalkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });
  
    if (!result.isConfirmed) return;
  
    try {
      await api.delete(`/admin/galleries/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
  
      Swal.fire({
        icon: "success",
        title: "Galeri berhasil dihapus!",
        showConfirmButton: false,
        timer: 1500,
      });
  
      fetchGalleries();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menghapus data galeri.",
      });
    }
  };
  

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto text-gray-800">
        <h2 className="text-2xl font-bold mb-6">Kelola Galeri</h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <div>
            <label className="block text-sm font-medium mb-1">Judul</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Contoh: Foto 1"
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gambar</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-gray-700"
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
            {editingId ? "Perbarui" : "Tambah"} Galeri
          </button>
        </form>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Daftar Galeri</h3>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 text-sm text-gray-800 rounded shadow">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2 border-b">Judul</th>
                  <th className="px-4 py-2 border-b">Gambar</th>
                  <th className="px-4 py-2 border-b">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {galleries.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">Belum ada data galeri</td>
                  </tr>
                ) : (
                  galleries.map((gallery) => (
                    <tr key={gallery.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{gallery.title}</td>
                      <td className="px-4 py-2">
                        {gallery.image && (
                          <img
                            src={`https://granted-aids-florist-hd.trycloudflare.com/storage/${gallery.image}`}
                            alt={gallery.title}
                            className="w-20 h-auto rounded"
                          />
                        )}
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => handleEdit(gallery)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(gallery.id)}
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
