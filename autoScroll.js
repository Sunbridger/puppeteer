module.exports = async function autoScroll(page) {
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
