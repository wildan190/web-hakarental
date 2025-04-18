import { useEffect, useState } from "react";
import api from "../../api";
import HomeLayouts from "../../layouts/HomeLayouts";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

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
      {/* HERO */}
      <section className="relative h-64 flex items-center justify-center bg-cover bg-center bg-gray-900 text-white" style={{ backgroundImage: `url('/testimoni-hero.jpg')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Apa Kata Mereka?</h1>
          <p className="text-gray-200 max-w-xl mx-auto">
            Dengarkan langsung pengalaman para pelanggan setia kami!
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14 text-gray-800">
        {/* DAFTAR TESTIMONI */}
        <h2 className="text-2xl font-bold mb-8 text-center">Testimoni Pelanggan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {testimonis.length === 0 ? (
            <p className="text-center text-gray-500">Belum ada testimoni.</p>
          ) : (
            testimonis.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg relative overflow-hidden"
              >
                <div className="absolute -top-5 -left-5 text-6xl text-gray-200">“</div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 mr-4">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.email}</p>
                  </div>
                </div>
                <div className="flex items-center text-yellow-400 mb-2">
                  {Array.from({ length: item.rate }).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">{item.feedback}</p>
              </motion.div>
            ))
          )}
        </div>

        {/* CTA ajakan */}
        <div className="text-center mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Jadilah bagian dari mereka</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Berikan testimoni dan bantu orang lain merasakan layanan terbaik dari kami seperti Anda!
          </p>
        </div>

        {/* FORM TESTIMONI */}
        <h2 className="text-2xl font-bold mb-6 text-center">Bagikan Pengalaman Anda</h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold mb-2">Nama</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Rating</label>
            <select
              value={form.rate}
              onChange={(e) =>
                setForm({ ...form, rate: parseInt(e.target.value) })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {[5, 4, 3, 2, 1].map((val) => (
                <option key={val} value={val}>
                  {val} Bintang
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Pesan / Feedback</label>
            <textarea
              value={form.feedback}
              onChange={(e) => setForm({ ...form, feedback: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-2 rounded-lg w-full md:w-auto"
          >
            Kirim Testimoni
          </button>
        </form>
      </section>
    </HomeLayouts>
  );
}
