const { chromium } = require("playwright");

(async () => {

  const browser = await chromium.launch({

    headless: true

  });

  const page = await browser.newPage();

  await page.goto("https://note.com/login", {

    waitUntil: "domcontentloaded"

  });

  await page.locator('input[type="email"], input[name="email"]').first().fill(process.env.NOTE_EMAIL);

  await page.locator('input[type="password"]').fill(process.env.NOTE_PASSWORD);

  await page.locator('button[type="submit"]').click();

  await page.waitForTimeout(5000);

  console.log("ログイン後URL:", page.url());

  console.log("ページタイトル:", await page.title());

  const links = await page.locator("a").allTextContents();

  console.log("画面上のリンク:", links.slice(0, 30));

  await browser.close();

})();
