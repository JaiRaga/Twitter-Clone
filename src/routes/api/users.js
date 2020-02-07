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

router.get("/user/me", auth, async (req, res) => {
  res.send(req.user);
});

// follow route

// unfollow route

module.exports = router;
