import { DrinkSelector } from "./drinks.js";
import { LocationSelector } from "./locations.js";

const mainContainer = document.querySelector("#main-container");

const locationContainer = document.querySelector(".location");
const foodContainer = document.querySelector(".food");
const drinkContainer = document.querySelector(".drink");
const dessertContainer = document.querySelector(".dessert");

const render = async () => {
  const locationSelectHTML = await LocationSelector();
  locationContainer.innerHTML = locationSelectHTML;
};

render();

locationContainer.innerHTML = LocationSelector();
drinkContainer.innerHTML = await DrinkSelector();
foodContainer.innerHTML = await HotDogDropdown();