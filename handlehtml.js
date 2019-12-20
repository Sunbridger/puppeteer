const puppeteer = require('puppeteer');
const fs = require('fs');
async function scrape() {
    const browser = await puppeteer.launch({headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.tangeche.com', {
        timeout: 3000000
    });
    let aTagArr = await page.$$eval('a', (e) => e.map((a) => a.href));
    console.log(aTagArr, '---a');

    await page.evaluate(() => {
        let arrAlink = [...document.querySelectorAll('a')];
        arrAlink.forEach(a => {
            if (a.href.includes('?') || a.href.endsWith('/')) {
                a.href = a.href;
            } else {
                if (a.href !== 'javascript:;') {
                    a.href = a.href + '/';
                }
            }
        })
    });
    const content = await page.content();
    return content;
}

scrape().then(async html => {
    let writerStream = await fs.createWriteStream('test.html');
    writerStream.write(html, 'UTF8');
}).catch(e => console.log(e, '----e'))
