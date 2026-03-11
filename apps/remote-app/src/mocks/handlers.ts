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

  http.post("https://api.loadboard.asia/api/v1/login", async ({ request }) => {
    const { username } = (await request.json()) as any;

    return HttpResponse.json({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6IkpvbnkiLCJyb2xlcyI6WyJBZG1pbiIsICJEaXNwYXRjaGVyIl19.signature",
      user: {
        id: "1",
        username: username || "Jony",
        roles: ["Admin", "Dispatcher"],
      },
    });
  }),
];
