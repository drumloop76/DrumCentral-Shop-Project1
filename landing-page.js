'use strict'

/*---------------------------- Slider Hero ----------------------------*/

const slider = function() {

    const letters = document.querySelectorAll('.logo');
    const mainHeader = document.querySelector('.main_header-two');
    const mainTxt = document.querySelector('.main_header-text');
    const mainBtn = document.querySelector('.main_header-btn');

    
    window.addEventListener('DOMContentLoaded', () => {
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
    });

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
};
slider();