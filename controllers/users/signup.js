const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const { createError, sendMail } = require("../../helpers");
const { nanoid } = require("nanoid");
const dotenv = require("dotenv");
dotenv.config();
const { BASE_URL, PORT } = process.env;

const baseURL = PORT === "" ? BASE_URL : BASE_URL + ":" + PORT;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "confirm registration",
    html: `<a target="_blank" href="${baseURL}/api/users/verify/${verificationToken}">Press to confirm email</a>`,
  };
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
  await sendMail(mail);
};

module.exports = signup;
