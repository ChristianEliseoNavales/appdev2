const nodemailer = require("nodemailer");
const pug = require("pug");
const path = require("path");

const sendEmail = async (bookDetails) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = pug.renderFile(
      path.join(__dirname, "../views/bookCreated.pug"),
      bookDetails
    );

    const mailOptions = {
      from: `"Book API" <${process.env.SMTP_USER}>`,
      to: process.env.DEFAULT_EMAIL,
      subject: "New Book Added",
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully!");
  } catch (err) {
    console.error("❌ Failed to send email:", err);
  }
};

module.exports = sendEmail;
