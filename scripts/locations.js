import {
  setLocation,
  transientState,
  locationItemsState,
  menuItemsState,
} from "./transientState.js";

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

export const filterInStockItems = (locationId, locationItemsState) => {
  const { food, drinks, dessert } = locationItemsState;
  const onlyInStockFood = food.filter(
    (item) => item.locationId === locationId && item.hotDogQty > 0
  );
  const onlyInStockDrinks = drinks.filter(
    (item) => item.locationId === locationId && item.drinkQty > 0
  );
  const onlyInStockDesserts = dessert.filter(
    (item) => item.locationId === locationId && item.dessertQty > 0
  );

  return {
    food: onlyInStockFood,
    drinks: onlyInStockDrinks,
    dessert: onlyInStockDesserts,
  };
};

export const getMenuItemsFromLocationItems = (
  locationId,
  locationItemsState
) => {
  const { allFood, allDrinks, allDessert } = menuItemsState;

  const { food, drinks, dessert } = filterInStockItems(
    locationId,
    locationItemsState
  );

  const matchingFood = allFood.filter((foodItem) =>
    food.some((item) => foodItem.id === item.hotDogId)
  );
  const matchingDrinks = allDrinks.filter((drinkItem) =>
    drinks.some((item) => drinkItem.id === item.drinkId)
  );
  const matchingDesserts = allDessert.filter((dessertItem) =>
    dessert.some((item) => dessertItem.id === item.dessertId)
  );

  const relevantMenuItems = {
    food: matchingFood,
    drinks: matchingDrinks,
    dessert: matchingDesserts,
  };

  return relevantMenuItems;
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

  return `<h1 class="text-center text-light">
  ${
    selectedLocation
      ? `You're picking up from our ${selectedLocation.name} location`
      : "Select a restaurant location"
  }
  </h1>`;
};

const handleLocationSelection = async (e) => {
  if (e.target.id === "locations-select") {
    const locationId = Number(e.target.value);

    setLocation(locationId);
    document.dispatchEvent(locationStateChange);

    const inStockItems = getMenuItemsFromLocationItems(
      locationId,
      locationItemsState
    );
    //TODO: update "state" based on in stock items
  }
};

document.addEventListener("change", handleLocationSelection);
