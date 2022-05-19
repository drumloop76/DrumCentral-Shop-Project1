////////////////////////////////////// set Items //////////////////////////////////////
export function setingItem(product, cartItems, key) {   
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

    localStorage.setItem(key, JSON.stringify(cartItems))
}

///////////////////////////////////// On Load Cart Numbers ///////////////////////////////////////
export function onLoadCartNumbers(productNumbers) {
    if(productNumbers >= 1) {
        setSpan(productNumbers);
    } else {
        document.querySelectorAll('.shop span').forEach(s => {
            s.style.display = "none";
        });
    };
};

///////////////////////////////////////// SPAN ////////////////////////////////////////////            
export function span(number, productNumbers) {
    const numSpan = document.querySelectorAll('.shop span');
    
    numSpan.forEach(s => {
        if(productNumbers < 1 || productNumbers == null) {
            s.style.display = "none";
        } else {
            s.style.display = "block";
            s.textContent = `${number}`;
        };
    });
};

/////////////////////////////////////// cart Numbers //////////////////////////////////
export function cartNumbers(product, productNumbers, key) {
    if(productNumbers) {
        localStorage.setItem(key, productNumbers + 1);
        setSpan(productNumbers + 1) ;
    } else {
        localStorage.setItem(key, 1);
        setSpan(1); 
    };
    
    setItems(product);
};

///////////////////////////////// totalCost //////////////////////////////////////
export function totalCost(product, cartCost, tcKey) {
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem(tcKey, cartCost + product.price);
    } else {
        cartCost = parseInt(cartCost);
        localStorage.setItem(tcKey, product.price);
    }                
}

////////////////////////////// WL & Compare Set Items ///////////////////////////////
export function setListItems(item, storageItems, key) {
    if(storageItems != null){
        if(storageItems[item.name] == undefined) {
            storageItems = {
                ...storageItems,
                [item.name]: item
            };
        };
        storageItems[item.name].inBox += 1;                    
    } else {
        item.inBox = 1
        storageItems = {
            [item.name]: item
        };
    };
    localStorage.setItem(key, JSON.stringify(storageItems));
};