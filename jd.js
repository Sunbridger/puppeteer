const puppeteer = require('puppeteer');

async function getJD(good_url) {
    const browser = await puppeteer.launch({
        headless: true,
        dumpio: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(good_url);
    await page.waitForSelector('#priceSale');
    const result = await page.evaluate(() => {
        let tit_price = document.querySelector('#priceSale').innerText;
        let good_title = document.querySelector('#itemName').innerText;
        let good_img = document.querySelector('#firstImg').src;
        return  {
            tit_price,
            good_title,
            good_img
        }
    });
    await page.close();
    await browser.close();
    return result;
}

getJD('https://item.m.jd.com/product/57125687264.html').then(res => {
    console.log(res, 'res');
})
