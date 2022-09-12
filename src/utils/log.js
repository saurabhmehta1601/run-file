const chalk = require("chalk");

/**
 * prints error text to console
 * @param {string} text
 */
function logError(text) {
  console.log(chalk.red.bold("Error ❌: " + text));
}

/**
 * prints warning text to console
 * @param {string} text
 */
function logWarn(text) {
  console.log(chalk.yellow.bold("Warning ⚠️ : " + text));
}

/**
 * prints success text to console
 * @param {string} text
 */
function logSuccess(text) {
  console.log(chalk.green.bold("Success ✅: " + text));
}

/**
 * prints simple text to console
 * @param {string} text
 */
function logConsole(text) {
  console.log(chalk.blue.bold(text));
}

module.exports = {
  logError,
  logWarn,
  logSuccess,
  logConsole,
};
