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
import { OrderConfirmation } from "./orderConfirmation.js";

const menuItemArrayChange = new CustomEvent("itemsChange");

const locationContainer = document.querySelector(".location");
const locationHeaderBox = document.querySelector("#location-header-box");
const foodContainer = document.querySelector(".food");
const drinkContainer = document.querySelector(".drink");
const dessertContainer = document.querySelector(".dessert");
const menuContainer = document.querySelector(".menu-items");
const orderSummaryContainer = document.querySelector(".order");

const modalContainer = document.querySelector("#modal-ctn");

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

// Wild n Wonderful Weenies Full Menu
const renderMenu = async () => {
  const hotdogMenuHTML = await HotDogMenu();
  const drinkMenuHTML = await DrinkMenu();
  const dessertMenuHTML = await DessertMenu();
  menuContainer.innerHTML = hotdogMenuHTML;
  menuContainer.innerHTML += drinkMenuHTML;
  menuContainer.innerHTML += dessertMenuHTML;
};

// Order Summary Ticket -> acts like a shopping cart
const renderOrderSummary = async () => {
  const orderSummaryHTML = await OrderSummary();
  orderSummaryContainer.innerHTML = orderSummaryHTML;
};

const renderModal = async () => {
  modalContainer.innerHTML = await OrderConfirmation();
};

//get initial data from database and store them in state arrays
const fetchAndSetArrState = async () => {
  await fetchAllLocationItems();
  const allItems = await fetchMenuItems();

  setTransientHotdog(allItems.allFood);
  setTransientDrinks(allItems.allDrinks);
  setTransientDesserts(allItems.allDessert);

  document.dispatchEvent(menuItemArrayChange);
};

// Printing to DOM
renderLocationSelector();
renderLocationHeader();
renderMenu();
renderHotdogDropDown();
fetchAndSetArrState();
renderOrderSummary();
renderModal();

//re-render location header when a location selection is made
document.addEventListener("locationStateChange", () => {
  renderLocationHeader();
});

//re-render components after an item changes in order to update dropdown lists
document.addEventListener("itemsChange", () => {
  renderHotdogDropDown();
});

document.addEventListener("cartUpdate", () => {
  renderOrderSummary();
});

locationContainer.innerHTML = LocationSelector();
drinkContainer.innerHTML = await DrinkSelector();
dessertContainer.innerHTML = await DessertDropdown();
