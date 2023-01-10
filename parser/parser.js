const puppeteer = require('puppeteer')

const URL = 'https://www.wildberries.ru/catalog/0/search.aspx?search='

//TODO
async function getPageData(search) {
    return new Promise(async(res, rej) => {
        const browser = await puppeteer.launch({
            args: [`--window-size=1920,1080`],
            defaultViewport: {
                width: 1920,
                height: 1080
            }
        })
        const page = await browser.newPage()
        await page.goto(`https://www.wildberries.ru/catalog/0/search.aspx?search=%D0%B0%D0%BB%D1%8C%D1%84%D0%B0%20%D0%BB%D0%B8%D0%BF%D0%BE%D0%B5%D0%B2%D0%B0%D1%8F%20%D0%BA%D0%B8%D1%81%D0%BB%D0%BE%D1%82%D0%B0`)

        await page.waitForNetworkIdle()

        await page.evaluate(() => {

            let btns = document.querySelectorAll('.dropdown-filter__btn');
            btns.forEach(el => {
                if (el.innerHTML == 'Бренд') {
                    el.click()
                }
            })

        })
        await page.waitForSelector('.filter__show-all', { visible: true })
        await page.evaluate(() => {
            document.querySelector('.filter__show-all').click()
        })
        page.on('response', async response => {
            if (response.url().includes('search?filters')) {
                res(response.text())
            }
        });
    })
}

getPageData().then(r => console.log(r))