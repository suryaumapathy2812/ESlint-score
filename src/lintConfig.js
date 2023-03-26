const core = require("@actions/core");
const fs = require('fs');

function createConfig(rootPath) {

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

    const writePath = rootPath + ".eslintrc.custom.json"
    core.debug(writePath)

    fs.writeFileSync(writePath, data);

    core.debug("File written successfully\n");
    core.debug("The written has the following contents:");
    core.debug(fs.readFileSync(writePath, "utf8"));

}

module.exports = createConfig 