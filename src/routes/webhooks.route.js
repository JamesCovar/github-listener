const express = require("express");
const {
  webhookWorkflowController,
} = require("../modules/webhooks/webhooks.controller");
const router = express.Router();

router.post("/workflow", webhookWorkflowController);

module.exports = router;
