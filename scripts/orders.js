import { saveWeenieOrder } from "./placeOrder.js";
import { transientState, cart } from "./transientState.js";

export const OrderSummary = async () => {
        const foodResponse = await fetch("http://localhost:8088/food");
        const drinkResponse = await fetch("http://localhost:8088/drinks");
        const dessertResponse = await fetch("http://localhost:8088/desserts");
    
        const items = {
          allFood: await foodResponse.json(),
          allDrinks: await drinkResponse.json(),
          allDessert: await dessertResponse.json(),
        };
    
        // finding the menu item names
        const selectedFoodName = 
            items.allFood.find((item) => item.name === transientState.foodId)

        const selectedDrinkName = 
            items.allDrinks.find((item) => item.name === transientState.drinkId)
        
        const selectedDessertName = 
            items.allDessert.find((item) => item.name === transientState.dessertId)


    let orderSummaryHTML = "<section>"
        // what's being mapped needs revisited -> possibly what's in cart?
        // NEED TO ADD A SUM OF PRICE FUNCTION
    const divStringArray = await items.map(
        (order) => {
          return `<div class="card" style="width: 18rem;">
          <div class="card-header">
            Wild & Wonderful Wennie Order Includes:
          </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${order.selectedFoodName}</li>
                    <li class="list-group-item">${order.selectedDrinkName}</li>
                    <li class="list-group-item">${order.selectedDessertName}</li>
                </ul>
          <div class="card-footer">
          <!-- button -->
          ${saveWeenieOrder}
          </div>
        </div>`
        }
    )

    orderSummaryHTML += divStringArray.join("")
    orderSummaryHTML += `</section>`

    return orderSummaryHTML

}