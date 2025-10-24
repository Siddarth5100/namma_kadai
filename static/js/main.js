//addItems

const itemNameInp = document.getElementById('add-item-inp');

const addItemBtn = document.getElementById('add-item-btn');

addItemBtn.addEventListener('click', function() {
    const newItemName = itemNameInp.value;

    fetch('api/add_items', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"item_name": newItemName}) // data to send server
    })

    .then(response => {
        if (response.ok)
            return response.json()
        else {
            throw new Error("Update unsuccess")
        }
    })

    .then(data => {                                   //data contains key value
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

const rows = document.getElementById("itemsTable");

const dataRows = rows.querySelectorAll('tbody tr');

dataRows.forEach((row,index) => {
    console.log("Row no:", index, "Item ID:", row.cells[0].textContent);
    const delBtn = document.createElement("button");
    
    delBtn.textContent = "Delete"

    row.cells[2].appendChild(delBtn);
     
    delBtn.addEventListener('click', () => {
        console.log("Delete clicked for Item Id:", row.cells[0].textContent);
           const itemId = row.cells[0].textContent;
           
        fetch(`/api/check_item/${itemId}`, {method: `GET`})

        .then(response => {
            return response.json(); 
        })
            
        .then(data => {

            if (data.has_purchase) {
                console.log("Item exists in purchase");
                const userConfirmed = confirm("This item exist in purchase/sales. Delete it? ");
                
                if (userConfirmed) {
                    fetch(`/api/delete_items/${itemId}`, {
                        method: 'DELETE'
                    })
                        .then(response => response.json())
                        .then(data => {
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
                        row.remove();
                    })
                    .catch(error => console.error("Delete error:", error))
        })
        
        .catch(error => 
            console.error("Error:", error));       
    });
});

// edit api

document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        const itemId = btn.dataset.id;
        const currentName = btn.dataset.name;
        const newName = prompt("Edit item name:", currentName)
        
        fetch(`/api/alter_name/${itemId}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"item_name": newName})
        })
        .then(response => response.json())
        .then(data => {
            const row = btn.parentElement.parentElement;
            const nameCell = row.cells[1];
            nameCell.textContent = data.item_name;
        })
        .catch(error => 
            console.error("error:", error)
        );
    });
});

