




































// // sales

// const qtyInput = document.getElementById("qty");
// const rateInput = document.getElementById("rate");
// const amountInput = document.getElementById("amount");


// if (qtyInput) {
//     qtyInput.addEventListener("input", function() {
//         amountInput.value = qtyInput.value * rateInput.value;
//     })
// }



// // will get user input & update in db

// if (salesForm) {
//     salesForm.addEventListener("submit", function(event) {
//         event.preventDefault();
//         const item_id = document.getElementById("item_id").value;
//         const qty = document.getElementById("qty").value;
//         const rate = document.getElementById("rate").value;
//         const amount = document.getElementById("amount").value;

//         fetch("/sales",{
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 item_id: item_id,
//                 qty: qty,
//                 rate: rate,
//                 amount: amount
//             })
//         })
//         .then(response => response.json())
//         .then(data => {
//             alert(data.message);
//         })
//         .catch(err => console.error("Error:", err))
//     });
// }