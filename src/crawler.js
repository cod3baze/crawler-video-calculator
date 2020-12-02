const puppeteer = require('puppeteer-core');
const os = require('os');
const path = require('path');
const getVideosTime = require('./getVideosTime');

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

  const cdDiego = await getVideosTime(page, 'https://www.youtube.com/playlist?list=PL85ITvJ7FLohhULgUFkYBf2xcXCG6yfVV')
  const cdMaykao = await getVideosTime(page, 'https://www.youtube.com/playlist?list=PL85ITvJ7FLoifcDIBeuuAhh4_799RZaSc')

  let hours = cdDiego[0] + cdMaykao[0]
  let minutes = cdDiego[1] + cdMaykao[1]
  let seconds = cdDiego[2] + cdMaykao[2]

  const minutesFromSeconds = Math.floor(seconds / 60);

  seconds = seconds % 60;
  minutes += minutesFromSeconds;

  const hoursFromMinutes = Math.floor(minutes / 60);

  minutes = minutes % 60;
  hours += hoursFromMinutes

  console.log(
    `Produzimos ${hours}:${minutes}:${seconds} de conteúdo para o Codedrops`
  );
  // document.querySelectorAll(".ytd-playlist-video-list-renderer span.ytd-thumbnail-overlay-time-status-renderer")

  await browser.close();
})();
