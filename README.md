# ESLint Score GitHub Action

This GitHub Action generates an ESLint score for your JavaScript codebase.

## Example Workflow

Here's an example workflow file to use the ESLint Score GitHub Action:

```yaml
name: ESLint Score

on:
  push:
    branches:
      - main

jobs:
  eslint-score:
    runs-on: ubuntu-latest
    steps:
      - name: Install Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16.x'
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Install ESLint
        run: npm install eslint
      
      - name: Copy custom .eslintrc.custom.json file
        run: cp .github/.eslintrc.custom.json .
      
      - name: Run ESLint Score
        uses: suryaumapathy2812/ESLint-score@v1
        with:
          start-point: './src'
      
      - name: Display ESLint Score
        run: |
          echo "ESLint Score: ${{ steps.eslint-score.outputs.score }}"
