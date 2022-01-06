const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    photo: { type: String, default: "" },
    username: { type: String, required: true },
    comments: { type: Array, default: [] },
    categories: { type: Array, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
