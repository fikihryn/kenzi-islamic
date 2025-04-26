'use client';

import { useState } from 'react';
import Head from 'next/head';
import { AdminLayout } from '@/app/components/adminlayout';

// Simple interface for our mock data
interface MukenaProduct {
  id: number;
  nama_produk: string;
  harga: number;
  terjual: number;
  stok: number;
  kategori: string;
}

export default function AdminDashboard() {
  // Static mock data
  const [totalSales] = useState(157500000);
  const [monthlySales] = useState(35000000);
  const [previousMonthSales] = useState(30000000);
  const [totalProducts] = useState(86);
  const [activeProducts] = useState(72);
  const [outOfStock] = useState(14);
  
  // Calculate sales growth percentage
  const salesGrowth = ((monthlySales - previousMonthSales) / previousMonthSales) * 100;

  // Top selling products mock data
  const topSellingProducts: MukenaProduct[] = [
    { id: 1, nama_produk: 'Mukena Bali Premium', harga: 450000, terjual: 85, stok: 15, kategori: 'Premium' },
    { id: 2, nama_produk: 'Mukena Katun Rayon', harga: 299000, terjual: 72, stok: 28, kategori: 'Katun' },
    { id: 3, nama_produk: 'Mukena Travel Compact', harga: 275000, terjual: 68, stok: 5, kategori: 'Travel' },
    { id: 4, nama_produk: 'Mukena Anak Karakter', harga: 185000, terjual: 54, stok: 12, kategori: 'Anak' },
  ];

  // Recent activities mock data
  const recentActivities = [
    { type: 'product', message: 'Produk baru ditambahkan', detail: 'Mukena Bali Premium', time: '10 menit yang lalu' },
    { type: 'order', message: 'Pesanan baru', detail: 'ID-20254', time: '25 menit yang lalu' },
    { type: 'restock', message: 'Restock produk', detail: 'Mukena Travel Compact', time: '1 jam yang lalu' },
    { type: 'payment', message: 'Pembayaran diterima', detail: 'ID-20248', time: '2 jam yang lalu' },
  ];

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <AdminLayout>
      <Head>
        <title>Dashboard Admin | Kenzi</title>
      </Head>

      <div className="p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Dashboard Kenzi Attire</h1>
          <div className="text-sm text-black font-medium">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Penjualan */}
          <div className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-[#d4c9a8]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-black">Total Penjualan</p>
                <h3 className="text-xl font-bold mt-1 text-black">{formatCurrency(totalSales)}</h3>
              </div>
              <div className="bg-[#f5f0e4] p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9c8a63]">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Penjualan Bulanan */}
          <div className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-[#d4c9a8]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-black">Penjualan Bulan Ini</p>
                <h3 className="text-xl font-bold mt-1 text-black">{formatCurrency(monthlySales)}</h3>
                <div className="flex items-center mt-1">
                  {salesGrowth > 0 ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-1">
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                      <span className="text-xs font-medium text-green-600">{salesGrowth.toFixed(1)}%</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-1">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                      <span className="text-xs font-medium text-red-500">{Math.abs(salesGrowth).toFixed(1)}%</span>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-[#f5f0e4] p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9c8a63]">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
              </div>
            </div>
          </div>

          {/* Total Produk */}
          <div className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-[#d4c9a8]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-black">Total Produk</p>
                <h3 className="text-xl font-bold mt-1 text-black">{totalProducts}</h3>
                <p className="text-xs text-black mt-1">{activeProducts} produk aktif</p>
              </div>
              <div className="bg-[#f5f0e4] p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9c8a63]">
                  <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
            </div>
          </div>

          {/* Stok Habis */}
          <div className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-[#d4c9a8]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-black">Stok Habis</p>
                <h3 className="text-xl font-bold mt-1 text-black">{outOfStock}</h3>
                <p className="text-xs text-black mt-1">Perlu restock segera</p>
              </div>
              <div className="bg-[#f5f0e4] p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9c8a63]">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Graph and Product Category Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Trend Chart */}
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-black">Trend Penjualan</h3>
            <div className="h-64">
              {/* Simulated chart using SVG for better visualization */}
              <svg width="100%" height="200" viewBox="0 0 700 200" preserveAspectRatio="none">
                {/* Background grid lines */}
                <line x1="0" y1="40" x2="700" y2="40" stroke="#f5f0e4" strokeWidth="1" />
                <line x1="0" y1="80" x2="700" y2="80" stroke="#f5f0e4" strokeWidth="1" />
                <line x1="0" y1="120" x2="700" y2="120" stroke="#f5f0e4" strokeWidth="1" />
                <line x1="0" y1="160" x2="700" y2="160" stroke="#f5f0e4" strokeWidth="1" />
                
                {/* Line chart */}
                <path d="M50,160 L150,120 L250,140 L350,80 L450,100 L550,60 L650,40" 
                      fill="none" stroke="#9c8a63" strokeWidth="3" />
                
                {/* Data points */}
                <circle cx="50" cy="160" r="5" fill="#9c8a63" />
                <circle cx="150" cy="120" r="5" fill="#9c8a63" />
                <circle cx="250" cy="140" r="5" fill="#9c8a63" />
                <circle cx="350" cy="80" r="5" fill="#9c8a63" />
                <circle cx="450" cy="100" r="5" fill="#9c8a63" />
                <circle cx="550" cy="60" r="5" fill="#9c8a63" />
                <circle cx="650" cy="40" r="5" fill="#9c8a63" />
              </svg>
              
              <div className="flex justify-between mt-2">
                <div className="text-xs text-black">Jan</div>
                <div className="text-xs text-black">Feb</div>
                <div className="text-xs text-black">Mar</div>
                <div className="text-xs text-black">Apr</div>
                <div className="text-xs text-black">Mei</div>
                <div className="text-xs text-black">Jun</div>
                <div className="text-xs text-black">Jul</div>
              </div>
            </div>
          </div>

          {/* Product Category Distribution */}
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-black">Distribusi Kategori Produk</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="flex flex-col items-center">
                {/* SVG-based donut chart */}
                <svg width="160" height="160" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#d4c9a8" strokeWidth="20" strokeDasharray="440 0" />
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#9c8a63" strokeWidth="20" strokeDasharray="132 308" transform="rotate(-90 80 80)" />
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#b5a989" strokeWidth="20" strokeDasharray="66 374" transform="rotate(48 80 80)" />
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#eae5d5" strokeWidth="20" strokeDasharray="44 396" transform="rotate(96 80 80)" />
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#f5f0e4" strokeWidth="20" strokeDasharray="22 418" transform="rotate(120 80 80)" />
                </svg>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#d4c9a8] mr-2"></div>
                    <span className="text-xs text-black">Premium (40%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#9c8a63] mr-2"></div>
                    <span className="text-xs text-black">Katun (30%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#b5a989] mr-2"></div>
                    <span className="text-xs text-black">Anak (15%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#eae5d5] mr-2"></div>
                    <span className="text-xs text-black">Travel (10%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#f5f0e4] mr-2"></div>
                    <span className="text-xs text-black">Aksesoris (5%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Selling Products Table */}
        <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-black">Produk Terlaris</h3>
            <button className="text-sm text-[#9c8a63] hover:text-[#78694c] font-medium">Lihat Semua</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f5f0e4]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Nama Produk</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Harga</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Terjual</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f0e4]">
                {topSellingProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-[#f8f7f4]">
                    <td className="px-4 py-4 whitespace-nowrap text-black">{product.nama_produk}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-black">{formatCurrency(product.harga)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-black">{product.terjual} pcs</td>
                    <td className="px-4 py-4 whitespace-nowrap font-medium text-black">{formatCurrency(product.harga * product.terjual)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities Section */}
        <div className="bg-white rounded-xl shadow-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-black">Aktivitas Terbaru</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start p-3 hover:bg-[#f8f7f4] rounded-lg transition duration-150">
                <div className="flex-shrink-0 p-2 rounded-full bg-[#f5f0e4]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9c8a63]">
                    {activity.type === 'product' && (
                      <>
                        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      </>
                    )}
                    {activity.type === 'order' && (
                      <>
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </>
                    )}
                    {activity.type === 'restock' && (
                      <>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </>
                    )}
                    {activity.type === 'payment' && (
                      <>
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </>
                    )}
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-black">{activity.message}</p>
                  <p className="text-xs text-black opacity-70">{activity.detail} - {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}