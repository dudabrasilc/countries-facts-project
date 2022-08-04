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
    })
    }

})
form()
//