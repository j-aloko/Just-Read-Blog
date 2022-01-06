const mongoose = require("mongoose");

const reply4Schema = new mongoose.Schema(
  {
    reply3Id: { type: String, default: "" },
    userId: { type: String, default: "" },
    text: { type: String, default: "" },
    reply5: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply4", reply4Schema);
