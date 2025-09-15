// src/app/api/contact/route.js
export async function OPTIONS() {
  // Let browser preflight succeed (same-origin with your Next app)
  return new Response(null, { status: 204 });
}

export async function POST(req) {
  try {
    const payload = await req.json();

    // Server-to-server call to your PHP API (no browser CORS involved)
    const res = await fetch(process.env.CONTACT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // IMPORTANT: Do not send an Origin header; Node fetch doesn’t by default.
      body: JSON.stringify(payload),
    });

    const text = await res.text(); // pass through whatever PHP returns
    // Assume PHP returns JSON
    return new Response(text, {
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
