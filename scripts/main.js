import { DrinkSelector } from "./drinks.js";
import { LocationSelector, LocationHeader } from "./locations.js";

const mainContainer = document.querySelector("#main-container");

const locationContainer = document.querySelector(".location");
const foodContainer = document.querySelector(".food");
const drinkContainer = document.querySelector(".drink");
const dessertContainer = document.querySelector(".dessert");

const render = async () => {
  const locationSelectHTML = await LocationSelector();
  const locationHeaderHTML = await LocationHeader();
  locationContainer.innerHTML += locationSelectHTML;
  locationContainer.innerHTML += locationHeaderHTML;
};

render();

const drinkHTML = `
${drinkContainer}
`;

locationContainer.innerHTML = LocationSelector();
drinkContainer.innerHTML = await DrinkSelector();
