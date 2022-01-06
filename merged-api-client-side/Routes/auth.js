const router = require("express").Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

//Register Users
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_JS_SECRET_KEY
    ).toString(),
  });

  try {
    const user = await newUser.save();
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Login Users

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const bytes = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYPTO_JS_SECRET_KEY
    );
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (!user) {
      return res.status(401).json("Wrong password or username");
    } else if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong password or username");
    } else {
      accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC_KEY
      );

      const { password, ...info } = user._doc;
      res.status(200).json({ ...info, accessToken });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
