import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const metadata = {
  title:
    "Сертификация продукции и услуг в день обращения | ИВСЦ - Аккредитованный орган",
  description:
    "⚡ Срочная сертификация продукции, услуг и производств от 1 дня. Обязательная и добровольная сертификация ЕАЭС и ГОСТ Р. Аккредитованный орган, собственная лаборатория, работа без посредников. Более 30 000 выданных сертификатов.",
  keywords:
    "сертификация продукции, сертификация услуг, сертификат соответствия, декларация соответствия, сертификация ЕАЭС, ГОСТ Р, обязательная сертификация, добровольная сертификация, аккредитованный орган, срочная сертификация",
  openGraph: {
    title: "Сертификация продукции и услуг в день обращения | ИВСЦ",
    description:
      "Срочная сертификация от 1 дня. Обязательная и добровольная сертификация ЕАЭС и ГОСТ Р. Аккредитованный орган.",
    type: "website",
    locale: "ru_RU",
  },
  icons: {
    icon: "https://ucarecdn.com/7fcda044-9657-4103-ac9b-638cb4d4fa0b/",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        {/* Yandex.Metrika counter */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');
              ym(108213092, 'init', {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/108213092"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}