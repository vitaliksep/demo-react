import { Phone, Mail, MapPin } from "lucide-react";

export function InfoBar({ cities }) {
  return (
    <div className="bg-zinc-900 border-b border-zinc-800 py-2 hidden md:block">
      <div className="container mx-auto px-4 flex justify-between items-center text-xs text-zinc-400">
        <div className="flex gap-6">
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-[#FFD700]" /> Аккредитованный
            центр сертификации
          </span>
          <div className="flex gap-4">
            {cities.map((city) => (
              <span
                key={city}
                className="hover:text-white cursor-pointer transition-colors"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="mailto:info@nksc.ru"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Mail size={12} className="text-[#FFD700]" /> info@certification.ru
          </a>
          <a
            href="tel:88000000000"
            className="flex items-center gap-1 font-bold text-white"
          >
            <Phone size={12} className="text-[#FFD700]" /> 8 (800) 000-00-00
          </a>
        </div>
      </div>
    </div>
  );
}