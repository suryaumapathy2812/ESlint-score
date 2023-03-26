# ESLint Score GitHub Action

This GitHub Action generates an ESLint score for your JavaScript codebase.

## Example Workflow

Here's an example workflow file to use the ESLint Score GitHub Action:

```yaml
name: ESLint Score

on:
  push:
    branches:
      - master

jobs:
  eslint-score:
    runs-on: ubuntu-latest
    steps:
      - name: Install Node.js
        uses: actions/setup-node@v3.5.1
        with:
          node-version: '16.x'
      
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Setup ESLint Score
        uses: suryaumapathy2812/ESlint-score@v1
        with:
          action: "SETUP"

      - name: Install ESLint
        run: npm install eslint
        
      - name: run ESlint
        run: eslint . --ext .js --format json > eslint-results.json

      - name: Run ESLint Score
        uses: suryaumapathy2812/ESlint-score@v1
        with:
          action: "SCORE"
          start-point: './'
      
      - name: Display ESLint Score
        run: |
          echo "ESLint Score: ${{ steps.eslint-score.outputs.score }}"