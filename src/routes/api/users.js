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
    console.log(req.body);
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

    if (!user) throw new Error();

    user.followers.push({ userId: req.user._id });
    req.user.following.push({ userId: user._id });

    await user.save();
    await req.user.save();

    res.send("Success!");
  } catch (err) {
    res.status(400).send("Unable to follow user!");
  }
});

// get number of followers
router.get("/followers", auth, async (req, res) => {
  try {
    const followers = req.user.followers;
    res.send(followers);
  } catch (err) {
    res.status(400).send("Unable to get Followers!");
  }
});

// unfollow route
router.post("/unfollow/:id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) throw new Error("User doesn't exist");
    // req.user.following.filter()
  } catch (err) {
    res.status(400).send("Unable to Unfollow user!");
  }
});

module.exports = router;
