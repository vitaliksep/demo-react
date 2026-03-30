import React, { useState, useEffect } from "react";
import { MessageCircle, CheckCircle } from "lucide-react";

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    messenger: "WhatsApp",
    question: "",
  });
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
          messenger: formData.messenger,
          question: formData.question,
          type: "contact",
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
      setFormData({ name: "", phone: "", messenger: "WhatsApp", question: "" });

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

  const messengers = [
    {
      name: "WhatsApp",
      icon: "https://ucarecdn.com/33f6b344-1761-4d5c-90e3-3704748a0802/-/format/auto/",
      color: "#25D366",
      link: "https://wa.me/YOUR_NUMBER",
    },
    {
      name: "Telegram",
      icon: "https://ucarecdn.com/4d93374f-281a-4260-b9ca-38cfee5786c9/-/format/auto/",
      color: "#0088cc",
      link: "https://t.me/YOUR_USERNAME",
    },
    {
      name: "MAX",
      icon: "https://ucarecdn.com/587c24ee-7acd-4e81-8c19-4b6d26792b44/-/format/auto/",
      color: "#5B4FFF",
      link: "#",
    },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Information */}
            <div className="space-y-8 lg:sticky lg:top-24 lg:self-start p-8 border-4 border-[#FFD700] rounded-2xl bg-zinc-900 shadow-[0_0_50px_rgba(255,215,0,0.3)] hover:border-[#e6c200] transition-all duration-500 relative overflow-hidden group/left">
              {/* Animated gradient overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover/left:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at 50% 50%, rgba(255, 215, 0, 0.15), transparent 40%)`,
                }}
              />

              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover/left:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/left:translate-x-full transition-transform duration-1000"></div>
              </div>

              <div className="relative z-10">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                    Не нашли ответа на вопрос или что-то не понятно по
                    разрешительной документации?
                  </h2>
                  <p className="text-zinc-400 text-lg">
                    Опишите вашу задачу и эксперты дадут оценку и бесплатную
                    консультацию.
                  </p>
                </div>

                {/* Benefits list */}
                <div className="space-y-4">
                  {[
                    "Ответим в течение 5-10 минут",
                    "Предоставим несколько вариантов решения",
                    "Подскажем, что лучше вам подойдет",
                    "Покажем, как сэкономить на сертификации до 50% от сметы",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <div className="mt-1">
                        <CheckCircle
                          size={24}
                          className="text-green-500 group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-lg text-zinc-300 leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Messenger buttons */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {messengers.map((messenger, index) => (
                      <a
                        key={index}
                        href={messenger.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-zinc-900 border-2 border-zinc-800 rounded-xl hover:border-[#FFD700] hover:shadow-lg hover:shadow-[#FFD700]/20 transition-all duration-300 group"
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <img
                            src={messenger.icon}
                            alt={messenger.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500">Написать</div>
                          <div className="font-semibold text-white">
                            в {messenger.name}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Manager card */}
                <div className="bg-zinc-800 border-2 border-zinc-700 rounded-2xl p-6 relative overflow-hidden group hover:border-[#FFD700] transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/5 rounded-full blur-3xl group-hover:bg-[#FFD700]/10 transition-all duration-500"></div>

                  <div className="flex gap-4 items-start relative z-10">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-zinc-800 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <img
                          src="https://ucarecdn.com/9ee77461-abf4-4620-ad07-3bbaeaceb0cd/-/format/auto/"
                          alt="Менеджер"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-zinc-900"></div>
                    </div>

                    <div className="flex-1">
                      <p className="text-zinc-300 leading-relaxed">
                        Чтобы мы точно определили какой документ вам необходим и
                        его стоимость, как можно точнее опишите с какими
                        товарами / услугами / документацией связан вопрос. Даже
                        если у вас возникнут трудности с описанием, пишите
                        своими словами. Эксперты в любом случае разберутся и
                        помогут!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="relative overflow-hidden rounded-2xl border-4 border-[#FFD700] hover:border-[#e6c200] transition-all duration-500 group/card shadow-[0_0_50px_rgba(255,215,0,0.3)]">
              {/* Animated gradient overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at 50% 50%, rgba(255, 215, 0, 0.15), transparent 40%)`,
                }}
              />

              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000"></div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-[0_0_40px_rgba(255,255,255,0.1)] relative z-10">
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 via-transparent to-[#FFA500]/5 rounded-2xl pointer-events-none"></div>

                <div className="relative z-10">
                  {submitSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl text-green-800 flex items-start gap-3">
                      <CheckCircle size={24} className="shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold mb-1">
                          Заявка успешно отправлена!
                        </div>
                        <div className="text-sm">
                          Мы свяжемся с вами в ближайшее время.
                        </div>
                      </div>
                    </div>
                  )}

                  {submitError && (
                    <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-800 text-sm">
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

                    <div>
                      <label className="block text-sm text-zinc-600 mb-2 font-medium">
                        Выберите мессенджер{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <select
                          value={formData.messenger}
                          onChange={(e) =>
                            handleChange("messenger", e.target.value)
                          }
                          className="w-full bg-[#FFD700] hover:bg-[#e6c200] border-2 border-[#FFD700] text-black font-semibold rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 transition-all text-base appearance-none cursor-pointer"
                          disabled={isSubmitting}
                          required
                        >
                          <option value="WhatsApp">WhatsApp</option>
                          <option value="Telegram">Telegram</option>
                          <option value="MAX">MAX</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-black"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-600 mb-2 font-medium">
                        Опишите свой вопрос{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.question}
                        onChange={(e) =>
                          handleChange("question", e.target.value)
                        }
                        className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl px-5 py-4 focus:outline-none focus:border-[#FFD700] focus:bg-white transition-all text-base placeholder:text-zinc-400 text-black resize-none hover:border-zinc-300"
                        placeholder="Расскажите подробнее о вашей задаче..."
                        rows={5}
                        disabled={isSubmitting}
                        required
                      />
                    </div>

                    <div className="flex items-start gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="terms2"
                        className="mt-1.5 accent-[#FFD700] w-5 h-5 cursor-pointer"
                        required
                        disabled={isSubmitting}
                      />
                      <label
                        htmlFor="terms2"
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
                        {isSubmitting ? "Отправка..." : "Задать вопрос"}
                      </span>

                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
