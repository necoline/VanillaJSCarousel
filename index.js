
var carousel = (function () { // autoSlide, possibly add time of slide, slide transitionSpeed.

    const slides = document.querySelectorAll('.carousel .slide');
    var isEnabled = true;    
    var currentSlide = 0;

    function changeCurrentSlide(n) {
        currentSlide = (n + slides.length) % slides.length;
    }
    
    function nextSlide(n) {
        hideSlide('to-left');
        changeCurrentSlide(n + 1);
        showSlide('from-right');
    }
    
    function previousSlide(n) {
        hideSlide('to-right');
        changeCurrentSlide(n - 1);
        showSlide('from-left');
    }
    
    function goToSlide(n) {
        if (n < currentSlide) {
            hideSlide('to-right');
            currentSlide = n;
            showSlide('from-left');
        } else {
            hideSlide('to-left');
            currentSlide = n;
            showSlide('from-right');
        }
    }
    
    function hideSlide(direction) {
        isEnabled = false;
        slides[currentSlide].classList.add(direction);
        dots[currentSlide].classList.remove('active');
        slides[currentSlide].addEventListener('animationend', function() {
            this.classList.remove('active', direction);
        });
    }
    
    function showSlide(direction) {
        slides[currentSlide].classList.add('next', direction);
        dots[currentSlide].classList.add('active');
        slides[currentSlide].addEventListener('animationend', function() {
            this.classList.remove('next', direction);
            this.classList.add('active');
            isEnabled = true;
        });
    }

    function create(imageArray) {
        const anchor = document.querySelector('[data-carousel-anchor]')
        const result = imageArray.reduce((accum, currentImage) =>
            accum.concat(`<div class="slide"><div class="container"><img src="${currentImage}" /></div></div>`), '')
        
        anchor.insertAdjacentHTML('beforeend', `<div class="carousel"><div class="carousel-inner">${result}</div><div class="carousel-control left"><div class="arrow left"></div></div><div class="carousel-control right"><div class="arrow right"></div></div></div>` )

        document.getElementsByClassName('slide')[0].className = 'slide active'

        document.querySelector('.carousel-control.left').addEventListener('click', function() {
            if (isEnabled) {
                previousSlide(currentSlide);
            }
        });
        
        document.querySelector('.carousel-control.right').addEventListener('click', function() {
            if (isEnabled) {
                nextSlide(currentSlide);
            }
        });
        }

    return {
        create
    }
})()
