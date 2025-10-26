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
  const [currentPage, setCurrentPage] = useState(1);
  const mobilsPerPage = 6;

  const fetchMobils = async () => {
    try {
      const query = new URLSearchParams();

      Object.entries(filters).forEach(([key, val]) => {
        if (val) query.append(key, val);
      });

      const res = await api.get(`/web/mobil?${query.toString()}`);
      setMobils(res.data);
      setCurrentPage(1); // Reset ke halaman 1 saat filter berubah
    } catch (err) {
      console.error("Gagal mengambil data mobil:", err);
    }
  };

  useEffect(() => {
    fetchMobils();
  }, [filters]);

  const imgUrl = (path) => `${import.meta.env.VITE_IMAGE_BASE_URL}/${path}`;

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const formatRupiah = (value) =>
    "Rp " + Number(value).toLocaleString("id-ID");

  const indexOfLast = currentPage * mobilsPerPage;
  const indexOfFirst = indexOfLast - mobilsPerPage;
  const currentMobils = mobils.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(mobils.length / mobilsPerPage);

  const paginate = (page) => {
    setCurrentPage(page);
  };

  return (
    <HomeLayouts>
      {/* HERO SECTION */}
      <section className="relative h-64 md:h-80 flex items-center justify-center bg-black text-white bg-cover bg-center" style={{
        backgroundImage: `url('/mobil-hero.jpg')`, // Ganti sesuai aset
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Temukan Mobil Impianmu 🚗
          </h1>
          <p className="text-gray-200 max-w-xl mx-auto">
            Sewa mobil berkualitas dengan harga terbaik hanya di Haka Rental.
          </p>
        </div>
      </section>

      {/* FILTER & LIST */}
      <section className="max-w-6xl mx-auto px-4 py-14 text-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center">Daftar Mobil Tersedia</h2>

        {/* Filter */}
        <div className="grid md:grid-cols-4 gap-4 mb-10">
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

        {/* Daftar Mobil */}
        {currentMobils.length === 0 ? (
          <p className="text-gray-500 text-center">Tidak ada mobil yang ditemukan.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentMobils.map((car) => (
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
                    loading="lazy"
                  />
                </div>

                {/* Info Mobil */}
                <div className="flex flex-col flex-1 text-left items-start">
                  <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                  <p className="text-base font-semibold text-gray-500">
                    {car.merk} - {car.type}
                  </p>
                  <p className="text-lg font-bold text-blue-500 mt-2">
                    {formatRupiah(car.harga)}
                  </p>
                  <p className="text-base text-gray-700 mt-1">
                    {car.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-base text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <FaCar /> {car.seat} Kursi
                    </span>
                    <span className="flex items-center gap-1">
                      <FaExchangeAlt /> {car.transmission}
                    </span>
                  </div>
                  <div className="mt-4 w-full md:w-auto">
                    <a
                      href={`https://wa.me/62822535456?text=Halo%20saya%20rencana%20untuk%20menyewa%20mobil%20${encodeURIComponent(car.name)}.%20Apakah%20mobil%20ini%20tersedia%3F`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-500 text-white font-medium px-4 py-2 rounded hover:bg-blue-600 transition text-base w-full md:w-auto"
                    >
                      Sewa Sekarang
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm rounded ${currentPage === 1
                  ? "bg-gray-200 text-gray-500"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Sebelumnya
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-2 text-sm font-semibold rounded ${currentPage === i + 1
                    ? "bg-blue-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm rounded ${currentPage === totalPages
                  ? "bg-gray-200 text-gray-500"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Berikutnya
            </button>
          </div>
        )}
      </section>
    </HomeLayouts>
  );
}
