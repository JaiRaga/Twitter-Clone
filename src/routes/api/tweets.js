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
    const tweets = await Tweet.find().sort({ createdAt: -1 }).limit(6);
    if (!tweets) return res.status(404).send("No Tweets Yet!");

    res.send(tweets);
  } catch (e) {
    res.status(500).send("Server Error!");
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
    const user = await User.findOne({ _id });
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

// Delete Tweet

// Like a Tweet
router.patch("/like/:tweetId", auth, async (req, res) => {
  try {
    const tweet = await Tweet.findOne({ _id: req.params.tweetId });
    if (!tweet) {
      return res.status(404).send("Tweet Not Found");
    }

    if (
      tweet.likes.filter(
        (like) => like.owner.toString() === req.user._id.toString()
      ).length > 0
    ) {
      return res.status(400).send("Tweet Already Liked!");
    }

    tweet.likes.push({ owner: req.user._id });
    await tweet.save();
    res.send(tweet);
  } catch (err) {
    res.status(500).send("Error! Couldn't perform the task!");
  }
});

// Unlike a Tweet
router.patch("/unlike/:id", auth, async (req, res) => {
  try {
    const tweet = await Tweet.findOne({ _id: req.params.id });
    if (!tweet) {
      return res.status(404).send("Tweet Not Found");
    }

    tweet.likes = tweet.likes.filter(
      (like) => like.owner.toString() !== req.user._id.toString()
    );

    await tweet.save();
    res.send(tweet);
  } catch (err) {
    res.status(500).send("Error! Couldn't Perform the task!");
  }
});

// Share a Tweet
router.patch("/retweet/:id", auth, async (req, res) => {
  try {
    const tweet = await Tweet.findOne({ _id: req.params.id });
    if (!tweet) {
      return res.status(404).send("Tweet Not Found");
    }

    if (
      tweet.retweets.filter(
        (retweet) => retweet.owner.toString() === req.user._id.toString()
      ).length > 0
    ) {
      return res.status(400).send("Tweet already Shared!");
    }

    tweet.retweets.push({ owner: req.user._id });
    await tweet.save();
    res.send(tweet);
  } catch (err) {
    res.status(500).send("Error! Couldn't Perform the task!");
  }
});

// Un-share a tweet
router.patch("/detweet/:id", auth, async (req, res) => {
  try {
    const tweet = await Tweet.findOne({ _id: req.params.id });
    if (!tweet) {
      return res.status(404).send("Tweet not found");
    }

    tweet.retweets = tweet.retweets.filter(
      (retweet) => retweet.owner.toString() !== req.user._id.toString()
    );
    await tweet.save();
    res.send(tweet);
  } catch (err) {
    res.status(500).send("Error! Couldn't perform the action");
  }
});

// Comment on a Tweet
router.post("/comment/:id", auth, async (req, res) => {
  try {
    const tweet = await Tweet.findOne({ _id: req.params.id });
    if (!tweet) {
      return res.status(404).send("Tweet not found");
    }

    const { username, handle, avatar } = req.user;
    const owner = req.user._id,
      text = req.body.text;

    tweet.comments.push({ owner, username, handle, text, avatar });
    await tweet.save();
    res.send(tweet.comments);
  } catch (err) {
    res.status(500).send("Error! Couldn't perform the action");
  }
});

// Delete a comment
router.delete("/comment/:tweetId/:commentId", auth, async (req, res) => {
  try {
    console.log(1);
    const tweet = await Tweet.findOne({ _id: req.params.tweetId });
    if (!tweet) {
      return res.status(404).send("Tweet not found");
    }
    console.log(2);
    const comment = tweet.comments.find((comment) => {
      console.log(comment._id);
      return comment._id.toString() === req.params.commentId;
    });
    console.log(3, comment);
    if (!comment) return res.status(404).send("Comment does not exists!");
    console.log(4);
    if (comment.owner.toString() !== req.user._id.toString())
      return res.status(401).send("User not Authorized");
    console.log(5);
    const removeIndex = tweet.comments
      .map((comment) => comment._id.toString())
      .indexOf(req.params.commentId);
    console.log(6);
    tweet.comments.splice(removeIndex, 1);
    console.log(7);
    await tweet.save();
    res.send(tweet.comments);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error! Couldn't perform the action");
  }
});

module.exports = router;
