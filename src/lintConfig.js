const core = require("@actions/core");
const fs = require('fs');
const path = require("path");

function createConfig(rootPath) {

    const ignoreContent = `
    node_modules/**
    **/*.config.js
    **/*.min.js
    assets/js/vendor/**
    `

    const configContent = `
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

    const files = [
        { name: ".eslintignore", content: ignoreContent },
        { name: ".eslintrc.custom.json", content: configContent }
    ]


    files.forEach(({ name, content }) => {

        const absolutePath = path.resolve(rootPath);
        core.info(absolutePath)

        const writePath = absolutePath + "/" + name
        core.info(writePath)

        fs.writeFileSync(writePath, content);

        core.info("File written successfully\n");
        core.info("The written has the following contents:");
        core.info(fs.readFileSync(writePath, "utf8"));

    })


}

module.exports = createConfig 