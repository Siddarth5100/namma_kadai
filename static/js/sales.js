const goHomeBtn = document.getElementById("sales-home-btn");

goHomeBtn.addEventListener("click", function() {
    window.location.href = '/home';
})

// add sales

const itemIdInp = document.getElementById("sales_item_id");
console.log(itemIdInp);
const qtyInp = document.getElementById("sales_qty");
const rateInp = document.getElementById("sales_rate");
const amountInp = document.getElementById("sales_amount");

const addSalesBtn = document.getElementById("add-sales-btn");


function calculateAmount() {
    const newQty = qtyInp.value;
    const newRate = rateInp.value;
    amountInp.value = Number(newQty) * Number(newRate)
}

qtyInp.addEventListener('input', calculateAmount);
rateInp.addEventListener('input', calculateAmount);

addSalesBtn.addEventListener('click', function() {
    console.log("Item Id entered:", itemIdInp.value)
    fetch('/api/add_new_sales',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        item_id: itemIdInp.value,
        qty: qtyInp.value,
        rate: rateInp.value
        })
    })   
});



