const BASE_URL = "https://restcountries.com/v3.1/all"

document.addEventListener("DOMContentLoaded", () => {




function form() {
    const form = document.getElementById("entry")

        form.addEventListener("submit", e => {

        e.preventDefault();

        
         let countryInput = document.querySelector("#formInput").value

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
                nameTranslations(listedCountry)
                clearCountry()
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
    for (let i = 0; i < 4; i++) {
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
    const clearCountry = divBtns.childNodes[3]
    clearCountry.firstChild.setAttribute("id", "clear-country-btn")
    clearCountry.firstChild.textContent = "Clear Country"
}



function mainFacts(listedCountry) {
    const ul = document.createElement("ul")
    const hr = document.createElement("hr")
    const h2 = document.createElement("h2")
    const mainBtn = document.querySelector("#main-facts-btn")

    mainBtn.addEventListener("click", () => {
        const navBtnsOutput = document.querySelector("#navBtnsOutput")
        navBtnsOutput.replaceChildren()
        ul.replaceChildren()

        navBtnsOutput.appendChild(hr)
        h2.setAttribute("class", "list-header")
        h2.textContent = "Main Facts"
        navBtnsOutput.appendChild(h2)
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
        const lang = Object.values(listedCountry.languages)
        ul.childNodes[5].innerHTML = `<b>Languages: </b> ${lang.join(", ")}`
        const cur = Object.values(listedCountry.currencies);
        ul.childNodes[6].innerHTML = `<b>Currencies: </b> ${cur[0].name}`
        
    })

}


function curiousFacts(listedCountry) {
    const ul = document.createElement("ul")
    const hr = document.createElement("hr")
    const h2 = document.createElement("h2")

    const curiousBtn = document.querySelector("#curious-facts-btn")

    curiousBtn.addEventListener("click", () => {   
        const navBtnsOutput = document.querySelector("#navBtnsOutput")
        navBtnsOutput.replaceChildren()
        ul.replaceChildren()

        navBtnsOutput.appendChild(hr)
        h2.setAttribute("class", "list-header")
        h2.textContent = "Curious Facts"
        navBtnsOutput.appendChild(h2)
        hr.setAttribute("id", "topline")
        hr.setAttribute("style", "visibility: visible")
        navBtnsOutput.appendChild(ul)
        ul.setAttribute("class", "info")
        ul.setAttribute("id", "curiousFacts")
        

        for (let i = 0; i < 7; i++) {
        const li = document.createElement("li")
        li.setAttribute("class", "item-list")

        ul.appendChild(li)
        }
        const div = document.createElement("div")
        const img = document.createElement("img")
        div.appendChild(img)
        img.setAttribute("src", listedCountry.coatOfArms.png)
        img.style.height = "110px"
        img.style.width = "110px"
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

        if (listedCountry.unMember === true) {
            ul.childNodes[6].innerHTML = '<b>United Nations Member: </b> Yes'
        } else {
            ul.childNodes[6].innerHTML = '<b>United Nations Member: </b> No'
        }
    })

}


function nameTranslations(listedCountry) {
    const ul = document.createElement("ul")
    const hr = document.createElement("hr")
    const h2 = document.createElement("h2")
    const translBtn = document.querySelector("#name-translations-btn")

    translBtn.addEventListener("click", () => {   
        const navBtnsOutput = document.querySelector("#navBtnsOutput")
        navBtnsOutput.replaceChildren()
        ul.replaceChildren()

        navBtnsOutput.appendChild(hr)
        h2.setAttribute("class", "list-header")
        h2.textContent = "Country Name Translations"
        navBtnsOutput.appendChild(h2)
        hr.setAttribute("id", "topline")
        hr.setAttribute("style", "visibility: visible")
        navBtnsOutput.appendChild(ul)
        ul.setAttribute("class", "info")
        ul.setAttribute("id", "countryTranslations")

        const array = Object.entries(listedCountry.translations);
        console.log(array)
        array.forEach(language => {
            const li = document.createElement("li")
            li.setAttribute("class", "item-list")
        ul.appendChild(li)
        });

        ul.childNodes[0].innerHTML = `<b>Arabic: </b> ${array[0][1].official}`
        ul.childNodes[1].innerHTML = `<b>Czech: </b> ${array[1][1].official}`
        ul.childNodes[2].innerHTML = `<b>Welsh: </b> ${array[2][1].official}`
        ul.childNodes[3].innerHTML = `<b>German: </b> ${array[3][1].official}`
        ul.childNodes[4].innerHTML = `<b>Estonian: </b> ${array[4][1].official}`
        ul.childNodes[5].innerHTML = `<b>Finnish: </b> ${array[5][1].official}`
        ul.childNodes[6].innerHTML = `<b>French: </b> ${array[6][1].official}`
        ul.childNodes[7].innerHTML = `<b>Croatian: </b> ${array[7][1].official}`
        ul.childNodes[8].innerHTML = `<b>Hunnic: </b> ${array[8][1].official}`
        ul.childNodes[9].innerHTML = `<b>I.T.A.: </b> ${array[9][1].official}`
        ul.childNodes[10].innerHTML = `<b>Japanese: </b> ${array[10][1].official}`
        ul.childNodes[11].innerHTML = `<b>Korean: </b> ${array[11][1].official}`
        ul.childNodes[12].innerHTML = `<b>Dutch: </b> ${array[12][1].official}`
        ul.childNodes[13].innerHTML = `<b>Persian: </b> ${array[13][1].official}`
        ul.childNodes[14].innerHTML = `<b>Polish: </b> ${array[14][1].official}`
        ul.childNodes[15].innerHTML = `<b>Portuguese: </b> ${array[15][1].official}`
        ul.childNodes[16].innerHTML = `<b>Russian: </b> ${array[16][1].official}`
        ul.childNodes[17].innerHTML = `<b>Slovak: </b> ${array[17][1].official}`
        ul.childNodes[18].innerHTML = `<b>Spanish: </b> ${array[18][1].official}`
        ul.childNodes[19].innerHTML = `<b>Swedish: </b> ${array[19][1].official}`
        ul.childNodes[20].innerHTML = `<b>Urdu: </b> ${array[20][1].official}`
        ul.childNodes[21].innerHTML = `<b>Chinese: </b> ${array[21][1].official}`
    })
}


function clearCountry() {
    const clearBtn = document.querySelector("#clear-country-btn")

    clearBtn.addEventListener("click", () => {
        const searchOutput = document.querySelector("#searchOutput")
        searchOutput.replaceChildren()
        const navBtnsOutput = document.querySelector("#navBtnsOutput")
        navBtnsOutput.replaceChildren()
    })
    
}



})



