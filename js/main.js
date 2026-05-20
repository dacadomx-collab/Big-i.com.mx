/* ============================================================
   BIG-i · js/main.js
   Génesis Élite v2 · Vanilla JS consolidado para todas las páginas.
   Cada bloque usa guardias de existencia para ejecutarse
   únicamente en la página que tiene los elementos necesarios.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------
       COMPARTIDO — Navbar shrink on scroll (todas las páginas)
    ---------------------------------------------------------- */
    const topNav = document.getElementById('top-nav');
    if (topNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                topNav.classList.add('py-2', 'shadow-xl');
                topNav.classList.remove('py-4');
            } else {
                topNav.classList.add('py-4');
                topNav.classList.remove('py-2', 'shadow-xl');
            }
        });
    }

    /* ----------------------------------------------------------
       COMPARTIDO — Mobile menu toggle (todas las páginas)
    ---------------------------------------------------------- */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuToggle && mobileMenu) {
        const menuIcon = menuToggle.querySelector('span');

        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuIcon.textContent = mobileMenu.classList.contains('active') ? 'close' : 'menu';
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuIcon.textContent = 'menu';
            });
        });
    }

    /* ----------------------------------------------------------
       COMPARTIDO — Scroll-to-top button (todas las páginas)
    ---------------------------------------------------------- */
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ----------------------------------------------------------
       INDEX — Hero Slider (crossfade automático)
    ---------------------------------------------------------- */
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots   = document.querySelectorAll('.hero-dot');
    const heroPrev   = document.querySelector('.hero-prev');
    const heroNext   = document.querySelector('.hero-next');

    if (heroSlides.length > 0) {
        let current  = 0;
        let autoPlay = null;

        function goToSlide(n) {
            heroSlides[current].classList.remove('is-active');
            heroDots[current]?.classList.remove('is-active');
            current = (n + heroSlides.length) % heroSlides.length;
            heroSlides[current].classList.add('is-active');
            heroDots[current]?.classList.add('is-active');
        }

        function startAutoPlay() {
            autoPlay = setInterval(() => goToSlide(current + 1), 5500);
        }

        function resetAutoPlay() {
            clearInterval(autoPlay);
            startAutoPlay();
        }

        startAutoPlay();

        heroDots.forEach((dot, i) => {
            dot.addEventListener('click', () => { goToSlide(i); resetAutoPlay(); });
        });

        heroPrev?.addEventListener('click', () => { goToSlide(current - 1); resetAutoPlay(); });
        heroNext?.addEventListener('click', () => { goToSlide(current + 1); resetAutoPlay(); });

        // Touch/swipe support
        let touchStartX = 0;
        const heroSection = document.getElementById('hero-section');
        heroSection?.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
        heroSection?.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) { goToSlide(diff > 0 ? current + 1 : current - 1); resetAutoPlay(); }
        }, { passive: true });
    }

    /* ----------------------------------------------------------
       INDEX — Carousel de servicios (horizontal scroll)
    ---------------------------------------------------------- */
    const slider  = document.getElementById('slider');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    if (slider && nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => { slider.scrollLeft += 400; });
        prevBtn.addEventListener('click', () => { slider.scrollLeft -= 400; });
    }

    /* ----------------------------------------------------------
       INDEX — Reveal animation con IntersectionObserver
    ---------------------------------------------------------- */
    if (document.querySelector('.glass-panel')) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.glass-panel').forEach(el => {
            el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
            revealObserver.observe(el);
        });
    }

    /* ----------------------------------------------------------
       QUIÉNES SOMOS — Parallax en hero + hover en tarjetas
    ---------------------------------------------------------- */
    const heroBg = document.querySelector('.intelligence-core-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            heroBg.style.backgroundPositionY = -(window.pageYOffset * 0.2) + 'px';
        });

        document.querySelectorAll('.group').forEach(card => {
            card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-4px)'; });
            card.addEventListener('mouseleave', () => { card.style.transform = 'translateY(0)'; });
        });
    }

    /* ----------------------------------------------------------
       EQUIPO — Micro-interacciones en lista del sidebar
    ---------------------------------------------------------- */
    document.querySelectorAll('aside .p-panel-padding').forEach(card => {
        card.addEventListener('mousedown', () => { card.style.transform = 'scale(0.98)'; });
        card.addEventListener('mouseup',   () => { card.style.transform = 'scale(1)'; });
    });

    /* ----------------------------------------------------------
       ESTUDIOS — Filter chips + Masonry grid search
       UX: al escribir, busca en TODO (desactiva categoría).
           Al limpiar, vuelve a mostrar todo.
           Al hacer click en categoría, limpia el buscador.
    ---------------------------------------------------------- */
    const filterChips  = document.querySelectorAll('.filter-chip');
    const studyCards   = document.querySelectorAll('.study-card');
    const searchStudy  = document.getElementById('search-study');

    if (filterChips.length > 0 && studyCards.length > 0) {
        let activeFilter = 'all';

        function applyFilters() {
            const term = searchStudy ? searchStudy.value.toLowerCase().trim() : '';

            studyCards.forEach(card => {
                const category     = card.dataset.category || '';
                const title        = (card.querySelector('h3')?.textContent || '').toLowerCase();
                const description  = (card.querySelector('p')?.textContent  || '').toLowerCase();

                const matchesCat    = activeFilter === 'all' || category === activeFilter;
                const matchesSearch = !term || title.includes(term) || description.includes(term);

                card.style.display = (matchesCat && matchesSearch) ? '' : 'none';
            });
        }

        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activeFilter = chip.dataset.filter || 'all';
                if (searchStudy) searchStudy.value = '';
                applyFilters();
            });
        });

        if (searchStudy) {
            searchStudy.addEventListener('input', () => {
                const term = searchStudy.value.trim();
                if (term) {
                    filterChips.forEach(c => c.classList.remove('active'));
                    filterChips[0]?.classList.add('active');
                    activeFilter = 'all';
                }
                applyFilters();
            });
        }
    }

    /* ----------------------------------------------------------
       CONTACTO — Log de sector estratégico seleccionado
    ---------------------------------------------------------- */
    const sectorChips = document.querySelectorAll('input[name="sector"]');
    if (sectorChips.length > 0) {
        sectorChips.forEach(chip => {
            chip.addEventListener('change', () => {
                console.log(`Sector estratégico seleccionado: ${chip.value}`);
            });
        });
    }

});
