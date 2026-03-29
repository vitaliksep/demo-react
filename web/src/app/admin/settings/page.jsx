"use client";

import React, { useState } from "react";
import {
  Save,
  Code,
  Eye,
  Users,
  Settings,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    // SEO Settings
    siteTitle: "Сертификация продукции и услуг в день обращения | ИВСЦ",
    siteDescription:
      "⚡ Срочная сертификация продукции, услуг и производств от 1 дня.",
    keywords:
      "сертификация продукции, сертификация услуг, сертификат соответствия",

    // Контактная информация
    phone: "+7 (XXX) XXX-XX-XX",
    email: "info@ivsc.ru",
    whatsapp: "YOUR_NUMBER",
    telegram: "YOUR_USERNAME",

    // Скрипты и коды аналитики
    yandexMetrika: "108213092",
    googleAnalytics: "",
    facebookPixel: "",
    vkPixel: "",
    customScripts: {
      head: "",
      bodyStart: "",
      bodyEnd: "",
    },

    // Изображения
    logo: "https://ucarecdn.com/...",
    favicon: "/favicon.ico",
    ogImage: "",
  });

  const [activeTab, setActiveTab] = useState("seo");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);

    // Имитация сохранения
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleCustomScriptChange = (position, value) => {
    setSettings({
      ...settings,
      customScripts: {
        ...settings.customScripts,
        [position]: value,
      },
    });
  };

  const tabs = [
    { id: "seo", label: "SEO", icon: FileText },
    { id: "contacts", label: "Контакты", icon: Users },
    { id: "analytics", label: "Аналитика", icon: Code },
    { id: "images", label: "Изображения", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
                Настройки сайта
              </h1>
              <p className="text-zinc-400 mt-1">
                Управляйте контентом, аналитикой и интеграциями
              </p>
            </div>

            <div className="flex gap-3">
              {saveSuccess && (
                <div className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <Save size={18} />
                  Сохранено!
                </div>
              )}
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 bg-[#FFD700] hover:bg-[#e6c200] text-black px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50"
              >
                <Save size={18} />
                {isSaving ? "Сохранение..." : "Сохранить"}
              </button>
              <a
                href="/"
                target="_blank"
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Eye size={18} />
                Предпросмотр
              </a>
              <a
                href="/admin/cms"
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Settings size={18} />
                CMS
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-zinc-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
                activeTab === tab.id
                  ? "border-b-2 border-[#FFD700] text-[#FFD700]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* SEO Settings */}
        {activeTab === "seo" && (
          <div className="space-y-6">
            <div className="bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                SEO настройки
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    Заголовок сайта (Title)
                  </label>
                  <input
                    type="text"
                    value={settings.siteTitle}
                    onChange={(e) => handleChange("siteTitle", e.target.value)}
                    className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                    placeholder="Название вашего сайта"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    Описание сайта (Description)
                  </label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) =>
                      handleChange("siteDescription", e.target.value)
                    }
                    className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors resize-none"
                    rows={3}
                    placeholder="Краткое описание вашего сайта"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    Ключевые слова (Keywords)
                  </label>
                  <input
                    type="text"
                    value={settings.keywords}
                    onChange={(e) => handleChange("keywords", e.target.value)}
                    className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                    placeholder="ключевое слово 1, ключевое слово 2"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Settings */}
        {activeTab === "contacts" && (
          <div className="space-y-6">
            <div className="bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                Контактная информация
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                    placeholder="+7 (XXX) XXX-XX-XX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                    placeholder="info@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    WhatsApp (номер)
                  </label>
                  <input
                    type="text"
                    value={settings.whatsapp}
                    onChange={(e) => handleChange("whatsapp", e.target.value)}
                    className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                    placeholder="79XXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    Telegram (username)
                  </label>
                  <input
                    type="text"
                    value={settings.telegram}
                    onChange={(e) => handleChange("telegram", e.target.value)}
                    className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                    placeholder="your_username"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Settings */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                Коды аналитики и счетчиков
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    Яндекс Метрика (ID)
                  </label>
                  <input
                    type="text"
                    value={settings.yandexMetrika}
                    onChange={(e) =>
                      handleChange("yandexMetrika", e.target.value)
                    }
                    className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                    placeholder="12345678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    Google Analytics 4 (ID)
                  </label>
                  <input
                    type="text"
                    value={settings.googleAnalytics}
                    onChange={(e) =>
                      handleChange("googleAnalytics", e.target.value)
                    }
                    className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    Facebook Pixel (ID)
                  </label>
                  <input
                    type="text"
                    value={settings.facebookPixel}
                    onChange={(e) =>
                      handleChange("facebookPixel", e.target.value)
                    }
                    className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                    placeholder="1234567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    VK Pixel (ID)
                  </label>
                  <input
                    type="text"
                    value={settings.vkPixel}
                    onChange={(e) => handleChange("vkPixel", e.target.value)}
                    className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                    placeholder="VK-RTRG-XXXXXX-XXXXX"
                  />
                </div>
              </div>
            </div>

            {/* Custom Scripts */}
            <div className="bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                Пользовательские скрипты
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    Скрипт в &lt;head&gt; (до закрывающего тега)
                  </label>
                  <textarea
                    value={settings.customScripts.head}
                    onChange={(e) =>
                      handleCustomScriptChange("head", e.target.value)
                    }
                    className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors resize-none font-mono text-sm"
                    rows={6}
                    placeholder="<!-- Вставьте код здесь -->"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    Скрипт после открытия &lt;body&gt;
                  </label>
                  <textarea
                    value={settings.customScripts.bodyStart}
                    onChange={(e) =>
                      handleCustomScriptChange("bodyStart", e.target.value)
                    }
                    className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors resize-none font-mono text-sm"
                    rows={6}
                    placeholder="<!-- Вставьте код здесь -->"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    Скрипт перед закрытием &lt;/body&gt;
                  </label>
                  <textarea
                    value={settings.customScripts.bodyEnd}
                    onChange={(e) =>
                      handleCustomScriptChange("bodyEnd", e.target.value)
                    }
                    className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors resize-none font-mono text-sm"
                    rows={6}
                    placeholder="<!-- Вставьте код здесь -->"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Images Settings */}
        {activeTab === "images" && (
          <div className="space-y-6">
            <div className="bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                Изображения и медиа
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    URL Логотипа
                  </label>
                  <input
                    type="text"
                    value={settings.logo}
                    onChange={(e) => handleChange("logo", e.target.value)}
                    className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    Favicon (путь к файлу)
                  </label>
                  <input
                    type="text"
                    value={settings.favicon}
                    onChange={(e) => handleChange("favicon", e.target.value)}
                    className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                    placeholder="/favicon.ico"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    Open Graph изображение (для соцсетей)
                  </label>
                  <input
                    type="text"
                    value={settings.ogImage}
                    onChange={(e) => handleChange("ogImage", e.target.value)}
                    className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                    placeholder="https://example.com/og-image.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Panel */}
        <div className="mt-12 bg-blue-900/20 border-2 border-blue-800/50 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0">
              <Settings size={24} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-2">
                Как работают настройки?
              </h3>
              <ul className="space-y-2 text-zinc-300 text-sm">
                <li>
                  • <strong>SEO:</strong> Настройки влияют на поисковую выдачу и
                  отображение в соцсетях
                </li>
                <li>
                  • <strong>Контакты:</strong> Номера и ссылки для связи с
                  клиентами
                </li>
                <li>
                  • <strong>Аналитика:</strong> Подключите счетчики для
                  отслеживания посетителей
                </li>
                <li>
                  • <strong>Скрипты:</strong> Добавьте произвольный код (чаты,
                  виджеты, пиксели)
                </li>
                <li>
                  • <strong>Изображения:</strong> Логотип, фавикон и превью для
                  соцсетей
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
