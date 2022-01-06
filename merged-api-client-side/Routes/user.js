const router = require("express").Router();
const { verifyUser, verifyAdmin } = require("../Verification");
const User = require("../Models/User");
const Post = require("../Models/Post");
const CryptoJS = require("crypto-js");

//update User Account

router.put("/:id", async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_JS_SECRET_KEY
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    const user = await updatedUser.save();
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete User & Posts

router.delete("/:id", async (req, res) => {
  try {
    const user = User.findById(req.params.id);
    try {
      await Post.deleteMany({ username: req.body.username });
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Your account has been successfully deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } catch {
    res.status(404).json("user not found");
  }
});

//GET A SINGLE USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, _id, isAdmin, createdAt, updatedAt, ...others } =
      user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const query = req.query.new;
    const users = query
      ? await User.find().sort({ id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USERS STATS PER MONTH
router.get("/stats", verifyAdmin, async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
