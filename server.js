const express = require("express");
const cors = require("cors");

const path = require("path");
const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";

const mailer = require("./mailer");
const paymentmail = require("./paymentmail");

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

server.post("/api/contact", (req, res) => {
  const { email = "", name = "", mes = "" } = req.body;
  console.log(mes);

  mailer({ email, name, mes })
    .then(() => {
      console.log("success");
      res.send("success");
    })
    .catch((error) => {
      console.log("failed", error);
      res.send("badddd");
    });
});
server.post("/api/payment", (req, res) => {
  const {
    firstName = "",
    LastName = "",
    address = "",
    city = "",
    state = "",
    zip = "",
    email = "",
    phone = "",
    payment = "",
  } = req.body[0];
  const products = req.body[1];

  paymentmail({
    firstName,
    LastName,
    address,
    city,
    state,
    zip,
    email,
    phone,
    products,
    payment,
  })
    .then(() => {
      console.log("success");
      res.send("success");
    })
    .catch((error) => {
      console.log("failed", error);
      res.send("badddd");
    });
});

server.get("*", (req, res) => {
  return handle(req, res);
});

const PORT = process.env.PORT || 3000;
server.use(cors());
server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Read on http://localhost:${PORT}`);
});
