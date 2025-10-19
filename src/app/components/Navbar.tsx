"use client";
import { useState, useEffect } from "react";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Session } from "next-auth";
import UserDropdown from "./DropDown";
export default function Navbar({ session }: { session: Session | null }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#hero", label: "Inicio" },
    { href: "/#comidas", label: "Comidas" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-black/80"
      }`}
    >
      <div className="container mx-auto px-8 ">
        <div className="flex items-center justify-between h-20 ">
          {/* Logo */}
          <Link href="/#inicio" className="flex items-center gap-3 group">
            <div className="block">
              <h1 className="text-xl font-bold text-white">El Tamalito</h1>
              <p className="text-xs text-white">Comidas típicas</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-accent hover:scale-105 transition-all duration-300 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#ordenarForm"
              className="text-white hover:text-white px-3 py-2 bg-emerald-600 rounded-full hover:bg-emerald-500/90 hover:scale-105 transition-all duration-300 font-medium"
            >
              Ordenar
            </Link>
            {!session ? (
              <Link
                href="/auth/login"
                className="text-white hover:text-white px-3 py-2 rounded-full hover:bg-amber-500/90 hover:scale-105 transition-all duration-300 font-medium"
              >
                Iniciar sesión
              </Link>
            ) : (
              <UserDropdown session={session} />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white hover:text-accent transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-accent transition-colors duration-300 font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#ordenarForm"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white text-center hover:text-white p-1 bg-emerald-600 rounded-full hover:bg-emerald-500/90 hover:scale-105 transition-all duration-300 font-medium"
              >
                Ordenar
              </Link>
              {!session ? (
                <Link
                  href="/api/auth/signin"
                  className="text-white text-center hover:text-white p-1 bg-amber-600 rounded-full hover:bg-amber-500/90 hover:scale-105 transition-all duration-300 font-medium"
                >
                  Iniciar sesión
                </Link>
              ) : (
                <UserDropdown session={session} />
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
