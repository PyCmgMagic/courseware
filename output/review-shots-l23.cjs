const { chromium } = require('playwright');
const { mkdirSync } = require('node:fs');
const path = require('node:path');

(async () => {
  const base = process.argv[2] || 'http://localhost:5176';
  const out = path.join(__dirname, 'review');
  mkdirSync(out, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const errors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', (err) => errors.push(String(err)));

  const pad = (n) => String(n).padStart(2, '0');
  const shot = (name) => page.screenshot({ path: path.join(out, `${name}.png`) });
  const pill = page.locator('.nav-controls > span.glass-panel').first();

  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);

  for (const [lessonIdx, total] of [[2, 13], [3, 13]]) {
    await page.getByRole('button', { name: new RegExp(`进入第 ${lessonIdx} 课时`) }).click();
    await page.waitForTimeout(1300);

    for (let s = 1; s <= total; s++) {
      await page.waitForTimeout(1250);
      await shot(`L${lessonIdx}-p${pad(s)}-entry`);

      // interaction checks
      if (lessonIdx === 2 && s === 4) {
        await page.locator('button', { hasText: '四条腿' }).first().click();
        await page.locator('button', { hasText: '胡须 + 尖耳朵' }).first().click();
        await page.waitForTimeout(500);
        await shot('L2-p04-flipcards');
      }
      if (lessonIdx === 2 && s === 12) {
        await page.getByRole('button', { name: /不是猫/ }).first().click();
        await page.waitForTimeout(700);
        await shot('L2-p12-quiz-solved');
      }
      if (lessonIdx === 3 && s === 11) {
        await page.locator('button', { hasText: '每踩一次奖励点' }).first().click();
        await page.waitForTimeout(700);
        await shot('L3-p11-quiz-solved');
      }

      for (let k = 1; k <= 7; k++) {
        const before = await pill.innerText();
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(800);
        const after = await pill.innerText();
        if (after !== before) break;
        await shot(`L${lessonIdx}-p${pad(s)}-step${k}`);
      }
    }

    await page.getByRole('button', { name: '返回课程首页' }).click();
    await page.waitForTimeout(900);
  }

  console.log('console errors:', errors.length ? errors : 'none');
  await browser.close();
})();
