'use client';

import { useState } from 'react';

interface AddProductModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (formData: FormData) => void;
}

export default function AddProductModal({ show, onHide, onSave }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    nama_produk: '',
    harga: '',
    kategori: 'Dewasa',
    foto: null as File | null,
    deskripsi_produk: '',
    foto_tambahan_1: null as File | null,
    foto_tambahan_2: null as File | null,
    foto_tambahan_3: null as File | null
  });

  const [previewUrls, setPreviewUrls] = useState({
    foto: null,
    foto_tambahan_1: null,
    foto_tambahan_2: null,
    foto_tambahan_3: null
  });

  const [validated, setValidated] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, kategori: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));
      setPreviewUrls(prev => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama_produk || !formData.harga || !formData.deskripsi_produk || !formData.foto) {
      setValidated(true);
      return;
    }

    const data = new FormData();
    data.append('nama_produk', formData.nama_produk);
    data.append('harga', formData.harga);
    data.append('kategori', formData.kategori);
    data.append('deskripsi_produk', formData.deskripsi_produk);
    if (formData.foto) data.append('foto', formData.foto);
    if (formData.foto_tambahan_1) data.append('foto_tambahan_1', formData.foto_tambahan_1);
    if (formData.foto_tambahan_2) data.append('foto_tambahan_2', formData.foto_tambahan_2);
    if (formData.foto_tambahan_3) data.append('foto_tambahan_3', formData.foto_tambahan_3);

    onSave(data);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      nama_produk: '',
      harga: '',
      kategori: 'Dewasa',
      foto: null,
      deskripsi_produk: '',
      foto_tambahan_1: null,
      foto_tambahan_2: null,
      foto_tambahan_3: null
    });
    setPreviewUrls({
      foto: null,
      foto_tambahan_1: null,
      foto_tambahan_2: null,
      foto_tambahan_3: null
    });
    setValidated(false);
    onHide();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-8 overflow-y-auto max-h-[90vh] transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Tambah Produk Baru</h2>
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                min="0"
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
                onChange={handleSelectChange}
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
                <label className={`flex items-center justify-center w-full border px-4 py-3 rounded-xl cursor-pointer ${
                  validated && !formData.foto ? 'border-red-500' : 'border-gray-200'
                } hover:bg-gray-50 transition-colors duration-300`}>
                  <span className="text-gray-600">{formData.foto ? formData.foto.name : 'Pilih Foto'}</span>
                  <input
                    type="file"
                    name="foto"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                </label>
              </div>
              {previewUrls.foto && (
                <div className="mt-2 rounded-xl overflow-hidden">
                  <img src={previewUrls.foto} alt="Preview" className="h-24 w-full object-cover" />
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
              onChange={handleInputChange}
              className={`w-full border px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D9B67D] ${
                validated && !formData.deskripsi_produk ? 'border-red-500' : 'border-gray-200'
              }`}
              required
            />
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Foto Tambahan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['foto_tambahan_1', 'foto_tambahan_2', 'foto_tambahan_3'].map((name, idx) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Foto Tambahan {idx + 1}</label>
                  <div className="relative">
                    <label className="flex items-center justify-center w-full border border-gray-200 px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-300">
                      <span className="text-gray-600">
                        {formData[name as keyof typeof formData] 
                          ? (formData[name as keyof typeof formData] as File).name 
                          : 'Pilih Foto'}
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
                  {previewUrls[name as keyof typeof previewUrls] && (
                    <div className="mt-2 rounded-xl overflow-hidden">
                      <img
                        src={previewUrls[name as keyof typeof previewUrls]!}
                        alt="Preview"
                        className="h-24 w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
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
      </div>
    </div>
  );
}