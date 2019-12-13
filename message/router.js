const express = require("express");

const Message = require("./model");

const { Router } = require("express");

const router = new Router();

// router.get("/message", (req, res, next) => {
//   Message.findAll()
//     .then(messages => {
//       res.send(messages);
//     })
//     .catch(next);
// });
router.get("/message", async (req, res, next) => {
  const messages = await Message.findAll();

  res.send(messages);
});

router.post("/message", async (req, res, next) => {
  const message = await Message.create(req.body);

  res.send(message);
});

module.exports = router;
