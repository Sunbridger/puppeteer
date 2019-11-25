const puppeteer = require('puppeteer');

async function gethotnew() {
    const browser = await puppeteer.launch({
        headless: true,
        dumpio: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 375,
        height: 667
    });
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
    await page.goto(`https://m.tb.cn/h.evnGf1H?sm=b8b249`);
    await page.waitFor(3000);
    const result = await page.evaluate(() => {
        const price = document.querySelector('.price').innerText;
        const name = document.querySelector('#J_mod7 > div > div > div').innerText;
        return {
            price,
            name
        };
    });
    await page.close();
    await browser.close();
    return result;
}


gethotnew().then(res => {
    console.log(res);
}).catch(e => console.log(e))
