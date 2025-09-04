import mysql from "mysql2/promise";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse JSON body

    const { name, email, mobile, checkin, checkout, adults, children } = body;

    // Validate required fields
    if (!name || !email || !mobile || !checkin || !checkout) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // DB connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    // Insert query
    const [result] = await connection.execute(
      `INSERT INTO bookings (name, email, mobile, checkin, checkout, adults, children)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, email, mobile, checkin, checkout, adults || 0, children || 0]
    );

    await connection.end();

    // ✅ Success response
    return new Response(
      JSON.stringify({ success: true, insertedId: result.insertId }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
