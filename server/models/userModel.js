const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      //default: "Khanh",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //default: "khanh141@gmail.com",
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      //default: "1234567",
    },
    role: {
      type: String,
      required: true,
      //default: "admin",
    },
    sdt: {
      type: String,
      required: true,
      //default: "+84",
    },
    address: {
      type: String,
      required: true,
      // default: "Ha Noi",
    },
    idPage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
