const puppeteer = require('puppeteer');


async function scrape() {
    const browser = await puppeteer.launch({headless: false });
    const page = await browser.newPage();
    await page.goto('https://seo.chinaz.com/souche.com', {
        timeout: 3000000
    });
    const result = await page.evaluate(() => {
        let name = document.querySelector("#seo_BaiduPages a").innerText;
        let key = document.querySelector("body > div.wrapper.bor-t1s02 > div > div:nth-child(4) > ul > li.col-gray02.bg-list > div:nth-child(2)").innerText;
        return {
            [key]: name
        }
    })
    return result;
}

scrape().then(result => {
    console.log(result, '----');
})