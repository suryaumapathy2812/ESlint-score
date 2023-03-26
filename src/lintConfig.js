const core = require("@actions/core")
const fs = require('fs');

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

    fs.writeFileSync(".eslintrc.custom.json", data);

    core.debug("File written successfully\n");
    core.debug("The written has the following contents:");
    core.debug(fs.readFileSync(".eslintrc.custom.json", "utf8"));

}

module.exports = createConfig 