import { transientState } from "./transientState.js";

// ORDER POPUP MODAL CARD! => https://getbootstrap.com/docs/5.3/components/modal/#modal-components :)

export const OrderConfirmation = async () => {
  const submitedOrders = await fetch("http://localhost:8088/orders");
  const orders = await submitedOrders.json();

  const latestOrder = orders[orders.length - 1];

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(transientState.orderPrice);

  return `<div id="order-confirmation" class="modal hide-modal" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <div class="text-center">
                    <img src="images/logo.png" class="img-thumbnail" alt="Wild and Wonderful Weenies Logo">
                </div>
                <h3 class="modal-title">Wild and Wonderful Weenies</h3>
              </div>
                <div class="modal-body">
                    <h5 class="fw-bold">THANK YOU FOR YOUR PURCHASE!</h5>
                    <p class="fw-medium">ORDER #${
                      latestOrder ? latestOrder.id : 0
                    }</p>
                    <p class="fw-light">Total Price: ${formattedPrice}</p>
                </div>
              <div class="modal-footer">
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button class="btn" type="button" data-bs-dismiss="modal" aria-label="Close">START NEW ORDER</button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        `;
};
