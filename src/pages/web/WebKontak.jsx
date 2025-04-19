import { useEffect, useState } from "react";
import api from "../../api";
import HomeLayouts from "../../layouts/HomeLayouts";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

export default function WebKontak() {
  const [kontak, setKontak] = useState(null);

  useEffect(() => {
    const fetchKontak = async () => {
      try {
        const res = await api.get("/web/kontak");
        setKontak(res.data);
      } catch (err) {
        console.error("Gagal memuat data kontak:", err);
      }
    };

    fetchKontak();
  }, []);

  return (
    <HomeLayouts>
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Hubungi Kami</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Kami siap membantu kebutuhan transportasi Anda. Jangan ragu untuk menghubungi kami kapan pun!
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-14 text-gray-800">
        {/* Intro */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold mb-3">Tentang Hakarentcar</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Dengan pengalaman lebih dari 5 tahun, kami berkomitmen menyediakan layanan sewa mobil berkualitas dengan kenyamanan dan keamanan maksimal.
          </p>
        </div>

        {/* Kontak Cards */}
        {kontak ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-6 flex items-start gap-4">
              <FaMapMarkerAlt className="text-2xl text-blue-500" />
              <div>
                <h3 className="font-semibold">Alamat</h3>
                <p>{kontak.address}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 flex items-start gap-4">
              <FaPhone className="text-2xl text-green-500" />
              <div>
                <h3 className="font-semibold">Telepon</h3>
                <p>{kontak.phone}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 flex items-start gap-4">
              <FaEnvelope className="text-2xl text-red-500" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>{kontak.email}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 flex items-start gap-4">
              <FaWhatsapp className="text-2xl text-green-600" />
              <div>
                <h3 className="font-semibold">WhatsApp</h3>
                <a href={`https://wa.me/${kontak.whatsapp}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  {kontak.whatsapp}
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 flex items-start gap-4">
              <FaInstagram className="text-2xl text-pink-500" />
              <div>
                <h3 className="font-semibold">Instagram</h3>
                <a href={`https://instagram.com/${kontak.instagram}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  {kontak.instagram}
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 flex items-start gap-4">
              <FaFacebook className="text-2xl text-blue-700" />
              <div>
                <h3 className="font-semibold">Facebook</h3>
                <a href={`https://facebook.com/${kontak.instagram}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  {kontak.facebook}
                </a>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Memuat informasi kontak...</p>
        )}

        {/* CTA */}
        <div className="mt-16 bg-blue-600 text-white rounded-xl text-center py-10 px-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-2">Butuh bantuan cepat?</h3>
          <p className="mb-4">Hubungi tim kami sekarang juga melalui WhatsApp atau telepon langsung!</p>
          <a
            href={`https://wa.me/${kontak?.whatsapp || ""}`}
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition"
            target="_blank"
            rel="noreferrer"
          >
            Chat Sekarang
          </a>
        </div>
      </div>
    </HomeLayouts>
  );
}
