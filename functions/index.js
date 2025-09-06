const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure mail transporter (cPanel SMTP)
const transporter = nodemailer.createTransport({
  host: "mail.fabthefamily.com", // check cPanel > Connect Devices to confirm
  port: 465,                     // use 465 with secure: true if SSL is required
  secure: false,                  // true for 465 (SSL), false for 587 (TLS)
  auth: {
    user: "bookings@motiparadise.fabthefamily.com",
    pass: "Fab@123#@!", // replace with your cPanel email password
  },
});

// Trigger when a new booking is added in Firestore
exports.sendBookingEmail = functions.firestore
  .document("bookings/{bookingId}")
  .onCreate(async (snap, context) => {
    const booking = snap.data();

    // Email to admin
    const adminMail = {
      from: '"Moti Paradise" <bookings@motiparadise.fabthefamily.com>',
      to: "bookings@motiparadise.fabthefamily.com",
      subject: `📩 New Booking from ${booking.name}`,
      html: `
        <h2>New Booking Details</h2>
        <p><b>Name:</b> ${booking.name}</p>
        <p><b>Email:</b> ${booking.email}</p>
        <p><b>Mobile:</b> ${booking.mobile}</p>
        <p><b>Check-in:</b> ${booking.checkin}</p>
        <p><b>Check-out:</b> ${booking.checkout}</p>
        <p><b>Adults:</b> ${booking.adults}</p>
        <p><b>Children:</b> ${booking.children}</p>
      `,
    };

    // Confirmation email to customer
    const customerMail = {
      from: '"Moti Paradise" <bookings@motiparadise.fabthefamily.com>',
      to: booking.email,
      subject: "✅ Booking Confirmation - Moti Paradise",
      html: `
        <h2>Thank you for your booking, ${booking.name}!</h2>
        <p>We have received your request and will contact you shortly.</p>
        <p><b>Check-in:</b> ${booking.checkin}</p>
        <p><b>Check-out:</b> ${booking.checkout}</p>
        <p><b>Guests:</b> ${booking.adults} Adults, ${booking.children} Children</p>
        <br>
        <p>Best regards,</p>
        <p><b>Moti Paradise Team</b></p>
      `,
    };

    try {
      await transporter.sendMail(adminMail);
      await transporter.sendMail(customerMail);
      console.log("✅ Emails sent to admin and customer");
    } catch (error) {
      console.error("❌ Email sending error:", error.message, error);
    }
  });
