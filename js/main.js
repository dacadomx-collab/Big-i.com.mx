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
       ESTUDIOS — Búsqueda en el Directorio de Módulos
    ---------------------------------------------------------- */
    const searchInput = document.getElementById('search-study');
    const moduleDir   = document.getElementById('module-directory');
    if (searchInput && moduleDir) {
        const dirRows      = moduleDir.querySelectorAll('.dir-row');
        const sectorGroups = moduleDir.querySelectorAll('.dir-sector-group');

        searchInput.addEventListener('input', () => {
            const term = searchInput.value.toLowerCase().trim();

            if (!term) {
                dirRows.forEach(r => { r.style.display = 'flex'; });
                sectorGroups.forEach(g => { g.style.display = 'block'; });
                return;
            }

            dirRows.forEach(row => {
                const name = (row.querySelector('.dir-name')?.textContent || '').toLowerCase();
                const tag  = (row.querySelector('.dir-tag')?.textContent  || '').toLowerCase();
                row.style.display = (name.includes(term) || tag.includes(term)) ? 'flex' : 'none';
            });

            sectorGroups.forEach(group => {
                const visible = [...group.querySelectorAll('.dir-row')].some(r => r.style.display !== 'none');
                group.style.display = visible ? 'block' : 'none';
            });
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
