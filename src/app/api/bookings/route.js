import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, mobile, checkin, checkout, adults, children } = body;

    if (!name || !email || !mobile || !checkin || !checkout) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await addDoc(collection(db, "bookings"), {
      name,
      email,
      mobile,
      checkin,
      checkout,
      adults: adults || 0,
      children: children || 0,
      createdAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ success: true, message: "Booking saved successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("❌ Firestore Error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
