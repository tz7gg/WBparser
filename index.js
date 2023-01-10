const URL = 'https://search.wb.ru/exactmatch/ru/common/v4/search?filters=fbrand&query=&resultset=filters&suppressSpellcheck=false&spp=0&pricemarginCoeff=1.0&reg=0&appType=1&emp=0&couponsGeo=all&dest=-1113276,-77687,-398407,-1581689&'


async function init() {
    const searchText = document.querySelector('.search-text input')
    const searchBrand = document.querySelector('.search-brand input')
    const searchBtn = document.querySelector('.search-btn')

    const resultWrap = document.querySelector('.result')
    const infoWrap = document.querySelector('.info')

    let data

    async function API(search) {
        return await fetch(`https://search.wb.ru/exactmatch/ru/common/v4/search?filters=fbrand&query=${search}&resultset=filters&suppressSpellcheck=false&spp=0&pricemarginCoeff=1.0&reg=0&appType=1&emp=0&couponsGeo=all&dest=-1113276,-77687,-398407,-1581689&`)
            .then(r => r.json()).then(r => r)
    }

    searchBtn.addEventListener('click', async() => {
        const search = searchText.value.replace(' ', '%20')
        data = await API(search)
        if (data.data) {
            render()
        } else {
            resultWrap.innerHTML = ''
            infoWrap.innerHTML = 'По вашему запросу ничего не найдено!'
            infoWrap.classList.remove('active')
        }
    })

    function render() {
        resultWrap.innerHTML = data.data.filters[0].items.reduce((acc, el) => {
            let coincidence = false
            if (searchBrand.value.toLowerCase() === el.name.toLowerCase() && searchBrand.value) {
                coincidence = true
            }
            return acc + `<li class='${coincidence ? 'active' : ''}'>${el.name}</li>`
        }, '')
        if (document.querySelector('li.active')) {
            infoWrap.innerHTML = `Есть совпадения: ${searchBrand.value.toLowerCase()} <br>всего товаров: ${data.data.total} (без учета региона)<br> всего брендов: ${data.data.filters[0].items.length}`
            infoWrap.classList.add('active')
        } else {
            infoWrap.innerHTML = `Совпадений не найдено <br>всего товаров: ${data.data.total} (без учета региона) <br> всего брендов: ${data.data.filters[0].items.length}`
            infoWrap.classList.remove('active')
        }
    }
}

init()