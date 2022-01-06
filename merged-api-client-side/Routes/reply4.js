const router = require("express").Router();
const Reply4 = require("../Models/Reply4");
const Reply3 = require("../Models/Reply3");

//Write a reply4
router.post("/", async (req, res) => {
  const reply4 = new Reply4(req.body);
  try {
    const savereply4 = await reply4.save();
    res.status(200).json(savereply4);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update reply4 array in reply3Schema

router.put("/reply4/:reply3Id", async (req, res) => {
  const reply3 = await Reply3.findById(req.params.reply3Id);
  try {
    await reply3.updateOne({ $push: { reply4: req.body.reply4Id } });
    res.status(200).json("You replied Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

//getReply4

router.get("/:reply3Id", async (req, res) => {
  try {
    const reply4 = await Reply4.find({
      reply3Id: req.params.reply3Id,
    });
    res.status(200).json(reply4);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
