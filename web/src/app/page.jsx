import React, { useState, useEffect } from "react";
import { InfoBar } from "@/components/Header/InfoBar";
import { Navigation } from "@/components/Header/Navigation";
import { HeroContent } from "@/components/Hero/HeroContent";
import { ConsultationForm } from "@/components/Hero/ConsultationForm";
import { ServiceCard } from "@/components/Services/ServiceCard";
import { TrustSection } from "@/components/Trust/TrustSection";
import { FAQItem } from "@/components/FAQ/FAQItem";
import { ContactFormSection } from "@/components/Contact/ContactFormSection";
import { Footer } from "@/components/Footer/Footer";
import { RisksSection } from "@/components/Risks/RisksSection";
import { ReviewsCarousel } from "@/components/Reviews/ReviewsCarousel";
import { ConsultationModal } from "@/components/Modal/ConsultationModal";
import { ServiceDetailModal } from "@/components/Modal/ServiceDetailModal";
import { cities } from "@/data/citiesData";
import { servicesData } from "@/data/servicesData";
import { faqItems } from "@/data/faqData";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isServiceDetailOpen, setIsServiceDetailOpen] = useState(false);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const openConsultationModal = () => {
    setIsModalOpen(true);
  };

  const closeConsultationModal = () => {
    setIsModalOpen(false);
  };

  const openServiceDetail = (service) => {
    setSelectedService(service);
    setIsServiceDetailOpen(true);
  };

  const closeServiceDetail = () => {
    setIsServiceDetailOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FFD700] selection:text-black">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] z-[100] transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header Info Bar */}
      <InfoBar cities={cities} />

      {/* Main Navigation */}
      <Navigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden border-b border-zinc-900">
        <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row gap-12 items-start">
          <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 ease-out delay-100 lg:w-2/3 w-full">
            <HeroContent />
          </div>
          <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 ease-out delay-300 lg:w-1/3 w-full">
            <ConsultationForm />
          </div>
        </div>
      </section>

      {/* Risks Section */}
      <div className="scroll-reveal opacity-0 translate-y-12 transition-all duration-700 ease-out">
        <RisksSection onConsultationClick={openConsultationModal} />
      </div>

      {/* Services Section */}
      <section
        id="services"
        className="py-24 bg-zinc-950 relative overflow-hidden"
      >
        {/* Parallax background element */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #FFD700 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-16 scroll-reveal opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Оказываем полный комплекс услуг <br /> по сертификации продукции
            </h2>
            <p className="text-zinc-400 max-w-2xl">
              Поможем оформить все необходимые документы для законной реализации
              товаров на территории РФ и стран ЕАЭС.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {servicesData.map((service, index) => (
              <div
                key={service.title}
                className="scroll-reveal opacity-0 translate-y-12 transition-all duration-700 ease-out"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <ServiceCard
                  title={service.title}
                  icon={service.icon}
                  items={service.items}
                  onConsultationClick={openConsultationModal}
                  onCardClick={() => openServiceDetail(service)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <div
        id="about"
        className="scroll-reveal opacity-0 scale-95 transition-all duration-700 ease-out"
      >
        <TrustSection />
      </div>

      {/* Reviews Section */}
      <div className="scroll-reveal opacity-0 translate-y-12 transition-all duration-700 ease-out">
        <ReviewsCarousel />
      </div>

      {/* FAQ Section */}
      <section className="py-24 bg-black border-t border-zinc-900">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center scroll-reveal opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Вопрос-ответ
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Ответы на часто задаваемые вопросы о сертификации продукции и
              услуг
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="scroll-reveal opacity-0 translate-x-[-20px] transition-all duration-700 ease-out"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <FAQItem
                  item={item}
                  index={index}
                  isOpen={openFAQ === index}
                  onToggle={toggleFAQ}
                />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center scroll-reveal opacity-0 scale-95 transition-all duration-700 ease-out">
            <p className="text-zinc-400 mb-6">Не нашли ответ на свой вопрос?</p>
            <button
              onClick={openConsultationModal}
              className="bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FFD700]/30 shadow-lg shadow-[#FFD700]/20 uppercase tracking-wider text-sm relative overflow-hidden group"
            >
              <span className="relative z-10">Задать вопрос эксперту</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <div
        id="contacts"
        className="scroll-reveal opacity-0 translate-y-12 transition-all duration-700 ease-out"
      >
        <ContactFormSection />
      </div>

      {/* Footer */}
      <Footer />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={closeConsultationModal}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        isOpen={isServiceDetailOpen}
        onClose={closeServiceDetail}
        service={selectedService}
      />

      <style jsx global>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) scale(1) !important;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
