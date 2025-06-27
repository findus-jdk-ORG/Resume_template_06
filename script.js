document.addEventListener('DOMContentLoaded', function() {
    // Load all data from JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderPortfolio(data);
            initFunctionality();
        })
        .catch(error => console.error('Error loading data:', error));

    function renderPortfolio(data) {
        const app = document.getElementById('app');
        
        // Render navigation
        app.innerHTML = `
            <!-- Navigation -->
            <nav class="navbar">
                <div class="container">
                    <a href="#" class="logo">${data.site.title}</a>
                    <div class="nav-links">
                        ${data.navigation.map(item => 
                            `<a href="#${item.link}">${item.text}</a>`
                        ).join('')}
                    </div>
                    <button class="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            <!-- Main Content -->
            <main>
                <!-- Hero Section -->
                <section id="home" class="hero">
                    <div class="container">
                        <div class="hero-content">
                            <h1 class="animate-fade-in">${data.hero.greeting} <span>${data.hero.name}</span></h1>
                            <p class="animate-fade-in delay-1">${data.hero.title}</p>
                            <a href="#portfolio" class="btn animate-fade-in delay-2">${data.hero.cta}</a>
                        </div>
                        <div class="hero-image animate-fade-in delay-3">
                            <img src="${data.hero.image}" alt="${data.hero.name}">
                        </div>
                    </div>
                </section>

                <!-- About Section -->
                <section id="about" class="about">
                    <div class="container">
                        <h2 class="section-title">${data.about.title} <span>${data.about.titleHighlight}</span></h2>
                        <div class="divider"></div>
                        <div class="about-content">
                            <div class="about-text animate-slide-up">
                                <p>${data.about.description}</p>
                                <div class="skills">
                                    <h3>${data.about.skillsTitle}</h3>
                                    <div class="skill-bars">
                                        ${data.skills.map(skill => `
                                            <div class="skill-bar">
                                                <div class="skill-name">
                                                    <span>${skill.name}</span>
                                                    <span>${skill.level}%</span>
                                                </div>
                                                <div class="bar">
                                                    <div class="progress" style="width: ${skill.level}%"></div>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                            <div class="about-image animate-slide-up delay-1">
                                <img src="${data.about.image}" alt="${data.about.imageAlt}">
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Portfolio Section -->
                <section id="portfolio" class="portfolio">
                    <div class="container">
                        <h2 class="section-title">${data.portfolio.title} <span>${data.portfolio.titleHighlight}</span></h2>
                        <div class="divider"></div>
                        <div class="filter-buttons">
                            <button class="filter-btn active" data-filter="all">All</button>
                            ${[...new Set(data.projects.map(p => p.category))].map(category => `
                                <button class="filter-btn" data-filter="${category.toLowerCase()}">${category}</button>
                            `).join('')}
                        </div>
                        <div class="projects-grid">
                            ${data.projects.map(project => `
                                <div class="project-card" data-category="${project.category.toLowerCase()}">
                                    <div class="project-image">
                                        <img src="${project.image}" alt="${project.title}">
                                        <div class="project-badge">${project.category}</div>
                                    </div>
                                    <div class="project-content">
                                        <h3>${project.title}</h3>
                                        <p>${project.description}</p>
                                        <div class="project-tech">
                                            ${project.tech.map(item => `<span>${item}</span>`).join('')}
                                        </div>
                                        <a href="${project.link}" class="project-link">View Project <i class="fas fa-arrow-right"></i></a>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <!-- Contact Section -->
                <section id="contact" class="contact">
                    <div class="container">
                        <h2 class="section-title">${data.contact.title} <span>${data.contact.titleHighlight}</span></h2>
                        <div class="divider"></div>
                        <div class="contact-content">
                            <div class="contact-info animate-slide-up">
                                ${data.contact.info.map(item => `
                                    <div class="info-item">
                                        <i class="${item.icon}"></i>
                                        <div>
                                            <h3>${item.title}</h3>
                                            <p>${item.value}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            <form class="contact-form animate-slide-up delay-1">
                                <div class="form-group">
                                    <input type="text" placeholder="${data.contact.form.namePlaceholder}" required>
                                </div>
                                <div class="form-group">
                                    <input type="email" placeholder="${data.contact.form.emailPlaceholder}" required>
                                </div>
                                <div class="form-group">
                                    <textarea placeholder="${data.contact.form.messagePlaceholder}" required></textarea>
                                </div>
                                <button type="submit" class="btn">${data.contact.form.buttonText}</button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <!-- Footer -->
            <footer class="footer">
                <div class="container">
                    <div class="social-links">
                        ${data.socialLinks.map(link => `
                            <a href="${link.url}" target="_blank"><i class="${link.icon}"></i></a>
                        `).join('')}
                    </div>
                    <p>&copy; ${new Date().getFullYear()} ${data.site.title}. ${data.footer.copyrightText}</p>
                </div>
            </footer>
        `;
    }

    function initFunctionality() {
        // Mobile Navigation
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            });
        });

        // Portfolio filtering
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(btn => btn.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Animation on scroll
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.animate-slide-up, .animate-fade-in');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight - 100) {
                    element.style.opacity = '1';
                    if (element.classList.contains('animate-slide-up')) {
                        element.style.transform = 'translateY(0)';
                    }
                }
            });
        };

        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Run once on page load
    }
});