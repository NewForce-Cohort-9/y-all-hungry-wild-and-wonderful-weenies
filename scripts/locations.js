import { setLocation, transientState } from "./transientState.js";

//TODO - finish styling

const locationStateChange = new CustomEvent("locationStateChange");

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
  const locations = await getLocations();

  if (!locations) return `<span>Failed to fetch locations</span>`;

  const selectedLocation = locations.find(
    (location) => location.id === transientState.locationId
  );

  return `<h1 class="text-center text-dark">
  ${
    selectedLocation
      ? `You're picking up from our ${selectedLocation.name} location`
      : "Select a restaurant location"
  }
  </h1>`;
};

const handleLocationSelection = (e) => {
  if (e.target.id === "locations-select") {
    setLocation(Number(e.target.value));
    document.dispatchEvent(locationStateChange);
  }
};

document.addEventListener("change", handleLocationSelection);
