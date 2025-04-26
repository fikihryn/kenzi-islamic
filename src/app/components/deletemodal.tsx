"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DeleteConfirmModalProps {
  show: boolean;
  onHide: () => void;
  productId: number;
  productName: string;
  onDeleteSuccess: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  show,
  onHide,
  productId,
  productName,
  onDeleteSuccess,
}) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/adminroute/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus produk");

      onDeleteSuccess();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Gagal menghapus produk. Silakan coba lagi.");
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white text-black rounded-xl shadow-xl w-full max-w-md mx-4 p-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Konfirmasi Hapus</h2>
              <button
                onClick={onHide}
                className="text-gray-500 hover:text-red-500 text-2xl font-bold leading-none"
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              <p>
                Apakah Anda yakin ingin menghapus produk{" "}
                <strong>{productName}</strong>?
              </p>
              <p className="text-red-600 text-sm mt-2">
                Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={onHide}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
              >
                Hapus
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
