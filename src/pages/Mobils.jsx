import { useState, useEffect } from "react";
import api from "../api";
import { getToken } from "../auth";
import MainLayout from "../layouts/MainLayout";
import Swal from "sweetalert2";

export default function Mobils() {
  const [mobils, setMobils] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "",
    merk: "",
    description: "",
    transmission: "",
    seat: "",
    harga: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchMobils = async () => {
    try {
      const res = await api.get("/admin/mobils", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setMobils(res.data);
    } catch (err) {
      alert("Gagal memuat data mobil.");
    }
  };

  useEffect(() => {
    fetchMobils();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      type: "",
      merk: "",
      description: "",
      transmission: "",
      seat: "",
      harga: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      if (editingId) {
        formData.append("_method", "PUT");
        await api.post(`/admin/mobils/${editingId}`, formData, config);
      } else {
        await api.post("/admin/mobils", formData, config);
      }

      Swal.fire({
        icon: "success",
        title: editingId ? "Mobil berhasil diperbarui!" : "Mobil berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });

      resetForm();
      fetchMobils();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menyimpan data mobil.",
      });
    }
  };

  const handleEdit = (mobil) => {
    setForm({
      name: mobil.name,
      type: mobil.type,
      merk: mobil.merk,
      description: mobil.description,
      transmission: mobil.transmission,
      seat: mobil.seat,
      harga: mobil.harga || "",
    });
    setEditingId(mobil.id);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus mobil ini?",
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
      await api.delete(`/admin/mobils/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      Swal.fire({
        icon: "success",
        title: "Mobil berhasil dihapus!",
        showConfirmButton: false,
        timer: 1500,
      });

      fetchMobils();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menghapus data mobil.",
      });
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto text-gray-800">
        <h2 className="text-2xl font-bold mb-6">Kelola Data Mobil</h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          {[
            { name: "name", label: "Nama Mobil", placeholder: "Contoh: Avanza" },
            { name: "type", label: "Tipe Mobil", placeholder: "Contoh: MPV" },
            { name: "merk", label: "Merk Mobil", placeholder: "Contoh: Toyota" },
            { name: "description", label: "Deskripsi", placeholder: "Contoh: Mobil keluarga irit bahan bakar" },
            { name: "transmission", label: "Transmisi", placeholder: "Contoh: Manual / Automatic" },
            { name: "seat", label: "Jumlah Kursi", placeholder: "Contoh: 7", type: "number" },
            { name: "harga", label: "Harga Sewa per Hari", placeholder: "Contoh: 250000", type: "number" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1">{field.label}</label>
              <input
                type={field.type || "text"}
                value={form[field.name]}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                required
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">Gambar Mobil</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImageFile(file);
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              className="w-full text-gray-700"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-32 h-auto mt-2 rounded" />
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Perbarui" : "Tambah"} Mobil
          </button>
        </form>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Daftar Mobil</h3>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 text-sm text-gray-800 rounded shadow">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2 border-b">Nama</th>
                  <th className="px-4 py-2 border-b">Merk</th>
                  <th className="px-4 py-2 border-b">Tipe</th>
                  <th className="px-4 py-2 border-b">Kursi</th>
                  <th className="px-4 py-2 border-b">Transmisi</th>
                  <th className="px-4 py-2 border-b">Harga</th>
                  <th className="px-4 py-2 border-b">Gambar</th>
                  <th className="px-4 py-2 border-b">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mobils.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      Belum ada data mobil
                    </td>
                  </tr>
                ) : (
                  mobils.map((mobil) => (
                    <tr key={mobil.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{mobil.name}</td>
                      <td className="px-4 py-2">{mobil.merk}</td>
                      <td className="px-4 py-2">{mobil.type}</td>
                      <td className="px-4 py-2">{mobil.seat}</td>
                      <td className="px-4 py-2">{mobil.transmission}</td>
                      <td className="px-4 py-2">Rp {Number(mobil.harga).toLocaleString("id-ID")}</td>
                      <td className="px-4 py-2">
                        {mobil.image && (
                          <img
                            src={
                              mobil.image.startsWith("http")
                                ? mobil.image
                                : `https://fast-llama-evenly.ngrok-free.app/storage/${mobil.image}`
                            }
                            alt={mobil.name}
                            className="w-20 h-auto rounded"
                          />
                        )}
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => handleEdit(mobil)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(mobil.id)}
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
