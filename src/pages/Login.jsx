import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../auth";
import api from "../api";
import { Link } from "react-router-dom";  // Impor Link dari react-router-dom

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");  // State untuk menyimpan pesan error
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form);
      setToken(data.access_token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Login failed. Please check your email and password.");  // Menampilkan pesan error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto flex rounded-lg overflow-hidden shadow-lg">
        {/* Left Side (Image) */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/assets/img/login.jpg"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 p-8 bg-white">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            {/* Menampilkan pesan error jika login gagal */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div>
              <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
                Login
              </button>
            </div>
          </form>

          {/* Link Register */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
