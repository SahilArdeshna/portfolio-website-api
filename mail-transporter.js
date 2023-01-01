const nodemailer = require("nodemailer");
require("dotenv").config();

const mailTranporter = async (name, sender, message) => {
  try {
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      secure: true,
    });

    const mailData = {
      from: sender,
      to: process.env.EMAIL_PERSONAL,
      subject: `Message From ${name}`,
      text: message,
      html: `<div>${message}</div>`,
    };

    await transporter.sendMail(mailData);
    return "Message sent successfully!";
  } catch (err) {
    return err;
  }
};

module.exports = { mailTranporter };
