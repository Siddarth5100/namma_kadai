// // to add items in db 

// const addItemBtn = document.getElementById("add-item-btn")

// addItemBtn.addEventListener("click", function(){
//     const itemName = document.getElementById("add-item-inp").value;
//     fetch("/api/add_items", {
//         method:"POST",
//         headers:{
//         "Content-Type": "application/json"
//     },
//     body:JSON.stringify({
//         "item_name":itemName
//     })
// })
//     .then(response => response.json())
//     .then(data =>{
//         alert(data.message);
//         document.getElementById("add-item-inp").value="";
//         })
//         .catch(error => console.error(error))
// });


const addItemBtn = document.getElementById("add-item-btn");
const addItemInp = document.getElementById("add-item-inp");
const itemsTable = document.querySelector("#table-buttons .left table");

addItemBtn.addEventListener("click", function(){
    const itemName = addItemInp.value.trim();
    if(!itemName) return; // skip if input is empty

    fetch("/api/add_items", {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "item_name": itemName })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);

        // 1️⃣ Add new row to the table dynamically
        const newRow = itemsTable.insertRow(-1); // adds at the end
        const idCell = newRow.insertCell(0);
        const nameCell = newRow.insertCell(1);

        // 2️⃣ Fill cells with data
        // Note: Here we don’t have the DB-generated ID, so just leave blank or fetch it later
        idCell.innerText = data.item_id
        nameCell.innerText = itemName;

        // 3️⃣ Clear input field
        addItemInp.value = "";
    })
    .catch(error => console.error(error));
});
