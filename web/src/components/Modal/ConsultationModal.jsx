import React, { useState, useEffect } from "react";
import { X, CheckCircle } from "lucide-react";

export function ConsultationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [utmParams, setUtmParams] = useState({});

  useEffect(() => {
    // Получаем UTM метки из URL
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || "",
    });
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/leads/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          type: "consultation",
          ...utmParams,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке формы");
      }

      const data = await response.json();
      console.log("Lead created:", data.leadId);

      // Отправка цели в Яндекс Метрику
      if (typeof window !== "undefined" && window.ym) {
        window.ym(108213092, "reachGoal", "formlidgl");
      }

      setSubmitSuccess(true);
      setFormData({ name: "", phone: "" });

      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError("Произошла ошибка. Попробуйте позже или позвоните нам.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setSubmitError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 animate-modalSlideIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-12 h-12 bg-[#FFD700] hover:bg-[#e6c200] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 shadow-lg z-10"
        >
          <X size={24} className="text-black" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce">
              <svg
                className="w-10 h-10 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">
              Бесплатная консультация
            </h3>
            <p className="text-zinc-600 text-sm">
              Оставьте заявку и мы свяжемся с вами в течение 15 минут
            </p>
          </div>

          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl text-green-800 flex items-start gap-3 animate-slideDown">
              <CheckCircle size={24} className="shrink-0 mt-0.5" />
              <div>
                <div className="font-bold mb-1">Заявка успешно отправлена!</div>
                <div className="text-sm">
                  Мы свяжемся с вами в ближайшее время.
                </div>
              </div>
            </div>
          )}

          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-800 text-sm animate-slideDown">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="group">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl px-5 py-4 focus:outline-none focus:border-[#FFD700] focus:bg-white transition-all text-base placeholder:text-zinc-400 text-black group-hover:border-zinc-300"
                placeholder="Ваше имя"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="group">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl px-5 py-4 focus:outline-none focus:border-[#FFD700] focus:bg-white transition-all text-base placeholder:text-zinc-400 text-black group-hover:border-zinc-300"
                placeholder="Ваш телефон"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="termsModal"
                className="mt-1.5 accent-[#FFD700] w-5 h-5 cursor-pointer"
                required
                disabled={isSubmitting}
              />
              <label
                htmlFor="termsModal"
                className="text-sm text-zinc-600 leading-relaxed cursor-pointer"
              >
                Даю согласие на{" "}
                <a
                  href="#"
                  className="text-[#FFD700] underline hover:text-[#e6c200] transition-colors"
                >
                  обработку данных
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold py-5 rounded-xl transition-all transform hover:scale-[1.02] shadow-xl shadow-[#FFD700]/30 uppercase tracking-wider text-base disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="relative z-10">
                {isSubmitting ? "Отправка..." : "Получить консультацию"}
              </span>

              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-modalSlideIn {
          animation: modalSlideIn 0.3s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
