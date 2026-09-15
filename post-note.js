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

  await page.waitForTimeout(3000);

  console.log("ログイン情報を入力しています...");

  const inputs = page.locator("input");

  await inputs.nth(0).fill(process.env.NOTE_EMAIL);
  await inputs.nth(1).fill(process.env.NOTE_PASSWORD);

  await page.locator('button[type="submit"]').click();

  await page.waitForTimeout(5000);

  console.log("ログイン後URL:", page.url());

  console.log("新規記事作成画面を開いています...");

  await page.goto("https://note.com/notes/new", {
    waitUntil: "domcontentloaded"
  });

  await page.waitForTimeout(5000);

  console.log("現在のURL:", page.url());
  console.log("新規記事作成画面を開きました");

  await browser.close();
})();
