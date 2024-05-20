import {
  getMenuItemsFromLocationItems,
  filterInStockItems,
} from "./locations.js";
import { transientState, locationItemsState } from "./transientState.js";

// HOTDOG MENU CARD! => https://getbootstrap.com/docs/5.3/components/card/#horizontal :)

//woulda done more comments if had more time <3
//get quantities for each category
const getItemQuantitys = async () => {
  const locationId = transientState.locationId ?? 0;
  const all = getMenuItemsFromLocationItems(locationId, locationItemsState);
  const locationItems = filterInStockItems(locationId, locationItemsState);

  const foodWithQty = mergeQuantity(
    all.food,
    locationItems.inStockFood,
    "hotDogQty",
    "hotDogId"
  );
  const drinkWithQty = mergeQuantity(
    all.drinks,
    locationItems.inStockDrinks,
    "drinkQty",
    "drinkId"
  );
  const dessertWithQty = mergeQuantity(
    all.dessert,
    locationItems.inStockDessert,
    "dessertQty",
    "dessertId"
  );

  return { foodWithQty, drinkWithQty, dessertWithQty };
};

//find the menu item based on the hotdogId, dessertId, etc, and then add the quantity...
//...property to the menuArr (either the hotdogQty, drinkQty, etc)
const mergeQuantity = (
  menuArr,
  locationsArr,
  menuQtProperty,
  menuIdProperty
) => {
  locationsArr.forEach((locationItem) => {
    const menuItem = menuArr.find(
      (item) => item.id === locationItem[menuIdProperty]
    );
    if (menuItem) {
      menuItem[menuQtProperty] = locationItem[menuQtProperty];
    }
  });
  return menuArr;
};

export const HotDogMenu = async () => {
  const response = await fetch("http://localhost:8088/food");
  const food = await response.json();

  const { foodWithQty } = await getItemQuantitys();
  const foodArr = transientState.locationId ? foodWithQty : food;

  let foodMenuHTML = "<section class='menuCard'><h2>Hot Dogs</h2>";

  const divStringArray = foodArr.map((food) => {
    return `<div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
                <img class="img-fluid rounded-start" style="width: 200px; height: 200px;" alt="..." src='${
                  food.image
                }'>
            </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${food.name}</h5>
                            <p class="card-text">${food.description}</p>
                            <p class="card-text">${food.price.toLocaleString(
                              "en-US",
                              { style: "currency", currency: "USD" }
                            )}</p>
                            <aside>In Stock: ${food.hotDogQty ?? "N/A"}</aside>
                        </div>
                    </div>
                </div>
            </div>`;
  });

  foodMenuHTML += divStringArray.join("");
  foodMenuHTML += `</section>`;

  return foodMenuHTML;
};

// DRINK MENU CARD!
export const DrinkMenu = async () => {
  const response = await fetch("http://localhost:8088/drinks");
  const drinks = await response.json();

  const { drinkWithQty } = await getItemQuantitys();
  const drinkArr = transientState.locationId ? drinkWithQty : drinks;

  let drinkMenuHTML = "<section class='menuCard'><h2>Drinks</h2>";

  const divStringArray = drinkArr.map((drink) => {
    return `<div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
                <img class="img-fluid rounded-start" style="width: 200px; height: 200px;" alt="..." src='${
                  drink.image
                }'>
            </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${drink.name}</h5>
                            <p class="card-text">${drink.description}</p>
                            <p class="card-text">${drink.price.toLocaleString(
                              "en-US",
                              { style: "currency", currency: "USD" }
                            )}</p>
                            <aside>In Stock: ${drink.drinkQty ?? "N/A"}</aside>
                        </div>
                    </div>
                </div>
            </div>`;
  });

  drinkMenuHTML += divStringArray.join("");
  drinkMenuHTML += `</section>`;

  return drinkMenuHTML;
};

// DESSERT MENU CARD!
export const DessertMenu = async () => {
  const response = await fetch("http://localhost:8088/desserts");
  const desserts = await response.json();

  const { dessertWithQty } = await getItemQuantitys();
  const drinkArr = transientState.locationId ? dessertWithQty : desserts;

  let dessertMenuHTML = "<section class='menuCardEnd'><h2>Shakes</h2>";

  const divStringArray = drinkArr.map((dessert) => {
    return `<div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
                <img class="img-fluid rounded-start" style="width: 200px; height: 200px;" alt="..." src='${
                  dessert.image
                }'>
            </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${dessert.name}</h5>
                            <p class="card-text">${dessert.description}</p>
                            <p class="card-text">${dessert.price.toLocaleString(
                              "en-US",
                              { style: "currency", currency: "USD" }
                            )}</p>
                            <aside>In Stock:${
                              dessert.dessertQty ?? "N/A"
                            }</aside>
                        </div>
                    </div>
                </div>
            </div>`;
  });

  dessertMenuHTML += divStringArray.join("");
  dessertMenuHTML += `</section>`;

  return dessertMenuHTML;
};
