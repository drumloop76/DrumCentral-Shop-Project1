'use strict'

// import { scrollBtn } from "js-fileslib.js";

///////////////////////////////////////// Burger /////////////////////////////////////////

const navToggler = function () {
    const toggler = document.querySelector('.toggler');
    const line = document.querySelectorAll('.line');
    const navContainer = document.querySelector('.nav_container');
    const navLinks = document.querySelectorAll('.list_item');
    const submenuBtn = document.querySelector('.sub-btn');
    const wrapper = document.querySelector('body')
    const mediaSizeTablet = 768;
    const mediaSizeMobile = 500;

    
    toggler.addEventListener('click', function () {
        line.forEach((el) => {
            el.classList.toggle('active');
            el.classList.toggle('not-active');
        });
        toggler.classList.toggle('open');
        navContainer.classList.toggle('open');

        if(navContainer.classList.contains('open')) {
            document.querySelector('body').style.overflow = 'hidden';
        } else {
            document.querySelector('body').style.overflow = 'auto';
        }
        
        if (window.innerWidth > mediaSizeMobile && !submenuBtn.classList.contains('open_sub')) {
            navLinks.forEach((link, i) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `linksSlide 0.4s ease both ${i / 10 + 0.1}s`;
                };
            });
        };
    });

    function clickCloseNav() {
        document.querySelectorAll('.scroll').forEach(el => {
            el.addEventListener('click', function(e) {
                if(e.target.hasAttribute('href')) {
                    line.forEach((el) => {
                        el.classList.remove('active');
                        el.classList.toggle('not-active');
                    });
                    toggler.classList.remove('open');
                    navContainer.classList.remove('open');
                };
            });
        });
    };
    clickCloseNav();
};
navToggler();


///////////////////////////////////////// Dropdown menu /////////////////////////////////////////

const dropdown = function () {
    const submenuBtn = document.querySelector('.sub-btn');
    const caretDown = document.querySelector('.fa-chevron-down');

    const mediaSizeTablet = 768;

    submenuBtn.addEventListener('click', function (e) {
        e.preventDefault();
        this.classList.toggle('open_sub');
        let submenu = this.nextElementSibling;

        if (submenu.style.display === 'block' && window.innerWidth <= mediaSizeTablet) {
            submenu.style.display = 'none';
            caretDown.classList.remove('rotate');
        } else {
            submenu.style.display = 'block';
            caretDown.classList.add('rotate');
        };
    });
};
dropdown();

///////////////////////////////////////// Search Btn /////////////////////////////////////////

const search = function () {
    const searchForm = document.querySelector('.search_form');
    const searchInput = document.querySelector('.search_input');
    const searchBtn = document.querySelector('.search_btn');
    const searchIcon = document.querySelector('.fa-search');
    const searchBox = document.querySelector('.nav_search_box');    
    
    // const mediaSizeLaptop = 1024;
    // const mediaSizeTablet = 768;
    const mediaSizeMobile = 500;

    searchBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (searchInput.classList.contains('open') && searchInput.value.length == 0 && window.innerWidth > mediaSizeMobile) {
            searchForm.classList.remove('open');
            searchInput.classList.remove('open');
            searchBtn.classList.remove('open');
            searchIcon.classList.remove('open');
            searchBox.classList.remove('open-tablet-box');
            searchIcon.style.color = 'black';
        } else {            
            searchForm.classList.add('open');
            searchInput.classList.add('open');
            searchBtn.classList.add('open');
            searchIcon.classList.add('open');
            searchBox.classList.add('open-tablet-box');
            document.querySelector('.search_results_div').classList.add('open_search_modal');
            // document.querySelector('.list_link').classList.add('shrink'); /////////////
            searchIcon.style.color = 'red';
        };

        if (window.innerWidth <= mediaSizeMobile) {
            searchForm.classList.remove('open');
            searchInput.classList.remove('open');
            searchBtn.classList.remove('open');
            searchIcon.classList.remove('open');
            searchBox.classList.remove('open-tablet-box');
        };
    });
};

function autoSearch() {
    fetch('/json-files/cards-products.json')
        .then(results => results.json())
        .then(data => {
            let products = [];
            for(let i=0 ; i<data.length ; i++) {
                products.push(data[i].name);
            };            

            function autocomplete(input, products) {
                let currentFocus;
                input.addEventListener('input', function(e) {
                    let inputVal = this.value;                    

                    closeAllLists();

                    if(!inputVal) return false;
                    currentFocus = -1;

                    function findMatches(keyword, product) {
                        return product.filter(p => {
                            const regex = new RegExp(keyword, 'gi');             
                            return p.match(regex);
                        });
                    };

                    function displayMatches() {
                        const matchArray = findMatches(inputVal, products);
                        const html = matchArray.map(p => {                        
                            const regex = new RegExp(inputVal, 'gi');
                            const prod = p.replace(regex, `<span class="highlight">${inputVal}</span>`);
                            
                            return `
                                <li class="auto">
                                    <span class="prodName">${prod}</span>                                    
                                </li>
                            `;
                        }).join('');                        
                        document.querySelector('.search_list').innerHTML = html;                        
                    };
                    displayMatches();
                    
                    document.querySelectorAll('.auto').forEach(li => {
                        li.addEventListener('click', function(e){
                            document.querySelector('.fa-search').style.color = 'green';
                            // document.querySelector('.search_btn').style.background = 'red';
                            input.value = this.getElementsByClassName("prodName")[0].outerText;
                            closeAllLists();
                        });
                    });

                    input.addEventListener("keydown", function(e) {
                        let x = document.querySelector(".search_list");
                        if(x) x = x.getElementsByTagName("li");
                        if(e.keyCode == 40) {
                            currentFocus++;
                            addActive(x);
                        } else if (e.keyCode == 38) {
                            currentFocus--;
                            addActive(x);
                        } else if (e.keyCode == 13) {
                            e.preventDefault();
                            if (currentFocus > -1) {
                                if(x) x[currentFocus].click(); //////////////////
                            };
                        };
                    });
                    function addActive(x) {
                        if(!x) return false;
                        removeActive(x);
                        if(currentFocus >= x.length) currentFocus = 0;
                        if(currentFocus < 0) currentFocus = (x.length - 1);
                        x[currentFocus].classList.add("autocomplete-active");
                    }
                    function removeActive(x) {
                        for (var i = 0; i < x.length; i++) {
                            x[i].classList.remove("autocomplete-active");
                        };
                    };
                });

                function closeAllLists(el) {
                    const x = document.getElementsByClassName("prodName");
                    for(let i=0; i<x.length; i++) {
                        if(el != x[i] && el != input) {
                            x[i].parentNode.remove();                            
                            closeAllLists();
                        };
                    };
                };

                document.addEventListener("click", function(e) {
                    closeAllLists(e.target);
                });
            };
            
            autocomplete(document.querySelector('.search_input'), products);
        });
};
autoSearch();
search();

