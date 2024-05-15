import { setLocation, transientState } from "./transientState.js";

//TODO - finish styling

export const getLocations = async () => {
  try {
    const response = await fetch(`http://localhost:8088/locations`);
    if (response.ok) {
      const locations = await response.json();
      return locations;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const LocationSelector = async () => {
  const locations = await getLocations();

  if (!locations) return `<span>Failed to fetch locations.</span>`;

  let locationOptionsHTML = `<select class="form-select form-select-md mb-3" id="locations-select">`;
  locationOptionsHTML += `<option value="0">Select restaurant location</option>`;

  locationOptionsHTML += locations.map((location) => {
    return `
    <option value="${location.id}">
    ${location.name}
    </option>
    `;
  });

  return locationOptionsHTML;
};

export const LocationHeader = async () => {
  //TODO - finish this
  const locations = await getLocations();

  if (!locations) return `<span>Failed to fetch locations</span>`;

  return `<h1 class="text-center text-dark">
  You're picking up from the TODO name
  </h1>`;
};

const handleLocationSelection = (e) => {
  if (e.target.id === "locations-select") {
    setLocation(Number(e.target.value));
  }
};

document.addEventListener("change", handleLocationSelection);
