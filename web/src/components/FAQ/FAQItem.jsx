import React, { useRef, useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";

export function FAQItem({ item, index, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-[#FFD700]/50 transition-all duration-500 group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.05), transparent)",
        }}
      />

      <button
        onClick={() => onToggle(index)}
        className="w-full px-6 py-5 flex items-center justify-between text-left transition-all duration-300 group-hover:px-8 relative z-10"
      >
        <span
          className={`font-bold text-base transition-colors duration-300 ${isOpen ? "text-[#FFD700]" : "text-white group-hover:text-[#FFD700]"}`}
        >
          {item.question}
        </span>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? "bg-[#FFD700] rotate-180 scale-110" : "bg-zinc-800 group-hover:bg-zinc-700 group-hover:scale-110 group-hover:rotate-90"}`}
        >
          {isOpen ? (
            <Minus
              size={18}
              className="text-black transition-transform duration-300"
            />
          ) : (
            <Plus
              size={18}
              className={`transition-colors duration-300 ${isOpen ? "text-black" : "text-[#FFD700]"}`}
            />
          )}
        </div>
      </button>

      <div
        ref={contentRef}
        style={{
          height: `${height}px`,
          transition: "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed relative">
          <div
            className="transform transition-all duration-500"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(-10px)",
            }}
          >
            <div
              className="w-12 h-0.5 bg-gradient-to-r from-[#FFD700] to-transparent mb-4 transition-all duration-500"
              style={{ width: isOpen ? "48px" : "0px" }}
            ></div>
            {item.answer}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent"></div>
      )}
    </div>
  );
}
