import { DessertDropdown } from "./desserts.js";
import { DrinkSelector } from "./drinks.js";
import { LocationSelector, LocationHeader } from "./locations.js";
import { HotDogDropdown } from "./hotdogs.js";
import { DessertMenu, DrinkMenu, HotDogMenu } from "./menu.js";

const mainContainer = document.querySelector("#main-container");

const locationContainer = document.querySelector(".location");
const locationHeaderBox = document.querySelector("#location-header-box");
const foodContainer = document.querySelector(".food");
const drinkContainer = document.querySelector(".drink");
const dessertContainer = document.querySelector(".dessert");
const menuContainer = document.querySelector(".menu-items");

const render = async () => {
  const locationSelectHTML = await LocationSelector();
  locationContainer.innerHTML = locationSelectHTML;
};

const renderLocationHeader = async () => {
  const locationHeaderHTML = await LocationHeader();
  locationHeaderBox.innerHTML = locationHeaderHTML;
};

const renderMenu = async () => {
    const hotdogMenuHTML = await HotDogMenu();
    const drinkMenuHTML = await DrinkMenu();
    const dessertMenuHTML = await DessertMenu();
    menuContainer.innerHTML = hotdogMenuHTML;
    menuContainer.innerHTML += drinkMenuHTML;
    menuContainer.innerHTML += dessertMenuHTML;
  };

render();
renderLocationHeader();
renderMenu();

document.addEventListener("locationStateChange", () => {
  renderLocationHeader();
});

locationContainer.innerHTML = LocationSelector();
drinkContainer.innerHTML = await DrinkSelector();
foodContainer.innerHTML = await HotDogDropdown();
dessertContainer.innerHTML = await DessertDropdown();
