type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  website?: unknown;
};

const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/health" && request.method === "GET") {
      return json({ ok: true, service: "ecloria-web" });
    }

    if (url.pathname !== "/api/contact" || request.method !== "POST") {
      return json({ error: "Not found" }, 404);
    }

    let payload: ContactPayload;
    try {
      payload = (await request.json()) as ContactPayload;
    } catch {
      return json({ error: "Invalid request body." }, 400);
    }

    if (clean(payload.website, 200)) {
      return json({ ok: true });
    }

    const name = clean(payload.name, 100);
    const email = clean(payload.email, 200).toLowerCase();
    const company = clean(payload.company, 120);
    const message = clean(payload.message, 2000);

    if (name.length < 2 || message.length < 10 || !/^\S+@\S+\.\S+$/.test(email)) {
      return json({ error: "Please complete all required fields." }, 422);
    }

    try {
      await env.DB.prepare(
        "INSERT INTO leads (id, name, email, company, message) VALUES (?1, ?2, ?3, ?4, ?5)",
      )
        .bind(crypto.randomUUID(), name, email, company || null, message)
        .run();

      console.log(JSON.stringify({ event: "contact_created", domain: email.split("@")[1] }));
      return json({ ok: true });
    } catch (error) {
      console.error(
        JSON.stringify({
          event: "contact_failed",
          reason: error instanceof Error ? error.message : "unknown",
        }),
      );
      return json({ error: "Something went wrong. Please try again." }, 500);
    }
  },
} satisfies ExportedHandler<Env>;
