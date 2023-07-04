const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const { SMTP_USER, SMTP_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

const sendMail = async (data) => {
  const mailOptions = {
    from: SMTP_USER,
    ...data,
  };

  await transporter.sendMail(mailOptions);
  return true;
};

module.exports = sendMail;
