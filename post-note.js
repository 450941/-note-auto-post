name: Note Auto Post

on:
  workflow_dispatch:

jobs:
  post:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Run note post
        env:
          NOTE_EMAIL: ${{ secrets.NOTE_EMAIL }}
          NOTE_PASSWORD: ${{ secrets.NOTE_PASSWORD }}
        run: npm run post
