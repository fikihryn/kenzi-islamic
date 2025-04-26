"use client";
import React, { useState, useEffect } from "react";
import { Product } from "@/app/types/product";
import { motion, AnimatePresence } from "framer-motion";

interface EditProductModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (formData: FormData) => void;
  product: Product;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  show,
  onHide,
  onSave,
  product,
}) => {
  const [formData, setFormData] = useState({
    nama_produk: "",
    harga: "",
    kategori: "Dewasa",
    foto: null as File | null,
    deskripsi_produk: "",
    foto_tambahan_1: null as File | null,
    foto_tambahan_2: null as File | null,
    foto_tambahan_3: null as File | null,
    existing_foto: "",
    existing_foto_tambahan_1: "",
    existing_foto_tambahan_2: "",
    existing_foto_tambahan_3: "",
  });

  const [previewUrls, setPreviewUrls] = useState({
    foto: "",
    foto_tambahan_1: "",
    foto_tambahan_2: "",
    foto_tambahan_3: "",
  });

  // Extract filename from path
  const getFilenameFromPath = (path: string) => {
    if (!path) return "";
    return path.split('/').pop() || path;
  };

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        nama_produk: product.nama_produk || "",
        harga: product.harga ? product.harga.toString() : "",
        kategori: product.kategori || "Dewasa",
        foto: null,
        deskripsi_produk: product.deskripsi_produk || "",
        foto_tambahan_1: null,
        foto_tambahan_2: null,
        foto_tambahan_3: null,
        existing_foto: product.foto || "",
        existing_foto_tambahan_1: product.foto_tambahan_1 || "",
        existing_foto_tambahan_2: product.foto_tambahan_2 || "",
        existing_foto_tambahan_3: product.foto_tambahan_3 || "",
      });
      setPreviewUrls({
        foto: product.foto || "",
        foto_tambahan_1: product.foto_tambahan_1 || "",
        foto_tambahan_2: product.foto_tambahan_2 || "",
        foto_tambahan_3: product.foto_tambahan_3 || "",
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPreviewUrls((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nama_produk || !formData.harga || !formData.deskripsi_produk) {
      setValidated(true);
      return;
    }

    const data = new FormData();
    data.append("nama_produk", formData.nama_produk);
    data.append("harga", formData.harga);
    data.append("kategori", formData.kategori);
    data.append("deskripsi_produk", formData.deskripsi_produk);

    if (formData.foto) data.append("foto", formData.foto);
    if (formData.foto_tambahan_1) data.append("foto_tambahan_1", formData.foto_tambahan_1);
    if (formData.foto_tambahan_2) data.append("foto_tambahan_2", formData.foto_tambahan_2);
    if (formData.foto_tambahan_3) data.append("foto_tambahan_3", formData.foto_tambahan_3);

    data.append("existing_foto", formData.existing_foto);
    data.append("existing_foto_tambahan_1", formData.existing_foto_tambahan_1);
    data.append("existing_foto_tambahan_2", formData.existing_foto_tambahan_2);
    data.append("existing_foto_tambahan_3", formData.existing_foto_tambahan_3);

    onSave(data);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nama_produk: "",
      harga: "",
      kategori: "Dewasa",
      foto: null,
      deskripsi_produk: "",
      foto_tambahan_1: null,
      foto_tambahan_2: null,
      foto_tambahan_3: null,
      existing_foto: "",
      existing_foto_tambahan_1: "",
      existing_foto_tambahan_2: "",
      existing_foto_tambahan_3: "",
    });
    setPreviewUrls({
      foto: "",
      foto_tambahan_1: "",
      foto_tambahan_2: "",
      foto_tambahan_3: "",
    });
    setValidated(false);
  };

  const handleClose = () => {
    resetForm();
    onHide();
  };

  // Display filename based on whether it's a new file or an existing one
  const getDisplayName = (fileKey: "foto" | "foto_tambahan_1" | "foto_tambahan_2" | "foto_tambahan_3") => {
    if (formData[fileKey]) {
      return (formData[fileKey] as File).name;
    } else {
      const existingKey = `existing_${fileKey}` as keyof typeof formData;
      const existingFile = formData[existingKey] as string;
      return existingFile ? getFilenameFromPath(existingFile) : 'Pilih Foto';
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-8 overflow-y-auto max-h-[90vh] text-gray-800"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Edit Produk</h2>
              <button onClick={handleClose} className="text-gray-600 hover:text-red-500 text-2xl transition-colors duration-300 ease-in-out">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Produk</label>
                  <input
                    type="text"
                    name="nama_produk"
                    value={formData.nama_produk}
                    onChange={handleChange}
                    className={`w-full border px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D9B67D] ${
                      validated && !formData.nama_produk ? 'border-red-500' : 'border-gray-200'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Harga (Rp)</label>
                  <input
                    type="number"
                    name="harga"
                    value={formData.harga}
                    onChange={handleChange}
                    className={`w-full border px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D9B67D] ${
                      validated && !formData.harga ? 'border-red-500' : 'border-gray-200'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleChange}
                    className="w-full border border-gray-200 px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D9B67D] appearance-none bg-white"
                  >
                    <option value="Dewasa">Dewasa</option>
                    <option value="Anak-anak">Anak-anak</option>
                    <option value="Remaja">Remaja</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Foto Utama</label>
                  <div className="relative">
                    <label className="flex items-center justify-center w-full border border-gray-200 px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-300">
                      <span className="text-gray-600">
                        {getDisplayName("foto")}
                      </span>
                      <input
                        type="file"
                        name="foto"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </label>
                  </div>
                  {previewUrls.foto && (
                    <div className="mt-2 rounded-xl overflow-hidden">
                      <img
                        src={previewUrls.foto}
                        alt="Preview Utama"
                        className="h-24 w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Produk</label>
                <textarea
                  name="deskripsi_produk"
                  rows={4}
                  value={formData.deskripsi_produk}
                  onChange={handleChange}
                  className={`w-full border px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D9B67D] ${
                    validated && !formData.deskripsi_produk ? 'border-red-500' : 'border-gray-200'
                  }`}
                  required
                />
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Foto Tambahan</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(["foto_tambahan_1", "foto_tambahan_2", "foto_tambahan_3"] as const).map(
                    (name, i) => (
                      <div key={name}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Foto Tambahan {i + 1}
                        </label>
                        <div className="relative">
                          <label className="flex items-center justify-center w-full border border-gray-200 px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-300">
                            <span className="text-gray-600">
                              {getDisplayName(name)}
                            </span>
                            <input
                              type="file"
                              name={name}
                              onChange={handleFileChange}
                              accept="image/*"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </label>
                        </div>
                        {previewUrls[name] && (
                          <div className="mt-2 rounded-xl overflow-hidden">
                            <img
                              src={previewUrls[name]}
                              alt={`Preview ${name}`}
                              className="h-24 w-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-3 rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300 ease-in-out"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#D9B67D] text-white hover:bg-[#c9a76d] transition-colors duration-300 ease-in-out"
                >
                  Simpan
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProductModal;