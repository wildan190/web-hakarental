import React, { useEffect, useState } from "react";
import HomeLayouts from "../../layouts/HomeLayouts";
import api from "../../api";

export default function WebFaq() {
  const [faqs, setFaqs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFaqs = async (keyword = "") => {
    try {
      setLoading(true);
      const res = await api.get(`/web/faq${keyword ? `?search=${keyword}` : ""}`);
      const result = Array.isArray(res.data) ? res.data : res.data.data;
      setFaqs(result);
    } catch (err) {
      console.error("Gagal memuat FAQ:", err);
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFaqs(search);
  };

  return (
    <HomeLayouts>
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-700">Pertanyaan yang Sering Diajukan</h1>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            placeholder="Cari pertanyaan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Cari
          </button>
        </form>

        {loading ? (
          <p className="text-center text-gray-500">Memuat FAQ...</p>
        ) : faqs.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada data ditemukan.</p>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white p-4 rounded shadow-md border hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-blue-600">{faq.title}</h3>
                <p className="text-gray-700 mt-1">{faq.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </HomeLayouts>
  );
}
