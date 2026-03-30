import {
  Clock,
  ShieldCheck,
  Award,
  Factory,
  Ship,
  ShoppingCart,
  FileText,
} from "lucide-react";

export function HeroContent() {
  const marketplaces = [
    {
      name: "Wildberries",
      logo: "https://ucarecdn.com/1f92b1b4-bc51-4f47-952d-d3de4f0a147c/-/format/auto/",
    },
    {
      name: "OZON",
      logo: "https://ucarecdn.com/3b4b40d2-6b58-4886-9809-f9012b8e91ee/-/format/auto/",
    },
    {
      name: "Яндекс Маркет",
      logo: "https://ucarecdn.com/754469da-901c-4486-98ae-10dfe21da97d/-/format/auto/",
    },
    {
      name: "Lamoda",
      logo: "https://ucarecdn.com/e5bfab58-00e6-46f4-8665-e1f192427a52/-/format/auto/",
    },
    {
      name: "СберМегаМаркет",
      logo: "https://ucarecdn.com/50b1856c-505a-4fa9-b8aa-1088ccb5b6ea/-/format/auto/",
    },
    {
      name: "Яндекс",
      logo: "https://ucarecdn.com/004f7d41-d821-4e95-8e7e-5e9f9cfa9b81/-/format/auto/",
    },
    {
      name: "Другие маркетплейсы",
      logo: "https://ucarecdn.com/61fb604c-da23-409f-a479-ef8a246ee871/-/format/auto/",
    },
    {
      name: "Казань экспресс",
      logo: "https://ucarecdn.com/292737fe-edf5-48b4-8cf7-eac0f417c1a9/-/format/auto/",
    },
  ];

  return (
    <div>
      <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-8">
        Сертификация продукции, услуг и производств{" "}
        <span className="text-[#FFD700]">в день обращения</span>
      </h1>

      {/* Marketplaces Section */}
      <div className="mb-8">
        <p className="text-sm uppercase tracking-wider text-zinc-500 mb-4 font-semibold">
          Работаем с маркетплейсами:
        </p>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {marketplaces.map((marketplace, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-3 flex items-center justify-center hover:scale-110 transition-transform duration-300 group relative overflow-hidden"
              style={{
                animation: `fadeInScale 0.6s ease-out ${index * 0.05}s backwards`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/0 to-[#FFD700]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={marketplace.logo}
                alt={marketplace.name}
                className="w-full h-auto object-contain max-h-10 relative z-10"
              />
            </div>
          ))}
        </div>
      </div>

      <p className="text-zinc-400 text-lg lg:text-xl max-w-2xl mb-8">
        Обязательная и добровольная сертификация в соответствии с требованиями
        технических регламентов ЕАЭС и стандартов ГОСТ Р.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-[#FFD700] group-hover:text-black transition-all">
            <Clock size={20} />
          </div>
          <div>
            <div className="font-bold">от 1 дня</div>
            <div className="text-xs text-zinc-500">Срочное оформление</div>
          </div>
        </div>
        <div className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-[#FFD700] group-hover:text-black transition-all">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="font-bold">100% Легитимно</div>
            <div className="text-xs text-zinc-500">Внесение в реестр ФСА</div>
          </div>
        </div>
        <div className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-[#FFD700] group-hover:text-black transition-all">
            <Award size={20} />
          </div>
          <div>
            <div className="font-bold">Своя лаборатория</div>
            <div className="text-xs text-zinc-500">
              Прямые цены без посредников
            </div>
          </div>
        </div>
      </div>

      {/* Target Audience Section */}
      <div className="mb-12">
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFD700] mb-6">
          Работаем для:
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center gap-3 p-4 rounded-xl border border-zinc-800 hover:border-[#FFD700] transition-all group">
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-[#FFD700] transition-all">
              <Factory
                size={28}
                className="text-[#FFD700] group-hover:text-black transition-colors"
              />
            </div>
            <span className="text-sm text-center">Производителей РФ</span>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 rounded-xl border border-zinc-800 hover:border-[#FFD700] transition-all group">
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-[#FFD700] transition-all">
              <Ship
                size={28}
                className="text-[#FFD700] group-hover:text-black transition-colors"
              />
            </div>
            <span className="text-sm text-center">Импортеров (ВЭД)</span>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 rounded-xl border border-zinc-800 hover:border-[#FFD700] transition-all group">
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-[#FFD700] transition-all">
              <ShoppingCart
                size={28}
                className="text-[#FFD700] group-hover:text-black transition-colors"
              />
            </div>
            <span className="text-sm text-center">Продавцов маркетплейсов</span>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 rounded-xl border border-zinc-800 hover:border-[#FFD700] transition-all group">
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-[#FFD700] transition-all">
              <FileText
                size={28}
                className="text-[#FFD700] group-hover:text-black transition-colors"
              />
            </div>
            <span className="text-sm text-center">Поставщиков тендеров</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
