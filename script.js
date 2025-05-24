// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Update active nav link on scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');

// Intersection Observer for fade-in animation
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2
});

// Function to get current section
function getCurrentSection() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    return current;
}

// Function to update active navigation link
function updateNav() {
    const current = getCurrentSection();
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Initialize sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    fadeObserver.observe(section);
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(234, 230, 245, 0.95)';
    } else {
        navbar.style.backgroundColor = 'var(--bg-light)';
    }
    updateNav();
});

// Update nav on page load
document.addEventListener('DOMContentLoaded', updateNav);

// Experience section interactions
document.querySelectorAll('#experience .experience-block').forEach(block => {
    block.style.cursor = 'pointer';
    block.addEventListener('click', function() {
        // Close other blocks
        document.querySelectorAll('#experience .experience-block').forEach(otherBlock => {
            if (otherBlock !== block && otherBlock.classList.contains('active')) {
                otherBlock.classList.remove('active');
            }
        });
        
        // Toggle current block
        this.classList.toggle('active');
    });
}); 