console.log("Purchase loaded");

// add purchase

const purchaseItemId = document.getElementById("purchase_item_id")
const purchaseQty = document.getElementById("purchase_qty")
const purchaseRate = document.getElementById("purchase_rate")

const addPurchaseBtn = document.getElementById("add-purchase-btn")

console.log("Add purchase button:", addPurchaseBtn);
if (addPurchaseBtn) {
    addPurchaseBtn.addEventListener('click', function() {
        console.log("Button clicked")
        const itemId = purchaseItemId.value;
        const qty = purchaseQty.value;
        const rate = purchaseRate.value;

        console.log(itemId, qty, rate);

        fetch('/api/add_new_purchase', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                item_id: itemId,
                qty: qty,
                rate: rate
            })
        })
        .then(response => {
            console.log("Raw response:", response);
            return response.json();
        })
        .then(data => {
            console.log("converted data:",data);
        })
        .catch(error => {
            console.error("Error:", error);
        })
    });
}