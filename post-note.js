const { chromium } = require("playwright");

(async () => {

  const browser = await chromium.launch({

    headless: true

  });

  const page = await browser.newPage();

  console.log("noteにアクセス中...");

  await page.goto("https://note.com/login", {

    waitUntil: "domcontentloaded"

  });

  console.log("ログイン情報を入力中...");

  const emailInput = page.locator('input').filter({ has: undefined }).first();

  const inputs = await page.locator('input').all();

  console.log(`入力欄を${inputs.length}個検出しました`);

  await page.locator('input[type="email"], input[name="email"]').first().fill(process.env.NOTE_EMAIL);

  await page.locator('input[type="password"]').fill(process.env.NOTE_PASSWORD);

  await page.locator('button[type="submit"]').click();

  await page.waitForTimeout(5000);

  console.log("ログイン処理完了");

  await browser.close();

})();
