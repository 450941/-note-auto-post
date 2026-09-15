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

  console.log("ログイン完了:", page.url());

  console.log("新規記事作成画面を開いています...");

  await page.goto("https://note.com/notes/new", {
    waitUntil: "domcontentloaded"
  });

  await page.waitForTimeout(5000);

  console.log("記事タイトルを入力しています...");

  const title = "うつ病から社会復帰するために大切なこと";

  const body = `うつ病から社会復帰することは、簡単なことではありません。

焦って元の生活に戻ろうとすると、かえって心と体に負担をかけてしまうことがあります。

大切なのは、「以前の自分に戻る」ことではなく、今の自分に合ったペースを見つけることです。

今日は、うつ病から社会復帰するときに大切にしたいことについて書いていきます。

まずは小さなことから始める。
朝起きる時間を決める。
外に少しだけ出てみる。
誰かと話してみる。

そんな小さな一歩でも十分です。

社会復帰は、ある日突然完成するものではありません。

休むことも前に進むことの一つです。

自分を責めず、自分のペースで進んでいくこと。

それが、長く歩いていくために大切なのだと思います。`;

  const titleInput = page.locator('input').filter({
    has: undefined
  }).first();

  await page.locator('input').first().fill(title);

  console.log("本文を入力しています...");

  const editor = page.locator('[contenteditable="true"]').first();

  await editor.click();
  await editor.fill(body);

  console.log("タイトルと本文の入力が完了しました");
  console.log("現在のURL:", page.url());

  await page.waitForTimeout(3000);

  await browser.close();
})();
