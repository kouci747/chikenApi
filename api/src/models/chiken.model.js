const mongoose = require("mongoose");

const chikenSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 2,
    maxLength: 50,
  },
  birthdate: {
    type: Date,
  },
  weight: {
    type: Number,
    required: true,
  },
  steps: {
    type: Number,
    default: 0,
  },
  isRunning: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Chiken", chikenSchema);
