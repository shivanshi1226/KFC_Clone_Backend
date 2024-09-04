const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModal = mongoose.model("user", userSchema);
module.exports = userModal;
