const router = require("express").Router();
const Reply5 = require("../Models/Reply5");
const Reply4 = require("../Models/Reply4");

//Write a reply5
router.post("/", async (req, res) => {
  const reply5 = new Reply5(req.body);
  try {
    const savereply5 = await reply5.save();
    res.status(200).json(savereply5);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update reply5 array in reply4Schema

router.put("/reply5/:reply4Id", async (req, res) => {
  const reply4 = await Reply4.findById(req.params.reply4Id);
  try {
    await reply4.updateOne({ $push: { reply5: req.body.reply5Id } });
    res.status(200).json("You replied Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

//getReply5

router.get("/:reply4Id", async (req, res) => {
  try {
    const reply5 = await Reply5.find({
      reply4Id: req.params.reply4Id,
    });
    res.status(200).json(reply5);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
