const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema ({
  username: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  email: {type: [String], required: true},
  phone: {type: [Number], required: true},
  address: {type: [String] }
});

module.exports = mongoose.model("User", userSchema);