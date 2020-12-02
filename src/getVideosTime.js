module.exports = async function (page, url) {
  await page.goto(String(url), {
    waitUntil: 'networkidle2'
  });

  const [hours, minutes, seconds] = await page.evaluate(() => {
    const videos = document.querySelectorAll(".ytd-playlist-video-list-renderer span.ytd-thumbnail-overlay-time-status-renderer")

    let hours = 0,
      minutes = 0,
      seconds = 0;

    videos.forEach(video => {
      const fulltime = video.innerHTML.split(':')

      if (fulltime.length > 2) {
        hours += Number(fulltime[0])
        minutes += Number(fulltime[1]);
        seconds += Number(fulltime[2]);
      } else {
        minutes += Number(fulltime[0]);
        seconds += Number(fulltime[1]);
      }
    });

    return [hours, minutes, seconds];
  })

  return [hours, minutes, seconds]
}
