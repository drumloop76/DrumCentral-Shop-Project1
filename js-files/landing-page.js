'use strict'

/*---------------------------- Slider Hero ----------------------------*/

window.addEventListener('DOMContentLoaded', () => {
    const letters = document.querySelectorAll('.logo');
    const mainHeader = document.querySelector('.main_header-two');
    const mainTxt = document.querySelector('.main_header-text');
    const mainBtn = document.querySelector('.main_header-btn');

    setTimeout(() => {
        letters.forEach((span, i) => {
            setTimeout(() => {
                span.classList.add('start');
            }, (i + 1) * 80);
        });
    }, 300);

    setTimeout(() => {
        mainHeader.classList.add('start');
    }, 1300);
    
    setTimeout(() => {
        mainTxt.classList.add('start');
    }, 1600);

    setTimeout(() => {
        mainBtn.classList.add('start');
    }, 1800);


    const imgs = document.querySelectorAll('.img_container');
    const btnLeft = document.querySelector('.img_btn-left');
    const btnRight = document.querySelector('.img_btn-right');
    const sliderDotsContainer = document.querySelector('.dots');
    const heroHeaders = document.querySelectorAll('[data-hero-header]')
        
    let displayedImg = 0;  //pocetna
    const maxImg = imgs.length;
    
    const createDots = function() {
        imgs.forEach(function(_, i) {
            sliderDotsContainer.insertAdjacentHTML (
                "beforeend",
                `<button class="img_dots" data-slide="${i}"></button>`
            );
        });
    };

    const activateDot = function(img) {
        document.querySelectorAll('.img_dots').forEach(dot => dot.classList.remove('img_dots-active'));
        document.querySelector(`.img_dots[data-slide="${img}"]`).classList.add('img_dots-active');
        
        heroHeaders.forEach(header => header.classList.remove('anima'))
        document.querySelectorAll(`[data-hero-header="${img}"]`).forEach(header => {
            header.classList.add('anima');
        });
    };
        
    const slide = function(img) {
        imgs.forEach((s, i) => (s.style.transform = `translate(${100*(i-img)}%)`));
    };
    
    const nextImg = function() {
        if(displayedImg === maxImg - 1){
            displayedImg = 0;
        }else {
            displayedImg++
        }
        slide(displayedImg);
        activateDot(displayedImg);
    };

    const previousImg = function() {
        if(displayedImg === 0){
            displayedImg = maxImg - 1;
        }else {
            displayedImg--
        }
        slide(displayedImg);
        activateDot(displayedImg);
    };

    const init = function() {
        slide(0);
        createDots();
        activateDot(0);
    };
    init();

    btnLeft.addEventListener('click', nextImg);
    btnRight.addEventListener('click', previousImg);

    sliderDotsContainer.addEventListener('click', function(e) {
        if(e.target.classList.contains('img_dots')) {
            const slider = e.target.dataset.slide;
            slide(slider);
            activateDot(slider);
        };
    });
});


/*---------------------------- Cards Timer ----------------------------*/

function timer() {
    const deadline = '2022-06-01T00:00:00';
    
    function getTimeRemaining(date) {
        const time = Date.parse(date) - new Date(),
            days = Math.floor(time / 1000 / 60 / 60 / 24),
            hours = Math.floor((time / 1000 / 60 / 60) % 24),
            minutes = Math.floor((time / 1000 / 60) % 60),
            seconds = Math.floor((time / 1000) % 60);

        return {time, days, hours, minutes, seconds}
    };

    function setTimer(select, date) {
        const timer = document.querySelector(select),
            days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timerTick = setInterval(updateTimer, 1000);

        function updateTimer() {
            const timeRemaining = getTimeRemaining(date);

            days.innerHTML = doubleDig(timeRemaining.days);
            hours.innerHTML = doubleDig(timeRemaining.hours);
            minutes.innerHTML = doubleDig(timeRemaining.minutes);
            seconds.innerHTML = doubleDig(timeRemaining.seconds);

            if(timeRemaining <= 0) {
                clearInterval(timerTick);
            };
        };
        updateTimer();
    };
    setTimer('.timer', deadline);

    function doubleDig(n) {
        if(n >= 0 && n < 10) {
            return '0' + n
        } else {
            return n
        };
    };
};
timer();

fetch('/json-files/cards-products.json')
    .then(results => results.json())
    .then(data => {
        for(let i=0; i<data.length; i++) {
            if(data[i].sale == true) {
                document.querySelectorAll('.card').forEach((obj, i) => {
                    obj.innerHTML = `
                        <img class="card_img" src="${data[i].image}">
                        <h3 class="card_title">${data[i].name}</h3>
                        <p class="card_price">only <span>€ ${data[i].price}</span></p>
                        <button class="card_btn open_prod_modal" data-product-target="#productModal">Read More</button>`
                });
            };
        };
    });

