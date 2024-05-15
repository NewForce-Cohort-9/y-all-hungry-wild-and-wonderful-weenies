//add the required properties to the object below for your order
export const transientState = {
  foodId: 0,
  locationId: 0,
  drinkId: 0,
};

//reset "state" to defaults
export const resetAllState = () => {
  transientState.foodId = 0;
  transientState.locationId = 0;
  transientState.dessertId = 0;
};

//add the required setter functions to create your order
export const setFood = (chosenFoodId) => {
  transientState.foodId = chosenFoodId;
  console.log(transientState);
};

export const setLocation = (locationId) => {
  transientState.locationId = locationId;
};

export const setDrink = (chosenDrinkId) => {
  transientState.drinkId = chosenDrinkId;
  console.log(transientState);
};

export const saveOrder = async () => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transientState),
  };
  const response = await fetch("http://localhost:8088/orders", postOptions);

  if (response.ok) {
    document.dispatchEvent(customEvent);
    resetAllState();
  }
};
