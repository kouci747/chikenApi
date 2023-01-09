const mongoose = require("mongoose");
/**
 * crée un Schema de base de donnée + un lien entre le document Chiken et le document Coop
 */

const chikenSchema = mongoose.Schema(
  {
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
    favoriteFood: {
      type: [String],
    },

    coop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coop", //crée un lien de Chiken vers Coop
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chiken", chikenSchema);
