"use client";
import React, { useState } from "react";
import NavbarDemo from "@/app/components/navbar";
import { Instagram, Mail, MessageSquare } from "lucide-react";
import { Footer } from "../components/footer";

export default function ContactPage() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const contactMethods = [
    {
      id: "whatsapp",
      title: "WhatsApp",
      icon: <MessageSquare size={32} />,
      link: "https://wa.me/6282115871919",
      linkText: "+62 821-1587-1919",
      color: "bg-green-50",
      iconColor: "text-green-600",
      hoverBg: "hover:bg-green-50"
    },
    {
      id: "email",
      title: "Email",
      icon: <Mail size={32} />,
      link: "mailto:kenziislamic@gmail.com",
      linkText: "kenziislamic@gmail.com",
      color: "bg-blue-50",
      iconColor: "text-blue-600",
      hoverBg: "hover:bg-blue-50"
    },
    {
      id: "instagram",
      title: "Instagram",
      icon: <Instagram size={32} />,
      link: "https://instagram.com/kenzi.islamicattire",
      linkText: "@kenzi.islamicattire",
      color: "bg-pink-50",
      iconColor: "text-pink-600",
      hoverBg: "hover:bg-pink-50"
    }
  ];

  return (
    <div className="bg-white min-h-screen text-black">
      <NavbarDemo />
      
      {/* Add pt-24 to create space below navbar */}
      <div className="max-w-5xl mx-auto px-6 pt-35 pb-20">
        <div className="mb-20 text-center">
          <h1 className="text-5xl font-bold mb-6">Hubungi Kami</h1>
          <p className="text-gray-600 max-w-lg mx-auto text-lg">
            Hubungi kami melalui platform pilihan Anda. Kami selalu senang mendengar dari Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {contactMethods.map((method) => (
            <div
              key={method.id}
              className={`relative overflow-hidden rounded-3xl transition-all duration-500 ${
                activeCard === method.id 
                  ? "scale-105 shadow-2xl " + method.color
                  : "bg-stone-50 shadow-lg hover:shadow-xl " + method.hoverBg
              }`}
              onMouseEnter={() => setActiveCard(method.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="p-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${method.color} mb-8`}>
                  <div className={method.iconColor}>{method.icon}</div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{method.title}</h3>
                
                <a 
                  href={method.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center font-medium text-gray-600 hover:text-black"
                >
                  <span className="border-b border-transparent group-hover:border-black transition-all duration-300">
                    {method.linkText}
                  </span>
                </a>
                
                <div className="mt-8">
                  <a 
                    href={method.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`inline-block px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                      activeCard === method.id 
                        ? "bg-black text-white" 
                        : "bg-white text-black border border-black hover:bg-black hover:text-white"
                    }`}
                  >
                    Hubungi
                  </a>
                </div>
              </div>
              
              {/* Add decorative elements for modern look */}
              <div className={`absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-20 ${method.color}`}></div>
              <div className={`absolute top-6 right-6 w-6 h-6 rounded-full opacity-30 ${method.color}`}></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-24">
          <div className="inline-block px-8 py-4 rounded-full bg-stone-50">
            <p className="text-lg">
              Kami akan segera menghubungi Anda kembali
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}