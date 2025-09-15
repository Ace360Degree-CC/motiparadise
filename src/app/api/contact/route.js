// src/app/api/contact/route.js
export async function OPTIONS() {
  // Let browser preflight to YOUR Next API succeed (same-origin)
  return new Response(null, { status: 204 });
}

export async function POST(req) {
  try {
    const payload = await req.json();

    const res = await fetch(process.env.CONTACT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json, text/plain, */*",
        Referer: "https://moti.samvriddhi.com/",
        "Accept-Language": "en-US,en;q=0.9",
      },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
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
