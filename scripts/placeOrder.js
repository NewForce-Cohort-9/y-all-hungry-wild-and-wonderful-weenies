import { saveOrder } from "./transientState.js";

const handleCustomOrderClick = async (clickEvent) => {
  if (clickEvent.target.type === "button") {
    saveOrder();
    const modal = document.querySelector("#order-confirmation");
    modal.classList.remove("hide-modal");
    modal.classList.add("show-modal");
  }
};

export const saveWeenieOrder = () => {
  document.addEventListener("click", handleCustomOrderClick);

  return `<button type="button" class="btn">SUBMIT ORDER</button>`;
};
