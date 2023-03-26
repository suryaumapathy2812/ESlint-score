const core = require("@actions/core");
const fs = require('fs');
const path = require("path");

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


    const absolutePath = path.resolve(rootPath);
    core.info(absolutePath)

    const writePath = absolutePath + "/.eslintrc.custom.json"
    core.info(writePath)

    fs.writeFileSync(writePath, data);

    core.info("File written successfully\n");
    core.info("The written has the following contents:");
    core.info(fs.readFileSync(writePath, "utf8"));

}

module.exports = createConfig 