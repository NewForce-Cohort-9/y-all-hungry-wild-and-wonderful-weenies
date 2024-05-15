import { setFood } from "./transientState.js";

const handleHotDogChoice = (changeEvent) => {
  if (changeEvent.target.id === "hotdogs") {
    setFood(parseInt(changeEvent.target.value));
  }
};

export const HotDogDropdown = async () => {
  const response = await fetch("http://localhost:8088/food");
  const hotdogs = await response.json();

  document.addEventListener("change", handleHotDogChoice);

  let hotdogOptionsHTML = `<select class="form-select form-select-md mb-3" id='hotdogs'>
    <option value='0'>Select Your Weenie...</option>`;

  const divStringArray = await hotdogs.map((hotdog) => {
    return `<option value='${hotdog.id}'>${hotdog.name}</option>`;
  });

  hotdogOptionsHTML += divStringArray.join("");
  hotdogOptionsHTML += `</select>`;

  return hotdogOptionsHTML;
};
