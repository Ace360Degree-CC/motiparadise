import mysql from "mysql2/promise";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, mobile, checkin, checkout, adults, children, rooms } = body;

    // 1. Save to DB
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    await connection.execute(
      `INSERT INTO bookings (name, email, mobile, checkin, checkout, adults, children, rooms)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, mobile, checkin, checkout, adults, children, rooms]
    );

    // 2. Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // set true if using port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 3. Send Email with try/catch
    try {
      await transporter.sendMail({
        from: `"Moti Paradise" <${process.env.SMTP_USER}>`,
        to: "customercare@a360pl.com",
        subject: `New Booking from ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          Mobile: ${mobile}
          Check-in: ${checkin}
          Checkout: ${checkout}
          Adults: ${adults}
          Children: ${children}
          Rooms: ${rooms}
        `,
      });
      console.log("✅ Email sent successfully");
    } catch (err) {
      console.error("❌ Email sending error:", err);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Booking error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
