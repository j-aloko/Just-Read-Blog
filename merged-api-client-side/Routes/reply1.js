const router = require("express").Router();
const Reply1 = require("../Models/Reply1");
const Comment = require("../Models/Comment");

//Write a reply1
router.post("/", async (req, res) => {
  const reply1 = new Reply1(req.body);
  try {
    const savereply1 = await reply1.save();
    res.status(200).json(savereply1);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update reply1 array in commentSchema

router.put("/reply1/:commentId", async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  try {
    await comment.updateOne({ $push: { reply1: req.body.reply1Id } });
    res.status(200).json("You replied Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

//getReply1

router.get("/:commentId", async (req, res) => {
  try {
    const reply1 = await Reply1.find({
      commentId: req.params.commentId,
    });
    res.status(200).json(reply1);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
