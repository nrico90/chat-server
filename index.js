const express = require("express");
//const db = require('./db')

const Message = require("./message/model");
const messageRouterFactory = require("./message/router");

const cors = require("cors");
const corsMiddleware = cors();

const bodyParser = require("body-parser");
const bodyParserMiddleware = bodyParser.json();

const Sse = require("json-sse");

const app = express();

const port = 4000;

const stream = new Sse();
const messageRouter = messageRouterFactory(stream);

app
  .use(corsMiddleware)
  .use(bodyParserMiddleware)
  .use(messageRouter);

app.get("/", (req, res) => {
  stream.send("hi");
  res.send("hello");
});

app.get("/stream", async (req, res, next) => {
  try {
    const messages = await Message.findAll(); // get array out of database
    const string = JSON.stringify(messages); //pasar data a json, convert array into string - "serialize" it

    stream.updateInit(string); //send/prepare data(string) to client right after they connect
    stream.init(req, res); // conectar al user con stream
  } catch (error) {
    next(error); // hadle any errors
  }
});

app.listen(port, () => {
  console.log(`listening on :${port}`);
});
