"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      {/* Fondo con máscara */}
      <div className=" absolute inset-0 z-0">
        <img
          src="/img/tamales3-banner.jpg"
          alt="El Tamalito"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-white" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 left-10 w-20 h-20 bg-white/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-40 right-20 w-32 h-32 bg-white/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight text-balance">
            El
            <span className="block text-accent">Tamalito</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto text-pretty leading-relaxed">
            Sabor típico costarricense al alcance de un click
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
            <button className="relative overflow-hidden group text-lg px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:bg-emerald-500/20 hover:border-emerald-300/50 hover:shadow-lg hover:shadow-emerald-500/20">
              <span className="relative z-10">
                <Link href="#comidas">Ver Menú</Link>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </button>
            <button className="relative overflow-hidden group text-lg px-8 py-4 rounded-xl bg-emerald-600/90 backdrop-blur-md border border-emerald-500/30 text-white transition-all duration-300 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/30">
              <span className="relative z-10">
                <Link href="#ordenarForm">Ordenar Ahora</Link>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8 text-white" />
        </button>
      </div>
    </>
  );
}
