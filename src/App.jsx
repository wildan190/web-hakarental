import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Mobils from "./pages/Mobils";
import Galleries from "./pages/Galleries";
import Blogs from "./pages/Blogs";
import Metadata from "./pages/Metadata";
import Testimoni from "./pages/Testimoni";
import Faqs from "./pages/Faqs";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/web/Home"; // 👉 import halaman Home
import WebBlog from "./pages/web/WebBlog";
import WebBlogDetail from "./pages/web/WebBlogDetail";
import WebMobil from "./pages/web/WebMobil";
import WebKontak from "./pages/web/WebKontak";
import WebTestimoni from "./pages/web/WebTestimoni";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<WebBlog />} />
        <Route path="/blog/:slug" element={<WebBlogDetail />} />
        <Route path="/mobil" element={<WebMobil />} />
        <Route path="/kontak" element={<WebKontak />} />
        <Route path="/testimoni" element={<WebTestimoni />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/mobils"
          element={
            <ProtectedRoute>
              <Mobils />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/galleries"
          element={
            <ProtectedRoute>
              <Galleries />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/metadata"
          element={
            <ProtectedRoute>
              <Metadata />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/testimoni"
          element={
            <ProtectedRoute>
              <Testimoni />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/faqs"
          element={
            <ProtectedRoute>
              <Faqs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
