import { setDrink } from "./transientState.js"

export const DrinkSelector = async () => {
    const response = await fetch("http://localhost:8088/drinks")
    const drinks = await response.json()

    document.addEventListener("change", changeHandler)
    
    let drinkHTML = `<select id="drink"><option value="0">Select Drink</option>`
    const divStringArray = drinks.map(
        (drink) => {
            return `<option value="${drink.id}">${drink.name}</option>`
        },
    )
    
    drinkHTML += divStringArray.join("")
    drinkHTML += `</select>`

    return drinkHTML
}

const changeHandler = (changeEvent) => {
    if (changeEvent.target.id === "drink") {
       const chosenOption = changeEvent.target.value
       setDrink(chosenOption)
    }
 }
