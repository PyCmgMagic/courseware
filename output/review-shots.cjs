const { chromium } = require('playwright');
const { mkdirSync } = require('node:fs');
const path = require('node:path');

(async () => {
  const base = process.argv[2] || 'http://localhost:5173';
  const out = path.join(__dirname, 'review');
  mkdirSync(out, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  const errors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', (err) => errors.push(String(err)));

  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  await page.getByRole('button', { name: /进入第 1 课时/ }).click();
  await page.waitForTimeout(1200);

  const pill = page.locator('.nav-controls > span.glass-panel').first();
  const pad = (n) => String(n).padStart(2, '0');
  const shot = (name) => page.screenshot({ path: path.join(out, `${name}.png`) });

  for (let s = 1; s <= 14; s++) {
    await page.waitForTimeout(1300);
    await shot(`L1-p${pad(s)}-entry`);

    // --- interaction checks on quiz slides ---
    if (s === 6) {
      // wrong pick flashes red
      await page.getByRole('button', { name: '去太空旅行' }).first().click();
      await page.waitForTimeout(250);
      await shot('L1-p06-quiz-wrong');
      // correct pick solves, reveals explains + prob bars
      await page.getByRole('button', { name: '回家' }).first().click();
      await page.waitForTimeout(900);
      await shot('L1-p06-quiz-solved');
    }
    if (s === 11) {
      const cards = page.locator('button', { hasText: '写数学计算步骤' });
      await cards.first().click();
      await page.locator('button', { hasText: '续写童话故事' }).first().click();
      await page.waitForTimeout(600);
      await shot('L1-p11-flipcards');
    }
    if (s === 13) {
      await page.locator('button', { hasText: '列出某历史人物' }).first().click();
      await page.waitForTimeout(900);
      await shot('L1-p13-quiz-solved');
    }

    for (let k = 1; k <= 6; k++) {
      const before = await pill.innerText();
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(850);
      const after = await pill.innerText();
      if (after !== before) break;
      await shot(`L1-p${pad(s)}-step${k}`);
    }
  }

  console.log('console errors:', errors.length ? errors : 'none');
  await browser.close();
})();
