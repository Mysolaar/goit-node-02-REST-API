const { User } = require("../../models/user");

const { createError, sendMail } = require("../../helpers");

const dotenv = require("dotenv");
dotenv.config();

const { BASE_URL, PORT } = process.env;

const baseURL = PORT === "" ? BASE_URL : BASE_URL + ":" + PORT;

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user.email) {
    throw createError(400, "missing required field email");
  }
  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "confirm registration",
    html: `<a target="_blank" href="${baseURL}/api/users/verify/${user.verificationToken}">Press to confirm email</a>`,
  };
  await sendMail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerify;
