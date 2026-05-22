import puppeteer from "puppeteer-core";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../screenshots");
const URL = "http://localhost:3000";
const CHROME = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";

const VIEWPORTS = [
  { name: "mobile-320",  width: 320,  height: 700,  label: "Mobile 320px"  },
  { name: "mobile-375",  width: 375,  height: 812,  label: "Mobile 375px (iPhone SE)" },
  { name: "mobile-390",  width: 390,  height: 844,  label: "Mobile 390px (iPhone 14)" },
  { name: "tablet-768",  width: 768,  height: 1024, label: "Tablet 768px"  },
  { name: "desktop-1280",width: 1280, height: 800,  label: "Desktop 1280px"},
  { name: "desktop-1440",width: 1440, height: 900,  label: "Desktop 1440px"},
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Light mode screenshots
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto(URL, { waitUntil: "networkidle2", timeout: 15000 });
    await new Promise(r => setTimeout(r, 800));
    const file = path.join(OUT, `${vp.name}-light.png`);
    await page.screenshot({ path: file, fullPage: false });
    console.log(`✓ ${vp.label} (light) → ${path.basename(file)}`);
  }

  // Dark mode screenshots — click the theme toggle
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 15000 });
  await new Promise(r => setTimeout(r, 500));

  // Toggle to dark
  await page.evaluate(() => {
    const btn = document.querySelector('[aria-label="Toggle theme"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await new Promise(r => setTimeout(r, 300));
    const file = path.join(OUT, `${vp.name}-dark.png`);
    await page.screenshot({ path: file, fullPage: false });
    console.log(`✓ ${vp.label} (dark)  → ${path.basename(file)}`);
  }

  await browser.close();
  console.log("\nAll screenshots saved to /screenshots");
}

run().catch((err) => { console.error(err); process.exit(1); });
