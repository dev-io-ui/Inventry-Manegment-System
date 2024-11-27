window.onload = function () {
    display();
};

function handleFormSubmit(e) {
    const productName = document.getElementById('product-name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;

    console.log("quantity" + quantity);
    console.log(productName + 'description' + description + " price " + price);


    const productObj = {
        productName,
        description,
        price,
        quantity
    };

    axios.post('http://localhost:2000/add-product', productObj)
        .then(() => {
            console.log("form submitted");
            display();
        })
        .catch((err) => {
            console.log(err);
        })

}


function display() {

    axios.get("http://localhost:2000/all-products")
        .then((response) => {

            const ele = document.getElementById('productsDetails');
            if (ele) {

                ele.innerHTML = "";

                if (Array.isArray(response.data)) {
                    for (let i = 0; i < response.data.length; i++) {
                        const item = response.data[i];


                        const listItem = document.createElement('li');
                        listItem.classList.add('list-group-item', 'd-flex', 'm-1', 'p-1', 'align-items-center');
                        listItem.innerHTML = `${item.productName} - ${item.description} - ${item.price} - ${item.quantity}`;


                        const buy1Btn = document.createElement('button');
                        buy1Btn.innerText = 'Buy1';
                        buy1Btn.classList.add('btn', 'btn-primary', 'btn-sm', 'm-1');
                        buy1Btn.onclick = function () {
                            updateQuantity(item.id, -1);
                        };

                        const buy2Btn = document.createElement('button');
                        buy2Btn.innerText = 'Buy2';
                        buy2Btn.classList.add('btn', 'btn-primary', 'btn-sm', 'm-1');
                        buy2Btn.onclick = function () {
                            updateQuantity(item.id, -2);
                        };

                        const buy3Btn = document.createElement('button');
                        buy3Btn.innerText = 'Buy3';
                        buy3Btn.classList.add('btn', 'btn-primary', 'btn-sm', 'm-1');
                        buy3Btn.onclick = function () {
                            updateQuantity(item.id, -3);
                        };


                        const deleteBtn = document.createElement('button');
                        deleteBtn.innerText = 'Delete';
                        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
                        deleteBtn.setAttribute('data-id', item.id);

                        const editBtn = document.createElement('button');
                        editBtn.innerText = 'Edit';
                        editBtn.classList.add('btn', 'btn-warning', 'btn-sm', 'm-1');
                        editBtn.setAttribute('data-id', item.id);

                        editBtn.onclick = function () {
                            editProduct(item.id, item);
                        }
                        deleteBtn.onclick = function () {
                            deleteProduct(item.id);
                        };

                        listItem.appendChild(buy1Btn);
                        listItem.appendChild(buy2Btn);
                        listItem.appendChild(buy3Btn);
                        listItem.appendChild(editBtn);
                        listItem.appendChild(deleteBtn);
                        ele.appendChild(listItem);

                    }
                }
            }

        }).catch((err) => {
            console.log(err);
        });
}

function deleteProduct(id) {
    axios.delete(`http://localhost:2000/delete-product/${id}`)
        .then((res) => {
            console.log(res);
            display();
        }).catch((err) => {
            console.log(err);
        });
}

function editProduct(id, productBody) {

    const productName = prompt("Enter new Product Name", productBody.productName) || productBody.productName;
    const productDescription = prompt("Enter new product Description", productBody.description) || productBody.description;
    const productPrice = prompt("Enter new Price", productBody.price) || productBody.price;
    const productQuantity = prompt("Enter new Quantity", productBody.quantity) || productBody.quantity;
    console.log('this is desc', productBody.description);
    const updatedProduct = {
        productName: productName,
        description: productDescription,
        price: productPrice,
        quantity: productQuantity
    };
    axios.put(`http://localhost:2000/edit-product/${id}`, updatedProduct)
        .then((res) => {
            display();
        }).catch((err) => {
            console.log(err);
        });
};



function updateQuantity(id, change) {
    axios.patch(`http://localhost:2000/update-quantity/${id}`, { change })
        .then(() => {
            display();
        })
        .catch((err) => {
            console.log(err);
        });
}









