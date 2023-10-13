const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const router = require("./routes/webhooks.route");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/webhook", router);

app.listen(port, () => {
  console.log(`Webhook listener is running on port ${port}`);
});
