const puppeteer = require('puppeteer');
const fs = require('fs');
const clsName = '.wa-match-schedule-list-wrapper';

const autoScroll = async (page) => {
    return page.evaluate(() => {
        return new Promise((resolve, reject) => {
            //滚动的总高度
            var totalHeight = 0;
            //每次向下滚动的高度 100 px
            var distance = 100;
            var timer = setInterval(() => {
                //页面的高度 包含滚动高度
                var scrollHeight = document.body.scrollHeight;
                //滚动条向下滚动 distance
                window.scrollBy(0, distance);
                totalHeight += distance;
                //当滚动的总高度 大于 页面高度 说明滚到底了。也就是说到滚动条滚到底时，以上还会继续累加，直到超过页面高度
                if (totalHeight >= scrollHeight) {

                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        })
    });
}

async function scrape() {
    const browser = await puppeteer.launch({headless: false });
    const page = await browser.newPage();
    await page.goto('https://tiyu.baidu.com/match/NBA/tab');
    await page.waitForSelector(clsName);
    // await autoScroll(page);
    const result = await page.evaluate((clsName) => {
        let hots = Array.from(document.querySelectorAll(clsName)).map((outdiv) => {
            let result = {};
            let time = outdiv.querySelector('.date').innerText;
            let teamName = [...outdiv.querySelectorAll('.vs-info')].map((vi) => {
                return [...vi.querySelectorAll('.team-name')].map((el) => el.innerText);
            });
            let timeS = [...outdiv.querySelectorAll('.vs-info')].map((vi) => {
                return [...vi.querySelectorAll('.c-gap-bottom-small')].map((el) => el.innerText);
            });
            let teamScroe = [...outdiv.querySelectorAll('.vs-info')].map((vi) => {
                return [...vi.querySelectorAll('.team-score-num')].map((el) => el.innerText);
            });
            let teamStatus = [...outdiv.querySelectorAll('.vs-info')].map((vi) => {
                return [...vi.querySelectorAll('.vs-info-status-linshi')].map((el) => el.innerText);
            });
            let teamPic = [...outdiv.querySelectorAll('.vs-info')].map((vi) => {
                return [...vi.querySelectorAll('.team-row > .inline-block:nth-child(1)')].map((el) => el.style.backgroundImage.replace('url("', '').replace('")', ''));
            });

            result.date = time;
            result.items = teamStatus.map((status, index) => {
                let teams = teamName.map((name, index) => ({
                    name,
                    url: teamPic[index],
                    scroll: teamScroe[index]
                }));
                return {
                    status,
                    beginTime: timeS[index],
                    teams
                }
            })




            return result
        });
        return hots;
    }, clsName);
    return result;
    await page.close();
    await browser.close();
}

scrape().then(res => {
    handRes(res);
});

function handRes(res) {
    let html = '';
    res.forEach((d) => {
        html += d.date + '\n';
        d.items.forEach((row) => {
            let status = row.status;
            let beginTime = row.beginTime;
            row.teams.forEach((item) => {
                let t1 = item.name[0];
                let t2 = item.name[1];
                let s1 = item.scroll[0];
                let s2 = item.scroll[1];
                let u1 = item.url[0];
                let u2 = item.url[1];
            });
            html += `开始时间：${beginTime} 状态：${status}  ${t1}: ${s1} \t ${t2}: ${s2} `;
        })
    })
    console.log(html);
}

/**
 * result: {
    date: any;
    items: {
        status: any[];
        beginTime: any[];
        teams: {
            name: any[];
            url: any[];
            scroll: any[];
        }[];
    }[];
}
 */
