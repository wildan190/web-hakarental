import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { setToken } from "../auth";
import { Link } from "react-router-dom";  // Impor Link untuk navigasi ke login

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "", // Menyimpan konfirmasi password
  });

  const [error, setError] = useState(""); // Untuk menyimpan pesan error
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/register", form);
      setToken(data.access_token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");  // Pesan error
      console.log(err.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto flex rounded-lg overflow-hidden shadow-lg">
        {/* Left Side (Image) */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/assets/img/login.jpg"
            alt="Register"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 p-8 bg-white">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Password Confirmation */}
            <div>
              <label htmlFor="password_confirmation" className="text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="password_confirmation"
                placeholder="Confirm Password"
                value={form.password_confirmation}
                onChange={(e) =>
                  setForm({ ...form, password_confirmation: e.target.value })
                }
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Menampilkan error jika ada */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* Register Button */}
            <div>
              <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
                Register
              </button>
            </div>
          </form>

          {/* Link ke Login */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
