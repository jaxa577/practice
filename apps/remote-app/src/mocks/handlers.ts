import { http, HttpResponse } from "msw";

export const handlers = [
  // Перехватываем запрос к нашему фейковому API логистики
  http.get("https://api.jony-logistics.com/v1/track/:id", ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      location: "Tashkent Distribution Center",
      status: "In Transit",
      eta: "2026-03-15",
      updatedAt: new Date().toISOString(),
    });
  }),
];
