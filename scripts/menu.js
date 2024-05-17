// HOTDOG MENU CARD! => https://getbootstrap.com/docs/5.3/components/card/#horizontal :)
export const HotDogMenu = async () => {
    const response = await fetch("http://localhost:8088/food")
    const food = await response.json()

    let foodMenuHTML = "<section><h2>Hot Dogs</h2>"

    const divStringArray = await food.map(
        (food) => {  
          return `<div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
                <img class="img-fluid rounded-start" style="width: 200px; height: 200px;" alt="..." src='${food.image}'>
            </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${food.name}</h5>
                            <p class="card-text">${food.description}</p>
                            <p class="card-text">${food.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
                            <aside>In Stock: QTY HERE</aside>
                        </div>
                    </div>
                </div>
            </div>`
        }
    )

    foodMenuHTML += divStringArray.join("")
    foodMenuHTML += `</section>`

    return foodMenuHTML

}

// DRINK MENU CARD!
export const DrinkMenu = async () => {
    const response = await fetch("http://localhost:8088/drinks")
    const drinks = await response.json()

    let drinkMenuHTML = "<section><h2>Drinks</h2>"

    const divStringArray = await drinks.map(
        (drink) => {
          return `<div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
                <img class="img-fluid rounded-start" style="width: 200px; height: 200px;" alt="..." src='${drink.image}'>
            </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${drink.name}</h5>
                            <p class="card-text">${drink.description}</p>
                            <p class="card-text">${drink.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
                            <aside>In Stock: QTY HERE</aside>
                        </div>
                    </div>
                </div>
            </div>`
        }
    )

    drinkMenuHTML += divStringArray.join("")
    drinkMenuHTML += `</section>`

    return drinkMenuHTML

}

// DESSERT MENU CARD!
export const DessertMenu = async () => {
    const response = await fetch("http://localhost:8088/desserts")
    const desserts = await response.json()

    let dessertMenuHTML = "<section><h2>Desserts</h2>"

    const divStringArray = await desserts.map(
        (dessert) => {
          return `<div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
                <img class="img-fluid rounded-start" style="width: 200px; height: 200px;" alt="..." src='${dessert.image}'>
            </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${dessert.name}</h5>
                            <p class="card-text">${dessert.description}</p>
                            <p class="card-text">${dessert.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
                            <aside>In Stock: QTY HERE</aside>
                        </div>
                    </div>
                </div>
            </div>`
        }
    )

    dessertMenuHTML += divStringArray.join("")
    dessertMenuHTML += `</section>`

    return dessertMenuHTML

}
