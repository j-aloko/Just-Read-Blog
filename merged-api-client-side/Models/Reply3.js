const mongoose = require("mongoose");

const reply3Schema = new mongoose.Schema(
  {
    reply2Id: { type: String, default: "" },
    userId: { type: String, default: "" },
    text: { type: String, default: "" },
    reply4: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply3", reply3Schema);
