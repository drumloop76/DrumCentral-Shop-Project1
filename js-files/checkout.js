"use strict"

function checkout() {;
    if(localStorage.getItem('logedUser') == null) {
        let cartItems = JSON.parse(localStorage.getItem("localProductsInCart"));
        let totalCost = JSON.parse(localStorage.getItem("localTotalCost"));
        let itemsInCart = JSON.parse(localStorage.getItem("localCartNumbers"));
        let items = Object.values(cartItems);
        basketItems(items, totalCost, itemsInCart);
    } else {
        let cartItems = JSON.parse(localStorage.getItem("userProductsInCart"));
        let totalCost = JSON.parse(localStorage.getItem("userTotalCost"));
        let itemsInCart = JSON.parse(localStorage.getItem("userCartNumbers"));
        let items = Object.values(cartItems);
        basketItems(items, totalCost, itemsInCart);
    }
    
    function basketItems(items, totalCost, itemsInCart) {
        for(let i=0 ; i<items.length ; i++) {
            document.querySelector('.basket_products').innerHTML += `
                    <div class="basket_product_cont">
                        <div class="basket_product_info">
                            <p class="product_name">${items[i].name}</p>
                            <span class="stock">${items[i].stock === true ? 'In stock' : 'Available soon'}</span>
                        </div>
                        <div class="basket_product_quantity">
                            <span>x ${items[i].inCart}</span>
                        </div>
                        <div class="basket_price_div">
                            <span class="price_single">€ ${items[i].price}</span>
                            <span class="price_full">€ ${items[i].price * items[i].inCart}</span>
                        </div>
                    </div>
                    `
            const stock = document.querySelectorAll('.stock');
            for(let s of stock) {
                if(s.textContent === 'In stock') {
                    s.classList.add('green');
                } else {
                    s.classList.add('yellow');
                };
            };
        };
        
        let totalPrice = document.querySelector('.total_price');
        totalPrice.innerHTML = `€ ${totalCost}`;

        let totalQuantity = document.querySelector('.total_quantity');
        totalQuantity.innerHTML = itemsInCart;
    };
};
checkout();

var inputEl = document.querySelectorAll('input');

inputEl.forEach(el => {
    el.addEventListener('focus', function(e) {
        this.previousElementSibling.classList.add('move_label');
    });
});

inputEl.forEach(el => {    
    el.addEventListener('blur', function(e) {
        if(el.value != 0) return
        
        this.previousElementSibling.classList.remove('move_label');
    });
});
