const url = "https://api.coindesk.com/v1/bpi/currentprice.json"
const url30D = "https://api.coindesk.com/v1/bpi/historical/close.json"
const priceTag = document.querySelector("h1")
const currencyTag = document.querySelector("span#currency")
const historyTag = document.querySelector("span#price")
const bodyTag = document.querySelector("body")
const navLinks = document.querySelectorAll("nav a")
const urls = [url, url30D]
let exchange = {USD: 1, GBP: 0.8, EUR: 0.9}

const USDe = "https://api.apilayer.com/exchangerates_data/latest?symbols=usd&base=usd"
const GBPe = "https://api.apilayer.com/exchangerates_data/latest?symbols=gbp&base=usd"
const EURe = "https://api.apilayer.com/exchangerates_data/latest?symbols=eur&base=usd"
// const exchange = [USDe, GBPe, EURe]
let currency = "USD"

//get latest exchange rate
var myHeaders = new Headers();
myHeaders.append("apikey", "dDoy0jHULAjqNy5PZ0P0oCyu3bjRrlfw");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const exchangeRate = () => {
    fetch(GBPe, requestOptions)
        .then(response => response.json())
        .then(result => {
            exchange.GBP = result.rates.GBP
        })
        .catch(error => console.log('error', error));
    fetch(EURe, requestOptions)
        .then(response => response.json())
        .then(result => {
            exchange.EUR = result.rates.EUR
        })
        .catch(error => console.log('error', error));


        // Promise.all(exchange.map(u=>fetch(u), requestOptions)).then(responses =>
        //     Promise.all(responses.map(res => res.text()))
        // ).then(result => {
        //     console.log("success")
        // })

}

//manipualate DOM, switch currency
navLinks.forEach(link => {
    // console.log(link)
    link.addEventListener("click", () => {
        currency = link.getAttribute("data-currency")
        checkPrice()
        historyPrice()

        navLinks.forEach(link => link.classList.remove("selected"))

        link.classList.add("selected")

        currencyTag.innerHTML = currency
    })
})



// update current price of BTC
const checkPrice = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            priceTag.innerHTML = data.bpi[currency].rate_float.toFixed(1)
        })
}

checkPrice()

setInterval(() => {
    checkPrice()
}, 10000) 



// Post yesteryday's price
const today = new Date()
const d = new Date()
d.setDate(today.getDate() - 1)
const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
yesterday = `${ye}-${mo}-${da}`

const historyPrice = () => {
    fetch(url30D)
        .then(response => response.json())
        .then(data => {
            exchangeRate()
            usdP = data.bpi[yesterday].toFixed(1)
            historyTag.innerHTML = (usdP * exchange[currency]).toFixed(1)
            console.log(exchange)
        })
}

historyPrice()



//compare price
const comparePrice = () => {
    Promise.all(urls.map(u=>fetch(u))).then(responses =>
        Promise.all(responses.map(res => res.json()))
    ).then(data => {
        oldP = data[1].bpi[yesterday].toFixed(1)
        newP = data[0].bpi[currency].rate_float.toFixed(1)
        if ((newP - oldP) < 0)
        {
            bodyTag.style.color = "#CDF360"
            bodyTag.style.backgroundImage = "linear-gradient(180deg,#000000 50%, #CDF360 150%)"
        } else {
            bodyTag.style.color = "#EC6587"
            bodyTag.style.backgroundImage = "linear-gradient(180deg,#000000 50%, #EC6587 150%)"
        }
    })

}

comparePrice()


