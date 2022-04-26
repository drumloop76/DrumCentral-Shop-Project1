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
    const deadline = '2022-05-01T00:00:00';
    
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
                clearInterval(timerTick)
            }
        };
        updateTimer();
    };
    setTimer('.timer', deadline);

    function doubleDig(n) {
        if(n >= 0 && n < 10) {
            return '0' + n
        } else {
            return n
        }
    };
};
timer();

fetch('/json-files/cards-products.json')
    .then(results => results.json())
    .then(data => {
        for(let i=0; i<data.length; i++) {
            if(data[i].sale == true) {
                // console.log(data[i])
                document.querySelectorAll('.card').forEach((obj, i) => {
                    obj.innerHTML = `
                        <img class="card_img" src="${data[i].image}">
                        <h3 class="card_title">${data[i].name}</h3>
                        <p class="card_price">only <span>€ ${data[i].price}</span></p>
                        <button class="card_btn open_prod_modal" data-product-target="#productModal">Read More</button>`
                });
            }       
        }   
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
            }
            observer.unobserve(e.target);
        })
    };

    const options = {
        root: null,
        threshold: 0,
        rootMargin: "-150px",
    }

    const timerObserver = new IntersectionObserver(showTimerBoxs, options)

    timerBoxs.forEach(tb => timerObserver.observe(tb));
    cards.forEach(c => timerObserver.observe(c));
}
cardsAnimations();

/*---------------------------- Lazy Load ----------------------------*/

const lazyLoad = function() {
    const aboutImgs = document.querySelectorAll('img[data-src]');

    const loadImg = function(entries, observer) {
        const [entry] = entries;
        
        if(!entry.isIntersecting) return;

        entry.target.src = entry.target.dataset.src;

        entry.target.addEventListener('load', function() {
            entry.target.classList.remove('lazy_img');
        });

        observer.unobserve(entry.target);
    };

    const imgObserver = new IntersectionObserver(loadImg, {
        root: null,
        threshold: 0,
        rootMargin: "-120px",
    });

    aboutImgs.forEach(img => imgObserver.observe(img));
};
lazyLoad();