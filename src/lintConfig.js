const core = require("@actions/core")
const fs = require('fs');
const path = require("path")

function createConfig() {

    const data = `
    {
        "extends": "eslint:recommended",
        "env": {
            "browser": true,
            "es2021": true
        },
        "parserOptions": {
            "ecmaVersion": 12
        },
        "rules": {
            "no-unused-vars": "warn",
            "no-console": "off"
        }
    }
    `

    const finalPath = path.resolve(__dirname, ".eslintrc.custom.json")
    core.debug(finalPath)

    fs.writeFileSync(finalPath, data);

    core.debug("File written successfully\n");
    core.debug("The written has the following contents:");
    core.debug(fs.readFileSync(finalPath, "utf8"));

}

module.exports = createConfig 