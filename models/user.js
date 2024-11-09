const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const User = model("user", userSchema);

module.exports = {
  userModel: User,
};

