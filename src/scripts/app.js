// This file contains the JavaScript code for the application. 
// It handles the interactivity and dynamic behavior of the webpage.

document.addEventListener('DOMContentLoaded', () => {
    console.log('Application is running!');

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');
    const closeMenuButton = document.getElementById('close-menu');

    if (menuToggle && navMenu) {
            if (navOverlay) navOverlay.setAttribute('aria-hidden', 'true');
            navMenu.setAttribute('aria-hidden', 'true');
            menuToggle.setAttribute('aria-controls', 'nav-links');
            menuToggle.setAttribute('aria-expanded', 'false');

            const openMenu = () => {
                navMenu.classList.add('open', 'active');
            navMenu.setAttribute('aria-hidden', 'false');
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            document.body.classList.add('nav-open');
            if (navOverlay) navOverlay.setAttribute('aria-hidden', 'false');
        };

        // Scroll Reveal Animations
        (function setupScrollReveal(){
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting){
                        entry.target.classList.add('in-view');
                        obs.unobserve(entry.target);
                    }
                });
            }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

            // Pick elements to reveal and assign base classes + stagger
            function addReveal(nodes, variant = 'reveal-up', baseDelay = 0, step = 60){
                Array.from(nodes || []).forEach((el, i) => {
                    el.classList.add('reveal-on-scroll', variant);
                    el.style.transitionDelay = (baseDelay + (i * step)) + 'ms';
                    observer.observe(el);
                });
            }

            addReveal(document.querySelectorAll('.hero01-content > *'), 'reveal-up', 0, 70);
            addReveal([document.querySelector('.hero01-image')].filter(Boolean), 'reveal-right', 120);
            addReveal(document.querySelectorAll('.city-card'), 'reveal-up', 100, 80);
            addReveal([document.querySelector('.plans-header')].filter(Boolean), 'reveal-up', 0);
            addReveal(document.querySelectorAll('.plan-card'), 'reveal-up', 80, 80);
            addReveal(document.querySelectorAll('.faq-item'), 'reveal-up', 60, 60);
        })();
            const closeMenu = () => {
                navMenu.classList.remove('open', 'active');
            navMenu.setAttribute('aria-hidden', 'true');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
            if (navOverlay) navOverlay.setAttribute('aria-hidden', 'true');
        };

        const toggleMenu = () => {
            if (navMenu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        };

        menuToggle.addEventListener('click', (event) => {
            event.preventDefault();
            toggleMenu();
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        if (navOverlay) {
            navOverlay.addEventListener('click', closeMenu);
        }

        if (closeMenuButton) {
            closeMenuButton.addEventListener('click', closeMenu);
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navMenu.classList.contains('open')) {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 920 && navMenu.classList.contains('open')) {
                closeMenu();
            }
        });
    }

    // FAQ: toggle with ARIA + hidden for reliable show/hide
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
        const btn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!btn || !answer) return;

        // Inicializa estados acessíveis
        btn.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
        answer.setAttribute('hidden', '');

        btn.addEventListener('click', () => {
            const willOpen = !item.classList.contains('open');

            // Fecha todos os outros primeiro
            faqItems.forEach((other) => {
                if (other !== item) {
                    other.classList.remove('open');
                    const ob = other.querySelector('.faq-question');
                    const oa = other.querySelector('.faq-answer');
                    if (ob) ob.setAttribute('aria-expanded', 'false');
                    if (oa) {
                        oa.setAttribute('hidden', '');
                        oa.setAttribute('aria-hidden', 'true');
                    }
                }
            });

            // Aplica estado ao item atual
            item.classList.toggle('open', willOpen);
            btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
            if (willOpen) {
                answer.removeAttribute('hidden');
                answer.setAttribute('aria-hidden', 'false');
            } else {
                answer.setAttribute('hidden', '');
                answer.setAttribute('aria-hidden', 'true');
            }
        });
    });
});