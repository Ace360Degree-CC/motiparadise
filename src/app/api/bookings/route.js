import mysql from "mysql2/promise";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, mobile, checkin, checkout, adults, children } = body;

    // Validate required fields
    if (!name || !email || !mobile || !checkin || !checkout) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    // Insert booking
    const [result] = await connection.execute(
      `INSERT INTO bookings (name, email, mobile, checkin, checkout, adults, children)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, email, mobile, checkin, checkout, adults || 0, children || 0]
    );

    await connection.end();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Moti Paradise" <${process.env.SMTP_USER}>`,
      to: email, // send to customer
      bcc: "bookings@motiparadise.fabthefamily.com", // keep a copy
      subject: "Booking Confirmation - Moti Paradise",
      text: `Hello ${name},\n\nYour booking has been received:\nCheck-in: ${checkin}\nCheck-out: ${checkout}\nGuests: ${adults} Adults, ${children} Children\n\nThank you!`,
    });

    return new Response(
      JSON.stringify({ success: true, id: result.insertId }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("❌ API Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
