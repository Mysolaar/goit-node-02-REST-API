const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/users");
const { validation, authenticate } = require("../../middlewares");
const { upload } = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();

// register
router.post(
  "/signup",
  validation(schemas.regAndLogSchema),
  ctrlWrapper(ctrl.signup)
);

// signin
router.post(
  "/login",
  validation(schemas.regAndLogSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validation(schemas.email),
  ctrlWrapper(ctrl.resendVerify)
);

module.exports = router;
