import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { getToken } from "../auth";
import MainLayout from "../layouts/MainLayout";
import Swal from "sweetalert2";


export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", status: "publish" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Preview existing image
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const editorInstance = useRef(null);

  const IMAGE_BASE_URL = "https://efficiently-providence-inherited-operations.trycloudflare.com/storage/";

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/admin/blogs", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setBlogs(res.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal memuat blog",
        text: "Silakan login ulang.",
      });
      
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loadCDNResources = () => {
      return new Promise((resolve) => {
        const css = document.createElement("link");
        css.href = "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css";
        css.rel = "stylesheet";
        document.head.appendChild(css);

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js";
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    loadCDNResources().then(() => {
      if (!editorInstance.current && window.Quill && quillRef.current) {
        editorInstance.current = new window.Quill(quillRef.current, {
          theme: "snow",
          placeholder: "Tulis konten blog di sini...",
        });
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contentHtml = editorInstance.current.root.innerHTML;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", contentHtml);
    formData.append("status", form.status);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Gunakan POST + _method untuk update
    if (editingId) {
      formData.append("_method", "PUT");
    }

    try {
      await api.post(
        editingId ? `/admin/blogs/${editingId}` : "/admin/blogs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: editingId ? "Blog berhasil diperbarui!" : "Blog berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });

      setForm({ title: "", status: "publish" });
      setImageFile(null);
      setImagePreview(null);
      editorInstance.current.root.innerHTML = "";
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal menyimpan data",
        text: "Coba lagi nanti.",
      });      
    }
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      status: blog.status,
    });
    setEditingId(blog.id);
    setImagePreview(blog.image ? IMAGE_BASE_URL + blog.image : null);
    setTimeout(() => {
      if (editorInstance.current) {
        editorInstance.current.root.innerHTML = blog.content;
      }
    }, 100);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });
  
    if (!result.isConfirmed) return;
  
    try {
      await api.delete(`/admin/blogs/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchBlogs();
      Swal.fire({
        icon: "success",
        title: "Berhasil dihapus!",
        showConfirmButton: false,
        timer: 1200,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal menghapus blog",
      });
    }
  };

  return (
    <MainLayout>
      <div className="text-gray-800 space-y-10 max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold">Kelola Blog</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Konten</label>
            <div
              ref={quillRef}
              className="bg-white border border-gray-300 rounded min-h-[300px] max-h-[500px] overflow-y-auto"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 bg-white"
            >
              <option value="publish">Publish</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gambar</label>
            {imagePreview && (
              <div className="mb-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-48 object-cover rounded"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Perbarui" : "Tambah"} Blog
          </button>
        </form>

        {/* Blog Table */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Daftar Blog</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm text-gray-800 rounded shadow">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2 border-b">No</th>
                  <th className="px-4 py-2 border-b">Judul</th>
                  <th className="px-4 py-2 border-b">Status</th>
                  <th className="px-4 py-2 border-b">Tanggal</th>
                  <th className="px-4 py-2 border-b">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {blogs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      Belum ada blog
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog, index) => (
                    <tr key={blog.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{blog.title}</td>
                      <td className="px-4 py-2 capitalize">{blog.status}</td>
                      <td className="px-4 py-2">{blog.date_published}</td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
