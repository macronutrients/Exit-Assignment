let snacks = []

const list = document.querySelector("#list")
const error = document.querySelector("#error")
const search = document.querySelector("#search")
const form = document.querySelector("#form")

function renderSnacks(snacksToshow){
    list.innerHTML=""

    snacksToshow.forEach(function (snack) {
        const li = document.createElement("li")

        li.textContent = `${snack.name} -- ${snack.category}-- ${snack.calories} cal`
        //eaten
    if(snack.eaten){
        li.classList.add("eaten")
    }
    li.addEventListener("click",function(){
        snack.eaten = !snack.eaten
        renderSnacks(getFilteredSnacks())
    })

        list.appendChild(li)
    })
    //loading from .json
    async function loadSnacks(){
        try{
            const response = await fetch("./data.json")
            if(!response.ok){
                throw new Error("Couldn't Load snacks")
            }
            const data = await response.json()
            snacks = data
            renderSnacks(snacks)
        }catch(error){
            error.textContent = "Error Loading snacks"

        }

    }
}

search.addEventListener("input", function(){
    const searchText = search.value
    const filteredSnacks = snacks.filter(function(snack){
        const snackName = snack.name.toLowerCase()
        const searchLower = searchText.toLowerCase()
        return snackName.includes(searchLower)
    })
    renderSnacks(filteredSnacks)
})

form.addEventListener("submit", function(event){
    event.preventDefault()
    const name = form.elements.name.value.trim()
    const category = form.elements.category.value.trim()
    const calories = Number(form.elements.calories.value)

    if(name ===""){
        error.textContent = "Name is required"
        return
    }
    if (category ===""){
        error.textContent = "Cateogry is required"
        return
    }

    if(calories <=0 ||Number.isNaN(calories)){
        error.textContent = "Their has to be calories"
    return
    }
const newSnack = {
    id: Date.now(), 
    name: name,
    category: category,
    calories: calories
}
snacks.push(newSnack)
    
form.reset()
error.textContent=""
const searchText = search.value

const filteredSnacks = snacks.filter(function (snack){
const snackName = snack.name.toLowerCase()
const searchLower = searchText.toLowerCase()
return snackName.includes(searchLower)
})
renderSnacks(filteredSnacks)
})
loadSnacks()