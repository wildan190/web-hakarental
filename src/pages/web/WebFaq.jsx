import React, { useEffect, useState } from "react";
import HomeLayouts from "../../layouts/HomeLayouts";
import api from "../../api";
import { FaChevronDown } from "react-icons/fa";

export default function WebFaq() {
  const [faqs, setFaqs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

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

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <HomeLayouts>
      {/* Hero Section */}
      <section className="bg-blue-700 text-white text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-3">FAQ</h1>
        <p className="text-lg max-w-xl mx-auto">
          Temukan jawaban dari pertanyaan umum yang sering ditanyakan pelanggan Hakarentcar.
        </p>
      </section>

      {/* Search Bar */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-2 mb-10"
        >
          <input
            type="text"
            placeholder="Cari pertanyaan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Cari
          </button>
        </form>

        {/* FAQ Content */}
        {loading ? (
          <p className="text-center text-gray-500">Memuat FAQ...</p>
        ) : faqs.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada pertanyaan ditemukan.</p>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-white rounded-lg shadow transition duration-300 border"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center text-left px-4 py-3 focus:outline-none hover:bg-gray-100"
                >
                  <h3 className="font-semibold text-blue-700">{faq.title}</h3>
                  <FaChevronDown
                    className={`transform transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-4 pb-4 text-gray-700">{faq.description}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </HomeLayouts>
  );
}
