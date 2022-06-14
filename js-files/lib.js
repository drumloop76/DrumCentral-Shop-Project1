///////////////////////////////////////// Smooth Scrolling /////////////////////////////////////////
// export function scrollBtn() {
//     const sideNav = document.querySelector('.top_btn');

//     sideNav.addEventListener('click', () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     });
// };
// scrollBtn();



///////////////////////////////////// set Items /////////////////////////////////////
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

///////////////////////////////////// On Load Cart Numbers /////////////////////////////////////
export function onLoadCartNumbers(productNumbers) {
    if(productNumbers >= 1) {
        setSpan(productNumbers);
    } else {
        document.querySelectorAll('.shop span').forEach(s => {
            s.style.display = "none";
        });
    };
};

///////////////////////////////////// SPAN /////////////////////////////////////            
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

///////////////////////////////////// cart Numbers /////////////////////////////////////
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

///////////////////////////////////// totalCost /////////////////////////////////////
export function totalCost(product, cartCost, tcKey) {
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem(tcKey, cartCost + product.price);
    } else {
        cartCost = parseInt(cartCost);
        localStorage.setItem(tcKey, product.price);
    }                
}

///////////////////////////////////// WL & Compare Set Items /////////////////////////////////////
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

///////////////////////////////////// Add Product Popup /////////////////////////////////////
export function prodPopMod(productName) {
    const popup = document.createElement('div');
    popup.classList.add('prod_pop_modal');
    popup.innerHTML = `
            <div class="product_popup">
                <span></span>
                <p>You have added one<br><span>${productName}</span><br>to the cart.</p>
            </div>
            `
    // document.body.appendChild(popup);
    document.body.insertAdjacentElement('beforeend', popup);
    popup.classList.add('open_prod_popup');
    
    setTimeout(() => {
        popup.classList.remove('open_prod_popup');
        setTimeout(() => {
            popup.remove()
        }, 200);
    }, 1500);
    
    if(localStorage.getItem('logedUser') != null) {
        JSON.parse(localStorage.getItem('formData')).find(d => {
            document.querySelector('.product_popup span').textContent = `${d.firstName} ${d.lastName}`;
        });
    };
}

//////////////////////////////////////////////////////////////////////////////////////
// export function openCartProdModal(btns, key) {
//     // let cartItems = JSON.parse(localStorage.getItem('userProductsInCart'));

//     document.querySelectorAll(btns).forEach(btn => {
//         btn.addEventListener('click', function(e) {
//             Object.values(key).map(item => {
//                 if(e.target.textContent === item.name) {
//                     console.log('open btn 2a')
//                     cardModal(item);
//                 };
//             });
//             document.querySelector('.card_modal').classList.add('show_prod_modal');
//             cardOverlay.classList.add('show_overlay');
//             document.querySelector('body').style.overflow = 'hidden';
//         });
//     });
// }; 
// openCartProdModal();