import { useEffect, useState } from "react";
import api from "../../api";
import HomeLayouts from "../../layouts/HomeLayouts";
import Swal from "sweetalert2";

export default function WebTestimoni() {
  const [testimonis, setTestimonis] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    rate: 5,
    feedback: "",
  });

  const fetchTestimoni = async () => {
    try {
      const res = await api.get("/web/testimoni");
      setTestimonis(res.data);
    } catch (err) {
      console.error("Gagal memuat testimoni:", err);
    }
  };

  useEffect(() => {
    fetchTestimoni();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/web/testimoni", form);
      Swal.fire({
        icon: "success",
        title: "Terima kasih!",
        text: "Testimoni Anda berhasil dikirim.",
        timer: 2000,
        showConfirmButton: false,
      });
      setForm({ name: "", email: "", rate: 5, feedback: "" });
      fetchTestimoni();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengirim",
        text: "Pastikan semua data terisi dengan benar.",
      });
    }
  };

  return (
    <HomeLayouts>
      <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Testimoni Pelanggan</h1>

        {/* List Testimoni */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {testimonis.length === 0 ? (
            <p>Belum ada testimoni.</p>
          ) : (
            testimonis.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                <div className="flex items-center text-yellow-500 mb-2">
                  {Array.from({ length: item.rate }).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-sm italic text-gray-600">{item.email}</p>
                <p className="mt-3">{item.feedback}</p>
              </div>
            ))
          )}
        </div>

        {/* Form Testimoni */}
        <h2 className="text-2xl font-bold mb-4">Kirim Testimoni Anda</h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <div>
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <select
              value={form.rate}
              onChange={(e) => setForm({ ...form, rate: parseInt(e.target.value) })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              {[5, 4, 3, 2, 1].map((val) => (
                <option key={val} value={val}>
                  {val} {val === 1 ? "bintang" : "bintang"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Pesan / Feedback</label>
            <textarea
              value={form.feedback}
              onChange={(e) => setForm({ ...form, feedback: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Kirim Testimoni
          </button>
        </form>
      </div>
    </HomeLayouts>
  );
}
