const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set viewport and dimensions
  await page.setViewport({ width: 900, height: 700 });

  // Retrieve artists from query parameters
  const url = 'https://artist-top.vercel.app/TopArtists.html?artists=Sabrina%20Carpenter%0aRenee%20Rapp';
  const artists = new URLSearchParams(new URL(url).search).get('artists').split('\n');

  // Set HTML content dynamically
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Top Artists</title>
        <!-- Import Josefin Sans from Google Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@700&display=swap" rel="stylesheet">
        <style>
            body {
                position: relative;
                width: 900px;
                height: auto;
                background-color: #00000000;
            }

            .title {
                font-family: 'Josefin Sans', sans-serif;
                font-style: normal;
                font-weight: 700;
                font-size: 36px;
                line-height: 1.5;
                color: #F8396F;
                margin-bottom: 10px;
            }

            .artists {
                font-family: 'Josefin Sans', sans-serif;
                font-style: normal;
                font-weight: 700;
                font-size: 28px;
                line-height: 1.5;
                color: #FFFFFF;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class="title">Top Artists</div>
        <div class="artists" id="artists">${artists.map(artist => `<div>${artist}</div>`).join('')}</div>
    </body>
    </html>
  `;

  // Set HTML content
  await page.setContent(htmlContent);

  // Wait for some time to ensure rendering is complete
  await page.waitForTimeout(1000);

  // Capture screenshot
  await page.screenshot({ path: 'artists.png' });

  await browser.close();
})();
