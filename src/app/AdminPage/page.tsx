'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { AdminLayout } from '@/app/components/adminlayout';
import ProductTable from '@/app/components/producttable';
import AddProductModal from '@/app/components/addproductmodal';
import EditProductModal from '@/app/components/editproductmodal';
import DeleteConfirmModal from '@/app/components/deletemodal';
import { Product } from '@/app/types/product';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/adminroute/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setErrorMessage('Terjadi kesalahan saat mengambil data produk.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Add product handler
  const handleAddProduct = async (productData: FormData) => {
    try {
      const response = await fetch('/api/adminroute/products', {
        method: 'POST',
        body: productData,
      });
      if (response.ok) {
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
        setShowAddModal(false);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Gagal menambah produk');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('Terjadi kesalahan saat menambah produk');
    }
  };

  // Edit product handler
  const handleEditProduct = async (productData: FormData) => {
    if (!selectedProduct) return;

    try {
      const response = await fetch(`/api/adminroute/${selectedProduct.id}`, {
        method: 'PUT',
        body: productData,
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          )
        );
        setShowEditModal(false);
        setSelectedProduct(null);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Gagal memperbarui produk');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setErrorMessage('Terjadi kesalahan saat memperbarui produk');
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.nama_produk.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.kategori.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Clear error message after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <AdminLayout>
      <Head>
        <title>Admin Dashboard | KenziAttire</title>
      </Head>

      <div className="px-6 py-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Manajemen Produk
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Kelola semua produk KenziAttire dari satu tempat
            </p>
          </div>
          
          <button
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2.5 bg-amber-100 text-amber-800 rounded-md hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors font-medium"
            onClick={() => setShowAddModal(true)}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Tambah Produk
          </button>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={() => setErrorMessage(null)}
                    className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters Bar */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              {isLoading ? (
                <span>Memuat produk...</span>
              ) : (
                <span>Menampilkan {filteredProducts.length} dari {products.length} produk</span>
              )}
            </div>
          </div>
        </div>

        {/* Product Table Container */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="py-12 flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          ) : (
            <ProductTable
              products={filteredProducts}
              onEdit={(product) => {
                setSelectedProduct(product);
                setShowEditModal(true);
              }}
              onDelete={(product) => {
                setSelectedProduct(product);
                setShowDeleteModal(true);
              }}
            />
          )}
        </div>

        {/* Empty State */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada produk ditemukan</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Coba gunakan kata kunci pencarian yang berbeda' : 'Mulai dengan menambahkan produk baru'}
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-amber-800 bg-amber-100 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Tambah Produk
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={handleAddProduct}
      />

      {/* Edit Product Modal */}
      {selectedProduct && (
        <EditProductModal
          show={showEditModal}
          onHide={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          onSave={handleEditProduct}
        />
      )}

      {/* Delete Confirm Modal */}
      {selectedProduct && (
        <DeleteConfirmModal
          show={showDeleteModal}
          onHide={() => {
            setShowDeleteModal(false);
            setSelectedProduct(null);
          }}
          productId={selectedProduct.id}
          productName={selectedProduct.nama_produk}
          onDeleteSuccess={() => {
            setProducts(products.filter((p) => p.id !== selectedProduct.id));
            setShowDeleteModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </AdminLayout>
  );
}