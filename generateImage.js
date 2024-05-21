name: Generate Image

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install dependencies
        run: npm install puppeteer

      - name: Run Puppeteer script
        run: node generateImage.js

      - name: Commit and push generated image
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add artists.png
          git commit -m "Add generated image"
          git push
