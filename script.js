function Slider() {
	// Selection
	const slides = document.querySelectorAll(".slide");
	const btnNext = document.querySelector(".btn-next");
	const btnBack = document.querySelector(".btn-back");
	const dotContainer = document.querySelector(".dots-container");

	// Declarations
	let curSlide = 0;
	const maxSlide = slides.length;

	// Functionality
	function gotoSlide(slide) {
		slides.forEach((s, i) => {
			s.style.transform = `translateX(${100 * (i - slide)}%)`;
		});
	}

	function nextSlide() {
		if (curSlide == maxSlide - 1) {
			curSlide = 0;
		} else {
			curSlide++;
		}

		gotoSlide(curSlide);
		activeDots(curSlide);
	}
	function backSlide() {
		if (curSlide == 0) {
			curSlide = maxSlide - 1;
		} else {
			curSlide--;
		}

		gotoSlide(curSlide);
		activeDots(curSlide);
	}
	function createDots() {
		slides.forEach((_, i) => {
			dotContainer.insertAdjacentHTML(
				"beforeend",
				`<button class="dot" data-slide="${i}"></button>`
			);
		});
	}
	function activeDots(slide) {
		document
			.querySelectorAll(".dot")
			.forEach((dot) => dot.classList.remove("active-dot"));

		document
			.querySelector(`.dot[data-slide="${slide}"]`)
			.classList.add("active-dot");
	}
	function init() {
		createDots();
		gotoSlide(curSlide);
		activeDots(curSlide);
		setInterval(nextSlide, 5000);
	}

	// Initialize ( Calling Function )
	init();

	// Event handlers
	btnBack.addEventListener("click", backSlide);
	btnNext.addEventListener("click", nextSlide);

	document.addEventListener("keydown", (e) => {
		if (e.key === "ArrowLeft") backSlide();
		e.key === "ArrowRight" && nextSlide();
	});

	dotContainer.addEventListener("click", (e) => {
		if (e.target.classList.contains("dot")) {
			// Get value from object
			// const { slide } = e.target.dataset;
			// curSlide = slide;

			curSlide = e.target.dataset.slide;
			gotoSlide(curSlide);
			activeDots(curSlide);
		}
	});
}

// It's good for wrap our code into 1 blog-scope
Slider();
