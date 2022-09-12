const fs = require("fs");
const hasbin = require("hasbin");
const { spawn } = require("child_process");
const { logSuccess, logConsole, logWarn, logError } = require("../utils/log");

module.exports = (file) => {
  let compiler = "";

  if (hasbin.sync("g++")) {
    compiler = "g++";
  } else {
    logError("You do not have C++ compiler installed on your system .");
    logConsole(
      "Please install C++ compiler like g++ and make sure it is added to PATH"
    );
    process.exit(1);
  }

  const compile = spawn(compiler, [file], {
    stdio: ["pipe", process.stdout, process.stderr],
  });
  compile.on("close", (code) => {
    if (code === 0) {
      const run = spawn("./a.out", { stdio: [process.stdin, "pipe", "pipe"] });
      run.stdout.on("data", (data) => {
        logConsole(data.toString());
      });
      run.on("close", (code) => {
        if (code == 0) {
          logSuccess("program successfully terminated .");
          fs.unlinkSync("./a.out");
        }
      });
    } else {
      logWarn("File compilation unsuccessfull .");
    }
  });
};
