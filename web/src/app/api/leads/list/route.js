import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    // Получаем все заявки, отсортированные по дате создания (новые первые)
    const leads = await sql`
      SELECT 
        id,
        name,
        phone,
        messenger,
        question,
        type,
        created_at,
        ip_address,
        user_agent,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term
      FROM leads
      ORDER BY created_at DESC
    `;

    return Response.json({
      success: true,
      leads: leads,
      total: leads.length,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return Response.json(
      { error: "Ошибка при получении заявок" },
      { status: 500 },
    );
  }
}
