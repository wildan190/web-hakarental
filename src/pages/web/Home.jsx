import { useEffect, useState } from "react";
import api from "../../api";
import HomeLayouts from "../../layouts/HomeLayouts";
import Masonry from "react-masonry-css";
import { FaQuoteLeft, FaKey, FaCar, FaExchangeAlt, FaRegCheckCircle, FaChevronLeft, FaChevronRight, FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Slider from "react-slick";
import AnimatedSection from "../../components/AnimatedSection";

export default function Home() {
  const [data, setData] = useState({ gallery: [], mobil: [], testimoni: [], faq: [], });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/web/home");
        setData(res.data);
      } catch (error) {
        console.error("Gagal memuat data home:", error);
      }
    };

    fetchData();
  }, []);

  const imgUrl = (path) => {
    if (!path) {
      return "";
    }

    if (path.startsWith("http")) {
      return path;
    }

    return `${import.meta.env.VITE_BASE_URL}/${path}`;
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  // Function to change the slide
  const changeSlide = (direction) => {
    const imagesPerSlide = window.innerWidth < 640 ? 2 : 4; // Show 2 images per slide on mobile
    const totalSlides = Math.ceil(data.gallery.length / imagesPerSlide);
    let newSlide = currentSlide + direction;

    if (newSlide < 0) {
      newSlide = totalSlides - 1;
    } else if (newSlide >= totalSlides) {
      newSlide = 0;
    }

    setCurrentSlide(newSlide);
  };

  // Slice the gallery into groups of images based on screen size
  const getCurrentSlideImages = () => {
    const imagesPerSlide = window.innerWidth < 640 ? 2 : 4; // Show 2 images per slide on mobile
    const start = currentSlide * imagesPerSlide;
    const end = start + imagesPerSlide;
    return data.gallery.slice(start, end);
  };

  // Modal open function
  const openModal = (image) => {
    setModalImage(image);
    setModalOpen(true);
  };

  // Modal close function
  const closeModal = () => {
    setModalOpen(false);
    setModalImage(null);
  };

  const [openIndex, setOpenIndex] = useState(null);

  const toggleCollapse = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close if it's already open
    } else {
      setOpenIndex(index); // Open the clicked FAQ
    }
  };

  return (
    <HomeLayouts>
      <AnimatedSection className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Kenapa Memilih Kami?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded shadow p-6 text-center">
            <i className="fas fa-car text-blue-500 text-3xl mb-3"></i>
            <h3 className="text-lg font-semibold mb-1">Unit Terbaru</h3>
            <p className="text-sm text-gray-600">Unit mobil baru, bersih, dan terawat</p>
          </div>

          <div className="bg-white rounded shadow p-6 text-center">
            <i className="fas fa-tags text-blue-500 text-3xl mb-3"></i>
            <h3 className="text-lg font-semibold mb-1">Harga Kompetitif</h3>
            <p className="text-sm text-gray-600">Bandingkan harga dan temukan</p>
          </div>

          <div className="bg-white rounded shadow p-6 text-center">
            <i className="fas fa-headset text-blue-500 text-3xl mb-3"></i>
            <h3 className="text-lg font-semibold mb-1">Pelayanan Prima</h3>
            <p className="text-sm text-gray-600">Mengutamakan kepuasan pelanggan</p>
          </div>

          <div className="bg-white rounded shadow p-6 text-center">
            <i className="fas fa-handshake text-blue-500 text-3xl mb-3"></i>
            <h3 className="text-lg font-semibold mb-1">Layanan Terbaik</h3>
            <p className="text-sm text-gray-600">Proses penyewaan yang mudah</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Galeri Kendaraan Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Lihat berbagai dokumentasi kendaraan kami yang telah membantu perjalanan pelanggan kami! Setiap foto adalah cerminan dari kenyamanan, kualitas, dan kepercayaan yang kami hadirkan.
          </p>
        </div>

        {/* Gallery Slider */}
        <div className="relative">
          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {getCurrentSlideImages().map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-xl shadow-md group bg-white cursor-pointer"
                onClick={() => openModal(imgUrl(item.image))}
              >
                <img
                  src={imgUrl(item.image)}
                  alt={item.title}
                  className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <p className="text-white text-base font-semibold text-center px-4">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => changeSlide(-1)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg z-10"
          >
            &#10094;
          </button>
          <button
            onClick={() => changeSlide(1)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg z-10"
          >
            &#10095;
          </button>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="max-w-3xl w-full mx-4 bg-white rounded-xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()} // Biar klik gambar gak nutup modal
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
              >
                ✕
              </button>
              <img
                src={modalImage}
                alt="Preview"
                className="w-full h-auto object-contain max-h-[80vh]"
              />
            </div>
          </div>
        )}
      </AnimatedSection>

      <AnimatedSection className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-700">Harga Menyesuaikan kebutuhan , yang pasti bersifat Negotiable</h2>
          <p className="text-lg text-gray-600 mt-4">
            Harga Menyesuaikan kebutuhan, yang pasti bersifat Negotiable. Kami menyediakan berbagai unit armada terbaru. Bisa menggunakan Driver maupun lepas Kunci.
          </p>
        </div>

        {/* Cards Keunggulan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
            <FaKey className="text-4xl text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-blue-700">Sewa Lepas Kunci / Dengan Driver</h3>
            <p className="text-gray-600 mt-2">Pilih sesuai kebutuhan Anda, sewa mobil lepas kunci atau menggunakan sopir yang berpengalaman.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
            <FaCar className="text-4xl text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-blue-700">Unit Armada Terbaru</h3>
            <p className="text-gray-600 mt-2">Kami menyediakan armada mobil terbaru, bersih, dan terawat dengan baik.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
            <FaExchangeAlt className="text-4xl text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-blue-700">Antar Jemput Unit Gratis</h3>
            <p className="text-gray-600 mt-2">Layanan antar jemput unit gratis untuk area Banjarmasin Kota, sehingga Anda tidak perlu repot.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
            <FaRegCheckCircle className="text-4xl text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-blue-700">Tidak Ada Biaya Siluman</h3>
            <p className="text-gray-600 mt-2">Harga transparan dan tidak ada biaya tambahan yang mengejutkan. Semua sudah jelas sejak awal.</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">
            Nikmati Kualitas Berkendara dengan Kendaraan Terbaru Kami
          </h2>
          <p className="text-base mb-8 text-gray-600 max-w-2xl mx-auto">
            Kami memastikan bahwa semua kendaraan kami dalam kondisi prima dan bersih sebelum disewakan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.mobil.map((car) => (
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
          <div className="mt-8">
            <button
              onClick={() => window.location.href = "/mobil"}
              className="bg-blue-500 text-white font-medium px-6 py-3 rounded hover:bg-blue-600 transition text-lg"
            >
              Lihat Semua
            </button>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4">Apa Kata Pelanggan Kami?</h2>

          <div className="flex justify-center mb-3">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-xl" />
            ))}
          </div>

          <p className="text-xl font-semibold text-gray-800 mb-2">4.9/5 Rata-Rata Penilaian</p>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Dengarkan kisah nyata dari pelanggan kami tentang pengalaman luar biasa mereka.
          </p>
        </div>

        {data.testimoni.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada testimoni.</p>
        ) : (
          <div className="max-w-6xl mx-auto">
            <Slider
              centerMode
              infinite
              speed={500}
              slidesToShow={3}
              slidesToScroll={1}
              autoplay
              autoplaySpeed={5000}
              focusOnSelect
              responsive={[
                {
                  breakpoint: 1024,
                  settings: { slidesToShow: 2 },
                },
                {
                  breakpoint: 640,
                  settings: { slidesToShow: 1 },
                },
              ]}
              nextArrow={
                <FaChevronRight className="absolute top-1/2 right-0 transform -translate-y-1/2 text-3xl text-blue-600 cursor-pointer z-10" />
              }
              prevArrow={
                <FaChevronLeft className="absolute top-1/2 left-0 transform -translate-y-1/2 text-3xl text-blue-600 cursor-pointer z-10" />
              }
            >
              {data.testimoni.map((t, index) => (
                <div key={t.id} className="px-4">
                  <div
                    className={`bg-white rounded-2xl shadow-lg border border-blue-100 p-6 h-full text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${index === 1 ? "scale-105 border-blue-200" : ""
                      }`}
                  >
                    <FaQuoteLeft className="text-3xl text-blue-200 mb-4 mx-auto" />
                    <p className="text-gray-700 italic text-base mb-4">“{t.feedback}”</p>
                    <h4 className="font-bold text-blue-700 text-lg">{t.name}</h4>
                    <div className="flex justify-center items-center mt-2 text-yellow-400">
                      {[...Array(t.rate)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">{t.rate}/5</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </AnimatedSection>

      <AnimatedSection className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-700">Pertanyaan yang Sering Diajukan</h2>

        <div className="space-y-6">
          {data.faq.map((item, index) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all"
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleCollapse(index)}
              >
                <h3 className="font-semibold text-xl text-blue-600">{item.title}</h3>
                <span className="text-blue-600 text-lg">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>
              {openIndex === index && (
                <p className="text-gray-700 leading-relaxed mt-4">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </AnimatedSection>
    </HomeLayouts>
  );
}
