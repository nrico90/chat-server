const express = require("express");
//const db = require('./db')
//const Message = require("./message/model");
const messageRouter = require("./message/router");
const bodyParser = require("body-parser");
const bodyParserMiddleware = bodyParser.json();
const Sse = require("json-sse");

const app = express();

const port = 4000;

const stream = new Sse();

app.get("/", (req, res) => {
  stream.send("hi");
  res.send("hello");
});

app.get("/stream", (req, res) => {
  stream.init(req, res);
});

app.use(bodyParserMiddleware).use(messageRouter);

app.listen(port, () => {
  console.log(`listening on :${port}`);
});
