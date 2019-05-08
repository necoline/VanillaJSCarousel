const carousel = (function () {

    function animateSlide() {
        const slides = document.querySelectorAll('.Carousel__wrapper .Carousel__slide');
        let isEnabled = true;    
        let currentSlide = 0;
    
        function changeCurrentSlide(n) {
            currentSlide = (n + slides.length) % slides.length;
        }
        
        function nextSlide(n) {
            hideSlide('Carousel__to-left');
            changeCurrentSlide(n + 1);
            showSlide('Carousel__from-right');
        }
        
        function previousSlide(n) {
            hideSlide('Carousel__to-right');
            changeCurrentSlide(n - 1);
            showSlide('Carousel__from-left');
        }
        
        function goToSlide(n) {
            if (n < currentSlide) {
                hideSlide('Carousel__to-right');
                currentSlide = n;
                showSlide('Carousel__from-left');
            } else {
                hideSlide('Carousel__to-left');
                currentSlide = n;
                showSlide('Carousel__from-right');
            }
        }
        
        function hideSlide(direction) {
            isEnabled = false;
            slides[currentSlide].classList.add(direction);
            slides[currentSlide].addEventListener('animationend', function() {
                this.classList.remove('Carousel__active', direction);
            });
        }
        
        function showSlide(direction) {
            slides[currentSlide].classList.add('Carousel__next', direction);
            slides[currentSlide].addEventListener('animationend', function() {
                this.classList.remove('Carousel__next', direction);
                this.classList.add('Carousel__active');
                isEnabled = true;
            });
        }
    
        document.querySelector('.Carousel__control.left').addEventListener('click', function() {
            if (isEnabled) {
                previousSlide(currentSlide);
            }
        });
        
        document.querySelector('.Carousel__control.right').addEventListener('click', function() {
            if (isEnabled) {
                nextSlide(currentSlide);
            }
        });
    }
    
    function create(imageProps) {
        const { anchorName, images } = imageProps
        const anchor = document.querySelector(`[data-carousel-anchor=${anchorName}]`)

        if (!anchor) {
            throw new Error('Anchor name does not match anchor tag in html')
        }

        const image = images.reduce((accum, currentImage) =>
            accum.concat(`<div class="Carousel__slide"><div class="Carousel__container"><img src="${currentImage}" /></div></div>`), '')
        
        anchor.insertAdjacentHTML('beforeend', `<div class="Carousel__wrapper"><div class="Carousel__inner">${image}</div><div class="Carousel__control left"><div class="Carousel__arrow left"></div></div><div class="Carousel__control right"><div class="Carousel__arrow right"></div></div></div>` )

        document.getElementsByClassName('Carousel__slide')[0].className = 'Carousel__slide Carousel__active'
        
        animateSlide()
        
    }

    return {
        create  
    }
})()




