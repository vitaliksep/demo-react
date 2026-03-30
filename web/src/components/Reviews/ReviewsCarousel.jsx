import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Дмитрий Соколов",
    rating: 5,
    date: "2 недели назад",
    text: "Оформили сертификат ТР ТС буквально за 3 дня! Все документы подготовили сами, нам только нужно было предоставить минимальный пакет. Менеджер Анна всё время на связи, отвечала на вопросы даже вечером. Цена адекватная, без скрытых платежей. Рекомендую!",
    avatar: "ДС",
  },
  {
    id: 2,
    name: "Екатерина Волкова",
    rating: 5,
    date: "1 месяц назад",
    text: "Работали с ИВСЦ по сертификации косметической продукции для маркетплейсов. Получили все необходимые документы для Wildberries и Ozon за неделю. Отдельное спасибо за консультацию по выбору типа сертификации - сэкономили почти 40% от первоначальной сметы. Профессионалы своего дела!",
    avatar: "ЕВ",
  },
  {
    id: 3,
    name: "Алексей Морозов",
    rating: 4,
    date: "3 недели назад",
    text: "Хороший центр, оформляли декларацию соответствия. Единственный минус - немного задержали доставку оригинала документа курьером (обещали 2 дня, привезли через 4). Но в целом всё прошло гладко, цена приемлемая, в реестре ФСА всё нашлось.",
    avatar: "АМ",
  },
  {
    id: 4,
    name: "Ольга Петрова",
    rating: 5,
    date: "2 месяца назад",
    text: "Спасибо огромное за помощь с сертификацией ISO 9001! Думали, что это очень сложно и долго, но специалисты ИВСЦ провели нас за руку через весь процесс. Провели предварительный аудит, помогли устранить все несоответствия, организовали сертификационный аудит. Получили сертификат с первого раза!",
    avatar: "ОП",
  },
  {
    id: 5,
    name: "Сергей Иванов",
    rating: 5,
    date: "1 неделю назад",
    text: "Обращался за срочной сертификацией партии электроники из Китая. Груз уже был в России, времени было мало. Ребята сделали всё за 1 день! Да, доплатили за срочность, но это того стоило. Товар не простаивал на складе. Буду обращаться ещё.",
    avatar: "СИ",
  },
  {
    id: 6,
    name: "Марина Кузнецова",
    rating: 5,
    date: "3 недели назад",
    text: "Сертифицировали детские товары для нашего интернет-магазина. Очень понравилось, что есть своя лаборатория - не пришлось искать где делать испытания отдельно. Всё под ключ, быстро и качественно. Цены ниже, чем у конкурентов на 20-25%. Однозначно рекомендую!",
    avatar: "МК",
  },
];

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(reviews[(currentIndex + i) % reviews.length]);
    }
    return visible;
  };

  return (
    <section className="py-24 bg-zinc-950 border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="text-[#FFD700] fill-[#FFD700]"
                />
              ))}
            </div>
            <span className="text-zinc-400">4.9 на Яндекс Картах</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Отзывы наших клиентов
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Более 500 компаний доверили нам оформление разрешительной
            документации
          </p>
        </div>

        <div className="relative">
          {/* Desktop: 3 cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {getVisibleReviews().map((review) => (
              <div
                key={review.id}
                className="bg-white text-black rounded-2xl p-6 border border-zinc-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFD700] flex items-center justify-center text-black font-bold flex-shrink-0">
                    {review.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold truncate">{review.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < review.rating
                                ? "text-[#FFD700] fill-[#FFD700]"
                                : "text-zinc-300"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs text-zinc-500">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {review.text}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile: 1 card */}
          <div className="md:hidden">
            <div className="bg-white text-black rounded-2xl p-6 border border-zinc-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FFD700] flex items-center justify-center text-black font-bold flex-shrink-0">
                  {reviews[currentIndex].avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold truncate">
                    {reviews[currentIndex].name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < reviews[currentIndex].rating
                              ? "text-[#FFD700] fill-[#FFD700]"
                              : "text-zinc-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs text-zinc-500">
                      {reviews[currentIndex].date}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {reviews[currentIndex].text}
              </p>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-zinc-900 hover:bg-[#FFD700] hover:text-black transition-all flex items-center justify-center"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-zinc-900 hover:bg-[#FFD700] hover:text-black transition-all flex items-center justify-center"
              aria-label="Следующий отзыв"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-[#FFD700] w-8" : "bg-zinc-700"
                }`}
                aria-label={`Перейти к отзыву ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Yandex Maps logo */}
        <div className="mt-12 text-center">
          <p className="text-zinc-500 text-sm flex items-center justify-center gap-2">
            Отзывы с<span className="font-bold text-white">Яндекс Карт</span>
          </p>
        </div>
      </div>
    </section>
  );
}