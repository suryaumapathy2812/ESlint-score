const core = require("@actions/core")
const fs = require('fs');

function readCodebase(directory) {

    const files = fs.readdirSync(directory)
        .filter(file => {

            if (
                file.startsWith('.') ||
                file === 'node_modules' ||
                file.includes(".config") ||
                file.includes(".min.js") ||
                file.includes(".test.js")
            ) {
                return false;
            } else {
                return true
            }

        });

    const filePaths = []

    files.forEach(file => {
        const filePath = directory + '/' + file;
        const stats = fs.statSync(filePath);

        if (stats.isFile() && file.endsWith('.js')) {
            filePaths.push({ path: filePath })
        } else if (stats.isDirectory()) {
            filePaths.push(...readCodebase(filePath));
        }
    });

    return filePaths
}

function calculateScore() {

    const results = JSON.parse(fs.readFileSync('eslint-results.json', 'utf8'));
    let totalErrors = 0;
    let totalWarnings = 0;

    results.forEach(result => {
        totalErrors += result.errorCount;
        totalWarnings += result.warningCount;
    });

    const maxIssues = totalErrors + totalWarnings;

    if (maxIssues === 0) {
        core.debug('No issues found. ESLint score: 100%');
    } else {
        const currentIssues = totalErrors + (totalWarnings * 0.5);
        const score = ((maxIssues - currentIssues) / maxIssues) * 100;

        if (isNaN(score)) {
            core.debug('Error: Unable to calculate ESLint score');
            return 0;
        } else {
            core.debug(`ESLint score: ${score.toFixed(2)}%`);
            return score;
        }
    }

}

module.exports = { calculateScore, readCodebase }