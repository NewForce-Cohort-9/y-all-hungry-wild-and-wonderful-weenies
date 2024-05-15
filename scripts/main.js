import { LocationSelector } from "./locations.js";

const mainContainer = document.querySelector("#main-container");

const locationContainer = document.querySelector(".location");
const foodContainer = document.querySelector(".food");
const drinkContainer = document.querySelector(".drink");
const dessertContainer = document.querySelector(".dessert");

locationContainer.innerHTML = LocationSelector();
