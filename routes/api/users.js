const express = require("express");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/register", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send("Unable to Login!");
  }
});

// Get my profile
router.get("/user/me", auth, async (req, res) => {
  res.send(req.user);
});

// Get User Profile
router.get("/user/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("No User Found!");
    res.send(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Update User Profile
router.patch("/user", auth, async (req, res) => {
  try {
    const { username, handle, email, avatar } = req.body;
    const user = await req.user.updateUser(username, handle, email, avatar);
    res.send(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Logout user
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});

// follow a user
router.post("/follow/:id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) throw new Error("User doesn't exist!");

    user.followers.push({ userId: req.user._id });
    req.user.following.push({ userId: user._id });

    await user.save();
    await req.user.save();
    // console.log(req.user.following);
    // res.send(req.user.following);
    res.send("Success!");
  } catch (err) {
    res.status(400).send("Unable to follow user!");
  }
});

// unfollow route
router.post("/unfollow/:id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) throw new Error("User doesn't exist");

    user.followers = user.followers.filter(
      (follower) => follower.userId.toString() !== req.user._id.toString()
    );

    req.user.following = req.user.following.filter(
      (follow) => follow.userId.toString() !== req.params.id
    );

    await user.save();
    await req.user.save();
    // console.log(req.user.following);
    // res.send(req.user.following);
    res.send("Success!");
  } catch (err) {
    res.status(400).send("Unable to Unfollow user!");
  }
});

// get number of followers
router.get("/followers", auth, async (req, res) => {
  try {
    const followers = req.user.followers;
    Promise.all(
      followers.map(async (follower) => {
        let user = await User.findById(follower.userId);
        if (user) return user;
      })
    )
      .then((result) => res.send(result))
      .catch((err) => res.send(err));
    // res.send(followers);
  } catch (err) {
    res.status(400).send("Unable to get Followers!");
  }
});

// get number of following users
router.get("/following", auth, async (req, res) => {
  try {
    const following = req.user.following;
    Promise.all(
      following.map(async (follow) => {
        let user = await User.findById(follow.userId);
        if (user) return user;
      })
    )
      .then((result) => res.send(result))
      .catch((err) => res.send(err));
    // res.send(followers);
  } catch (err) {
    res.status(400).send("Unable to get Followers!");
  }
});

module.exports = router;
