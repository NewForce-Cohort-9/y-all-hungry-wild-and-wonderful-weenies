export const DessertSelector = async () => {
    const response = await fetch("http://localhost:8088/desserts")
    const desserts = await response.json()
    
    let dessertHTML = `<select id="dessert"><option value="0">Select Dessert</option><option value="none">None</option>`
    const divStringArray = desserts.map(
        (dessert) => {
            return `<option value="${dessert.id}">${dessert.name}</option>`
        },
    )
    
    dessertHTML += divStringArray.join("")
    dessertHTML += `</select>`

    return dessertHTML   
}