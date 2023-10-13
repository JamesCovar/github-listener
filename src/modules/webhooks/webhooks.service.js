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
          response = { message: "Workflow requested", success: true };
          console.log("Workflow requested");
          break;
        case "in_progress":
          response = { message: "Workflow in progress", success: true };
          console.log("Workflow in progress");
          break;
        default:
          response = {
            message: "Workflow action not recognized",
            success: false,
          };
          console.log("Workflow action not recognized");
          console.log(payload.action);
          break;
      }
      break;
    case "queued":
      response = { message: "Workflow queued", success: true };
      console.log("Workflow queued");
      break;
    case "in_progress":
      response = { message: "Workflow in progress", success: true };
      console.log("Workflow in progress");
      break;
    default:
      response = { message: "Workflow status not recognized", success: false };
      console.log("Workflow status not recognized");
      console.log(payload.status);
      break;
  }

  return response;
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
