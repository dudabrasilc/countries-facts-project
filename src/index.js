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

        renderCountry(countryInput)

    })
}
form()


function notListed() {
    const flag = document.querySelector("#flag")
    flag.setAttribute("src", "")
    const countryName = document.querySelector("#name")
    countryName.innerHTML = "Not listed 😢"
    countryName.style.fontSize = "60px"
}



function renderCountry(countryInput) {
    // FETCH REQUEST
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        const isListed = countries.find(country => {
            return countryInput === country.name.common })
            // console.log(isListed)
        if (isListed === undefined) {
                notListed();
        } else {
                const flag = document.querySelector("#flag");
                flag.setAttribute("src", isListed.flags.png)
                const countryName = document.querySelector("#name");
                countryName.textContent = isListed.name.common;
                renderButtons()
        }                       
    })
}


function renderButtons() {
    //create tags for buttons div
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
    const body = document.querySelector("body")
    // append created nodes to the DOM
    body.appendChild(div)
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


})



