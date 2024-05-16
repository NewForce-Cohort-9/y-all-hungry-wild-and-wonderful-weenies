import {
  setLocation,
  transientState,
  locationItemsState,
  menuItemsState,
  setTransientHotdog,
  setTransientDrinks,
  setTransientDesserts,
} from "./transientState.js";

//TODO - finish styling

const locationStateChange = new CustomEvent("locationStateChange");
const menuItemArrayChange = new CustomEvent("itemsChange");

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

const filterByItemId = (allItemsArr, onlyInStockArr, foodPropertyId) => {
  const matchingItemArr = allItemsArr.filter((item) =>
    onlyInStockArr.some((itemTwo) => itemTwo[foodPropertyId] === item.id)
  );
  return matchingItemArr;
};

const getOnlyInStockItems = (foodQtProperty, menuItemArr, locationId) => {
  const onlyInStockItemArr = menuItemArr.filter(
    (item) => item.locationId === locationId && item[foodQtProperty] > 0
  );
  return onlyInStockItemArr;
};

export const filterInStockItems = (locationId, locationItemsState) => {
  const { food, drinks, dessert } = locationItemsState;

  const onlyInStockFood = getOnlyInStockItems("hotDogQty", food, locationId);
  const onlyInStockDrinks = getOnlyInStockItems("drinkQty", drinks, locationId);
  const onlyInStockDesserts = getOnlyInStockItems(
    "dessertQty",
    dessert,
    locationId
  );

  return {
    inStockFood: onlyInStockFood,
    inStockDrinks: onlyInStockDrinks,
    inStockDessert: onlyInStockDesserts,
  };
};

export const getMenuItemsFromLocationItems = (
  locationId,
  locationItemsState
) => {
  const { allFood, allDrinks, allDessert } = menuItemsState;

  const { inStockFood, inStockDrinks, inStockDessert } = filterInStockItems(
    locationId,
    locationItemsState
  );

  const matchingFood = filterByItemId(allFood, inStockFood, "hotDogId");
  const matchingDrinks = filterByItemId(allDrinks, inStockDrinks, "drinkId");
  const matchingDesserts = filterByItemId(
    allDessert,
    inStockDessert,
    "dessertId"
  );

  return {
    food: matchingFood,
    drinks: matchingDrinks,
    dessert: matchingDesserts,
  };
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
    setTransientHotdog(inStockItems.food);
    setTransientDrinks(inStockItems.drinks);
    setTransientDesserts(inStockItems.dessert);

    document.dispatchEvent(menuItemArrayChange);
  }
};

document.addEventListener("change", handleLocationSelection);
