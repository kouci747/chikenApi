const mongoose = require("mongoose");

const CoopSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minLength: 2,
      maxLength: 50,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Coop", CoopSchema);
