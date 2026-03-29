import sql from "@/app/api/utils/sql";
import { sendEmail } from "@/app/api/utils/send-email";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      messenger,
      question,
      type = "consultation",
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
    } = body;

    if (!name || !phone) {
      return Response.json(
        { error: "Имя и телефон обязательны" },
        { status: 400 },
      );
    }

    // Получаем IP и User Agent для аналитики
    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Сохраняем заявку в базу данных с utm-метками
    const result = await sql`
      INSERT INTO leads (
        name, 
        phone, 
        messenger, 
        question, 
        type, 
        ip_address, 
        user_agent,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term
      )
      VALUES (
        ${name}, 
        ${phone}, 
        ${messenger || null}, 
        ${question || null}, 
        ${type}, 
        ${ipAddress}, 
        ${userAgent},
        ${utm_source || null},
        ${utm_medium || null},
        ${utm_campaign || null},
        ${utm_content || null},
        ${utm_term || null}
      )
      RETURNING id, created_at
    `;

    const leadId = result[0].id;
    const createdAt = new Date(result[0].created_at);

    console.log(`✅ Lead #${leadId} saved to database`);

    // Формируем данные для email
    const formType =
      type === "consultation" ? "Консультация" : "Обратная связь";
    const dateTime = createdAt.toLocaleString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Определяем иконку мессенджера для email
    const messengerIcons = {
      WhatsApp: "💬",
      Telegram: "✈️",
      MAX: "💬",
    };
    const messengerIcon = messenger ? messengerIcons[messenger] || "💬" : "";

    // Добавляем UTM метки в email если есть
    const utmInfo = [
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
    ].some((x) => x)
      ? `
              <div class="field">
                <div class="label">UTM метки</div>
                <div class="value" style="font-size: 13px;">
                  ${utm_source ? `Source: <strong>${utm_source}</strong><br>` : ""}
                  ${utm_medium ? `Medium: <strong>${utm_medium}</strong><br>` : ""}
                  ${utm_campaign ? `Campaign: <strong>${utm_campaign}</strong><br>` : ""}
                  ${utm_content ? `Content: <strong>${utm_content}</strong><br>` : ""}
                  ${utm_term ? `Term: <strong>${utm_term}</strong>` : ""}
                </div>
              </div>
              `
      : "";

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
            .lead-id { background: #FFD700; color: #000; padding: 5px 10px; border-radius: 5px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">🔔 Новая заявка с сайта ИВСЦ</h1>
              <p style="margin: 10px 0 0 0;">Заявка <span class="lead-id">#${leadId}</span></p>
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
              ${
                messenger
                  ? `
              <div class="field">
                <div class="label">Предпочитаемый мессенджер</div>
                <div class="value">${messengerIcon} ${messenger}</div>
              </div>
              `
                  : ""
              }
              ${
                question
                  ? `
              <div class="field">
                <div class="label">Вопрос / Описание задачи</div>
                <div class="value">${question.replace(/\n/g, "<br>")}</div>
              </div>
              `
                  : ""
              }
              ${utmInfo}
              <div class="field">
                <div class="label">Дата и время</div>
                <div class="value">${dateTime}</div>
              </div>
            </div>
            <div class="footer">
              <p>Это автоматическое уведомление с сайта ИВСЦ</p>
              <p style="color: #ccc; font-size: 10px;">Lead ID: ${leadId} | IP: ${ipAddress}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text version
    const textContent = `
Новая заявка с сайта ИВСЦ #${leadId}

Тип заявки: ${formType}
Имя: ${name}
Телефон: ${phone}
${messenger ? `Мессенджер: ${messenger}` : ""}
${question ? `Вопрос: ${question}` : ""}
Дата: ${dateTime}

---
Lead ID: ${leadId}
IP: ${ipAddress}
    `;

    // Отправляем email
    try {
      await sendEmail({
        to: "vitaliksep@yandex.ru",
        from: "onboarding@resend.dev",
        subject: `🔔 Новая заявка #${leadId}: ${formType} от ${name}`,
        html: htmlContent,
        text: textContent,
      });

      console.log(`📧 Email sent successfully for lead #${leadId}`);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Продолжаем даже если email не отправился - главное заявка в БД
    }

    return Response.json({
      success: true,
      message: "Заявка успешно отправлена",
      leadId: leadId,
    });
  } catch (error) {
    console.error("Error processing lead:", error);
    return Response.json(
      { error: "Ошибка при обработке заявки" },
      { status: 500 },
    );
  }
}
