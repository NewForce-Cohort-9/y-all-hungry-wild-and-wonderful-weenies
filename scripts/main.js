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

const menuItemArrayChange = new CustomEvent("itemsChange");

const locationContainer = document.querySelector(".location");
const locationHeaderBox = document.querySelector("#location-header-box");
const foodContainer = document.querySelector(".food");
const drinkContainer = document.querySelector(".drink");
const dessertContainer = document.querySelector(".dessert");
const menuContainer = document.querySelector(".menu-items");

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

//get initial data from database and store them in state arrays
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

//re-render location header when a location selection is made
document.addEventListener("locationStateChange", () => {
  renderLocationHeader();
});

//re-render components after an item changes in order to update dropdown lists
document.addEventListener("itemsChange", () => {
  renderHotdogDropDown();
});

locationContainer.innerHTML = LocationSelector();
drinkContainer.innerHTML = await DrinkSelector();
dessertContainer.innerHTML = await DessertDropdown();
