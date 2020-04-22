const puppeteer = require('puppeteer');
const fs = require('fs');
async function scrape() {
    const browser = await puppeteer.launch({headless: false });
    const page = await browser.newPage();
    await page.goto('https://m.tangeche.com/buy', {
        timeout: 3000000
    });
    const content = await page.content();
    return content;
}

scrape().then(async html => {
    let writerStream = await fs.createWriteStream('test.html');
    writerStream.write(html, 'UTF8');
}).catch(e => console.log(e, '----e'))
