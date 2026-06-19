const express = require("express");

const app = express();

app.get("/user", ( req, res) => {
    res.send (" { firstName: 'xxx', lastName: 'yyy' } ")
})
app.post("/user", ( req, res) => {
    res.send (" Save Data to Database ")
})
app.get("/", (req, res) => {
  res.send("Home Route Postman");
});

app.listen(7200, () => {
  console.log("Listening at 7200");
});

 