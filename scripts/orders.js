import { saveWeenieOrder } from "./placeOrder.js";
import { transientState, menuItemsState } from "./transientState.js";

export const OrderSummary = async () => {
  const WITH_SALES_TAX = 1.06;
  //destructure menu arrays from menuItemsState object
  const { allFood, allDrinks, allDessert } = menuItemsState;

  //find the menu item names where id matches selection from state
  const selectedFood = allFood.find(
    (item) => item.id === transientState.foodId
  );
  const selectedDrink = allDrinks.find(
    (item) => item.id === transientState.drinkId
  );
  const selectedDessert = allDessert.find(
    (item) => item.id === transientState.dessertId
  );

  //make a new number array from the price property of each selected item.
  //if the item isnt undefined (undefined cause not selected yet), use the price, otherwise use 0.
  //reduce to sum the totals up.
  const totalPrice = [
    selectedFood ? selectedFood.price : 0,
    selectedDrink ? selectedDrink.price : 0,
    selectedDessert ? selectedDessert.price : 0,
  ].reduce((prev, curr) => prev + curr, 0);

  const totalPriceWithTax = totalPrice * WITH_SALES_TAX;

  return `<section><div class="card" style="width: 30em;">
          <div class="card-header">
            Wild & Wonderful Wennie Order Includes:
          </div>
                <ul class="list-group list-group-flush">
                        <li class="list-group-item justify-content-between d-flex">
                        <span>
                        ${
                          selectedFood
                            ? selectedFood.name
                            : "Select a food item"
                        } </span> 
                        <span>
                        ${selectedFood ? selectedFood.price.toFixed(2) : "0.00"}
                        </span>
                        </li>

                        <li class="list-group-item justify-content-between d-flex">
                        <span> 
                        ${selectedDrink ? selectedDrink.name : "Select a drink"}
                        </span> 
                        <span>
                        ${
                          selectedDrink
                            ? selectedDrink.price.toFixed(2)
                            : "0.00"
                        }
                        </span>
                        </li>

                         <li class="list-group-item justify-content-between d-flex">
                        <span> 
                        ${
                          selectedDessert
                            ? selectedDessert.name
                            : "Select a drink"
                        }
                        </span> 
                        <span>
                        ${
                          selectedDessert
                            ? selectedDessert.price.toFixed(2)
                            : "0.00"
                        }
                        </span>
                        </li>
                </ul>
        
          <div class="card-footer">
          <p>Total price: ${totalPriceWithTax.toFixed(2)} w/ tax</p>
          <!-- button -->
          ${saveWeenieOrder()}
          </div>
        </div>
        </section>
        `;
};
