const mongoose = require("mongoose");

const reply2Schema = new mongoose.Schema(
  {
    reply1Id: { type: String, default: "" },
    userId: { type: String, default: "" },
    text: { type: String, default: "" },
    reply3: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply2", reply2Schema);
