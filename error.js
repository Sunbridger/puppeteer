const puppeteer = require('puppeteer');
async function fn() {
    try {
        let browser = await puppeteer.launch({
            headless: true,
            dumpio: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        let page = await browser.newPage();
        await page.goto('url', {waitUntil: 'networkidle0'});
    } catch (error) {
        handleBrowserError(error)
        // console.log(error, 'error---->', typeof error, Array.isArray(error),JSON.stringify(error).length);
    }
}
fn();


function handleBrowserError (error) {
    console.log('---->',error.message, '<-----error');
}
