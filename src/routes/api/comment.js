const express = require("express");
const auth = require("../../middleware/auth");
const Comment = require("../../models/Comment");
const router = express.Router();

// Get Comments by Tweet Id
router.get("/comments/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    let comments = await Comment.find();
    console.log(1, typeof id);
    comments = comments.filter((comment) => comment.owner.toString() === id);
    console.log(2, comments);
    if (!comments.length) return res.status(404).send("No Comment Yet!");
    console.log(3);
    res.send(comments);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Post comments for a tweet
router.post("/comments/:id", auth, async (req, res) => {
  const owner = req.params.id,
    username = req.user.username,
    handle = req.user.handle,
    text = req.body.text,
    avatar = req.body.avatar ? req.body.avatar : null;

  const comment = new Comment({ owner, username, handle, text, avatar });
  console.log(comment);
  try {
    console.log(1);
    await comment.save();
    console.log(2);
    res.status(201).send(comment);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
