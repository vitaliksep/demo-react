import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function ServiceCard({
  title,
  icon: Icon,
  items,
  onConsultationClick,
  onCardClick,
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div
      className="bg-white text-black rounded-2xl p-8 border-2 border-transparent hover:border-[#FFD700] transition-all duration-500 group flex flex-col h-full relative overflow-hidden cursor-pointer"
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${(mousePosition.y - 200) / 40}deg) rotateY(${(mousePosition.x - 200) / 40}deg) scale3d(1.02, 1.02, 1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: "transform 0.2s ease-out, border-color 0.5s",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onCardClick}
    >
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 215, 0, 0.1), transparent 40%)`,
        }}
      />

      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <h3 className="text-xl font-bold group-hover:text-[#000] transition-colors duration-300">
          {title}
        </h3>
        <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center group-hover:bg-[#FFD700] transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
          <Icon
            size={24}
            className="transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      <ul className="space-y-4 text-zinc-600 text-sm flex-grow relative z-10">
        {items.map((item, index) => (
          <li
            key={item}
            className="flex items-center gap-3 hover:text-black cursor-pointer transition-all duration-300 hover:translate-x-2 group/item"
          >
            <ChevronDown
              size={14}
              className="text-[#FFD700] -rotate-90 transition-all duration-300 group-hover/item:translate-x-1"
            />
            <span className="relative">
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover/item:w-full"></span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-3 relative z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCardClick();
          }}
          className="w-full bg-zinc-100 hover:bg-zinc-200 text-black py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg border-2 border-zinc-200 hover:border-[#FFD700]"
        >
          Подробнее
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onConsultationClick();
          }}
          className="w-full bg-[#FFD700] hover:bg-[#e6c200] text-black py-3 rounded-lg font-bold transition-all duration-300 relative overflow-hidden group/button hover:shadow-xl hover:shadow-[#FFD700]/30 hover:scale-105"
        >
          <span className="relative z-10">Получить консультацию</span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover/button:translate-x-full transition-transform duration-700"></div>
        </button>
      </div>
    </div>
  );
}
