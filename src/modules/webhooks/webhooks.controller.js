const { manageGithubWorkflow } = require("./webhooks.service");

const webhookWorkflowController = (req, res) => {
  const body = req.body;
  console.log(body);
  const properties = {
    repository: {
      id: body?.repository?.id,
      name: body?.repository?.name,
    },
    action: body?.action,
    status: body?.workflow_run?.status,
  };

  const response = manageGithubWorkflow(properties);
  if (!response.success) {
    res.sendStatus(400);
  }

  res.json({
    message: "Webhook received",
    requestBody: req.body,
    requestHeaders: req.headers,
    requestParams: req.params,
    requestQuery: req.query,
  });
};

module.exports = { webhookWorkflowController };
