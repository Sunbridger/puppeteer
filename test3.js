const puppeteer = require('puppeteer');
async function gethotnew() {
    const browser = await puppeteer.launch({
        headless: false,
        dumpio: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    // 设置浏览器信息
    const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
    await Promise.all([
        page.setCacheEnabled(false),
        page.setUserAgent(UA),
        page.setJavaScriptEnabled(true),
        page.setViewport({width: 375, height: 667})
    ]);
    await page.goto(`https://m.weibo.cn/`);
    await page.waitFor(10000);
    const result = await page.evaluate(async () => {
        const result = Array.from(document.querySelectorAll('.f-weibo')).map(node => {
            let ava_url = node.querySelector('.m-img-box > img').src;
            let name = node.querySelector('.m-text-cut').innerText;
            let text = node.querySelector('.weibo-text').innerHTML;
            console.log(node.querySelector('footer > div:nth-child(1) > h4'),node.querySelector('footer > div:nth-child(3) > h4'),node.querySelector('footer > div:nth-child(2) > h4') ,'--=-=');
            let send_num = node.querySelector('footer > div:nth-child(1) > h4').innerText;
            let comment_num = node.querySelector('footer > div:nth-child(2) > h4').innerText;
            let goods_num = node.querySelector('footer > div:nth-child(3) > h4').innerText;
            let imgs = '';
            let imgFlag = node.querySelectorAll('.m-img-box');
            if (imgFlag) {
                imgs = Array.from(imgFlag).map(el => el.querySelector('img').src);
            }
            return {
                name,
                ava_url,
                text,
                imgs,
                send_num,
                comment_num,
                goods_num
            }
        });
        return result
    });
    await page.close();
    await browser.close();
    return result;
}

gethotnew().then(res => {
    console.log(res, res.length);
}).catch(e => console.log(e))
