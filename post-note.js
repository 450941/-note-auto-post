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

  const inputs = page.locator("input");

  console.log("ログイン入力欄:", await inputs.count());

  await inputs.nth(0).fill(process.env.NOTE_EMAIL);
  await inputs.nth(1).fill(process.env.NOTE_PASSWORD);

  console.log("ログインボタンを押します...");

  await page.locator('button[type="submit"]').click();

  await page.waitForTimeout(8000);

  console.log("ログイン後URL:", page.url());
  console.log("ページタイトル:", await page.title());

  const bodyText = await page.locator("body").innerText();

  console.log("ログイン後画面の先頭:");
  console.log(bodyText.substring(0, 1000));

  await browser.close();
})();
