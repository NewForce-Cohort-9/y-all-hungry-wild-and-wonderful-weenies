//add the required properties to the object below for your order

//TODO - all of the "state" may not be neccessary, can be cleaned up later on

export const transientState = {
  foodId: 0,
  locationId: 0,
  drinkId: 0,
  dessertId: 0,
  hotdogs: [],
  drinks: [],
  dessert: [],
};

export const locationItemsState = {
  food: [],
  drinks: [],
  dessert: [],
};

export const menuItemsState = {
  allFood: [],
  allDrinks: [],
  allDessert: [],
};

const orderSent = new CustomEvent("orderSent");

export const setTransientHotdog = (updatedArr) => {
  transientState.hotdogs = updatedArr;
};

export const setTransientDrinks = (updatedArr) => {
  transientState.drinks = updatedArr;
};

export const setTransientDesserts = (updatedArr) => {
  transientState.dessert = updatedArr;
};

//reset "state" to defaults
export const resetAllState = () => {
  transientState.foodId = 0;
  transientState.locationId = 0;
  transientState.drinkId = 0;
  transientState.dessertId = 0;
};

export const setLocationItems = (locationItems) => {
  locationItemsState.food = locationItems.food;
  locationItemsState.drinks = locationItems.drinks;
  locationItemsState.dessert = locationItems.dessert;
};

export const setMenuItems = (menuItems) => {
  menuItemsState.allFood = menuItems.allFood;
  menuItemsState.allDrinks = menuItems.allDrinks;
  menuItemsState.allDessert = menuItems.allDessert;
};

//add the required setter functions to create your order
export const setFood = (chosenFoodId) => {
  transientState.foodId = chosenFoodId;
  console.log(transientState);

  const chosenLocation = transientState.locationId;
  console.log("chosen location", chosenLocation);
};

export const setLocation = async (locationId) => {
  transientState.locationId = locationId;
};

export const setDrink = (chosenDrinkId) => {
  transientState.drinkId = chosenDrinkId;
  console.log(transientState);
};

export const setDessert = (chosenDessertId) => {
  transientState.dessertId = chosenDessertId;
  console.log(transientState);
};

export const fetchMenuItems = async () => {
  try {
    const foodResponse = await fetch("http://localhost:8088/food");
    const drinkResponse = await fetch("http://localhost:8088/drinks");
    const dessertResponse = await fetch("http://localhost:8088/desserts");

    const items = {
      allFood: await foodResponse.json(),
      allDrinks: await drinkResponse.json(),
      allDessert: await dessertResponse.json(),
    };

    setMenuItems(items);

    return items;
  } catch (error) {
    return null;
  }
};

export const fetchAllLocationItems = async () => {
  try {
    const foodResponse = await fetch("http://localhost:8088/locationDogs");
    const drinkResponse = await fetch("http://localhost:8088/locationDrinks");
    const dessertResponse = await fetch(
      "http://localhost:8088/locationDesserts"
    );
    const food = await foodResponse.json();
    const drinks = await drinkResponse.json();
    const dessert = await dessertResponse.json();

    setLocationItems({ food, drinks, dessert });

    return {
      food,
      drinks,
      dessert,
    };
  } catch (error) {
    return null;
  }
};

export const saveOrder = async () => {
  const propertiesToSend = {
    foodId: transientState.foodId,
    locationId: transientState.locationId,
    drinkId: transientState.drinkId,
    dessertId: transientState.dessertId,
  };

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(propertiesToSend),
  };
  const response = await fetch("http://localhost:8088/orders", postOptions);

  if (response.ok) {
    document.dispatchEvent(orderSent);
    resetAllState();
  }
};
