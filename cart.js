function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if( productNumbers >= 1 ) {
        span(productNumbers);
        document.querySelector('.empty_cart').style.display = "none";
        document.querySelector('.cart_items_container').style.display = "block";
    } else {
        document.querySelectorAll('.shop span').forEach(s => {
            s.style.display = "none";
            document.querySelector('.empty_cart').style.display = "block";
            document.querySelector('.cart_items_container').style.display = "none";
        });
    };
};

//-------------------- cartNumbers -----------------------
function cartNumbers(product, change) {
    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers);
    
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if(change) {
        localStorage.setItem('cartNumbers', productNumbers - 1);
        span(productNumbers - 1);
        console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        span(productNumbers + 1);
    } else {
        localStorage.setItem('cartNumbers', 1);
        span(1);
    };
    
    setItems(product);
};

// -------------------- setItems -------------------
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null){
        let currentProduct = product.name;
        if(cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            };
        };
        cartItems[currentProduct].inCart += 1;
    } else {
        product.inCart = 1
        cartItems = {
            [product.name]: product
        };
    };
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
};

// -------------------- SPAN -------------------
function span(number) {
    const numSpan = document.querySelectorAll('.shop span');

    numSpan.forEach(s => {
        s.textContent = `${number}`;
    });
};

// -------------------- totalCost -------------------
function totalCost( product, action ) {
    let totalPrice = localStorage.getItem("totalCost");
    
    if(action) {
        totalPrice = parseInt(totalPrice);
        localStorage.setItem("totalCost", totalPrice - product.price);
    } else if(totalPrice != null) {        
        totalPrice = parseInt(totalPrice);
        localStorage.setItem("totalCost", totalPrice + product.price);    
    } else {
        localStorage.setItem("totalCost", product.price);
    };
};

///////////////////////// Display Cart /////////////////////////

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let totalPrice = localStorage.getItem("totalCost");
    totalPrice = parseInt(totalPrice);  
    const tp = document.querySelector('.total_price_value');
    
    const cartContainer = document.querySelector('.cart_items_container');
    
    if(cartItems && cartContainer) {
        cartContainer.innerHTML = '';
        tp.textContent = `€ ${totalPrice}`;
        Object.values(cartItems).map(item => {
            cartContainer.innerHTML += `
                <div class="cart_item">
                    <div class="img_container">
                        <img src="${item.image}" alt="">
                    </div>
                    <div class="cart_info">
                        <div class="cart_info_left">
                            <p class="item_name">${item.name}</p>
                            <p class="item_stock">${item.stock === true ? 'In stock' : 'Available soon'}</p>
                            <button>
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                        <div class="cart_info_right">
                            <div class="cart_quantity">
                                <i class="fa-solid fa-angle-left"></i>
                                <span>${item.inCart}</span>
                                <i class="fa-solid fa-angle-right"></i>
                            </div>
                            <span class="item_price">€ ${item.inCart * item.price}</span>
                        </div>
                    </div>
                </div>
                <hr>
                `
            deleteButtons();
            manageQuantity();
        });

        const stock = document.querySelectorAll('.item_stock');
                
        for(let s of stock) {
            if(s.textContent === 'In stock') {
                s.classList.add('green');
            } else {
                s.classList.add('yellow');
            };
        };
    };
};

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.fa-angle-left');
    let increaseButtons = document.querySelectorAll('.fa-angle-right');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', (e) => {
            e.preventDefault();
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = decreaseButtons[i].parentElement.parentElement.previousElementSibling.querySelector('.item_name').textContent;
            
            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            };
        });

        increaseButtons[i].addEventListener('click', () => {
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = increaseButtons[i].parentElement.parentElement.previousElementSibling.querySelector('.item_name').textContent;
            
            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
        });
    };
};


function deleteButtons() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let deleteButtons = document.querySelectorAll('.fa-trash-can'); 
    let productName;
    
    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', (e) => {
            e.preventDefault();
            productName = deleteButtons[i].parentElement.previousElementSibling.previousElementSibling.textContent;
            
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));
            
            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            
            displayCart();
            onLoadCartNumbers();
        });
    };
};
onLoadCartNumbers();
displayCart();
