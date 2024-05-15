import { DrinkSelector } from "./drinks.js";
import { LocationSelector, LocationHeader } from "./locations.js";
import { HotDogDropdown } from "./hotdogs.js";

const mainContainer = document.querySelector("#main-container");

const locationContainer = document.querySelector(".location");
const foodContainer = document.querySelector(".food");
const drinkContainer = document.querySelector(".drink");
const dessertContainer = document.querySelector(".dessert");

const render = async () => {
  const locationSelectHTML = await LocationSelector();
  const locationHeaderHTML = await LocationHeader();
  locationContainer.innerHTML = locationSelectHTML;
};

render();

const drinkHTML = `
${drinkContainer}
`;

locationContainer.innerHTML = LocationSelector();
drinkContainer.innerHTML = await DrinkSelector();
foodContainer.innerHTML = await HotDogDropdown();
