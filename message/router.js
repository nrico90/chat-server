const express = require("express");

const Message = require("./model");

const { Router } = require("express");

const router = new Router();

router.get("/message", (req, res, next) => {
  Message.findAll()
    .then(messages => {
      res.send(messages);
    })
    .catch(next);
});

router.post("/message", (req, res, next) => {
  Message.create(req.body)
    .then(message => {
      res.send(message);
    })
    .catch(next);
});

module.exports = router;
