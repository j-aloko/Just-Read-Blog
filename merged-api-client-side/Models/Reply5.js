const mongoose = require("mongoose");

const reply5Schema = new mongoose.Schema(
  {
    reply4Id: { type: String, default: "" },
    userId: { type: String, default: "" },
    text: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply5", reply5Schema);
