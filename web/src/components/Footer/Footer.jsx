import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 pt-16 pb-8 border-t border-zinc-900">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[#FFD700] rounded flex items-center justify-center text-black font-black text-xl">
              NK
            </div>
            <div className="font-bold text-xl">ИВСЦ</div>
          </div>
          <p className="text-zinc-500 text-sm max-w-sm mb-6">
            Консультационно-Сертификационный Центр. Профессиональные услуги в
            области сертификации и лицензирования.
          </p>
          <div className="flex gap-4">
            <a
              href="tel:88000000000"
              className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-all"
            >
              <Phone size={18} />
            </a>
            <a
              href="mailto:info@certification.ru"
              className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-all"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-[#FFD700]">Услуги</h4>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Сертификация ТР ТС
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Декларирование
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Сертификация ИСО
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Свидетельства СГР
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-[#FFD700]">Контакты</h4>
          <div className="space-y-4 text-sm text-zinc-500">
            <p className="flex items-start gap-2">
              <MapPin size={16} className="text-[#FFD700] shrink-0" /> г.
              Москва, ул. хххххххх, д. ХХ
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-[#FFD700] shrink-0" /> 8 (800)
              000-00-00
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-[#FFD700] shrink-0" />{" "}
              info@certification.ru
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pt-8 border-t border-zinc-900 text-center text-xs text-zinc-600">
        &copy; {new Date().getFullYear()} ИВСЦ. Все права защищены.
      </div>
    </footer>
  );
}
