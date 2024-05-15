export const getLocations = async () => {
  try {
    const response = await fetch(`http://localhost:8080/locations`);
    if (response.ok) {
      const locations = await response.json();
      return locations;
    }
    return null;
  } catch (error) {
    console.error("error", error);
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

// import { setInterior } from "./TransientState.js";

// export const Interiors = async () => {
//   const response = await fetch("http://localhost:8088/interior");
//   const options = await response.json();

//   let optionsHTML = "<h2>Interiors</h2>";
//   optionsHTML += `<select id="interior">`;
//   optionsHTML += `<option value="0">Select interior style</option>`;

//   const divStringArray = options.map((item) => {
//     return `
//       <div>
//       <option value="${item.id}">${item.style}</option>
//       </div>
//       `;
//   });

//   optionsHTML += divStringArray.join("");
//   optionsHTML += "</select>";

//   return optionsHTML;
// };

// const handleInteriorChoice = (e) => {
//   if (e.target.id === "interior") {
//     setInterior(parseInt(e.target.value));
//   }
// };

// document.addEventListener("change", handleInteriorChoice);
