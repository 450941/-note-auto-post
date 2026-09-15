const { chromium } = require("playwright");

(async () => {

  const browser = await chromium.launch({

    headless: true

  });

  const page = await browser.newPage();

  console.log("noteログインページを開いています...");

  await page.goto("https://note.com/login", {

    waitUntil: "domcontentloaded"

  });

  await page.waitForTimeout(2000);

  console.log("ログイン情報を入力しています...");

  await page.locator('input[type="email"]').fill(process.env.NOTE_EMAIL);

  await page.locator('input[type="password"]').fill(process.env.NOTE_PASSWORD);

  await page.locator('button[type="submit"]').click();

  await page.waitForTimeout(5000);

  console.log("ログイン処理が完了しました");

  console.log("現在のURL:", page.url());

  await browser.close();

})();
