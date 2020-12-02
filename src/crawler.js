const puppeteer = require('puppeteer-core');
const os = require('os');
const path = require('path');

const dirname = path.resolve(__dirname, '..', 'node_modules', 'puppeteer', '.local-chromium', 'win64-818858', 'chrome-win', 'chrome.exe');

const executablePaths = {
  'linux': "usr/bin/google-chrome",
  'darwin': "Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  'win32': dirname
}

const platform = os.platform();

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: executablePaths[platform]
  }).catch(err => console.warn(err.message));

  const page = await browser.newPage();
  await page.goto('https://www.youtube.com/watch?v=faekjlZuTFA&list=PL85ITvJ7FLohhULgUFkYBf2xcXCG6yfVV');
  await page.screenshot({
    path: 'example.png'
  });

  await browser.close();
})();
