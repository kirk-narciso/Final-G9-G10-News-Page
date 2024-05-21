// script.js

document.body.style.height = '300vh'; // Make the body tall enough to scroll

const images = document.querySelectorAll('.image');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

images.forEach(image => {
    observer.observe(image);
});

// Smooth scrolling
let currentScroll = 0;
let targetScroll = 0;
const scrollSpeed = 0.1; // Adjust this value to control the scroll speed

window.addEventListener('wheel', function(e) {
    targetScroll += e.deltaY;
    if (targetScroll < 0) targetScroll = 0;
    if (targetScroll > document.body.scrollHeight - window.innerHeight) {
        targetScroll = document.body.scrollHeight - window.innerHeight;
    }
    e.preventDefault(); // Prevent default scrolling
}, { passive: false });

function smoothScroll() {
    currentScroll += (targetScroll - currentScroll) * scrollSpeed;
    window.scrollTo(0, currentScroll);
    requestAnimationFrame(smoothScroll);
}

smoothScroll();
