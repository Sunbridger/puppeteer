const puppeteer = require('puppeteer');
async function gethotkey() {
    const browser = await puppeteer.launch({
        headless: true,
        dumpio: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://m.weibo.cn/search?containerid=231583');
    await page.waitForSelector('#app > div:nth-child(1) > div:nth-child(1) > div.card.m-panel.card16.m-col-2 > div > div .m-item-box .m-text-cut');
    const result = await page.evaluate(() => {
        let hots = Array.from(document.querySelectorAll('#app > div:nth-child(1) > div:nth-child(1) > div.card.m-panel.card16.m-col-2 > div > div .m-item-box .m-text-cut')).map(ele => ele.innerText);
        hots.pop();
        return hots;
    });
    await page.close();
    await browser.close();
    return result;
}


gethotkey().then(res => {
    console.log(res, res.length);
}).catch(e => console.log(e))
