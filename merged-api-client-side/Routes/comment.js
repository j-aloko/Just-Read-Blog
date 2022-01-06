const router = require("express").Router();
const Comment = require("../Models/Comment");
const Post = require("../Models/Post");

//Write a comment
router.post("/", async (req, res) => {
  const comment = new Comment(req.body);
  try {
    const saveComment = await comment.save();
    res.status(200).json(saveComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update comments array in postSchema

router.put("/comment/:postId", async (req, res) => {
  const post = await Post.findById(req.params.postId);
  try {
    await post.updateOne({ $push: { comments: req.body.commentId } });
    res.status(200).json("Comment Posted Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

//getComment

router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({
      postId: req.params.postId,
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
