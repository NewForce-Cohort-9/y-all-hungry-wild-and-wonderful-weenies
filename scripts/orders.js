import { saveWeenieOrder } from "./placeOrder.js";

export const OrderSummary = async () => {
    const response = await fetch("http://localhost:8088/order?_expand=food&_expand=drinks&_expand=desserts&_expand=locations");
    const orderSummary = await response.json();

    let orderSummaryHTML = "<section>"

    const divStringArray = await orderSummary.map(
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