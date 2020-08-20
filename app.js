const express = require("express");
require("./db/mongoose");
const path = require("path");
const usersRouter = require("./routes/api/users");
const tweetsRouter = require("./routes/api/tweets");

const app = express();

// init middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Routes
app.use("/api", usersRouter);
app.use("/api", tweetsRouter);

// Serve static assests in production
if (process.env.NODE_ENV === "production") {
  // Serve static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Server is up on port ${port}`));
