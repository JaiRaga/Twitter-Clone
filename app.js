const express = require("express");
const app = express();

const port = process.env.PORT || 9000;

app.get("/", (req, res) => res.send("<h1>Heello</h1>"));

app.listen(port, () => console.log(`Server is up on port ${port}`));
