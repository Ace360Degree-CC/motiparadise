"use client";
import { useState } from "react";

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    checkin: "",
    checkout: "",
    adults: "",
    children: "",
    rooms: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Sending...");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Booking submitted successfully!");
        setForm({
          name: "",
          email: "",
          mobile: "",
          checkin: "",
          checkout: "",
          adults: "",
          children: "",
          rooms: "",
        });
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
      <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="w-full border p-2" />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full border p-2" />
      <input type="tel" name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required className="w-full border p-2" />

      <div className="flex gap-2">
        <input type="date" name="checkin" value={form.checkin} onChange={handleChange} required className="w-1/2 border p-2" />
        <input type="date" name="checkout" value={form.checkout} onChange={handleChange} required className="w-1/2 border p-2" />
      </div>

      <input type="number" name="adults" placeholder="Adults" value={form.adults} onChange={handleChange} required className="w-full border p-2" />
      <input type="number" name="children" placeholder="Children" value={form.children} onChange={handleChange} className="w-full border p-2" />
      <input type="number" name="rooms" placeholder="Rooms" value={form.rooms} onChange={handleChange} required className="w-full border p-2" />

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        Book Now
      </button>

      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  );
}
