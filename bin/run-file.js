#! /usr/bin/env node

const { logError } = require("../src/utils/log");
const runCpp = require("../src/scripts/runCpp");
const runJs = require("../src/scripts/runJs");
const { SUPPORTED_EXTENTIONS } = require("../src/utils/constants");
const runC = require("../src/scripts/runC");
const runJava = require("../src/scripts/runJava");

const file = process.argv[2];
// if file name not given throw error
if (!file) {
  logError("Please provide file name as argument to execute .");
  process.exit();
}
const ext = file.split(".").pop();

if (SUPPORTED_EXTENTIONS.includes(ext)) {
  if (ext == "cpp") {
    runCpp(file);
  } else if (ext === "js") {
    runJs(file);
  } else if (ext === "c") {
    runC(file);
  } else if (ext === "java") {
    runJava(file);
  }
} else {
  logError("Given file extention is not supported ");
  process.exit(1);
}
