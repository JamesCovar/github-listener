const { manageGithubWorkflow } = require("./webhooks.service");

const webhookWorkflowController = async (req, res) => {
  const body = req.body;
  const properties = {
    repository: {
      id: body?.repository?.id,
      name: body?.repository?.name,
    },
    action: body?.action,
    status: body?.workflow_job?.status,
    conclusion: body?.workflow_job?.conclusion,
  };

  const serviceResponse = await manageGithubWorkflow(properties);

  console.log(serviceResponse);
  if (!serviceResponse.success) {
    return res.status(204).json({
      message: serviceResponse.message,
    });
  }

  return res.status(200).json({
    message: "Webhook received & executed successfully",
  });
};

module.exports = { webhookWorkflowController };