///////////////////////////////////////// Stycky nav /////////////////////////////////////////

const sticky = function() {
    const mediaSizeTablet = 768;
    const navContainer = document.querySelector('.nav_container');
    let navTop = navContainer.offsetTop;
    
    function fixedNav() {
        if (window.scrollY >= navTop && window.innerWidth > mediaSizeTablet) {    
            navContainer.classList.add('sticky');
        } else {
            navContainer.classList.remove('sticky');    
        };
    };
    window.addEventListener('scroll', fixedNav);
};
sticky();

///////////////////////////////////////// Smooth Scrolling /////////////////////////////////////////
function smothScroll() {
    document.querySelector('.nav_list').addEventListener('click', function(e) {
        if(!e.target.classList.contains('scroll')) return
        if(e.target.classList.contains('list_link')) {
            const sectionId = e.target.getAttribute('href');
            document.querySelector(sectionId).scrollIntoView({
                behavior: "smooth"
            });
        };
        e.preventDefault();
    });
};
smothScroll();

///////////////////////////////////////// Scroll Up Btn /////////////////////////////////////////

function scrollUpBtn() {
    const topBtn = document.querySelector('.top_btn');

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};
scrollUpBtn();

///////////////////////////////////////// Reveal Sections /////////////////////////////////////////

const reveal = function() {
    const sectionTitle = document.querySelectorAll('.title');
    const paras = document.querySelectorAll('.paras_about');
    const headers = document.querySelectorAll('.about_text_header');
    const moreBtns = document.querySelectorAll('.more_btn');
    const aboutImgs = document.querySelectorAll('.about_img');
    
    const showText = function(entries, observer) {
        const [entry] = entries;

        if(!entry.isIntersecting) return;
        else entry.target.classList.add('showAbout');

        observer.unobserve(entry.target);
    };

    const revealObserver = new IntersectionObserver(showText, {
        root: null,
        threshold: 0,
        rootMargin: "-150px",
    });

    sectionTitle.forEach(t => revealObserver.observe(t));
    paras.forEach(p => revealObserver.observe(p));
    headers.forEach(h => revealObserver.observe(h));
    moreBtns.forEach(b => revealObserver.observe(b));
    aboutImgs.forEach(img => revealObserver.observe(img));
};
reveal();

///////////////////////////////////////// Lazy Load /////////////////////////////////////////

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

///////////////////////////////////////// About text /////////////////////////////////////////

const aboutText = function() {
    const noOfChar = 200;
    const paragraphs = document.querySelectorAll('.paras_about');

    paragraphs.forEach(par => {
        if(par.textContent.length < noOfChar) {
            par.nextElementSibling.style.display = "none";
        }else {
            const text = par.textContent.slice(0, noOfChar);
            const moreText = par.textContent.slice(noOfChar);
            par.innerHTML = `
                    ${text}<span class="dots">...</span>
                    <span class="more_text show_less">${moreText}</span>
                    `
        };
    });

    document.querySelectorAll('.more_btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.querySelector('.dots').classList.toggle('show_less');
            btn.parentElement.querySelector('.more_text').classList.toggle('show_less');
            btn.textContent == "Read More" ? btn.textContent = "Read Less" : btn.textContent = "Read More";
        });
    });
};
aboutText();

///////////////////////////////////////// Loged User /////////////////////////////////////////

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('logedUser') == null ? localStorage.getItem('localCartNumbers') : localStorage.getItem('userCartNumbers');
    if(productNumbers >= 1) {
        span(productNumbers);
    } else {
        document.querySelectorAll('.shop span').forEach(s => {
            s.style.display = "none";
        });
    };
};
onLoadCartNumbers()
///////////////////////////////////////// SPAN /////////////////////////////////////////            
function span(number) {
    const numSpan = document.querySelectorAll('.shop span');

    numSpan.forEach(s => {
        s.textContent = `${number}`;
    });
};

////////////////////////////////////////// SideNav Reveal //////////////////////////////////////////////
const revealSideNav = function() {
    const sideNav = document.querySelector('.side_nav');
    const sideBtn = document.querySelector('.top_btn');
    
    window.addEventListener("scroll", () => { 
        if(window.scrollY >= document.documentElement.clientHeight){               
            sideNav.classList.add("showSideNav");
            sideBtn.classList.add("showSideBtn");
        }else{
            sideNav.classList.remove("showSideNav");
            sideBtn.classList.remove("showSideBtn");
        };
    });
};
revealSideNav();