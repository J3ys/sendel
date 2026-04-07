// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Check if user prefers dark mode
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            updateThemeIcon('dark');
        }
    }
    
    // Theme toggle click event
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        const isActive = hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Skills Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Show/hide skill cards based on filter
            skillCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Project Details Modal
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.querySelector('.close-modal');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    
    // Open modal with project details
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            const projectCategory = projectCard.querySelector('.project-category').textContent;
            const projectDescription = projectCard.querySelector('p:not(.project-category)').textContent;
            const projectTech = projectCard.querySelector('.project-tech').innerHTML;
            const projectOutcomes = projectCard.querySelector('.project-outcomes').innerHTML;
            const projectImage = projectCard.querySelector('.project-image img').src;
            
            // Create modal content
            modalContent.innerHTML = `
                <h2>${projectTitle}</h2>
                <p class="project-category">${projectCategory}</p>
                <div class="modal-image">
                    <img src="${projectImage}" alt="${projectTitle}">
                </div>
                <div class="modal-description">
                    <h3>Project Overview</h3>
                    <p>${projectDescription}</p>
                    <h3>Technologies Used</h3>
                    <div class="project-tech">${projectTech}</div>
                    <div class="project-outcomes">${projectOutcomes}</div>
                </div>
                <h3>Architecture Details</h3>
                <p>This architecture was designed to address specific business challenges while ensuring scalability, reliability, and performance. The solution leverages industry best practices and modern design patterns.</p>
            `;
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            closeModal.focus();
        });
    });

    // Modal focus trap
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModalFn();
            return;
        }
        if (e.key !== 'Tab') return;
        const focusable = modal.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    function closeModalFn() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Close modal
    closeModal.addEventListener('click', closeModalFn);

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFn();
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            // For this demo, we'll just show a success message
            const formData = new FormData(contactForm);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Form submitted:', formValues);
            
            // Show success message
            contactForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. I'll get back to you soon.</p>
                </div>
            `;
        });
    }
    
    // Make entire project card clickable
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the button/link itself
            if (e.target.closest('.btn')) return;
            const btn = card.querySelector('.btn');
            if (btn) btn.click();
        });
    });

    // Compact header on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Add animation on scroll (throttled)
    let scrollTicking = false;
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-card, .project-card, .cert-card, .timeline-item');
        const screenPosition = window.innerHeight / 1.2;

        elements.forEach(element => {
            if (!element.classList.contains('animate') && element.getBoundingClientRect().top < screenPosition) {
                element.classList.add('animate');
            }
        });
        scrollTicking = false;
    };

    function onScroll() {
        if (!scrollTicking) {
            requestAnimationFrame(animateOnScroll);
            scrollTicking = true;
        }
    }

    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', onScroll);

    // Dynamic footer year
    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();
});