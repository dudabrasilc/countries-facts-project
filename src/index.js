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
    name.style.fontSize = "60px"
    name.textContent = "Not listed 😢"
    searchOutput.appendChild(name)
}



function searchCountry(countryInput) {
    // FETCH REQUEST
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        const listedCountry = countries.find(country => {
            return countryInput === country.name.common })
            // console.log(isListed)
            const searchOutput = document.querySelector("#searchOutput")
            searchOutput.replaceChildren()
            const div = document.querySelector("#info")
            div.replaceChildren()

        if (listedCountry === undefined) {
            notListed()
        } else {
                renderCountry(listedCountry)
                renderButtons()
                mainFactsBtn(listedCountry)
        }                       
    })
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
    mainFactsSpan.firstChild.setAttribute("id", "main-facts")
    mainFactsSpan.firstChild.textContent = "Main Facts"
    const curiousFactsSpan = divBtns.childNodes[1]
    curiousFactsSpan.firstChild.setAttribute("id", "curious-facts")
    curiousFactsSpan.firstChild.textContent = "Curious Facts"
    const nameTransl = divBtns.childNodes[2]
    nameTransl.firstChild.setAttribute("id", "name-translations")
    nameTransl.firstChild.textContent = "Country Name Translations"
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


function mainFactsBtn(listedCountry) {
    const mainBtn = document.querySelector("#main-facts")

    mainBtn.addEventListener("click", () => {
    
        const div = document.querySelector("#info")
        console.log(div)
        const ul = document.createElement("ul")
        div.appendChild(ul)

        for (let i = 0; i < 7; i++) {
        const li = document.createElement("li")
        // FIGURE HOW TO BOLD STRING

        ul.appendChild(li)
        }
        ul.childNodes[0].innerHTML = `<b>Capital: </b> ${listedCountry.capital}`
        ul.childNodes[1].innerHTML = `<b>Population: </b> ${listedCountry.population}`
        ul.childNodes[2].innerHTML = `<b>Common Name: </b> ${listedCountry.name.common }`
        ul.childNodes[3].innerHTML = `<b>Official Name: </b> ${listedCountry.name.official}`
        ul.childNodes[4].innerHTML = `<b>Region: </b> ${listedCountry.continents}`
        ul.childNodes[5].innerHTML = `<b>Languages: </b> ${Object.values(listedCountry.languages)}`
        // ADD CURRENCIES
        
        const body = document.querySelector("body")
        body.appendChild(div)
    })

}









})



