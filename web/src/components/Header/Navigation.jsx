import React, { useState, useEffect } from "react";
import { Menu, ChevronDown } from "lucide-react";

export function Navigation({ mobileMenuOpen, setMobileMenuOpen }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-xl border-zinc-800 shadow-xl shadow-black/50"
          : "bg-black/80 backdrop-blur-md border-zinc-800"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-[#FFD700] rounded flex items-center justify-center text-black font-black text-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-[#FFD700]/50">
            NK
          </div>
          <div className="transition-transform duration-300 group-hover:translate-x-1">
            <div className="font-bold text-xl leading-none group-hover:text-[#FFD700] transition-colors duration-300">
              ИВСЦ
            </div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">
              Разрешительная документация
            </div>
          </div>
        </div>

        <div className="hidden lg:flex gap-8 items-center text-sm font-medium uppercase tracking-tight">
          <a
            href="#services"
            className="hover:text-[#FFD700] transition-colors flex items-center gap-1 group/link relative py-2"
          >
            <span>Сертификация продукции</span>
            <ChevronDown
              size={14}
              className="transition-transform duration-300 group-hover/link:rotate-180"
            />
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover/link:w-full"></span>
          </a>
          <a
            href="#services"
            className="hover:text-[#FFD700] transition-colors flex items-center gap-1 group/link relative py-2"
          >
            <span>Системы менеджмента</span>
            <ChevronDown
              size={14}
              className="transition-transform duration-300 group-hover/link:rotate-180"
            />
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover/link:w-full"></span>
          </a>
          <a
            href="#services"
            className="hover:text-[#FFD700] transition-colors flex items-center gap-1 group/link relative py-2"
          >
            <span>Сертификация услуг</span>
            <ChevronDown
              size={14}
              className="transition-transform duration-300 group-hover/link:rotate-180"
            />
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover/link:w-full"></span>
          </a>
          <a
            href="#about"
            className="hover:text-[#FFD700] transition-colors group/link relative py-2"
          >
            <span>Об органе</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover/link:w-full"></span>
          </a>
          <a
            href="#contacts"
            className="hover:text-[#FFD700] transition-colors group/link relative py-2"
          >
            <span>Контакты</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover/link:w-full"></span>
          </a>
        </div>

        <button
          className="lg:hidden transition-transform duration-300 hover:scale-110 active:scale-95"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu
            className={`text-white transition-all duration-300 ${mobileMenuOpen ? "rotate-90" : ""}`}
          />
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-2 bg-black/95 backdrop-blur-xl border-t border-zinc-800">
          <a
            href="#services"
            className="block py-3 px-4 text-sm font-medium uppercase tracking-tight hover:text-[#FFD700] hover:bg-zinc-900/50 rounded-lg transition-all duration-300 transform hover:translate-x-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Сертификация продукции
          </a>
          <a
            href="#services"
            className="block py-3 px-4 text-sm font-medium uppercase tracking-tight hover:text-[#FFD700] hover:bg-zinc-900/50 rounded-lg transition-all duration-300 transform hover:translate-x-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Системы менеджмента
          </a>
          <a
            href="#services"
            className="block py-3 px-4 text-sm font-medium uppercase tracking-tight hover:text-[#FFD700] hover:bg-zinc-900/50 rounded-lg transition-all duration-300 transform hover:translate-x-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Сертификация услуг
          </a>
          <a
            href="#about"
            className="block py-3 px-4 text-sm font-medium uppercase tracking-tight hover:text-[#FFD700] hover:bg-zinc-900/50 rounded-lg transition-all duration-300 transform hover:translate-x-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Об органе
          </a>
          <a
            href="#contacts"
            className="block py-3 px-4 text-sm font-medium uppercase tracking-tight hover:text-[#FFD700] hover:bg-zinc-900/50 rounded-lg transition-all duration-300 transform hover:translate-x-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Контакты
          </a>
        </div>
      </div>
    </nav>
  );
}
