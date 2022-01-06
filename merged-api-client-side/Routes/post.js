const router = require("express").Router();
const Post = require("../Models/Post");

//CREATING & POSTING A MOVIE

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATING Post

router.put("/:id", async (req, res) => {
  try {
    const update = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const modifiedPost = await update.save();
    res.status(200).json(modifiedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETING Post
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Your post has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET SINGLE Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET All Post PER Category

router.get("/", async (req, res) => {
  const username = req.query.user;
  const category = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (category) {
      posts = await Post.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      posts = await Post.find();
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
