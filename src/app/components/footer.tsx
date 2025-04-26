"use client";
import React from "react";
import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#222] text-gray-300 px-6 py-12 md:py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand & Description */}
        <div>
          <h2 className="text-xl font-bold text-white">Kenzi Islamic Attire</h2>
          <p className="mt-2 text-sm">
            Tampil anggun dan nyaman dengan mukena dan busana muslimah terbaik. Temukan koleksi pilihan kami.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Menu</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">Beranda</Link></li>
            <li><Link href="/katalog" className="hover:text-white">Katalog</Link></li>
            <li><Link href="/#about" className="hover:text-white">Tentang Kami</Link></li>
            <li><Link href="/kontak" className="hover:text-white">Kontak</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Hubungi Kami</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={18} /> kenzi.attire@email.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> +62 812 3456 7890
            </li>
            <li className="flex items-center gap-2">
              <Instagram size={18} /> <a href="https://instagram.com/kenzi.islamicattire" target="_blank" className="hover:text-white">@kenzi.islamicattire</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-600 mt-12 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Kenzi Islamic Attire. All rights reserved.
      </div>
    </footer>
  );
};