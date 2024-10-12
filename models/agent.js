const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const agentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  agencyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10}$/,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  licenseDocument: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
    instagram: { type: String, default: "" },
});

agentSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("agent", agentSchema);
