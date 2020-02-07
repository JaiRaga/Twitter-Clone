const express = require("express");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Tweet = require("../../models/Tweet");
const router = express.Router();

// create a tweet
router.post("/tweet", auth, async (req, res) => {
  const tweet = new Tweet({
    ...req.body,
    owner: req.user._id
  });

  try {
    await tweet.save();
    res.status(201).send(tweet);
  } catch (e) {
    res.status(400).send(e);
  }
});

// get all tweets
router.get("/tweets", auth, async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .sort({ createdAt: -1 })
      .limit(4);
    res.send(tweets);
  } catch (e) {
    res.status(500).send();
  }
});

// find tweets by me
router.get("/tweets/me", auth, async (req, res) => {
  try {
    await req.user
      .populate({
        path: "tweets",
        options: {
          limit: 4,
          sort: { createdAt: -1 }
        }
      })
      .execPopulate();
    res.send(req.user.tweets);
  } catch (e) {
    res.status(500).send();
  }
});

// find tweets by a user
router.get("/tweets/:userid", async (req, res) => {
  try {
    const _id = req.params.userid;
    const user = await user.findOne({ _id });
    const tweets = await user.populate("tweets").execPopulate();
    res.send(tweets);
  } catch (e) {
    res.status(500).send();
  }
});

// find a specific tweet
router.get("/tweet/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const tweet = await Tweet.findOne({ _id });

    if (!tweet) {
      res.status(404).send();
    }
    res.send(tweet);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
