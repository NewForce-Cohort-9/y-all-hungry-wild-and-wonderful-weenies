import { saveWeenieOrder } from "./placeOrder.js";

export const OrderSummary = async () => {
        const foodResponse = await fetch("http://localhost:8088/food");
        const drinkResponse = await fetch("http://localhost:8088/drinks");
        const dessertResponse = await fetch("http://localhost:8088/desserts");
    
        const items = {
          allFood: await foodResponse.json(),
          allDrinks: await drinkResponse.json(),
          allDessert: await dessertResponse.json(),
        };

    let orderSummaryHTML = "<section>"

    const divStringArray = await items.map(
        (order) => {
          return `<div class="card" style="width: 18rem;">
          <div class="card-header">
            Wild & Wonderful Wennie Order Includes:
          </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${order.food.name}</li>
                    <li class="list-group-item">${order.drinks.name}</li>
                    <li class="list-group-item">${order.desserts.name}</li>
                </ul>
          <div class="card-footer">
          ${saveWeenieOrder}
          </div>
        </div>`
        }
    )

    orderSummaryHTML += divStringArray.join("")
    orderSummaryHTML += `</section>`

    return orderSummaryHTML

}