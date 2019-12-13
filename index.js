const express = require("express");
//const db = require('./db')
//const Message = require("./message/model");
const messageRouter = require("./message/router");

const app = express();

const port = 4000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(messageRouter);

app.listen(port, () => {
  console.log(`listening on :${port}`);
});
