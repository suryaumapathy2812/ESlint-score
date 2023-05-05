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
  "plugins": [
    "html",
    "@html-eslint",
    "vue",
    "prettier"
  ],
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "code-complexity",
    "eslint:recommended",
    "airbnb",
    "prettier",
    "prettier-standard"
  ],
  "settings": {
    "html/html-extensions": [
      ".html"
    ],
    "html/report-bad-indent": "off"
  },
  "rules": {
    "no-plusplus": "off",
    "no-alert": "off",
    "no-unused-vars": "error",
    "no-console": "off",
    "camelcase": "off",
    "doctype-first": "off",
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxBOF": 0,
        "maxEOF": 0
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "singleQuote": false,
        "endOfLine": "auto"
      }
    ]
  },
  "ignorePatterns": [
    "node_modules/",
    "assets/js/vendor/"
  ],
  "parserOptions": {
    "ecmaVersion": 12
  },
  "overrides": [
    {
      "files": [
        "*.html"
      ],
      "parser": "@html-eslint/parser",
      "extends": [
        "plugin:@html-eslint/recommended"
      ],
      "rules": {
        "spaced-comment": "off",
        "vue/html-indent": "off",
        "@html-eslint/indent": "off",
        "prettier/prettier": "off"
      }
    }
  ]
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
