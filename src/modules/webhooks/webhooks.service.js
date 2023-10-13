const dotenv = require("dotenv");
const { exec } = require("child_process");

dotenv.config();

const manageGithubWorkflow = async (payload) => {
  let response = {
    message: "",
    success: false,
  };

  switch (payload.status) {
    case "completed":
      switch (payload.action) {
        case "completed":
          response = deployProject();
          break;
        case "requested":
          console.log("Workflow requested");
          break;
        case "in_progress":
          console.log("Workflow in progress");
          break;
        default:
          console.log("Workflow action not recognized");
          break;
      }
      break;
    case "queued":
      console.log("Workflow queued");
      break;
    case "in_progress":
      console.log("Workflow in progress");
      break;
    default:
      console.log("Workflow status not recognized");
      break;
  }

  return {
    message: "Webhook received",
  };
};

const deployProject = async (payload) => {
  const pathToExec = process.env.PATH_FILE_EXEC;

  exec(pathToExec, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error syncing S3: ${error}`);
      return {
        message: `Error syncing S3: ${error}`,
        success: false,
      };
    }
    return {
      message: `S3 synced successfully`,
      success: true,
    };
  });
};

module.exports = {
  manageGithubWorkflow,
};
