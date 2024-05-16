import { saveOrder } from "./transientState.js";

const handleCustomOrderClick = (clickEvent) => {
    if (clickEvent.target.type === "button") {
      saveOrder()
    }
}

export const saveWeenieOrder = () => {
    document.addEventListener("click", handleCustomOrderClick)

    return `<button type="button" class="btn btn-info">SUBMIT ORDER</button>`
}