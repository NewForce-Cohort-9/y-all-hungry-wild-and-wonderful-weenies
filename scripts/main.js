import { DessertDropdown } from "./desserts.js";
import { DrinkSelector } from "./drinks.js";
import { LocationSelector, LocationHeader } from "./locations.js";
import { HotDogDropdown } from "./hotdogs.js";
import {
  fetchAllLocationItems,
  fetchMenuItems,
  setTransientHotdog,
  setTransientDrinks,
  setTransientDesserts,
} from "./transientState.js";
import { DessertMenu, DrinkMenu, HotDogMenu } from "./menu.js";
import { OrderSummary } from "./orders.js";

const menuItemArrayChange = new CustomEvent("itemsChange");

const locationContainer = document.querySelector(".location");
const locationHeaderBox = document.querySelector("#location-header-box");
const foodContainer = document.querySelector(".food");
const drinkContainer = document.querySelector(".drink");
const dessertContainer = document.querySelector(".dessert");
const menuContainer = document.querySelector(".menu-items");
const orderSummaryContainer = document.querySelector(".order");

const renderLocationSelector = async () => {
  const locationSelectHTML = await LocationSelector();
  locationContainer.innerHTML = locationSelectHTML;
};

const renderLocationHeader = async () => {
  const locationHeaderHTML = await LocationHeader();
  locationHeaderBox.innerHTML = locationHeaderHTML;
};

const renderHotdogDropDown = async () => {
  foodContainer.innerHTML = await HotDogDropdown();
};

const renderMenu = async () => {
  const hotdogMenuHTML = await HotDogMenu();
  const drinkMenuHTML = await DrinkMenu();
  const dessertMenuHTML = await DessertMenu();
  menuContainer.innerHTML = hotdogMenuHTML;
  menuContainer.innerHTML += drinkMenuHTML;
  menuContainer.innerHTML += dessertMenuHTML;
};

const renderOrderSummary = async () => {
  const orderSummaryHTML = await OrderSummary();
  orderSummaryContainer.innerHTML = orderSummaryHTML;
};

render();
renderLocationHeader();
renderMenu();
renderOrderSummary();

const fetchAndSetArrState = async () => {
  await fetchAllLocationItems();
  const allItems = await fetchMenuItems();

  setTransientHotdog(allItems.allFood);
  setTransientDrinks(allItems.allDrinks);
  setTransientDesserts(allItems.allDessert);

  document.dispatchEvent(menuItemArrayChange);
};

renderLocationSelector();
renderLocationHeader();
renderMenu();
renderHotdogDropDown();
fetchAndSetArrState();

document.addEventListener("locationStateChange", () => {
  renderLocationHeader();
});

document.addEventListener("itemsChange", () => {
  renderHotdogDropDown();
});

locationContainer.innerHTML = LocationSelector();
drinkContainer.innerHTML = await DrinkSelector();
dessertContainer.innerHTML = await DessertDropdown();
