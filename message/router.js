const express = require("express");

const Message = require("./model");

const { Router } = require("express");

function factory(stream) {
  const router = new Router();

  // router.get("/message", (req, res, next) => {
  //   Message.findAll()
  //     .then(messages => {
  //       res.send(messages);
  //     })
  //     .catch(next);
  // });
  router.get("/message", async (req, res, next) => {
    try {
      const messages = await Message.findAll();

      res.send(messages);
    } catch (error) {
      next(error);
    }
  });

  router.post("/message", async (req, res, next) => {
    try {
      const message = await Message.create(req.body);

      const string = JSON.stringify(message);
      stream.send(string);

      res.send(message);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

// router.post("/message", (req, res, next) => {
//     Message.create(req.body) //sequelize will use this to populate row's fields
//       .then(message => res.status(200).send(message))
//       .catch(next);
//   });

module.exports = factory;
