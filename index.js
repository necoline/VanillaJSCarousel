var slides = document.querySelectorAll('.carousel .slide');
var dots = document.querySelectorAll('.carousel-indicators li');
var currentSlide = 0;
var isEnabled = true;

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

document.querySelector('.carousel-indicators').addEventListener('click', function(e) {
	var target = [].slice.call(e.target.parentNode.children).indexOf(e.target);
	if (target !== currentSlide && target < dots.length) {
		goToSlide(target);
	}
});