import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary"; // Impor ErrorBoundary
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
import WebFaq from "./pages/web/WebFaq";

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
        <Route path="/faq" element={<WebFaq />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ErrorBoundary> {/* Membungkus dengan ErrorBoundary */}
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </ErrorBoundary>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <ErrorBoundary> {/* Membungkus dengan ErrorBoundary */}
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            </ErrorBoundary>
          }
        />
        <Route
          path="/admin/mobils"
          element={
            <ErrorBoundary> {/* Membungkus dengan ErrorBoundary */}
              <ProtectedRoute>
                <Mobils />
              </ProtectedRoute>
            </ErrorBoundary>
          }
        />
        <Route
          path="/admin/galleries"
          element={
            <ErrorBoundary> {/* Membungkus dengan ErrorBoundary */}
              <ProtectedRoute>
                <Galleries />
              </ProtectedRoute>
            </ErrorBoundary>
          }
        />
        <Route
          path="/admin/metadata"
          element={
            <ErrorBoundary> {/* Membungkus dengan ErrorBoundary */}
              <ProtectedRoute>
                <Metadata />
              </ProtectedRoute>
            </ErrorBoundary>
          }
        />
        <Route
          path="/admin/testimoni"
          element={
            <ErrorBoundary> {/* Membungkus dengan ErrorBoundary */}
              <ProtectedRoute>
                <Testimoni />
              </ProtectedRoute>
            </ErrorBoundary>
          }
        />
        <Route
          path="/admin/faqs"
          element={
            <ErrorBoundary> {/* Membungkus dengan ErrorBoundary */}
              <ProtectedRoute>
                <Faqs />
              </ProtectedRoute>
            </ErrorBoundary>
          }
        />
      </Routes>
    </Router>
  );
}
