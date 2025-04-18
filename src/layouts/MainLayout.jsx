import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { removeToken } from "../auth";

export default function MainLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null); // State untuk menyimpan data user

  // Mendapatkan data pengguna dari localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData); // Mengupdate state dengan data pengguna
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(" https://fast-llama-evenly.ngrok-free.app/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    } catch (err) {}
    removeToken();
    navigate("/login");
  };

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "fa-solid fa-house" },
    { path: "/admin/blogs", label: "Blog", icon: "fa-solid fa-newspaper" },
    { path: "/admin/mobils", label: "Mobil", icon: "fa-solid fa-car" }, // ✅ Tambahan
    { path: "/admin/galleries", label: "Galeri", icon: "fa-solid fa-images" }, // ✅ Tambahan
    { path: "/admin/metadata", label: "Metadata", icon: "fa-solid fa-cogs" }, // Menambahkan Metadata
    { path: "/admin/testimoni", label: "Testimoni", icon: "fa-solid fa-star" }, // Menambahkan Testimoni
    { path: "/admin/faqs", label: "FAQs", icon: "fa-solid fa-question" }, // Menambahkan FAQs
  ];
  

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white fixed md:static top-0 left-0 h-full w-64 z-20 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex flex-col`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Hakarental</h2>
          <button
            className="md:hidden text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow mt-4 px-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 ${
                location.pathname === item.path ? "bg-gray-700" : ""
              }`}
            >
              <i className={`${item.icon} w-5`}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Separator */}
        <div className="border-t border-gray-700 my-4 mx-6" />

        {/* Profile & Logout */}
        <div className="px-6 pb-6">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://www.gravatar.com/avatar/?d=mp"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              {/* Menampilkan nama pengguna jika ada */}
              <p className="font-semibold text-sm">
                {user ? user.name : "User"}
              </p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-300 hover:text-red-400"
          >
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto">
        {/* Topbar for mobile */}
        <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Hakarental</h1>
        </div>

        {/* Page content */}
        <div className="max-w-6xl mx-auto py-10 px-4">{children}</div>
      </main>
    </div>
  );
}
