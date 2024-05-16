// HOTDOG MENU CARD! => https://getbootstrap.com/docs/5.3/components/card/#horizontal :)
export const HotDogMenu = async () => {
    const response = await fetch("http://localhost:8088/food")
    const food = await response.json()

    let foodMenuHTML = "<section>"

    const divStringArray = await food.map(
        (food) => {
          return `<div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
                <img class="img-fluid rounded-start" alt="..." src='${food.image}'>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${food.name}</h5>
                            <p class="card-text">${food.description}</p>
                            <p class="card-text">${food.price}</p>
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

export const DrinkMenu = async () => {
    const response = await fetch("http://localhost:8088/drinks")
    const drinks = await response.json()

    let drinkMenuHTML = "<section>"

    const divStringArray = await drinks.map(
        (drink) => {
          return `<div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
                <img class="img-fluid rounded-start" alt="..." src='${drink.image}'>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${drink.name}</h5>
                            <p class="card-text">${drink.description}</p>
                            <p class="card-text">${drink.price}</p>
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

export const DessertMenu = async () => {
    const response = await fetch("http://localhost:8088/desserts")
    const desserts = await response.json()

    let dessertMenuHTML = "<section>"

    const divStringArray = await desserts.map(
        (dessert) => {
          return `<div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
                <img class="img-fluid rounded-start" alt="..." src='${dessert.image}'>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${dessert.name}</h5>
                            <p class="card-text">${dessert.description}</p>
                            <p class="card-text">${dessert.price}</p>
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