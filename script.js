document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll animations
    const animateOnScroll = function() {
        const contentBlocks = document.querySelectorAll('.content-block, .about-block');
        const imageContainers = document.querySelectorAll('.image-container, .about-image-container');
        const textContainers = document.querySelectorAll('.text-container, .about-text-container');
        
        // Check if elements are in viewport
        const isInViewport = function(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight * 0.75) &&
                rect.bottom >= (window.innerHeight * 0.25)
            );
        };
        
        // Add animate class when in viewport
        contentBlocks.forEach((block, index) => {
            if (isInViewport(block)) {
                // Delay animation for each block
                setTimeout(() => {
                    block.querySelector('.image-container, .about-image-container')?.classList.add('animate');
                    block.querySelector('.text-container, .about-text-container')?.classList.add('animate');
                }, index * 200);
            }
        });
    };

    // Initialize animations on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Parallax effect for hero sections
    const heroParallax = function() {
        const hero = document.querySelector('.hero-section');
        const aboutHero = document.querySelector('.about-hero');
        
        if (hero) {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
        
        if (aboutHero) {
            const scrollPosition = window.pageYOffset;
            aboutHero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    };

    window.addEventListener('scroll', heroParallax);

    // Image hover effect
    document.querySelectorAll('.content-image, .about-image').forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});