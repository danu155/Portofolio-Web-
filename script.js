// ===== ACCORDION TOGGLE =====
function toggleAccordion(header) {
    const item = header.parentElement;
    // Toggle hanya accordion yang diklik saja
    item.classList.toggle('active');
}

// ===== COPY EMAIL FUNCTION =====
function copyEmail(el) {
    navigator.clipboard.writeText('lukasdanu4@gmail.com');
    el.innerHTML = '<i class="fas fa-check" style="font-size: 1.2rem;"></i> Tersalin!';
    setTimeout(() => {
        el.innerHTML = '<i class="fas fa-envelope" style="font-size: 1.2rem;"></i> lukasdanu4@gmail.com';
    }, 2000);
}

// ===== SECTION ANIMATION WITH INTERSECTION OBSERVER =====
const animateOnScroll = () => {
    // Get all sections
    const sections = document.querySelectorAll('.section, .hero');
    
    // Intersection Observer options
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Section enters viewport
                entry.target.classList.remove('section-hidden');
                entry.target.classList.add('section-visible');
                
                // Trigger animation
                entry.target.style.animation = 'none';
                setTimeout(() => {
                    entry.target.style.animation = '';
                }, 10);
            } else {
                // Section leaves viewport
                if (entry.target.getBoundingClientRect().top < 0) {
                    // Scrolling down - fade out up
                    entry.target.classList.remove('section-visible');
                    entry.target.classList.add('section-hidden');
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        section.classList.add('section-hidden');
        observer.observe(section);
    });

    // Trigger animation on first section on page load
    window.addEventListener('load', () => {
        const heroSection = document.querySelector('.hero');
        if (heroSection && heroSection.getBoundingClientRect().top < window.innerHeight * 0.7) {
            heroSection.classList.remove('section-hidden');
            heroSection.classList.add('section-visible');
        }
    });
};

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
    animateOnScroll();
}

const typingPhrases = [
    'FORTUNE FAVORS THE BOLD',
    'Cyber Security Enthusiast',
    'SMK N 7 Semarang — SIJA',
    'Consistent. Disciplined. Curious.'
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeLoop() {
    const el = document.getElementById('typed-text');
    if (!el) return;
    const phrase = typingPhrases[phraseIndex];
    if (!isDeleting) {
        el.textContent = phrase.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === phrase.length) {
            isDeleting = true;
            setTimeout(typeLoop, 1500);
            return;
        }
        setTimeout(typeLoop, 70);
    } else {
        el.textContent = phrase.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % typingPhrases.length;
            setTimeout(typeLoop, 300);
            return;
        }
        setTimeout(typeLoop, 35);
    }
}
typeLoop();

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
