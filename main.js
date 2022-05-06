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
                    })
                    toggler.classList.remove('open');
                    navContainer.classList.remove('open');
                };
            });
        });
    };
    clickCloseNav();
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
        };
    });
};
dropdown();

/*---------------------- Search Btn ------------------------*/

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
        };
    };
    window.addEventListener('scroll', fixedNav);
};
sticky();

/*---------------------------- Smooth Scrolling ----------------------------*/

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

/*---------------------------- Scroll Up Btn ----------------------------*/

// Scroll Up
const sideNav = document.querySelector('.top_btn');

sideNav.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/*---------------------------- Reveal Sections ----------------------------*/

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

/*---------------------------- About text ----------------------------*/

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

/*---------------------------- Loged User ----------------------------*/
// const loginIcon = document.querySelector('.login_logout_link');
// console.log(loginIcon)
// let logedUser = JSON.parse(localStorage.getItem('logedUser'));
// console.log(logedUser)
// if(logedUser) {
//     console.log('rr')
//     document.querySelector('.nav_info_top span').textContent = `Welcome ${logedUser.firstName}`
//     // console.log(logedUser.firstName)
//     loginIcon.classList.add('loged_user');
//     loginIcon.setAttribute('data-modal-target', '#logedUser');
//     loginIcon.addEventListener('click', (e) => {
//         e.preventDefault()
//         console.log(e.target)


//     })
// }

// const userModal = document.createElement('div');
    
// userModal.innerHTML = `
//     <div class="userPage" id="logedUser">
//         <div class="userPage_container">
//             <h1>Welcome</h1>
//         </div>
//     </div>
//     `
// document.body.insertAdjacentElement('beforeend', userModal);