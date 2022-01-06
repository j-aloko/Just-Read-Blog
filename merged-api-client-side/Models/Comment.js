const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: { type: String, default: "" },
    userId: { type: String, default: "" },
    text: { type: String, default: "" },
    reply1: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
