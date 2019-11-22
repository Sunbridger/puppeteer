const puppeteer = require('puppeteer');

async function gethotnew() {
    const browser = await puppeteer.launch({
        headless: false,
        dumpio: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(`https://m.weibo.cn`);
    await page.content();
    await page.waitFor(3000);
    await page.click('#app > div.main-wrap > div.lite-topbar.main-top > div.nav-main > div > div.m-box-col.inner-box > div > div > ul > li:nth-child(2)', {
        delay: 3000
    });
    await page.waitFor(3000);
    await page.click('#app > div.main-wrap > div.lite-topbar.main-top > div.nav-main > div > div.m-box-col.inner-box > div > div > ul > li.item_li.cur', {
        delay: 1000
    });

    const result = await page.evaluate(() => {
        let ava_url = document.querySelector('#app > div.main-wrap > div:nth-child(2) > div.pannelwrap > div:nth-child(1) > div > div > div > header > div.m-avatar-box.m-box-center > a > img').src;
        let name = document.querySelector('#app > div.main-wrap > div:nth-child(2) > div.pannelwrap > div:nth-child(1) > div > div > div > header > div.m-box-dir.m-box-col.m-box-center > div > a > h3').innerText;
        let time = document.querySelector('#app > div.main-wrap > div:nth-child(2) > div.pannelwrap > div:nth-child(1) > div > div > div > header > div.m-box-dir.m-box-col.m-box-center > div > h4 > span.time').innerText;
        let text = document.querySelector('#app > div.main-wrap > div:nth-child(2) > div.pannelwrap > div:nth-child(1) > div > div > article > div > div > div.weibo-text').innerText;
        let send_num = document.querySelector('#app > div.main-wrap > div:nth-child(2) > div.pannelwrap > div:nth-child(1) > div > div > footer > div:nth-child(1) > h4').innerText;
        let comment_num = document.querySelector('#app > div.main-wrap > div:nth-child(2) > div.pannelwrap > div:nth-child(1) > div > div > footer > div:nth-child(2) > h4').innerText;
        let goods_num = document.querySelector('#app > div.main-wrap > div:nth-child(2) > div.pannelwrap > div:nth-child(1) > div > div > footer > div:nth-child(3) > h4').innerText;
        let imgsbox = document.querySelector('#app > div.main-wrap > div:nth-child(2) > div.pannelwrap > div:nth-child(1) > div > div > article > div > div > div:nth-child(2) > div > ul');
        let imgs = '[]'
        if (imgsbox) {
            imgs = JSON.stringify([...imgsbox.querySelectorAll('img')].map(el => el.src));
        }
        return {
            ava_url,
            name,
            time,
            text,
            send_num,
            comment_num,
            goods_num,
            imgs
        }
    });
    await page.close();
    await browser.close();
    return result;
}

gethotnew().then(res => {
    console.log(res);
}).catch(e => console.log(e))
