// Initialize Lenis smooth scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Initialize Atropos tilt on all cards, and make the full card surface clickable
document.querySelectorAll('.card-tilt').forEach(el => {
    Atropos({
        el,
        activeOffset: 120,
        shadowScale: .95,
        duration: 300,
    });

    el.addEventListener('click', function (e) {
        if (!e.target.closest('a')) {
            const firstLink = this.querySelector('.card-link');
            if (firstLink) firstLink.click();
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        lenis.scrollTo(this.getAttribute('href'));
    });
});

// Intersection Observer for fade-in animations
const sections = document.querySelectorAll('.fade-in-section');
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});
