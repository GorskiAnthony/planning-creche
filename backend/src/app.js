require("dotenv").config();

const express = require("express");
const logger = require("morgan");

const router = require("../router/router");
const app = express();

app.use(logger("dev"));

app.use(express.json());
app.use("/api", router);

module.exports = app;
