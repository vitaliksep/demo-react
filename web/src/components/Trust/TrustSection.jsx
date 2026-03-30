import React, { useState, useEffect, useRef } from "react";

export function TrustSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [experienceYears, setExperienceYears] = useState(0);
  const [certificatesCount, setCertificatesCount] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animated counters
  useEffect(() => {
    if (!isVisible) return;

    let yearsFrame = 0;
    let certsFrame = 0;

    const animateYears = () => {
      if (yearsFrame < 5) {
        setExperienceYears(yearsFrame);
        yearsFrame++;
        setTimeout(animateYears, 100);
      } else {
        setExperienceYears(5);
      }
    };

    const animateCerts = () => {
      if (certsFrame < 30000) {
        setCertificatesCount(Math.floor(certsFrame));
        certsFrame += 1000;
        setTimeout(animateCerts, 30);
      } else {
        setCertificatesCount(30000);
      }
    };

    animateYears();
    animateCerts();
  }, [isVisible]);

  const benefits = [
    {
      number: "01",
      title: "Аккредитованный орган",
      description:
        "Мы работаем напрямую, без посредников, что гарантирует легитимность и минимальные сроки.",
    },
    {
      number: "02",
      title: `Опыт более ${experienceYears} лет`,
      description: `За годы работы мы оформили более ${certificatesCount.toLocaleString("ru-RU")} разрешительных документов для компаний по всей России.`,
    },
    {
      number: "03",
      title: "Бесплатная доставка",
      description:
        "Доставляем оригиналы документов курьерской службой в любую точку РФ за наш счет.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 border-t border-zinc-900 relative overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#FFD700] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out ${Math.random() * 5}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 group cursor-default">
            Почему выбирают{" "}
            <span className="text-[#FFD700] inline-block transition-all duration-300 group-hover:scale-110 group-hover:rotate-2">
              ИВСЦ
            </span>
            ?
          </h2>
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`flex gap-4 transform transition-all duration-700 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-12 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-[#FFD700] font-black text-2xl relative group/number cursor-default">
                  {benefit.number}
                  <div className="absolute inset-0 bg-[#FFD700] blur-xl opacity-0 group-hover/number:opacity-30 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1 group/item">
                  <h4 className="font-bold mb-2 transition-colors duration-300 group-hover/item:text-[#FFD700]">
                    {benefit.title}
                  </h4>
                  <p className="text-zinc-500 text-sm transition-colors duration-300 group-hover/item:text-zinc-300">
                    {benefit.description}
                  </p>
                  <div className="h-0.5 w-0 bg-gradient-to-r from-[#FFD700] to-transparent transition-all duration-500 group-hover/item:w-full mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative group/image cursor-pointer">
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-[#FFD700]/10 rounded-2xl blur-2xl group-hover/image:bg-[#FFD700]/20 transition-all duration-700"></div>

          {/* Animated border */}
          <div
            className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(90deg, #FFD700, #FFA500, #FFD700)",
              backgroundSize: "200% 100%",
              animation: "borderFlow 3s linear infinite",
            }}
          ></div>

          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="https://ucarecdn.com/b2c1318b-3e39-4260-a57a-8ef95caa1480/-/format/auto/"
              alt="Сертификация продукции и услуг ЕАЭС и ГОСТ Р - более 30000 выданных сертификатов соответствия аккредитованным органом"
              className="relative shadow-2xl border border-zinc-800 grayscale group-hover/image:grayscale-0 transition-all duration-700 h-[500px] object-cover object-top w-full transform group-hover/image:scale-110"
            />

            {/* Overlay with stats */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
              <div className="text-center transform translate-y-4 group-hover/image:translate-y-0 transition-transform duration-500">
                <div className="text-4xl font-bold text-[#FFD700] mb-2">
                  {certificatesCount.toLocaleString("ru-RU")}+
                </div>
                <div className="text-sm text-white">сертификатов выдано</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }

        @keyframes borderFlow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
    </section>
  );
}
