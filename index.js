const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const { mailTranporter } = require("./mail-transporter");

app.use(cors());
app.use(bodyParser.json());

app.post("/contact", async function (req, res) {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      throw new Error("Please provide valid detail!");
    }

    const messaege = await mailTranporter(name, email, message);
    res.status(200).send(messaege);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

const PORT = process.env.PORT || 8001;

app.listen(PORT);
