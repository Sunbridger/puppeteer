const puppeteer = require('puppeteer');
const path = p => require('path').resolve(__dirname, p);
const autoScroll = require('./autoScroll');
async function scrape() {
    const browser = await puppeteer.launch({headless: true });
    const page = await browser.newPage();
    await page.goto('https://m.weibo.cn/search?containerid=231583', {
        timeout: 3000000
    });
    await page.setViewport({
        width: 1920,
        height: 1080
    });
    await page.waitFor(2000);
    // TODO
    const result = await page.evaluate(() => {
        const arrs = Array.from(document.querySelectorAll('#app > div:nth-child(1) > div:nth-child(1) > div.card.m-panel.card16.m-col-2 > div > div .m-item-box .m-text-cut')).map(ele => ele.innerText);
        return arrs;
    });
    await browser.close();
    return result;
}

scrape().then(result => {
    console.log(result, '----');
}).catch(e => console.log(e, '----e'))
