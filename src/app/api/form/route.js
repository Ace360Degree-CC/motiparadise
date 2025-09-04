// app/api/bookings/route.js (Next.js App Router)
export async function POST(req) {
  try {
    const body = await req.json();

    // Forward request to your PHP API
    const res = await fetch("https://motiparadise.fabthefamily.com/api/form.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.ok ? 200 : 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}