/*------------------------ Cards Animation ------------------------*/

const cardsAnimations = function() {
    const timerBoxs = document.querySelectorAll('.timer_item');
    const cards = document.querySelectorAll('.card_container');
    
    const showTimerBoxs = function(entries, observer) {
        entries.forEach(e => {
            
            if(!e.isIntersecting) {
                return;
            }else {
                e.target.classList.add('showBoxs');
            };
            observer.unobserve(e.target);
        });
    };

    const options = {
        root: null,
        threshold: 0,
        rootMargin: "-150px",
    };

    const timerObserver = new IntersectionObserver(showTimerBoxs, options);

    timerBoxs.forEach(tb => timerObserver.observe(tb));
    cards.forEach(c => timerObserver.observe(c));
}
cardsAnimations();

/*---------------------------- Gallery ----------------------------*/

const gallery = function() {
    fetch('/json-files/gallery.json')
        .then(results => results.json())
        .then(data => {
            for(let i=0; i<data.length; i++) {
                document.querySelector('.gallery_items').innerHTML += `
                        <div class="gall_pic ${data[i].category}">
                            <img src="${data[i].image}" alt="">
                            <span>${data[i].description}</span>
                        </div>
                        `
            };
            
            const gallNav = document.querySelector('.gallery_nav');
            const imgBoxs = document.querySelectorAll('.gall_pic');
            const gallOverlay = document.querySelector('#overlay');
            
            gallNav.addEventListener('click', (e) => {
                if(e.target.classList.contains('gall_btn')) {
                    gallNav.querySelector('.active').classList.remove('active');
                    e.target.classList.add('active');
                    
                    const dataValue = e.target.getAttribute('data-name');
                    imgBoxs.forEach((box) => {
                        if(box.classList.contains(dataValue) || dataValue === 'all') {
                            box.classList.remove('hide');
                            box.classList.add('show');
                        } else {
                            box.classList.add('hide');
                            box.classList.remove('show');
                        };
                    });
                };
            });
            
            const prevBox = document.querySelector('.prev_box'),
                imgTitle = prevBox.querySelector('.img_title span'),
                prevImg = prevBox.querySelector('.prev_img_box img'),
                closeBoxBtn = prevBox.querySelector('.fa-times'),
                imgDescription = prevBox.querySelector('.img_description span');
    
            imgBoxs.forEach((box, i) => {
                box.addEventListener('click', () => {
                    document.querySelector('body').style.overflow = 'hidden'; //!!!!!!!!!!!!!!!!!
    
                    let selectedPrevImg = data[i].image;
                    let selectedImgCategory = data[i].category;
                    let selectedImgDescription = data[i].description;
                    
                    prevImg.src = selectedPrevImg;
                    imgTitle.textContent = selectedImgCategory;
                    imgDescription.textContent = selectedImgDescription;
                    
                    prevBox.classList.add('show');
                    gallOverlay.classList.add('show'); //!!!!!!!!!!!!!!!!!!!!
                });
                closeBoxBtn.addEventListener('click', () => {
                    prevBox.classList.remove('show');
                    gallOverlay.classList.remove("show"); //!!!!!!!!!!!!!!!!!!!!
                    document.querySelector('body').style.overflow = 'auto';  //!!!!!!!!!!!!!!!!!!!!!!!
                });
            });
            gallOverlay.addEventListener('click', () => {
                prevBox.classList.remove('show');
                gallOverlay.classList.remove("show");
                document.querySelector('body').style.overflow = 'auto';
            });
        });
    };
gallery();

/*---------------------------- Partners slider ----------------------------*/

function sliderLogos() {
    const slider = document.querySelector('.slider');
    const list = document.querySelector('.slider_list');
    let list2;

    const speed = 0.1;
    
    const listWidth = list.offsetWidth;
    let firstX = 0;
    let secondX = listWidth;
    
    function cloneList() {
        list2 = list.cloneNode(true);
        slider.appendChild(list2);
        list2.style.left = `${listWidth}px`;
    };
    cloneList();

    function firstList() {
        firstX -= speed;

        if (listWidth >= Math.abs(firstX)) {
            list.style.left = `${firstX}px`;
        } else {
            firstX = listWidth;
        };
    };

    function secondList() {
        secondX -= speed;
        if (list2.offsetWidth >= Math.abs(secondX)) {
            list2.style.left = `${secondX}px`;
        } else {
            secondX = listWidth;
        };
    };

    function hover() {
        clearInterval(int1);
        clearInterval(int2);
    };

    function unhover() {
        int1 = setInterval(firstList, 5);
        int2 = setInterval(secondList, 5);
    };
    
    let int1 = setInterval(firstList, 5);
    let int2 = setInterval(secondList, 5);

    slider.addEventListener("mouseenter", hover);
    slider.addEventListener("mouseleave", unhover);
};
sliderLogos();