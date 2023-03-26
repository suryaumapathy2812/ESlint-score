const core = require('@actions/core');
const esLintScore = require("./src/eslint")

// most @actions toolkit packages have async methods
async function run() {
  try {

    const startPoint = core.getInput('start-point');
    core.info(`Starting point will be  ${startPoint}`);

    const files = esLintScore.readCodebase(startPoint);
    core.info(JSON.stringify(files)); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    const score = esLintScore.calculateScore()
    core.info(`ESLint score: ${score.toFixed(2)}%`);

    core.setOutput('score', score);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
