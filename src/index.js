const BASE_URL = "https://restcountries.com/v3.1/all"

document.addEventListener("DOMContentLoaded", () => {




function form() {
    const form = document.getElementById("entry")
        // console.log(form)
        form.addEventListener("submit", e => {
        // Prevent reload page default on submit event
        e.preventDefault();
        // console.log(e.target)

         // Get formInput value
         let countryInput = document.querySelector("#formInput").value
         // console.log(formInputValue)

        // Clear formInput value
        form.reset()

        searchCountry(countryInput)

    })
}
form()


function notListed() {
    const name = document.createElement("h1")
    name.setAttribute("id", "name")
    name.style.fontSize = "50px"
    name.textContent = "Not listed 😢"
    searchOutput.appendChild(name)
}



function searchCountry(countryInput) {
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        const listedCountry = countries.find(country => {
            return countryInput === country.name.common })
            const searchOutput = document.querySelector("#searchOutput")
            searchOutput.replaceChildren()
            const navBtnsOutput = document.querySelector("#navBtnsOutput")
            navBtnsOutput.replaceChildren()

        if (listedCountry === undefined) {
            notListed()
        } else {
            // figure out how to put mainFacts and curiousFacts inside renderButtons
                renderCountry(listedCountry)
                renderButtons()
                mainFacts(listedCountry)
                curiousFacts(listedCountry)
        }                       
    })
}


function renderCountry(listedCountry) {
    // create function renderCountry(isListed)
    const img = document.createElement("img");
    img.setAttribute("src", listedCountry.flags.png)
    img.setAttribute("id", "flag")
    console.log(listedCountry)
    const h1 = document.createElement("h1");
    h1.textContent = listedCountry.name.common;
    h1.setAttribute("id", "name")
    const searchOutput = document.querySelector("#searchOutput")
    searchOutput.appendChild(h1)
    searchOutput.appendChild(img)
}


function renderButtons() {
    // create tags for buttons div
    const div = document.createElement("div")
    div.setAttribute("class", "buttons")
    div.setAttribute("style", "visibility: visible;")
    for (let i = 0; i < 3; i++) {
    const span = document.createElement("span")
    const button = document.createElement("button")
    button.setAttribute("class", "button nav")
    span.appendChild(button)
    div.appendChild(span)
    }
    const searchOutput = document.querySelector("#searchOutput")
    // append created nodes to the DOM
    searchOutput.appendChild(div)
    const divBtns = document.querySelector(".buttons")
    const mainFactsSpan = divBtns.childNodes[0]
    mainFactsSpan.firstChild.setAttribute("id", "main-facts-btn")
    mainFactsSpan.firstChild.textContent = "Main Facts"
    const curiousFactsSpan = divBtns.childNodes[1]
    curiousFactsSpan.firstChild.setAttribute("id", "curious-facts-btn")
    curiousFactsSpan.firstChild.textContent = "Curious Facts"
    const nameTransl = divBtns.childNodes[2]
    nameTransl.firstChild.setAttribute("id", "name-translations-btn")
    nameTransl.firstChild.textContent = "Country Name Translations"
}



function mainFacts(listedCountry) {
    const ul = document.createElement("ul")
    const hr = document.createElement("hr")
    const mainBtn = document.querySelector("#main-facts-btn")

    mainBtn.addEventListener("click", () => {
        const navBtnsOutput = document.querySelector("#navBtnsOutput")
        navBtnsOutput.replaceChildren()
        ul.replaceChildren()

        navBtnsOutput.appendChild(hr)
        hr.setAttribute("id", "topline")
        hr.setAttribute("style", "visibility: visible")
        navBtnsOutput.appendChild(ul)
        ul.setAttribute("class", "info")
        ul.setAttribute("id", "mainFacts")

        for (let i = 0; i < 7; i++) {
        const li = document.createElement("li")
        li.setAttribute("class", "item-list")

        ul.appendChild(li)
        }
        ul.childNodes[0].innerHTML = `<b>Capital: </b> ${listedCountry.capital}`
        ul.childNodes[1].innerHTML = `<b>Population: </b> ${listedCountry.population}`
        ul.childNodes[2].innerHTML = `<b>Common Name: </b> ${listedCountry.name.common }`
        ul.childNodes[3].innerHTML = `<b>Official Name: </b> ${listedCountry.name.official}`
        ul.childNodes[4].innerHTML = `<b>Region: </b> ${listedCountry.continents}`
        ul.childNodes[5].innerHTML = `<b>Languages: </b> ${Object.values(listedCountry.languages)}`
        const cur = Object.values(listedCountry.currencies);
        ul.childNodes[6].innerHTML = `<b>Currency: </b> ${cur[0].name}`
        
    })

}


function curiousFacts(listedCountry) {
    const ul = document.createElement("ul")
    const hr = document.createElement("hr")
    const curiousBtn = document.querySelector("#curious-facts-btn")

    curiousBtn.addEventListener("click", () => {   
        const navBtnsOutput = document.querySelector("#navBtnsOutput")
        navBtnsOutput.replaceChildren()
        ul.replaceChildren()

        navBtnsOutput.appendChild(hr)
        hr.setAttribute("id", "topline")
        hr.setAttribute("style", "visibility: visible")
        navBtnsOutput.appendChild(ul)
        ul.setAttribute("class", "info")
        ul.setAttribute("id", "curiousFacts")
        

        for (let i = 0; i < 7; i++) {
        const li = document.createElement("li")
        li.setAttribute("class", "item-lislt")

        ul.appendChild(li)
        }
        const div = document.createElement("div")
        const img = document.createElement("img")
        div.appendChild(img)
        img.setAttribute("src", listedCountry.coatOfArms.png)
        img.style.height = "70px"
        img.style.width = "70px"
        ul.childNodes[0].innerHTML = `<b>Coat of Arms: </b>`
        ul.childNodes[0].appendChild(div)
        
        ul.childNodes[1].innerHTML = `<b>First day of the week: </b> ${listedCountry.startOfWeek}`

        if (listedCountry.independent === true) {
            ul.childNodes[2].innerHTML = '<b>Independency: </b> Independent'
        } else {
        ul.childNodes[2].innerHTML = '<b>Independency: </b> Not-Independent'
        }

        ul.childNodes[3].innerHTML = `<b>Area: </b> ${listedCountry.area} km²`

        const timeZones = Object.values(listedCountry.timezones)
        ul.childNodes[4].innerHTML = `<b>Time Zones: </b> ${timeZones.join(", ")}`

        const borders = Object.values(listedCountry.borders)
        ul.childNodes[5].innerHTML = `<b>Borders: </b> ${borders.join(", ")}`
    })

}








})



