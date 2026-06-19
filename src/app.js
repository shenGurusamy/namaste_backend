const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Home Route");
});

app.listen(7200, () => {
  console.log("Listening at 7200");
});

 