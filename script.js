document.addEventListener('DOMContentLoaded', function() {
    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                item.style.display = (filter === 'all' || item.getAttribute('data-category') === filter) 
                    ? 'block' 
                    : 'none';
            });
        });
    });

    // 3D Gallery Animation
    const projects = document.querySelectorAll('.project-card');
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');
    let currentPosition = 3;
    
    function updateGallery() {
        projects.forEach((project, index) => {
            const position = index - currentPosition;
            const isVisible = Math.abs(position) <= 3;
            
            project.style.opacity = isVisible ? '1' : '0';
            project.style.pointerEvents = isVisible ? 'auto' : 'none';
            
            if (isVisible) {
                const translateX = position * 150;
                const rotateY = position * 10;
                const zIndex = 4 - Math.abs(position);
                project.style.transform = `translateX(${translateX}%) rotateY(${rotateY}deg)`;
                project.style.zIndex = zIndex;
            }
        });
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentPosition > 0) updateGallery(--currentPosition);
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPosition < projects.length - 1) updateGallery(++currentPosition);
    });
    
    updateGallery();

    // Contact Form
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    const contactForm = document.getElementById('contact-form');
    
    formInputs.forEach(input => {
        const updateFocus = () => {
            input.parentNode.classList.toggle('focused', !!input.value);
        };
        
        input.addEventListener('focus', () => input.parentNode.classList.add('focused'));
        input.addEventListener('blur', updateFocus);
        updateFocus();
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('.holo-submit');
        const originalContent = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Message Sent!</span>';
        submitBtn.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            this.reset();
            submitBtn.innerHTML = originalContent;
            submitBtn.style.backgroundColor = '';
            document.querySelectorAll('.form-group').forEach(g => g.classList.remove('focused'));
        }, 3000);
    });

    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    navItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            if (pageYOffset >= (section.offsetTop - section.clientHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
        });
    });

    

    // Mobile Flip
    const setupMobileFlip = () => {
        const cards = document.querySelectorAll('.project-card');
        const isMobile = window.innerWidth <= 768;
        
        cards.forEach(card => {
            card.classList.toggle('mobile-flip', false);
            if (isMobile) {
                card.addEventListener('click', function() {
                    this.classList.toggle('mobile-flip');
                });
            }
        });
    };

    setupMobileFlip();
    window.addEventListener('resize', setupMobileFlip);
});