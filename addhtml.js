const puppeteer = require('puppeteer');
const fs = require('fs');
async function scrape() {
    const browser = await puppeteer.launch({headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.tangeche.com', {
        timeout: 3000000
    });
    let aTagArr = await page.$$eval('a', (e) => e.map((a) => a.href));
    this.entryUrl = 'https://www.tangeche.com/';
    await page.evaluate((entryUrl) => {
        [...document.querySelectorAll('a')].forEach(a => {
            if (a.href.includes('?') || a.href.endsWith('/')) {
                a.href = a.href;
            } else {
                if (a.href !== 'javascript:;') {
                    a.href = a.href + '/';
                }
            }

            if (a.href !== 'javascript:;' && !a.href.includes(entryUrl)) {
                a.setAttribute('rel', 'nofollow');
            }
        });
        let html = document.documentElement || document.querySelector('html');
        html.setAttribute('xmlns', 'http://www.w3c.org/1999/xhtml');
        html.setAttribute('xml:lang', 'zh-CN');
        html.setAttribute('lang', 'zh-CN');
        [...document.querySelectorAll('img')].forEach(img => {
            img.alt = img.alt ? img.alt : '弹个车';
            img.title = img.title ? img.title : '弹个车';
        });
    }, this.entryUrl);
    const content = await page.content();
    return content;
}

scrape().then(async html => {
    let writerStream = await fs.createWriteStream('test.html');
    writerStream.write(html, 'UTF8');
}).catch(e => console.log(e, '----e'))
