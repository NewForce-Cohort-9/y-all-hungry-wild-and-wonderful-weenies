// ORDER POPUP MODULE CARD! => https://getbootstrap.com/docs/5.3/components/modal/#modal-components :)
export const OrderConfirmation = async () => {
    const submitedOrders = await fetch("http://localhost:8088/orders?_expand=food&_expand=drinks&_expand=desserts");
    const orders = await submitedOrders.json();

    let OrderConfirmationPopupHTML = "<section>"

    const divStringArray = await orders.map(
        (order) => {
            const orderPrice = order?.food?.price + order?.drinks?.price + order?.desserts?.price

            const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(orderPrice)

            
          return `<div class="modal" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">>
            <div class="modal-content">
              <div class="modal-header">
                <div class="text-center">
                    <img src="images/logo" class="rounded mx-auto d-block" alt="Wild and Wonderful Weenies Logo">
                </div>
                <h3 class="modal-title">Wild & Wonderful Weenies</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
                <div class="modal-body">
                    <h5 class="card-title">THANK YOU FOR YOUR PURCHASE!</h5>
                    <p class="card-text"><strong>ORDER #${order.id}</strong></p>
                    <p class="card-text">Total Price: ${formattedPrice}</p>
                </div>
              <div class="modal-footer">
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button class="btn btn-primary" type="button">START NEW ORDER</button>
                </div>
              </div>
            </div>
          </div>
        </div>`
        }
    )

    OrderConfirmationPopupHTML += divStringArray.join("")
    OrderConfirmationPopupHTML += `</section>`

    return OrderConfirmationPopupHTML

}