export async function POST(req) {
  try {
    const payload = await req.json();

    const res = await fetch(process.env.CONTACT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const contentType = res.headers.get("content-type") || "";
    const raw = await res.text();

    // If backend didn't return JSON, wrap it safely
    if (!contentType.includes("application/json")) {
      console.error("Unexpected backend response:", raw);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid backend response",
          raw,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(raw, {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Proxy /api/contact error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Proxy error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
