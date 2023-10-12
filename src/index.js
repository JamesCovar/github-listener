const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const pathToExec = process.env.PATH_FILE_EXEC;

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  console.log("Received webhook event");

  //Put here your .sh file to execute your custom script
  exec(pathToExec, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error syncing S3: ${error}`);
      return;
    }
    console.log(`Synced S3: ${stdout}`);
  });
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Webhook listener is running on port ${port}`);
});
