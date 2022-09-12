const fs = require("fs");
const { spawn } = require("child_process");
const hasbin = require("hasbin");
const { logError, logConsole, logSuccess } = require("../utils/log");

module.exports = (file) => {
  const fileName = file.split(".")[0];

  if (hasbin.sync("javac")) {
    const compile = spawn("javac", [file]);

    compile.stderr.on("data", (error) => {
      logError("COMPILATION ERROR ");
      logConsole(error.toString());
    });

    compile.on("close", (code) => {
      if (code === 0) {
        const run = spawn("java", [fileName], {
          stdio: [process.stdin, "pipe", "pipe"],
        });

        run.stdout.on("data", (data) => {
          process.stdout.write(data.toString());
        });

        run.stderr.on("data", (error) => {
          logError(error.toString());
        });

        run.on("close", (code) => {
          if (code == 0) {
            logSuccess("Program exited with code 0.");
          }
          fs.unlinkSync(fileName + ".class");
        });
      }
    });
  } else {
    logError("You do not have a compiler to run java programs");
  }
};
