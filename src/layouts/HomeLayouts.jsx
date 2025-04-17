import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import Hero from "../components/Hero";
import api from "../api";

export default function HomeLayouts({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [kontak, setKontak] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchKontak = async () => {
      try {
        const res = await api.get("/web/kontak");
        setKontak(res.data);
      } catch (error) {
        console.error("Gagal mengambil data kontak:", error);
      }
    };
    fetchKontak();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 relative">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "bg-white shadow text-gray-800" : "bg-transparent text-white"
        }`}
      >
        <h1 className="text-2xl font-bold text-white-600">Hakarentcar</h1>

        <nav className="space-x-4 hidden md:block">
          <Link to="/" className="hover:text-blue-600">Beranda</Link>
          <Link to="/mobil" className="hover:text-blue-600">Mobil</Link>
          <Link to="/blog" className="hover:text-blue-600">Blog</Link>
          <Link to="/testimoni" className="hover:text-blue-600">Testimoni</Link>
          <Link to="/kontak" className="hover:text-blue-600">Kontak</Link>
        </nav>

        <button
          onClick={() => setSidebarOpen(true)}
          className="block md:hidden focus:outline-none text-2xl"
        >
          ☰
        </button>
      </header>

      {/* Sidebar Mobile */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">Menu</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-2xl focus:outline-none"
          >
            ×
          </button>
        </div>
        <nav className="flex flex-col px-6 py-4 space-y-4">
          <Link to="/" onClick={() => setSidebarOpen(false)}>Beranda</Link>
          <Link to="/mobil" onClick={() => setSidebarOpen(false)}>Mobil</Link>
          <Link to="/blog" onClick={() => setSidebarOpen(false)}>Blog</Link>
          <Link to="/testimoni" onClick={() => setSidebarOpen(false)}>Testimoni</Link>
          <Link to="/kontak" onClick={() => setSidebarOpen(false)}>Kontak</Link>
        </nav>
      </div>

      {/* Conditional Hero */}
      {window.location.pathname === "/" && <Hero />}
      <main className="flex-grow container mx-auto px-6 py-10 mt-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white pt-10 pb-6 mt-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-3">Rental Mobil</h2>
            <p className="text-sm text-gray-300">
              Solusi transportasi terbaik untuk perjalanan Anda. Nikmati kenyamanan dan keamanan bersama kami.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">Beranda</Link></li>
              <li><Link to="/mobil" className="hover:underline">Mobil</Link></li>
              <li><Link to="/blog" className="hover:underline">Blog</Link></li>
              <li><Link to="/testimoni" className="hover:underline">Testimoni</Link></li>
              <li><Link to="/kontak" className="hover:underline">Kontak</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Ikuti Kami</h3>
            <div className="flex space-x-4 text-white text-xl">
              {kontak?.facebook && (
                <a href={kontak.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  <FaFacebookF />
                </a>
              )}
              {kontak?.instagram && (
                <a href={kontak.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
                  <FaInstagram />
                </a>
              )}
              {kontak?.twitter && (
                <a href={kontak.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
                  <FaTwitter />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-300 mt-8">
          &copy; {new Date().getFullYear()} Rental Mobil. All rights reserved.
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/62822535456`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition"
      >
        <FaWhatsapp size={24} />
      </a>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
