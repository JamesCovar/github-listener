const dotenv = require("dotenv");
const { exec } = require("child_process");

dotenv.config();

const manageGithubWorkflow = async (payload) => {
  let response = {
    message: "",
    success: false,
  };

  switch (payload.action) {
    case "completed":
      switch (payload.conclusion) {
        case "success":
          await deployProject(payload)
            .then((res) => {
              response.message = res.message;
              response.success = res.success;
            })
            .catch((err) => {
              response.message = err.message;
              response.success = err.success;
            });
          break;
        default:
          response.message = "Conclusion not supported yet";
          response.success = true;
          break;
      }
      break;
    default:
      response.message = "Action not supported yet";
      response.success = true;
      break;
  }

  return response;
};

const deployProject = async (payload) => {
  const pathToExec = getPathFileExec(payload.repository.name);
  const response = {
    message: "",
    success: false,
  };

  return new Promise((resolve, reject) => {
    exec(pathToExec, (error, stdout, stderr) => {
      if (error || stderr) {
        response.message = `Error executing ${pathToExec}`;
        response.success = false;
        reject(response);
      } else {
        response.message = `Success executing ${pathToExec}`;
        response.success = true;
        resolve(response);
      }
    });
  });
};

const getPathFileExec = (projectName) => {
  switch (projectName) {
    case "metadata-scraper":
      return `${process.env.PATH_FILE_EXEC}/metadata-scraper.sh`;
      break;

    default:
      break;
  }
};

module.exports = {
  manageGithubWorkflow,
};
