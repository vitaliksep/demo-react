import React, { useEffect } from "react";
import {
  X,
  AlertCircle,
  ShieldAlert,
  Scale,
  CheckCircle2,
  Info,
} from "lucide-react";

export function ServiceDetailModal({ isOpen, onClose, service }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !service) return null;

  const Icon = service.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-zinc-900 to-black rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border-2 border-zinc-800 transform transition-all duration-500 animate-scaleIn">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD700]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFA500]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#FFD700] to-[#FFA500] p-8 border-b-2 border-[#FFD700]/50">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 z-10"
          >
            <X size={20} className="text-white" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-black/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-bounce-slow">
              <Icon size={32} className="text-black" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-black mb-1">
                {service.title}
              </h2>
              <p className="text-black/70 text-sm">Подробная информация</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative overflow-y-auto max-h-[calc(90vh-140px)] p-8 space-y-6">
          {/* Для кого */}
          <div className="bg-zinc-800/50 backdrop-blur-sm border-2 border-zinc-700 rounded-2xl p-6 hover:border-[#FFD700] transition-all duration-300 group animate-slideUp">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Info size={24} className="text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#FFD700] mb-3">
                  Для кого эта услуга?
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  {service.details.forWhom}
                </p>
              </div>
            </div>
          </div>

          {/* Какие потребности решает */}
          <div className="bg-zinc-800/50 backdrop-blur-sm border-2 border-zinc-700 rounded-2xl p-6 hover:border-[#FFD700] transition-all duration-300 group animate-slideUp delay-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 size={24} className="text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#FFD700] mb-3">
                  Какие задачи решает?
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  {service.details.solves}
                </p>
              </div>
            </div>
          </div>

          {/* Законы и нормативы */}
          <div className="bg-zinc-800/50 backdrop-blur-sm border-2 border-zinc-700 rounded-2xl p-6 hover:border-[#FFD700] transition-all duration-300 group animate-slideUp delay-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Scale size={24} className="text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#FFD700] mb-3">
                  Правовая база
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  {service.details.laws}
                </p>
              </div>
            </div>
          </div>

          {/* Последствия отсутствия */}
          <div className="bg-red-900/20 backdrop-blur-sm border-2 border-red-800/50 rounded-2xl p-6 hover:border-red-600 transition-all duration-300 group animate-slideUp delay-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <AlertCircle size={24} className="text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-400 mb-3">
                  Последствия отсутствия документов
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  {service.details.consequences}
                </p>
              </div>
            </div>
          </div>

          {/* Как избежать проблем */}
          <div className="bg-gradient-to-br from-[#FFD700]/10 to-[#FFA500]/10 backdrop-blur-sm border-2 border-[#FFD700]/50 rounded-2xl p-6 hover:border-[#FFD700] transition-all duration-300 group animate-slideUp delay-400">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFD700]/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <ShieldAlert size={24} className="text-[#FFD700]" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#FFD700] mb-3">
                  Как избежать проблем?
                </h3>
                <p className="text-zinc-300 leading-relaxed mb-6">
                  {service.details.howToAvoid}
                </p>
                <button
                  onClick={onClose}
                  className="w-full bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-xl shadow-[#FFD700]/30 uppercase tracking-wider text-sm relative overflow-hidden group/btn"
                >
                  <span className="relative z-10">Получить консультацию</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-slideUp.delay-100 {
          animation-delay: 0.1s;
        }

        .animate-slideUp.delay-200 {
          animation-delay: 0.2s;
        }

        .animate-slideUp.delay-300 {
          animation-delay: 0.3s;
        }

        .animate-slideUp.delay-400 {
          animation-delay: 0.4s;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
