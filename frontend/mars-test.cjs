const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--use-gl=swiftshader', '--enable-unsafe-swiftshader'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  page.on('pageerror', (e) => console.log('PAGEERROR:', e.message));
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') console.log('CONSOLE:', m.type(), m.text().slice(0, 200));
  });

  // 1. Explore page
  await page.goto('http://localhost:5174/explore', { waitUntil: 'domcontentloaded', timeout: 60000 });
  console.log('on explore page');

  // 2. Click the Mars Html button (wait for glb load)
  await page.waitForFunction(
    () => [...document.querySelectorAll('button')].some((b) => b.textContent.trim() === 'Mars'),
    { timeout: 60000 }
  );
  console.log('Mars button found');
  await page.evaluate(() =>
    [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Mars').click()
  );
  console.log('clicked Mars');

  // 3. Wait for warp overlay + navigation to /mars
  await page.waitForFunction(() => location.pathname === '/mars', { timeout: 30000 });
  console.log('arrived at /mars');

  // 4. Wait for markers to render (Html tooltips exist in DOM as buttons? markers are meshes)
  await new Promise((r) => setTimeout(r, 4000));
  await page.screenshot({ path: '/tmp/mars-page.png' });
  console.log('screenshot saved');

  // 5. Count marker meshes via three fiber: check for Html tooltips by hovering.
  // Hover the first marker: find canvas and move mouse over it — markers are 3D, so we
  // instead click via the equipment list buttons and verify the detail panel updates.
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')];
    const target = btns.find((b) => b.textContent.trim() === 'Opportunity Rover');
    target.click();
  });
  await new Promise((r) => setTimeout(r, 500));
  const detailText = await page.evaluate(() => document.body.innerText);
  console.log('detail mentions marathoner:', detailText.includes('marathoner'));
  console.log('detail has coords:', detailText.includes('1.94'));

  // 6. WebGL readback is blank headless (no preserveDrawingBuffer), so verify the
  //    canvas is live by size + that the screenshot (saved above) shows the globe.
  const canvasData = await page.evaluate(() => {
    const c = document.querySelector('canvas');
    return c ? { w: c.width, h: c.height } : null;
  });
  console.log('canvas size:', JSON.stringify(canvasData));

  // 7. Hover marker: raycast via three fiber is hard headless; click marker by simulating
  //    pointer on the known projected position is unreliable. Verify Html tooltip by
  //    dispatching pointer events on the canvas center where a marker may be.

  await browser.close();
  console.log('DONE');
})().catch((e) => {
  console.error('FAILED:', e.message);
  process.exit(1);
});
