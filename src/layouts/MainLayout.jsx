import { useState, useEffect } from "react";
import { FaHome, FaNewspaper, FaCar, FaImages, FaCogs, FaStar, FaQuestion, FaSignOutAlt, FaBars, FaTimes, FaUser, FaBell, FaSearch, FaChevronDown, FaSun, FaMoon } from "react-icons/fa";

export default function EnhancedMainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Initialize as false, will update in useEffect
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "5 booking baru menunggu konfirmasi", time: "2 menit yang lalu", unread: true },
    { id: 2, message: "Pembayaran dari Toyota Avanza berhasil", time: "1 jam yang lalu", unread: true },
    { id: 3, message: "Review 5 bintang dari pelanggan", time: "3 jam yang lalu", unread: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeMenu, setActiveMenu] = useState('/admin/dashboard');

  // Set initial sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      // Check if screen width is >= 768px (Tailwind's 'md' breakpoint)
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      setIsSidebarOpen(isDesktop); // Open sidebar on desktop, close on mobile
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  // Simulate user data
  useEffect(() => {
    const userData = {
      name: "Admin Hakarental",
      email: "admin@hakarental.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    };
    setUser(userData);
  }, []);

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: FaHome, color: "from-blue-500 to-blue-600" },
    { path: "/admin/blogs", label: "Blog", icon: FaNewspaper, color: "from-green-500 to-green-600" },
    { path: "/admin/mobils", label: "Mobil", icon: FaCar, color: "from-purple-500 to-purple-600" },
    { path: "/admin/galleries", label: "Galeri", icon: FaImages, color: "from-pink-500 to-pink-600" },
    { path: "/admin/metadata", label: "Metadata", icon: FaCogs, color: "from-orange-500 to-orange-600" },
    { path: "/admin/testimoni", label: "Testimoni", icon: FaStar, color: "from-yellow-500 to-yellow-600" },
    { path: "/admin/faqs", label: "FAQs", icon: FaQuestion, color: "from-indigo-500 to-indigo-600" },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className={`min-h-screen flex overflow-hidden transition-all duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      
      {/* Enhanced Sidebar */}
      <aside className={`fixed md:static top-0 left-0 h-full w-72 z-30 transform transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 flex flex-col ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } shadow-2xl border-r`}>
        
        {/* Sidebar Header */}
        <div className={`flex items-center justify-between px-6 py-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FaCar className="text-white text-xl" />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Hakarental</h2>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Admin Panel</p>
            </div>
          </div>
          <button
            className={`md:hidden p-2 rounded-lg ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'} transition-all`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow mt-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => setActiveMenu(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeMenu === item.path
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-105`
                  : isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              <div className={`p-2 rounded-lg transition-all ${
                activeMenu === item.path
                  ? 'bg-white bg-opacity-20'
                  : 'bg-gray-100 group-hover:bg-gray-200'
              }`}>
                <item.icon className={`text-lg ${
                  activeMenu === item.path ? 'text-white' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
              <span className="font-medium">{item.label}</span>
              {activeMenu === item.path && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer - Profile & Settings */}
        <div className={`mt-auto p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          
          {/* Dark Mode Toggle */}
          <div className={`flex items-center justify-between p-3 rounded-xl mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Dark Mode
            </span>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isDarkMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {/* User Profile */}
          <div className={`flex items-center gap-3 p-3 rounded-xl mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="relative">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"}
                alt="Profile"
                className="w-12 h-12 rounded-xl object-cover border-2 border-blue-500"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-semibold text-sm truncate ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {user?.name || "Admin User"}
              </p>
              <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {user?.email || "admin@hakarental.com"}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isDarkMode 
                ? 'text-red-400 hover:bg-red-500 hover:bg-opacity-20 hover:text-red-300' 
                : 'text-red-600 hover:bg-red-50 hover:text-red-700'
            } group`}
          >
            <FaSignOutAlt className="text-lg group-hover:scale-110 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-hidden flex flex-col">
        
        {/* Enhanced Top Navigation */}
        <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-lg border-b transition-all`}>
          <div className="flex items-center justify-between px-6 py-4">
            
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className={`md:hidden p-2 rounded-lg ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'} transition-all`}
              >
                <FaBars size={20} />
              </button>
              
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Dashboard
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Kelola bisnis rental Anda
                </p>
              </div>
            </div>

            {/* Center - Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Cari data..."
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-3 rounded-xl transition-all ${
                    isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <FaBell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-80 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} z-50`}>
                    <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Notifikasi</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`p-4 border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'} transition-all`}>
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-500' : 'bg-gray-300'}`} />
                            <div className="flex-1">
                              <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                {notification.message}
                              </p>
                              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Menu */}
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"}
                  alt="Profile"
                  className="w-10 h-10 rounded-xl object-cover border-2 border-blue-500"
                />
                <div className="hidden md:block text-right">
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {user?.name || "Admin User"}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Administrator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className={`flex-1 overflow-y-auto ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto py-8 px-6">
            {children}
          </div>
        </div>
      </main>

      {/* Quick Action Button (Floating) */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col space-y-3">
          <button className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center">
            <FaCar size={20} />
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        /* Custom scrollbar for sidebar */
        nav::-webkit-scrollbar {
          width: 4px;
        }
        
        nav::-webkit-scrollbar-track {
          background: transparent;
        }
        
        nav::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.3);
          border-radius: 2px;
        }
        
        nav::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.5);
        }

        /* Smooth transitions */
        * {
          transition: background-color 0.2s, border-color 0.2s, color 0.2s;
        }
      `}</style>
    </div>
  );
}