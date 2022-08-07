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
        const isListed = countries.find(country => {
            return countryInput === country.name.common })
            // console.log(isListed)
            const searchOutput = document.querySelector("#searchOutput")
            searchOutput.replaceChildren()
        if (isListed === undefined) {
            notListed()
        } else {
                renderCountry(isListed)
                renderButtons()
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


function renderCountry(isListed) {
    // create function renderCountry(isListed)
    const img = document.createElement("img");
    img.setAttribute("src", isListed.flags.png)
    img.setAttribute("id", "flag")
    console.log(isListed)
    const h1 = document.createElement("h1");
    h1.textContent = isListed.name.common;
    h1.setAttribute("id", "name")
    const searchOutput = document.querySelector("#searchOutput")
    searchOutput.appendChild(h1)
    searchOutput.appendChild(img)
}












})



