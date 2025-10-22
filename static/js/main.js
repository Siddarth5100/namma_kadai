console.log("JS page loaded")

//addItems

const itemNameInp = document.getElementById('add-item-inp');

const addItemBtn = document.getElementById('add-item-btn');

addItemBtn.addEventListener('click', function() {
    const newItemName = itemNameInp.value;
    console.log(newItemName); 

    fetch('api/add_items', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"item_name": newItemName}) // data to send server
    })
    .then(response => {
        console.log("Raw response:", response);
        if (response.ok)
            return response.json()
        else {
            throw new Error("Update unsuccess")
        }
    })
    .then(data => {                                   //data contains key value
        console.log("Parsed data:", data);
        const msgDiv = document.getElementById('msg');
        msgDiv.textContent = data.message;
    })
    .catch(error => {
        console.log("Error:", error);
        const msgDiv = document.getElementById('msg');
        msgDiv.textContent = error.message
    })
});


//dynamic alter delete buttons

console.log("alter delete buttons");

const rows = document.getElementById("itemsTable");
console.log("Rows here", rows);

const dataRows = rows.querySelectorAll('tbody tr');
console.log("Data rows:", dataRows);

dataRows.forEach((row,index) => {
    console.log("Row no:", index, "Item ID:", row.cells[0].textContent);
    const delBtn = document.createElement("button");
    
    delBtn.textContent = "Delete"

    row.cells[2].appendChild(delBtn);
    console.log(delBtn);
     
    delBtn.addEventListener('click', () => {
        console.log("Delete clicked for Item Id:", row.cells[0].textContent);
           const itemId = row.cells[0].textContent;
           console.log("----------Item Id:",itemId)

        fetch(`/api/check_item/${itemId}`, {method: `GET`})

        .then(response => {
            console.log(response)
            return response.json(); 
        })
            
        .then(data => {
            console.log("Response data:", data);
            if (data.has_purchase) {
                console.log("Item exists in purchase");
                const userConfirmed = confirm("This item exist in purchase/sales. Delete it? ");
                
                if (userConfirmed) {
                    fetch(`/api/delete_items/${itemId}`, {
                        method: 'DELETE'
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Deleted successfully", data);
                    })
                    .catch(error => console.error("Delete error:", error))


                } else {
                    console.log("User cancelled deletion")
                }

           
            } else {
                console.log("Item not found in purchase")}
                
                fetch(`/api/delete_items/${itemId}`, {
                    method: 'DELETE'})

                    .then(response => response.json())
                    .then(data => {
                        console.log("Deleted", data);
                        row.remove();
                    })
                    .catch(error => console.error("Delete error:", error))
        })
        
        .catch(error => 
            console.error("Error:", error));       
    })
});





console.log("---------done");