const puppeteer = require('puppeteer');
const path = p => require('path').resolve(__dirname, p);
const autoScroll = require('./autoScroll');
async function scrape() {
    const browser = await puppeteer.launch({headless: false });
    const page = await browser.newPage();
    await page.goto('https://m.weibo.cn/p/index?containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot&title=%E5%BE%AE%E5%8D%9A%E7%83%AD%E6%90%9C', {
        timeout: 3000000
    });
    await page.setViewport({
        width: 1920,
        height: 1080
    });
    // await autoScroll(page);
    await page.screenshot({
        path: path('bb.png'),
        fullPage: true
    });
    await browser.close();

}

scrape().then(result => {
    console.log(result, '----');
}).catch(e => console.log(e, '----e'))
