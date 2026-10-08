type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  website?: unknown;
  "cf-turnstile-response"?: unknown;
};

type WorkerEnv = Env & {
  TURNSTILE_SECRET?: string;
  TURNSTILE_HOSTNAMES?: string;
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

async function verifyTurnstile(request: Request, token: string, env: WorkerEnv): Promise<boolean> {
  const hostnames = new Set(
    (env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean),
  );

  if (!env.TURNSTILE_SECRET || !token || token.length > 2048 || hostnames.size === 0) {
    return false;
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET,
        response: token,
        remoteip: request.headers.get("CF-Connecting-IP") ?? "",
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) return false;

    const result = (await response.json()) as {
      success?: boolean;
      action?: string;
      hostname?: string;
    };

    return (
      result.success === true &&
      result.action === "contact" &&
      hostnames.has((result.hostname ?? "").toLowerCase())
    );
  } catch {
    return false;
  }
}

export default {
  async fetch(request, env: WorkerEnv): Promise<Response> {
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

    const turnstileToken = clean(payload["cf-turnstile-response"], 2048);
    if (!(await verifyTurnstile(request, turnstileToken, env))) {
      return json({ error: "Please complete the security verification." }, 403);
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
} satisfies ExportedHandler<WorkerEnv>;
