import React from "react";
import { AlertTriangle, Ban, PackageX } from "lucide-react";

export function RisksSection({ onConsultationClick }) {
  const risks = [
    {
      icon: AlertTriangle,
      title: "Штрафов до 1 млн. руб",
      description: "За реализацию продукции без обязательной сертификации",
      color: "bg-red-500/10 border-red-500/30",
      iconColor: "text-red-500",
    },
    {
      icon: Ban,
      title: "Приостановления деятельности компании",
      description: "До устранения нарушений требований техрегламентов",
      color: "bg-orange-500/10 border-orange-500/30",
      iconColor: "text-orange-500",
    },
    {
      icon: PackageX,
      title: "Конфискации продукции",
      description: "Изъятие всей партии несертифицированного товара",
      color: "bg-yellow-500/10 border-yellow-500/30",
      iconColor: "text-yellow-500",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black via-zinc-950 to-black border-y border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Оградим Вас от <span className="text-[#FFD700]">рисков</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {risks.map((risk, index) => {
            const IconComponent = risk.icon;
            return (
              <div
                key={index}
                className={`${risk.color} backdrop-blur-sm rounded-2xl p-8 border-2 hover:scale-105 transition-all duration-300 group relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-16 -mt-16"></div>

                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 ${risk.iconColor} mb-6 flex items-center justify-center rounded-xl bg-black/30 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent size={32} strokeWidth={2} />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white">
                    {risk.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {risk.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-xl lg:text-2xl font-semibold mb-8 text-zinc-300">
            Не жди проверок завтра -{" "}
            <span className="text-[#FFD700]">начни сертификацию сегодня</span>
          </p>
          <button
            onClick={onConsultationClick}
            className="bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold py-5 px-12 rounded-lg transition-all transform hover:scale-[1.05] shadow-2xl shadow-[#FFD700]/30 uppercase tracking-wider text-base"
          >
            Получить сертификат
          </button>
        </div>
      </div>
    </section>
  );
}
