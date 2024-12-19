document.addEventListener('DOMContentLoaded', () => {
    // Theme toggler
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeIcon.classList.toggle('fa-moon');
        themeIcon.classList.toggle('fa-sun');
        localStorage.setItem('theme', 
            document.body.classList.contains('dark-theme') ? 'dark' : 'light'
        );
    });

    // Navbar scroll behavior
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Initialize skill bars animation
    const skillBars = document.querySelectorAll('.skill .bar div');
    if (skillBars.length > 0) {
        setTimeout(() => {
            skillBars.forEach(bar => {
                const width = bar.parentElement.parentElement.querySelector('span').textContent;
                bar.style.width = width;
            });
        }, 500);
    }

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Form submission functionality will be implemented soon!');
        });
    }
});
