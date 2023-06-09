const { Schema, model } = require("mongoose");
const Joi = require("joi").extend(require("joi-phone-number"));

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const addSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().phoneNumber().required(),
  favorite: Joi.bool(),
});

const schemaUpdate = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phone: Joi.string().phoneNumber(),
  favorite: Joi.bool(),
}).min(1);

const schemaUpdateFavorite = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  addSchema,
  schemaUpdate,
  schemaUpdateFavorite,
};