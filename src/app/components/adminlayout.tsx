'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  CalendarDays,
  LogOut,
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  console.log('[AdminLayout] Rendered');
  console.log('[AdminLayout] Children:', children);

  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/');
  };

  const navItems = [
    {
      href: '/AdminDashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5 mr-3" />,
    },
    {
      href: '/AdminPage',
      label: 'Produk',
      icon: <Package className="w-5 h-5 mr-3" />,
    },
    {
      href: '/AdminCalendar',
      label: 'Kalendar',
      icon: <CalendarDays className="w-5 h-5 mr-3" />,
    },
  ];

  // Function to check if current path matches the nav item
  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'; // Exact match for dashboard
    }
    // For other items, check if pathname starts with href
    return pathname?.startsWith(href);
  };

  // Custom gold color
  const activeColor = '#D9B67D';

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="fixed left-0 top-0 h-full w-64 bg-zinc-900 shadow-xl z-10"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-8 border-b border-zinc-800">
            <h1 className="text-3xl font-bold text-stone-200" style={{ fontFamily: 'Engravers MT, serif' }}>Kenzi</h1>
            <p className="text-sm text-stone-400 mt-1">Admin Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-grow px-4 py-6 overflow-y-auto">
            <ul className="space-y-3">
              {navItems.map(({ href, label, icon }) => (
                <li key={href}>
                  <Link href={href}>
                    <div
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive(href)
                          ? 'bg-zinc-800 text-stone-200 shadow-md'
                          : 'text-stone-300 hover:bg-zinc-800 hover:text-stone-200'
                      }`}
                    >
                      {icon}
                      <span className="font-medium">{label}</span>
                      {isActive(href) && (
                        <motion.div
                          layoutId="activeTab"
                          className="ml-auto w-1 h-6 rounded-full"
                          style={{ backgroundColor: activeColor }}
                        />
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="px-4 py-6 border-t border-zinc-800 mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-stone-300 rounded-lg hover:bg-zinc-800 hover:text-stone-200 transition-all duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content with Left Margin */}
      <div className="ml-64 flex-grow p-8 w-full">
        <div className="bg-white rounded-xl shadow-md p-6">{children}</div>
      </div>
    </div>
  );
}