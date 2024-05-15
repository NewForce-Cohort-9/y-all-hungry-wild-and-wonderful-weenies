import { DessertDropdown } from "./desserts.js";
import { DrinkSelector } from "./drinks.js";
import { HotDogDropdown } from "./hotdogs.js";
import { HotDogMenu } from "./menu.js";
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

const drinkHTML = `
${drinkContainer}
`;

locationContainer.innerHTML = LocationSelector();
drinkContainer.innerHTML = await DrinkSelector();
foodContainer.innerHTML = await HotDogDropdown();
dessertContainer.innerHTML = await DessertDropdown();
