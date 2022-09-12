const { spawn } = require("child_process");
const hasbin = require("hasbin");
const { logSuccess, logError } = require("../utils/log");

module.exports = (file) => {
  if (hasbin.sync("node")) {
    const interpret = spawn("node", [file], {
      stdio: [process.stdin, "pipe", "pipe"],
    });
    interpret.stdout.on("data", (data) => {
      process.stdout.write(data.toString());
    });
    interpret.stderr.on("data", (error) => {
      logError(error);
      process.exit(1);
    });
    interpret.on("close", (code) => {
      console.log("\n");
      if (code === 0) {
        logSuccess("Program terminated .");
      }
      process.exit(code);
    });
  } else {
    logError(
      "Please install nodejs and check if it is installed with command node --version"
    );
    process.exit(1);
  }
};
