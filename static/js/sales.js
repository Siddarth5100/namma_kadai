console.log("sales loaded");

// navigation from /home page to view /sales page

const viewSalesBtn = document.getElementById("view-sales-btn");
if (viewSalesBtn) {
    viewSalesBtn.addEventListener("click", function() {
        window.location.href = '/sales';
});
}

console.log("View sales")


const goHomeBtn = document.getElementById("sales-home-btn");
if (goHomeBtn) {
    goHomeBtn.addEventListener("click", function() {
        window.location.href = '/home';
});
}

console.log("Home button working")

// add sales

const salesItemIdInp = document.getElementById("sales_item_id")
const salesQty = document.getElementById("sales_qty")
const salesRate = document.getElementById("sales_rate")

const addSalesBtn = document.getElementById("add-sales-btn")

console.log("Add sales button:", addSalesBtn)
if (addSalesBtn) {
    addSalesBtn.addEventListener('click', function() {
        console.log("Button clicked");
        const itemId = salesItemIdInp.value;
        const qty = salesQty.value;
        const rate = salesRate.value;

        console.log(itemId, qty, rate);
    
        fetch('/api/add_new_sales',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                item_id : itemId,
                qty: qty,
                rate: rate
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Server response:", data);
        })
        .catch(error => {
            console.error("Error", error);
        });
    }); 
}