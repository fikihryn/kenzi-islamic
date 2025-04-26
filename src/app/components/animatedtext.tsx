"use client";
import { TextGenerateEffect } from "@/app/components/ui/text-generate-effect";

const words = `"Wahai anak Adam! Pakailah pakaianmu yang indah setiap kali memasuki masjid, makan dan minumlah, tetapi jangan berlebihan. Sesungguhnya Allah tidak menyukai orang-orang yang berlebih-lebihan. (QS. Al-A'raf : 31)"`;

export function AnimatedText() {
  return <TextGenerateEffect words={words} />;
}
