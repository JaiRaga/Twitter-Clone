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
    await tweet.populate("owner").execPopulate();
    await tweet.save();
    res.status(201).send(tweet);
  } catch (e) {
    res.status(400).send(e);
  }
});

// get all tweets
router.get("/tweets", async (req, res) => {
  try {
    let tweets = await Tweet.find().sort({ createdAt: -1 }).limit(8);
    if (!tweets) return res.status(404).send("No Tweets Yet!");
    let len = tweets.length;

    Promise.all(
      tweets.map(async (tweet) => {
        await tweet
          .populate("owner")
          .populate({ path: "comments.user" })
          // .populate({ path: "comments", populate: { path: "user" } })
          .execPopulate();
        await tweet.save();
        return tweet;
      })
    )
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error!");
  }
});

// find tweets by me
router.get("/tweets/me", auth, async (req, res) => {
  try {
    // Get all tweets
    await req.user
      .populate({
        path: "tweets",
        options: {
          limit: 4,
          sort: { createdAt: -1 }
        }
      })
      .execPopulate();

    let tweets = req.user.tweets;

    // console.log(tweets);

    Promise.all(
      tweets.map(async (tweet) => {
        await tweet
          .populate("owner")
          .populate("comments.user")
          .populate("retweets.owner")
          .execPopulate();
        await tweet.save();
        return tweet;
      })
    )
      .then((result) => {
        // console.log(result);
        res.send(result);
      })
      .catch((err) => console.log(err));

    // res.send(req.user.tweets);
  } catch (e) {
    res.status(500).send();
  }
});

// find retwets by me
router.get("/retweets/me", auth, async (req, res) => {
  try {
    const tweets = await Tweet.find();
    let retweets = [];
    if (!tweets) return res.status(404).send("No Tweets Made!");

    tweets.map((tweet) => {
      if (tweet.retweets.length > 0) {
        tweet.retweets.forEach((retweet) => {
          if (retweet.owner.toString() === req.user._id.toString()) {
            retweets.push(tweet);
          }
        });
      }
    });

    Promise.all(
      retweets.map(async (tweet) => {
        await tweet
          .populate("owner")
          .populate("comments.user")
          // .populate("retweets.owner")
          .execPopulate();
        await tweet.save();
        return tweet;
      })
    )
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => console.log(err));

    // res.send(retweets);
  } catch (err) {
    res.status(500).send();
  }
});

// find liked tweets by me
router.get("/likes/me", auth, async (req, res) => {
  try {
    const tweets = await Tweet.find();
    let likes = [];
    if (!tweets) return res.status(404).send("No Tweets Made!");

    tweets.map((tweet) => {
      if (tweet.likes.length > 0) {
        tweet.likes.forEach((like) => {
          like.owner.toString() === req.user._id.toString()
            ? likes.push(tweet)
            : null;
        });
      }
    });
    Promise.all(
      likes.map(async (tweet) => {
        await tweet
          .populate("owner")
          .populate("comments.user")
          // .populate("retweets.owner")
          .execPopulate();
        await tweet.save();
        return tweet;
      })
    )
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => console.log(err));
    // res.send(likes);
  } catch (err) {
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

// Delete a Tweet
router.delete("/tweet/:id", auth, async (req, res) => {
  try {
    const tweet = await Tweet.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!tweet) return res.status(404).send("Tweet doesn't exists!");

    res.send(tweet);
  } catch (err) {
    res.status(500).send("Error! Couldn't perform the task!");
  }
});

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
    res.send(tweet.likes);
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
    res.send(tweet.likes);
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
    console.log(1);
    tweet.retweets.push({ owner: req.user._id });
    console.log(2);
    await tweet.save();
    console.log(3, req.user._id, typeof req.user._id.toString());

    res.send(tweet.retweets);
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
    res.send(tweet.retweets);
  } catch (err) {
    res.status(500).send("Error! Couldn't perform the action");
  }
});

// Comment on a Tweet
router.post("/comment/:id", auth, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).send("Not found!");
    }
    console.log(req.body);
    const comment = {
      user: req.user._id,
      text: req.body.text
    };
    tweet.comments.unshift(comment);
    await tweet.populate("comments.user").execPopulate();
    await tweet.save();

    res.send(tweet.comments);
  } catch (err) {
    res.status(500).send("Error! Couldn't perform the action");
  }
});

module.exports = router;
