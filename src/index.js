const BASE_URL = "https://restcountries.com/v3.1/all"

document.addEventListener("DOMContentLoaded", () => {
    // Add event listener to the form
    function form() {
    const form = document.getElementById("entry")
        // console.log(form)
        form.addEventListener("submit", e => {
        // Prevent reload page default on submit event
        e.preventDefault();
        // console.log(e.target)

        // Get formInput value
        let formInputValue = document.querySelector("#formInput").value
        // console.log(formInputValue)
        
        // const searchOutput = document.querySelector("#searchOutput")
        // searchOutput.replaceChildren()

        // Clear formInput value
        form.reset()
        // console.log(form)

                // FETCH REQUEST
                return fetch(`https://restcountries.com/v3.1/name/${formInputValue}`)
                .then(response => response.json())
                .then(countries => {
                    // console.log(countries)
                    const isListed = countries.find(country => {
                        return formInputValue === country.name.common })
                        // console.log(isListed)
                    if (isListed === undefined) {
                            notListed();
                    } else {
                        countries.forEach(country => {
                            const flag = document.querySelector("#flag");
                            flag.style.fontSize = "100px";
                            flag.setAttribute("src", country.flags.png)
                            const countryName = document.querySelector("#name");
                            countryName.textContent = isListed.name.common;
                        })
                    }
                                     
        })

    })
}}
)


function notListed() {
    const searchOutput = document.querySelector("#searchOutput")
    const flag = document.querySelector("#flag")
    flag.setAttribute("src", "")
    const countryName = document.querySelector("#name")
    countryName.innerHTML = "Not listed 😢"
    countryName.style.fontSize = "60px"
    
}

