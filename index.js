const color = document.getElementById("color")
const getSchemeBtn = document.getElementById("get-scheme-btn")
const colorSchemeContainer = document.getElementById("color-scheme-container")
const textCopied = document.getElementById('text-copied')
const errorMessage = document.getElementById('error-message')

//alert funtion
function alertDialog(alertMessage){
    navigator.clipboard.writeText(alertMessage)
    .then(()=>{
        textCopied.textContent = `${alertMessage} copied `
        textCopied.classList.toggle("hidden")

        setTimeout(() => textCopied.classList.toggle('hidden'),1500)
        })
    .catch(err =>{
        errorMessage.classList.toggle('hidden')
        setTimeout(() => errorMessage.classList.toggle('hidden'),1500)
    })
}

//copying the input value change to clipboard
color.addEventListener("input",()=>alertDialog(color.value))

//for dark mode
document.getElementById("theme-switcher").addEventListener("click", () => {
    document.getElementById("light-mode").classList.toggle("hidden")
    document.getElementById("dark-mode").classList.toggle("hidden")
    document.body.classList.toggle("dark")
    getSchemeBtn.classList.toggle('btn-dark')
    document.querySelector("select").classList.toggle("select-dark")
})



document.addEventListener("click", function (e) {
    if (e.target.dataset.hex) {
        alertDialog(e.target.dataset.hex)
    }
})


getSchemeBtn.addEventListener("click", () => {
    const colorValue = document.getElementById("color").value
    const colorSchemeValue = document.getElementById("color-scheme").value
    const hexColorValue = colorValue.replace('#', '')

    fetch(`https://www.thecolorapi.com/scheme?hex=${hexColorValue}&mode=${colorSchemeValue}`)
        .then(response => response.json())
        .then(data => {
            const colorSchemeContainerHtml = data.colors.map(function (color) {
                return `<div class='color-appearance'>
                        <div class='color-value' style='background-color:${color.hex.value};' ></div>
                        <p class='color-hex-code' data-hex=${color.hex.value}>${color.hex.value}</p>
                    </div>`
            }).join('')
            colorSchemeContainer.innerHTML = colorSchemeContainerHtml
        })
})