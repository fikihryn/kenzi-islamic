import Image from "next/image";
import React from "react";
import { Timeline } from "@/app/components/ui/timeline";

export function AboutUs() {
  const data = [
    {
      title: "Siapa Kami?",
      content: (
        <div>
          <p className="text-black text-xl md:text-sm font-normal mb-4">
            Selamat datang di Kenzi Islamic Attire! Kami adalah toko yang berdedikasi menyediakan mukena dan busana islami berkualitas yang nyaman dan elegan untuk kebutuhan ibadah Anda. Berlokasi di Jalan Saguling Landeuh, Kelurahan Cilamajang, Kecamatan Kawalu, Kota Tasikmalaya, kami hadir untuk melayani Anda yang ingin tampil anggun dan syar'i dalam setiap kesempatan.
            Di Kenzi Islamic Attire, kami fokus menghadirkan berbagai pilihan mukena, termasuk bahan-bahan berkualitas tinggi seperti katun yang nyaman dan adem. Dengan desain yang trendi namun tetap memenuhi kebutuhan beribadah, produk kami dirancang untuk memberikan kenyamanan sekaligus keindahan bagi setiap pemakai.
          </p>
          <Image
            src="/logokenzi.jpeg"
            alt="Logo Kenzi"
            width={500}
            height={300}
            className="rounded-lg object-cover w-full h-auto shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      ),
    },
    {
      title: "Visi",
      content: (
        <div>
          <p className="text-black text-xs md:text-sm font-normal mb-4">
            Visi kami adalah menjadi pelopor dalam industri mukena yang mengedepankan kualitas, kenyamanan, dan desain elegan yang sesuai dengan nilai-nilai Islami serta kebutuhan perempuan Muslim modern. Kami berkomitmen untuk menghadirkan produk mukena yang tidak hanya memenuhi fungsi ibadah, tetapi juga mampu memberikan rasa percaya diri, kenyamanan, dan kebanggaan bagi setiap wanita yang mengenakannya. Melalui perpaduan antara kreativitas desain, pemilihan bahan terbaik, serta sentuhan budaya lokal yang kaya, kami ingin menjadikan mukena sebagai bagian dari ekspresi spiritual sekaligus gaya hidup yang anggun dan berkelas.
            Lebih dari sekadar menciptakan produk, visi kami juga mencerminkan kepedulian sosial yang tinggi. Kami ingin tumbuh bersama masyarakat dengan memberdayakan para pengrajin lokal, khususnya perempuan dan ibu rumah tangga, melalui penciptaan lapangan kerja, pelatihan keterampilan, dan kemitraan jangka panjang. Dengan semangat kewirausahaan dan keberkahan, kami berusaha membangun UMKM yang tidak hanya kompetitif di pasar lokal dan nasional, tetapi juga mampu menembus pasar global. Kami percaya bahwa usaha yang dilandasi dengan niat baik, kerja keras, dan nilai-nilai keislaman akan menjadi sumber manfaat yang luas bagi umat dan bangsa.
          </p>
          <Image
            src="/model3.jpg"
            alt="visi"
            width={500}
            height={300}
            className="rounded-lg object-cover w-full h-auto shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      ),
    },
    {
      title: "Lokasi Kami",
      content: (
        <div>
          <p className="text-black text-xs md:text-sm font-normal mb-4">
            Kenzi Islamic Attire merupakan sebuah usaha yang bergerak di bidang fashion Muslim, khususnya mukena dan busana ibadah yang elegan dan nyaman digunakan. Dengan komitmen untuk menghadirkan produk berkualitas tinggi yang menggabungkan nilai estetika dan religiusitas, Kenzi Islamic Attire hadir lebih dekat dengan masyarakat dari berbagai kalangan. Usaha ini berlokasi di Jalan Saguling Landeuh, Kelurahan Cilamajang, Kecamatan Kawalu, Kota Tasikmalaya—sebuah kawasan yang dikenal dengan kekayaan budaya serta semangat wirausaha yang tinggi. Dari tempat yang sederhana namun penuh semangat ini, Kenzi Islamic Attire terus berkembang dan berinovasi untuk menjadi pilihan utama para muslimah yang ingin tampil anggun dalam beribadah.
          </p>
          <div className="relative group rounded-lg overflow-hidden">
            <Image
              src="/kenzilocation.png"
              alt="Lokasi"
              width={500}
              height={300}
              className="rounded-lg object-cover w-full h-auto shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <div 
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
              style={{backdropFilter: 'blur(1px)'}}
            >
              <a 
                href="https://maps.app.goo.gl/7k7oHwzdGpduWShx7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition-all duration-300"
              >
                Buka GMaps
              </a>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}