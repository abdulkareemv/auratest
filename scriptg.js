document.addEventListener("DOMContentLoaded", function () {
    const slideContainer = document.querySelector(".carousel-container");
    const slides = document.querySelectorAll(".carousel-slide img");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let index = 0;
    const totalSlides = slides.length;

    // Function to move the slide
    function moveSlide(step) {
        index = (index + step + totalSlides) % totalSlides; // Handle wrap-around
        slideContainer.style.transform = `translateX(-${index * 100}%)`;
    }

    // Event listeners for navigation buttons
    prevBtn.addEventListener("click", () => moveSlide(-1));
    nextBtn.addEventListener("click", () => moveSlide(1));

    // Auto-slide functionality
    let autoSlideInterval = setInterval(() => moveSlide(1), 4000);

    // Pause auto-slide on hover
    slideContainer.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
    slideContainer.addEventListener("mouseleave", () => {
        autoSlideInterval = setInterval(() => moveSlide(1), 4000);
    });

    // Keyboard navigation for accessibility
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            moveSlide(-1);
        } else if (e.key === "ArrowRight") {
            moveSlide(1);
        }
    });