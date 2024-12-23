document.addEventListener('DOMContentLoaded', () => {
    // Cursor functionality
    const cursor = document.querySelector('.cursor');
    const links = document.querySelectorAll('a, button');
    let isHoveringClickable = false;

    if (cursor) {
        // Initial cursor position fix
        cursor.style.opacity = 0;
        
        document.addEventListener('mousemove', (e) => {
            // Show cursor on first move
            cursor.style.opacity = 1;
            
            // Get mouse position relative to viewport
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Position the cursor - subtract half the cursor size to center it
            cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
            
            // Scale effect for hovering over clickable elements
            const scale = isHoveringClickable ? 1.5 : 1;
            cursor.style.transform += ` scale(${scale})`;
        });

        // Cursor effects for clickable elements
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                isHoveringClickable = true;
                cursor.style.borderColor = 'var(--accent)';
                cursor.style.backgroundColor = 'rgba(33, 150, 243, 0.1)';
            });

            link.addEventListener('mouseleave', () => {
                isHoveringClickable = false;
                cursor.style.borderColor = 'var(--accent)';
                cursor.style.backgroundColor = 'transparent';
            });
        });

        // Click animation
        document.addEventListener('mousedown', (event) => {
            cursor.style.transform = `translate(${event.clientX - 10}px, ${event.clientY - 10}px) scale(0.8)`;
        });

        document.addEventListener('mouseup', (event) => {
            cursor.style.transform = `translate(${event.clientX - 10}px, ${event.clientY - 10}px) scale(1)`;
        });

        // Hide default cursor
        document.body.style.cursor = 'none';
        links.forEach(link => link.style.cursor = 'none');

        // Hide cursor when leaving the window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = 0;
        });

        // Show cursor when entering the window
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = 1;
        });
    }

    // Theme toggler with smooth transition
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const root = document.documentElement;
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeIcon.classList.toggle('fa-moon');
        themeIcon.classList.toggle('fa-sun');
        
        // Save theme preference
        localStorage.setItem('theme', 
            document.body.classList.contains('dark-theme') ? 'dark' : 'light'
        );

        // Add theme transition animation
        document.body.style.transition = 'background-color 0.5s, color 0.5s';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    });

    // Enhanced navbar hide on scroll with smooth transition
    let lastScroll = 0;
    let isNavbarVisible = true;
    const navbar = document.querySelector('.navbar');

    function hideNavbar() {
        if (isNavbarVisible) {
            navbar.style.transform = 'translateY(-100%)';
            isNavbarVisible = false;
        }
    }

    function showNavbar() {
        if (!isNavbarVisible) {
            navbar.style.transform = 'translateY(0)';
            isNavbarVisible = true;
        }
    }

    // Throttle scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                hideNavbar();
            } else {
                showNavbar();
            }
            
            lastScroll = currentScroll;
        });
    });

    // Improved project cards animation on scroll
    const cards = document.querySelectorAll('.project-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add stagger effect to project tags
                const tags = entry.target.querySelectorAll('.project-tag');
                tags.forEach((tag, index) => {
                    tag.style.transitionDelay = `${index * 0.1}s`;
                });
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });

    // Enhanced loader with smooth fadeout
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.transition = 'opacity 0.8s ease-out';
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 500);
        }
    });

    // Form validation and submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add loading state to submit button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitButton.textContent = 'Sent!';
                submitButton.style.backgroundColor = 'var(--accent)';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
});
