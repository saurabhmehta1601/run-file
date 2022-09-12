const { spawn } = require("child_process");
const { logConsole, logWarn, logSuccess, logError } = require("../utils/log");

module.exports = (file) => {
  const interpret = spawn("node", [file], {
    stdio: [process.stdin, "pipe", "pipe"],
  });
  interpret.stdout.on("data", (data) => {
    logConsole(data.toString());
  });
  interpret.stderr.on("data", (error) => {
    logError(error);
    process.exit(1);
  });
  interpret.on("close", (code) => {
    if (code === 0) {
      logSuccess("Program terminated .");
    }
  });
};
