const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const { SMTP_USER, SMTP_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: "outlook",
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

const sendMail = async (data) => {
  const mail = { ...data, from: SMTP_USER };
  await transporter.sendMail(mail);
  return true;
};

module.exports = sendMail;
