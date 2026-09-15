const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  await page.goto("https://note.com/login", {
    waitUntil: "domcontentloaded"
  });

  console.log("noteのログインページを開きました");

  await browser.close();
})();
