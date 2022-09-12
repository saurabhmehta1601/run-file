#! /usr/bin/env node

const { spawn } = require("child_process");
const {
  logError,
  logSuccess,
  logWarn,
  logConsole,
} = require("../src/utils/log");
const runCpp = require("../src/scripts/runCpp");

const file = process.argv[2];
if (!file) {
  logError("Please provide file name as argument to execute .");
  process.exit();
}
const ext = file.split(".").pop();

if (ext == "cpp" || ext == "c") {
  runCpp(file);
} else if (ext === "js") {
  const interpret = spawn("node", [file], {
    stdio: [process.stdin, "pipe", "pipe"],
  });
  interpret.stdout.on("data", (data) => {
    logConsole(data.toString());
  });
  interpret.on("close", (code) => {
    if (code === 0) {
      logSuccess("Program terminated .");
    } else {
      logWarn("File interpretation unsuccessfull .");
    }
  });
}
