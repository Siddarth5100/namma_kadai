
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
        const msgDiv = document.getElementById('msg')
        msgDiv.textContent = data.message;
    })
    .catch(error => {
        console.log("Error:", error);
        const msgDiv = document.getElementById('msg')
        msgDiv.textContent = error.message
    })
});













