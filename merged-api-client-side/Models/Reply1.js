const mongoose = require("mongoose");

const reply1Schema = new mongoose.Schema(
  {
    commentId: { type: String, default: "" },
    userId: { type: String, default: "" },
    text: { type: String, default: "" },
    reply2: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply1", reply1Schema);
