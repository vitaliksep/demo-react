"use client";

import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  Calendar,
  MapPin,
  MessageCircle,
  Search,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [error, setError] = useState(null);

  const fetchLeads = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/leads/list");
      if (!response.ok) {
        throw new Error("Ошибка при загрузке заявок");
      }
      const data = await response.json();
      setLeads(data.leads);
      setFilteredLeads(data.leads);
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    let filtered = leads;

    // Фильтр по типу
    if (filterType !== "all") {
      filtered = filtered.filter((lead) => lead.type === filterType);
    }

    // Поиск
    if (searchQuery) {
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.phone.includes(searchQuery) ||
          (lead.question &&
            lead.question.toLowerCase().includes(searchQuery.toLowerCase())),
      );
    }

    setFilteredLeads(filtered);
  }, [searchQuery, filterType, leads]);

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Дата",
      "Имя",
      "Телефон",
      "Мессенджер",
      "Вопрос",
      "Тип",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
      "UTM Content",
      "UTM Term",
      "IP",
    ];

    const csvContent = [
      headers.join(","),
      ...filteredLeads.map((lead) =>
        [
          lead.id,
          new Date(lead.created_at).toLocaleString("ru-RU"),
          `"${lead.name}"`,
          lead.phone,
          lead.messenger || "",
          `"${(lead.question || "").replace(/"/g, '""')}"`,
          lead.type,
          lead.utm_source || "",
          lead.utm_medium || "",
          lead.utm_campaign || "",
          lead.utm_content || "",
          lead.utm_term || "",
          lead.ip_address || "",
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob(["\ufeff" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `leads_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const getTypeLabel = (type) => {
    return type === "consultation" ? "Консультация" : "Обратная связь";
  };

  const getTypeColor = (type) => {
    return type === "consultation"
      ? "bg-blue-100 text-blue-800 border-blue-200"
      : "bg-green-100 text-green-800 border-green-200";
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md">
          <h2 className="text-xl font-bold text-red-800 mb-2">
            Ошибка загрузки
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchLeads}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
                Админ-панель: Заявки
              </h1>
              <p className="text-zinc-400 mt-1">
                Всего заявок: {filteredLeads.length} из {leads.length}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={fetchLeads}
                disabled={isLoading}
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  size={18}
                  className={isLoading ? "animate-spin" : ""}
                />
                Обновить
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-[#FFD700] hover:bg-[#e6c200] text-black px-4 py-2 rounded-lg transition-colors font-semibold"
              >
                <Download size={18} />
                Экспорт CSV
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Поиск по имени, телефону или вопросу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-[#FFD700] transition-colors text-white placeholder:text-zinc-500"
              />
            </div>

            <div className="flex gap-2">
              {[
                { value: "all", label: "Все" },
                { value: "consultation", label: "Консультации" },
                { value: "contact", label: "Обратная связь" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setFilterType(filter.value)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                    filterType === filter.value
                      ? "bg-[#FFD700] text-black"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Leads Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FFD700] border-t-transparent"></div>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-zinc-400 mb-2">
              Заявок не найдено
            </h3>
            <p className="text-zinc-500">
              {searchQuery || filterType !== "all"
                ? "Попробуйте изменить фильтры"
                : "Пока нет ни одной заявки"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-6 hover:border-[#FFD700] transition-all duration-300 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center text-black font-bold text-lg">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">
                        {lead.name}
                      </h3>
                      <p className="text-sm text-zinc-500">ID: #{lead.id}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getTypeColor(lead.type)}`}
                  >
                    {getTypeLabel(lead.type)}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Phone size={16} className="text-[#FFD700]" />
                    <a
                      href={`tel:${lead.phone}`}
                      className="hover:text-[#FFD700] transition-colors"
                    >
                      {lead.phone}
                    </a>
                  </div>

                  {lead.messenger && (
                    <div className="flex items-center gap-2 text-zinc-300">
                      <MessageCircle size={16} className="text-[#FFD700]" />
                      <span>{lead.messenger}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <Calendar size={16} />
                    <span>
                      {new Date(lead.created_at).toLocaleString("ru-RU", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                {/* Question */}
                {lead.question && (
                  <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 mb-4">
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {lead.question}
                    </p>
                  </div>
                )}

                {/* UTM Tags */}
                {(lead.utm_source ||
                  lead.utm_medium ||
                  lead.utm_campaign ||
                  lead.utm_content ||
                  lead.utm_term) && (
                  <div className="bg-zinc-800/30 border border-zinc-700 rounded-lg p-3 mb-4">
                    <p className="text-xs font-semibold text-zinc-500 uppercase mb-2">
                      UTM метки
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {lead.utm_source && (
                        <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded border border-blue-800">
                          Source: {lead.utm_source}
                        </span>
                      )}
                      {lead.utm_medium && (
                        <span className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded border border-purple-800">
                          Medium: {lead.utm_medium}
                        </span>
                      )}
                      {lead.utm_campaign && (
                        <span className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded border border-green-800">
                          Campaign: {lead.utm_campaign}
                        </span>
                      )}
                      {lead.utm_content && (
                        <span className="text-xs bg-orange-900/30 text-orange-300 px-2 py-1 rounded border border-orange-800">
                          Content: {lead.utm_content}
                        </span>
                      )}
                      {lead.utm_term && (
                        <span className="text-xs bg-pink-900/30 text-pink-300 px-2 py-1 rounded border border-pink-800">
                          Term: {lead.utm_term}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* IP Address */}
                {lead.ip_address && lead.ip_address !== "unknown" && (
                  <div className="flex items-center gap-2 text-zinc-500 text-xs">
                    <MapPin size={14} />
                    <span>IP: {lead.ip_address}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
