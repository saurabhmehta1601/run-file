const hasbin = require("hasbin");
const { spawn } = require("child_process");
const { logError, logConsole, logSuccess } = require("../utils/log");
const runCpp = require("./runCpp");

module.exports = (file) => {
  if (hasbin.sync("g++")) {
    runCpp(file);
  } else if (hasbin("gcc")) {
    const compile = spawn("gcc", [file], {
      stdio: [process.stdin, "pipe", "pipe"],
    });

    compile.stderr.on("data", () => {
      logError("COMPILATION ERROR ");
    });

    compile.on("close", (code) => {
      if (code === 0) {
        const run = spawn("./a.out", {
          stdio: ["pipe", "pipe", "pipe"],
        });

        run.stdout.on("data", (data) => {
          process.stdout.write(data.toString());
        });

        run.stderr.on("data", (error) => {
          logError("RUNTIME ERROR ");
          logConsole(error.toString());
        });

        run.on("close", (code) => {
          if (code === 0) {
            logSuccess("Program exited with code 0.");
          }
          fs.unlink("./a.out");
          process.exit(code);
        });
      }
    });
  } else {
    logError("You do not have a compiler to run C program .");
    logConsole("You may install gcc or g++");
  }
};
