"use client";
import React from "react";
import { PinContainer } from "@/app/components/ui/3d-pin";

export function AnimatedPinDemo() {
  return (
    <div className="h-fit w-full flex flex-wrap gap-8 items-center justify-center py-10">
      {/* Email Pin */}
      <PinContainer title="Email">
        <a
          href="mailto:your-email@example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem]"
        >
          <h3 className="font-bold text-base text-slate-100">Email</h3>
          <div className="text-base font-normal">
            <span className="text-slate-500">Send us a message via Email.</span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-rose-500 via-pink-500 to-red-500" />
        </a>
      </PinContainer>

      {/* WhatsApp Pin */}
      <PinContainer title="WhatsApp">
        <a
          href="https://wa.me/yourphonenumber"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem]"
        >
          <h3 className="font-bold text-base text-slate-100">WhatsApp</h3>
          <div className="text-base font-normal">
            <span className="text-slate-500">Chat with us on WhatsApp.</span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600" />
        </a>
      </PinContainer>

      {/* Instagram Pin */}
      <PinContainer title="Instagram">
        <a
          href="https://instagram.com/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem]"
        >
          <h3 className="font-bold text-base text-slate-100">Instagram</h3>
          <div className="text-base font-normal">
            <span className="text-slate-500">Follow us on Instagram.</span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-pink-400 via-pink-500 to-fuchsia-600" />
        </a>
      </PinContainer>
    </div>
  );
}
