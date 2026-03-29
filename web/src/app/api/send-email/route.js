import { sendEmail } from "@/app/api/utils/send-email";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, type = "consultation" } = body;

    if (!name || !phone) {
      return Response.json(
        { error: "Имя и телефон обязательны" },
        { status: 400 }
      );
    }

    const formType =
      type === "consultation" ? "Консультация" : "Обратная связь";
    const dateTime = new Date().toLocaleString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #000; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #fff; padding: 30px; border: 1px solid #e0e0e0; }
            .field { margin-bottom: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #FFD700; }
            .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; }
            .value { font-size: 16px; color: #000; margin-top: 5px; }
            .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">🔔 Новая заявка с сайта ИВСЦ</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Тип заявки</div>
                <div class="value">${formType}</div>
              </div>
              <div class="field">
                <div class="label">Имя клиента</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Телефон</div>
                <div class="value"><a href="tel:${phone}" style="color: #FFD700; text-decoration: none;">${phone}</a></div>
              </div>
              <div class="field">
                <div class="label">Дата и время</div>
                <div class="value">${dateTime}</div>
              </div>
            </div>
            <div class="footer">
              <p>Это автоматическое уведомление с сайта ИВСЦ</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text version
    const textContent = `
Новая заявка с сайта ИВСЦ

Тип заявки: ${formType}
Имя: ${name}
Телефон: ${phone}
Дата: ${dateTime}

---
Это автоматическое уведомление с сайта ИВСЦ
    `;

    // Send email using Resend
    try {
      await sendEmail({
        to: "vitaliksep@yandex.ru",
        from: "onboarding@resend.dev", // После настройки домена можно изменить на noreply@ваш-домен.ru
        subject: `🔔 Новая заявка: ${formType} от ${name}`,
        html: htmlContent,
        text: textContent,
      });

      console.log("Email sent successfully to vitaliksep@yandex.ru");

      return Response.json({
        success: true,
        message: "Заявка успешно отправлена",
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);

      // Если email не отправлен, но данные собраны - вернем успех с предупреждением
      return Response.json({
        success: true,
        message: "Заявка принята",
        warning: "Возможны задержки с доставкой уведомления",
      });
    }
  } catch (error) {
    console.error("Error processing form:", error);
    return Response.json(
      { error: "Ошибка при обработке заявки" },
      { status: 500 }
    );
  }
}