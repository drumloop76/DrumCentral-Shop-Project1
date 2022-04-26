'use strict'

/*---------------------------- Burger ----------------------------*/

const navToggler = function () {
    const toggler = document.querySelector('.toggler');
    const line = document.querySelectorAll('.line');
    const navContainer = document.querySelector('.nav_container');
    const navLinks = document.querySelectorAll('.list_item');
    const submenuBtn = document.querySelector('.sub-btn');
    const mediaSizeTablet = 768;
    const mediaSizeMobile = 500;

    
    toggler.addEventListener('click', function () {
        line.forEach((el) => {
            el.classList.toggle('active');
            el.classList.toggle('not-active');
        })
        toggler.classList.toggle('open');
        navContainer.classList.toggle('open');
        
        if (window.innerWidth > mediaSizeMobile && !submenuBtn.classList.contains('open_sub')) {
            navLinks.forEach((link, i) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `linksSlide 0.4s ease both ${i / 10 + 0.1}s`;
                }
            })
        }
    })

    function clickCloseNav() {
        document.querySelectorAll('.scroll').forEach(el => {
            el.addEventListener('click', function(e) {
                if(e.target.hasAttribute('href')) {
                    line.forEach((el) => {
                        el.classList.remove('active');
                        el.classList.toggle('not-active');
                    })
                    toggler.classList.remove('open');
                    navContainer.classList.remove('open');
                };
            })
        })
    }
    clickCloseNav()
};
navToggler();


/*---------------------------- Dropdown menu ----------------------------*/

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
        }
    });
};
dropdown();

/*---------------------- Search Btn ------------------------*/

const search = function () {
    const searchForm = document.querySelector('.search_form');
    const searchInput = document.querySelector('.search_input');
    const searchBtn = document.querySelector('.search_btn');
    const searchIcon = document.querySelector('.fa-search');
    const searchBox = document.querySelector('.nav_search_box')

    // const mediaSizeLaptop = 1024;
    // const mediaSizeTablet = 768;
    const mediaSizeMobile = 500;

    searchBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (searchInput.classList.contains('open') && window.innerWidth > mediaSizeMobile) {
            searchForm.classList.remove('open');
            searchInput.classList.remove('open');
            searchBtn.classList.remove('open');
            searchIcon.classList.remove('open');
            searchBox.classList.remove('open-tablet-box');
        } else {
            searchForm.classList.add('open');
            searchInput.classList.add('open');
            searchBtn.classList.add('open');
            searchIcon.classList.add('open');
            searchBox.classList.add('open-tablet-box');
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
search();

/*---------------------------- Stycky nav ----------------------------*/

const sticky = function() {
    const mediaSizeTablet = 768;
    const navContainer = document.querySelector('.nav_container');
    let navTop = navContainer.offsetTop;
    
    function fixedNav() {
        if (window.scrollY >= navTop && window.innerWidth > mediaSizeTablet) {    
            navContainer.classList.add('sticky');
        } else {
            navContainer.classList.remove('sticky');    
        }
    }
    window.addEventListener('scroll', fixedNav);
}
sticky();

/*---------------------------- Smooth Scrolling ----------------------------*/

document.querySelector('.nav_list').addEventListener('click', function(e) {
    if(!e.target.classList.contains('scroll')) return
    if(e.target.classList.contains('list_link')) {
        const sectionId = e.target.getAttribute('href');
        // sectionId.classList.add('active-page')
        document.querySelector(sectionId).scrollIntoView({
            behavior: "smooth"
        })
    };
    e.preventDefault();
});