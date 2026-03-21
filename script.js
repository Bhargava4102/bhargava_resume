document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('.section');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    // Dynamic footer year
    var footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            var navbarHeight = navbar ? navbar.offsetHeight : 0;
            window.scrollTo({
                top: target.offsetTop - navbarHeight,
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            if (navLinks) {
                navLinks.classList.remove('open');
            }
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Hamburger menu toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Intersection Observer for fade-in animation (exclude hero)
    var fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    // Initialize sections for fade-in (skip the hero)
    document.querySelectorAll('.section:not(.hero)').forEach(function (section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeObserver.observe(section);
    });

    // Scroll-spy using IntersectionObserver
    var currentSection = '';
    var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                currentSection = entry.target.getAttribute('id');
                navLinkItems.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + currentSection) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    });

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });

    // Navbar background change on scroll (throttled with rAF)
    var ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(function () {
                if (navbar) {
                    if (window.scrollY > 50) {
                        navbar.style.backgroundColor = 'rgba(234, 230, 245, 0.95)';
                    } else {
                        navbar.style.backgroundColor = 'var(--bg-light)';
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Experience section interactions
    document.querySelectorAll('#experience .experience-block').forEach(function (block) {
        block.style.cursor = 'pointer';

        function toggleBlock() {
            // Close other blocks
            document.querySelectorAll('#experience .experience-block').forEach(function (otherBlock) {
                if (otherBlock !== block && otherBlock.classList.contains('active')) {
                    otherBlock.classList.remove('active');
                    otherBlock.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current block
            var isActive = block.classList.toggle('active');
            block.setAttribute('aria-expanded', String(isActive));
        }

        block.addEventListener('click', toggleBlock);

        // Keyboard support: Enter and Space
        block.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleBlock();
            }
        });
    });
});