const core = require('@actions/core');
const esLintScore = require("./src/eslint")

// most @actions toolkit packages have async methods
async function run() {
  try {

    const action = core.getInput("action");
    core.info(`Action will be  ${action}`);

    const startPoint = core.getInput('start-point');
    core.info(`Starting point will be  ${startPoint}`);

    if (action === "SETUP") {
      esLintScore.setup(startPoint);
      core.setOutput('setup', "success :thumbsup:");
    }

    if (action === "SCORE") {
      const files = esLintScore.score.readCodebase(startPoint);
      core.info(JSON.stringify(files)); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

      const score = esLintScore.score.calculateScore()
      core.info(`ESLint score: ${score.toFixed(2)}%`);

      core.setOutput('score', score);
    }

  } catch (error) {
    core.info(`:poop: :poop: :poop:`)
    core.setFailed(error.message);
  }
}

run();
