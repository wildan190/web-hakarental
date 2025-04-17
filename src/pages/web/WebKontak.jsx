import { useEffect, useState } from "react";
import api from "../../api";
import HomeLayouts from "../../layouts/HomeLayouts";

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
      <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 space-y-6">
        <h1 className="text-3xl font-bold mb-2">Kontak Kami</h1>

        {/* Identitas Perusahaan - Statis */}
        <div className="space-y-2">
          <p>
            Selamat datang di <strong>Hakarentcar</strong>, solusi terbaik
            untuk kebutuhan transportasi Anda. Kami menyediakan layanan sewa mobil harian,
            mingguan, dan bulanan dengan berbagai pilihan kendaraan berkualitas, harga bersaing,
            dan pelayanan profesional.
          </p>
          <p>
            Dengan pengalaman lebih dari 5 tahun, kami berkomitmen untuk memberikan
            kenyamanan dan keamanan bagi setiap pelanggan, baik untuk perjalanan pribadi,
            dinas, wisata, maupun keperluan bisnis.
          </p>
        </div>

        {/* Data dari API */}
        {kontak ? (
          <div className="bg-white p-6 rounded shadow space-y-3">
            <h2 className="text-xl font-semibold">Informasi Kontak</h2>
            <p><strong>Alamat:</strong> {kontak.address}</p>
            <p><strong>Telepon:</strong> {kontak.phone}</p>
            <p><strong>Email:</strong> {kontak.email}</p>
            <p><strong>WhatsApp:</strong> <a href={`https://wa.me/${kontak.whatsapp}`} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{kontak.whatsapp}</a></p>
            <p><strong>Instagram:</strong> <a href={kontak.instagram} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{kontak.instagram}</a></p>
            <p><strong>Facebook:</strong> <a href={kontak.facebook} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{kontak.facebook}</a></p>
          </div>
        ) : (
          <p className="text-gray-500">Memuat data kontak...</p>
        )}
      </div>
    </HomeLayouts>
  );
}
