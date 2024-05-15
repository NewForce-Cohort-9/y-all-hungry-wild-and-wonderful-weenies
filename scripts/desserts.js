import { setDessert } from "./transientState.js";

const handleDessertChoice = (changeEvent) => {
  if (changeEvent.target.id === "desserts") {
    setDessert(parseInt(changeEvent.target.value));
  }
};

export const DessertDropdown = async () => {
  const response = await fetch("http://localhost:8088/desserts");
  const desserts = await response.json();

  document.addEventListener("change", handleDessertChoice);

  let dessertOptionsHTML = `<select class="form-select form-select-md mb-3" id='desserts'>
    <option value='0'>Select Your Dessert...</option>`;

  const divStringArray = await desserts.map((dessert) => {
    return `<option value='${dessert.id}'>${dessert.name}</option>`;
  });

  dessertOptionsHTML += divStringArray.join("");
  dessertOptionsHTML += `</select>`;

  return dessertOptionsHTML;
};
