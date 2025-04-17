import { useEffect, useState } from "react";
import api from "../../api";
import HomeLayouts from "../../layouts/HomeLayouts";
import { FaCar, FaExchangeAlt } from "react-icons/fa";

export default function WebMobil() {
  const [mobils, setMobils] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    seat: "",
    merk: "",
    transmission: "",
  });

  const fetchMobils = async () => {
    try {
      const query = new URLSearchParams();

      Object.entries(filters).forEach(([key, val]) => {
        if (val) query.append(key, val);
      });

      const res = await api.get(`/web/mobil?${query.toString()}`);
      setMobils(res.data);
    } catch (err) {
      console.error("Gagal mengambil data mobil:", err);
    }
  };

  useEffect(() => {
    fetchMobils();
  }, [filters]);

  const imgUrl = (path) => `${import.meta.env.VITE_BASE_URL}/${path}`;

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const formatRupiah = (value) => {
    return "Rp " + Number(value).toLocaleString("id-ID");
  };

  return (
    <HomeLayouts>
      <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800">
        <h2 className="text-2xl font-bold mb-6">Daftar Mobil Tersedia</h2>

        {/* Filter */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleInputChange}
            placeholder="Cari nama / merk / tipe"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <input
            type="number"
            name="seat"
            value={filters.seat}
            onChange={handleInputChange}
            placeholder="Jumlah Kursi"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <input
            type="text"
            name="merk"
            value={filters.merk}
            onChange={handleInputChange}
            placeholder="Merk (Toyota, Honda)"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <select
            name="transmission"
            value={filters.transmission}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="">Semua Transmisi</option>
            <option value="manual">Manual</option>
            <option value="otomatis">Otomatis</option>
          </select>
        </div>

        {/* List */}
        {mobils.length === 0 ? (
          <p className="text-gray-500">Tidak ada mobil yang ditemukan.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mobils.map((car) => (
              <div
                key={car.id}
                className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-4"
              >
                {/* Gambar */}
                <div className="w-full md:w-48 h-auto flex items-center justify-center bg-gray-100 rounded-lg mb-4 md:mb-0 md:mr-4">
                  <img
                    src={imgUrl(car.image)}
                    alt={car.name}
                    className="w-full h-auto object-contain rounded"
                  />
                </div>

                {/* Konten */}
                <div className="flex flex-col flex-1 text-left items-start">
                  <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                  <p className="text-base font-semibold text-gray-500">
                    {car.merk} - {car.type}
                  </p>
                  <p className="text-lg font-bold text-blue-400 mt-2">
                    {formatRupiah(car.harga)}
                  </p>
                  <p className="text-base font-semibold text-gray-800 mt-1">
                    {car.description}
                  </p>
                  <div className="flex flex-wrap justify-start gap-4 text-base text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <FaCar /> {car.seat} Kursi
                    </span>
                    <span className="flex items-center gap-1">
                      <FaExchangeAlt /> {car.transmission}
                    </span>
                  </div>
                  <div className="mt-4 w-full md:w-auto">
                    <a
                      href={`https://wa.me/62822535456?text=Halo%20saya%20ingin%20sewa%20mobil%20${encodeURIComponent(car.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-green-500 text-white font-medium px-4 py-2 rounded hover:bg-green-600 transition text-base w-full md:w-auto"
                    >
                      Sewa Sekarang
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </HomeLayouts>
  );
}
