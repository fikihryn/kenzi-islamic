"use client";
import React from "react";
import { HeroParallax } from "@/app/components/ui/hero-parallax";

export function ProductParallax() {
    return <HeroParallax products={products} />;
}

export const products = [
  {
    title: "Mukena Katun Mikro 1",
    thumbnail: "/parallax1.jpg",
  },
  {
    title: "Mukena Armany Jacquard 1",
    thumbnail: "/parallax2.jpg",
  },
  {
    title: "Mukena Armany Jacquard 2",
    thumbnail: "/parallax3.jpg",
  },
  {
    title: "Mukena Terusan Mikro 1",
    thumbnail: "/parallax4.jpg",
  },
  {
    title: "Mukena Terusan Mikro 2",
    thumbnail: "/parallax5.jpg",
  },
  {
    title: "Mukena Katun Mikro 2",
    thumbnail: "/parallax6.jpg",
  },
  {
    title: "Mukena Armany 1",
    thumbnail: "/MukenaArmany1.jpg",
  },
  {
    title: "Mukena Armany 2",
    thumbnail: "/MukenaArmany2.jpg",
  },
  {
    title: "Mukena Mikro 1",
    thumbnail: "/MukenaMikro1.jpg",
  },
  {
    title: "Mukena Mikro 2",
    thumbnail: "/MukenaMikro2.jpg",
  },
  {
    title: "Mukena Terusan 1",
    thumbnail: "/MukenaTerusan1.jpg",
  },
  {
    title: "Mukena Terusan 2",
    thumbnail: "/MukenaTerusan2.jpg",
  },
  {
    title: "Mukena Katun Mikro 3",
    thumbnail: "/parallax1.jpg",
  },
  {
    title: "Mukena Armany Jacquard 3",
    thumbnail: "/parallax2.jpg",
  },
  {
    title: "Mukena Armany Jacquard 4",
    thumbnail: "/parallax3.jpg",
  },
];