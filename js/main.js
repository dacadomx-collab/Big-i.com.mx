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
       INDEX — Carousel de servicios
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
       ESTUDIOS — Filtrado por categoría + búsqueda
    ---------------------------------------------------------- */
    const searchInput      = document.getElementById('search-study');
    const intelligenceGrid = document.getElementById('intelligence-grid');
    if (searchInput && intelligenceGrid) {
        const filterButtons = document.querySelectorAll('[data-filter]');
        const studyCards    = document.querySelectorAll('.study-card');

        function filterItems() {
            const searchTerm  = searchInput.value.toLowerCase();
            const activeChip  = document.querySelector('.filter-chip.active');
            const activeFilter = activeChip ? activeChip.getAttribute('data-filter') : 'all';

            studyCards.forEach(card => {
                const title    = card.querySelector('h3').textContent.toLowerCase();
                const category = card.getAttribute('data-category');
                const matchesSearch = title.includes(searchTerm);
                const matchesFilter = activeFilter === 'all' || category === activeFilter;

                if (matchesSearch && matchesFilter) {
                    card.style.display = 'block';
                    setTimeout(() => { card.style.opacity = '1'; }, 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        }

        searchInput.addEventListener('input', filterItems);

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                filterItems();
            });
        });

        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('mousedown', () => btn.classList.add('scale-95'));
            btn.addEventListener('mouseup',   () => btn.classList.remove('scale-95'));
            btn.addEventListener('mouseleave',() => btn.classList.remove('scale-95'));
        });
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
