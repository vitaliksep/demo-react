import React, { useState, useEffect } from "react";

export function ConsultationForm() {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [focusedField, setFocusedField] = useState(null);
  const [shake, setShake] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
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

      setTimeout(() => setSubmitSuccess(false), 5000);
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

  return (
    <div className="w-full transform transition-all duration-500 hover:scale-[1.02]">
      <div className="bg-white text-black p-8 rounded-2xl shadow-2xl shadow-[#FFD700]/10 border border-white relative overflow-hidden group">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 via-transparent to-[#FFA500]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#FFD700] rounded-full opacity-20"
              style={{
                left: `${20 + i * 20}%`,
                animation: `floatParticle ${3 + i}s ease-in-out ${
                  i * 0.5
                }s infinite`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2 group-hover:text-[#000] transition-colors duration-300">
            Бесплатная консультация
          </h3>
          <p className="text-zinc-500 text-sm mb-6">
            Оставьте заявку и наш эксперт свяжется с вами в течение 5-10 минут
            для расчета стоимости.
          </p>

          {submitSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
              ✓ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
            </div>
          )}

          {submitError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
              {submitError}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className={`space-y-4 ${shake ? "animate-shake" : ""}`}
          >
            <div className="relative">
              <label
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focusedField === "name" || formData.name
                    ? "top-1 text-[10px] text-[#FFD700] font-bold"
                    : "top-3 text-xs text-zinc-400"
                }`}
              >
                Ваше имя
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-lg px-4 pt-6 pb-2 focus:outline-none focus:border-[#FFD700] focus:shadow-lg focus:shadow-[#FFD700]/20 transition-all duration-300 hover:border-zinc-300"
                placeholder={focusedField === "name" ? "Иван Иванов" : ""}
                disabled={isSubmitting}
              />
              {focusedField === "name" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
              )}
            </div>

            <div className="relative">
              <label
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focusedField === "phone" || formData.phone
                    ? "top-1 text-[10px] text-[#FFD700] font-bold"
                    : "top-3 text-xs text-zinc-400"
                }`}
              >
                Телефон
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-lg px-4 pt-6 pb-2 focus:outline-none focus:border-[#FFD700] focus:shadow-lg focus:shadow-[#FFD700]/20 transition-all duration-300 hover:border-zinc-300"
                placeholder={
                  focusedField === "phone" ? "+7 (___) ___-__-__" : ""
                }
                disabled={isSubmitting}
              />
              {focusedField === "phone" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
              )}
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 accent-[#FFD700] w-4 h-4 cursor-pointer transition-transform duration-200 hover:scale-110"
                required
                disabled={isSubmitting}
              />
              <label
                htmlFor="terms"
                className="text-[10px] text-zinc-400 leading-tight cursor-pointer hover:text-zinc-600 transition-colors duration-200"
              >
                Я согласен на обработку персональных данных в соответствии с{" "}
                <a
                  href="#"
                  className="underline hover:text-[#FFD700] transition-colors duration-200"
                >
                  политикой конфиденциальности
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-[#FFD700]/20 hover:shadow-2xl hover:shadow-[#FFD700]/40 uppercase tracking-wider text-sm relative overflow-hidden group/btn disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">
                {isSubmitting ? "Отправка..." : "Получить расчет"}
              </span>

              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
              </div>

              {!isSubmitting && (
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-lg bg-[#FFD700] animate-ping"></div>
                </div>
              )}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
          50% { transform: translateY(-100px) scale(1.5); opacity: 0.5; }
        }

        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  );
}
