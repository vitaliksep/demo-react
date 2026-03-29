"use client";

import React, { useState } from "react";
import {
  GripVertical,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  Eye,
  ChevronDown,
  ChevronUp,
  Settings,
  Home,
  FileText,
  Users,
} from "lucide-react";

export default function CMSAdminPage() {
  const [sections, setSections] = useState([
    {
      id: "hero",
      name: "Героический раздел",
      type: "hero",
      visible: true,
      editable: true,
      content: {
        title: "Сертификация и разрешительная документация под ключ",
        subtitle: "Оформим документы за 3-7 дней без вашего участия",
      },
    },
    {
      id: "services",
      name: "Услуги",
      type: "services",
      visible: true,
      editable: true,
      content: {
        title: "Оказываем полный комплекс услуг по сертификации продукции",
        description:
          "Поможем оформить все необходимые документы для законной реализации товаров на территории РФ и стран ЕАЭС.",
      },
    },
    {
      id: "trust",
      name: "Почему нам доверяют",
      type: "trust",
      visible: true,
      editable: true,
      content: {
        title: "Почему нам доверяют?",
      },
    },
    {
      id: "reviews",
      name: "Отзывы",
      type: "reviews",
      visible: true,
      editable: true,
      content: {
        title: "Отзывы наших клиентов",
      },
    },
    {
      id: "faq",
      name: "Вопрос-ответ",
      type: "faq",
      visible: true,
      editable: true,
      content: {
        title: "Вопрос-ответ",
        description:
          "Ответы на часто задаваемые вопросы о сертификации продукции и услуг",
      },
    },
    {
      id: "contact",
      name: "Форма обратной связи",
      type: "contact",
      visible: true,
      editable: true,
      content: {
        title:
          "Не нашли ответа на вопрос или что-то не понятно по разрешительной документации?",
      },
    },
  ]);

  const [editingSection, setEditingSection] = useState(null);
  const [tempContent, setTempContent] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    const newSections = [...sections];
    const draggedSection = newSections[draggedItem];
    newSections.splice(draggedItem, 1);
    newSections.splice(index, 0, draggedSection);

    setSections(newSections);
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const toggleVisibility = (id) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, visible: !section.visible } : section,
      ),
    );
  };

  const startEdit = (section) => {
    setEditingSection(section.id);
    setTempContent(section.content);
  };

  const cancelEdit = () => {
    setEditingSection(null);
    setTempContent({});
  };

  const saveEdit = () => {
    setSections(
      sections.map((section) =>
        section.id === editingSection
          ? { ...section, content: tempContent }
          : section,
      ),
    );
    setEditingSection(null);
    setTempContent({});
  };

  const deleteSection = (id) => {
    if (confirm("Вы уверены, что хотите удалить эту секцию?")) {
      setSections(sections.filter((section) => section.id !== id));
    }
  };

  const addNewSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      name: "Новая секция",
      type: "custom",
      visible: true,
      editable: true,
      content: {
        title: "Заголовок новой секции",
        description: "Описание новой секции",
      },
    };
    setSections([...sections, newSection]);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
                CMS - Управление контентом
              </h1>
              <p className="text-zinc-400 mt-1">
                Редактируйте и управляйте секциями лендинга
              </p>
            </div>

            <div className="flex gap-3">
              <a
                href="/"
                target="_blank"
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Eye size={18} />
                Предпросмотр
              </a>
              <a
                href="/admin/leads"
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Users size={18} />
                Заявки
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Add New Section Button */}
        <div className="mb-8">
          <button
            onClick={addNewSection}
            className="flex items-center gap-2 bg-[#FFD700] hover:bg-[#e6c200] text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            <Plus size={20} />
            Добавить новую секцию
          </button>
        </div>

        {/* Sections List */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={section.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`bg-zinc-900 border-2 ${
                draggedItem === index
                  ? "border-[#FFD700] opacity-50"
                  : "border-zinc-800"
              } rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#FFD700]/50`}
            >
              {/* Section Header */}
              <div className="flex items-center gap-4 p-6 bg-zinc-800/50">
                <button className="cursor-grab active:cursor-grabbing text-zinc-500 hover:text-[#FFD700] transition-colors">
                  <GripVertical size={24} />
                </button>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">
                    {section.name}
                  </h3>
                  <p className="text-sm text-zinc-500">Тип: {section.type}</p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Visibility Toggle */}
                  <button
                    onClick={() => toggleVisibility(section.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      section.visible
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-zinc-700 hover:bg-zinc-600 text-zinc-400"
                    }`}
                  >
                    {section.visible ? "Видима" : "Скрыта"}
                  </button>

                  {/* Edit Button */}
                  {editingSection === section.id ? (
                    <>
                      <button
                        onClick={saveEdit}
                        className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                      >
                        <Save size={20} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startEdit(section)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <Edit3 size={20} />
                    </button>
                  )}

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteSection(section.id)}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              {/* Section Content (Edit Mode) */}
              {editingSection === section.id && (
                <div className="p-6 border-t border-zinc-800 space-y-4">
                  {Object.keys(section.content).map((key) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-zinc-400 mb-2 uppercase">
                        {key}
                      </label>
                      {key === "description" || key === "subtitle" ? (
                        <textarea
                          value={tempContent[key] || ""}
                          onChange={(e) =>
                            setTempContent({
                              ...tempContent,
                              [key]: e.target.value,
                            })
                          }
                          className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors resize-none"
                          rows={3}
                        />
                      ) : (
                        <input
                          type="text"
                          value={tempContent[key] || ""}
                          onChange={(e) =>
                            setTempContent({
                              ...tempContent,
                              [key]: e.target.value,
                            })
                          }
                          className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Section Preview */}
              {editingSection !== section.id && (
                <div className="p-6 border-t border-zinc-800 bg-zinc-900/30">
                  <div className="space-y-3">
                    {Object.entries(section.content).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-xs text-zinc-500 uppercase mb-1">
                          {key}
                        </p>
                        <p className="text-zinc-300">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info Panel */}
        <div className="mt-12 bg-blue-900/20 border-2 border-blue-800/50 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0">
              <Settings size={24} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-2">
                Как использовать CMS?
              </h3>
              <ul className="space-y-2 text-zinc-300 text-sm">
                <li>
                  • <strong>Перетаскивание:</strong> Зажмите секцию за иконку и
                  перетащите вверх/вниз для изменения порядка
                </li>
                <li>
                  • <strong>Видимость:</strong> Нажмите "Видима/Скрыта" чтобы
                  показать или скрыть секцию на сайте
                </li>
                <li>
                  • <strong>Редактирование:</strong> Нажмите на иконку
                  карандаша, измените контент и сохраните
                </li>
                <li>
                  • <strong>Удаление:</strong> Нажмите на корзину для удаления
                  секции (необратимо!)
                </li>
                <li>
                  • <strong>Добавление:</strong> Создайте новую секцию кнопкой
                  "Добавить новую секцию"
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
