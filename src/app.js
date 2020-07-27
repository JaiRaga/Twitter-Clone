const express = require("express");
require("./db/mongoose");
const cors = require("cors");
const usersRouter = require("./routes/api/users");
const tweetsRouter = require("./routes/api/tweets");
const commentRouter = require("./routes/api/comment");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", usersRouter);
app.use("/api", tweetsRouter);
app.use("/api", commentRouter);

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Server is up on port ${port}`));
