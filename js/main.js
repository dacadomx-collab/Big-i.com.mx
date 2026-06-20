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

    /* ----------------------------------------------------------
       EQUIPO — Renderizado dinámico de perfiles
    ---------------------------------------------------------- */
    const teamContainer = document.getElementById('team-container');
    if (teamContainer) {
        const teamData = [
                        {
                tag: "Econ.",
                name: "Alejandro Javier Lage Suárez",
                role: "Director General | Head of PMO",
                badge: "Socio Director / Director General",
                img: "img/Equipo/perfil-alejandro-javier-lage-suarez-convertido-de-png.webp",
                email: "alage@big-i.com.mx",
                phone: "+52 55 2719 4220",
                resumen_ejecutivo: "Especialista en inteligencia territorial, geomarketing, análisis geoestadístico, planeación estratégica, gestión de proyectos e identificación de oportunidades de inversión con enfoque territorial.",
                formacion: "Economista - Universidad Autónoma de Baja California Sur. Reingeniería Administrativa - San Diego State University College. Economía y Gobierno - Universidad Anáhuac. Finanzas Públicas - INAP. Mercadotecnia Política - ITAM. Econometría Espacial - Erasmus University y Université de Montréal.",
                experiencia_previa: [
                    "Líder del Proyecto SACI.",
                    "Coordinador Técnico Legislativo en la H. Cámara de Diputados.",
                    "Ex Asesor de Proyectos Estratégicos en la Presidencia del Gobierno de México.",
                    "Director General del Instituto de Formación, Capacitación y Buen Gobierno.",
                    "Vicepresidente del IMCISS."
                ],
                especialidades: [
                    { icon: "public", text: "Inteligencia Territorial y Geoestadística" },
                    { icon: "map", text: "Geomarketing y Análisis de Sitio" },
                    { icon: "analytics", text: "Estudios de Factibilidad Integral" },
                    { icon: "location_city", text: "Gestión de Riesgos y Desarrollo Urbano" },
                    { icon: "architecture", text: "Planeación Estratégica de Infraestructura" }
                ],
                trayectoria_kyc: [
                    { entity: "Coordinación Internacional de Proyectos", position: "Especialista", desc: "Especialista en Economía Urbana, Econometría Espacial y Economía Social, con experiencia comprobada en la coordinación de proyectos de alto impacto en 52 países de América, Europa y Asia.", border: "border-[#009FFE]" },
                    { entity: "Inteligencia Territorial y Planeación Estratégica", position: "Especialista", desc: "Especialista en inteligencia territorial, geomarketing, análisis geoestadístico, estudios de factibilidad integral.", border: "border-gray-300" },
                    { entity: "Vinculación con el Sector Social de la Economía", position: "Enlace Institucional", desc: "Mantiene una relación estratégica con el Consejo Superior del Cooperativismo en México y con organizaciones que representan a más de 10 millones de cooperativistas.", border: "border-gray-300" },
                    { entity: "Gestión Institucional y Desarrollo de Proyectos", position: "Coordinador", desc: "Amplia experiencia en coordinación de proyectos estratégicos, gestión gubernamental, vinculación institucional.", border: "border-gray-300" }
                ],
                valor_estrategico: [
                    { icon: "language", title: "Gestión Global", desc: "Capacidad probada para gestionar proyectos en 52 países." },
                    { icon: "diversity_3", title: "Economía Social", desc: "Puente directo con la economía social y cooperativas (10 millones de personas)." },
                    { icon: "account_balance", title: "Gestión Pública", desc: "Coordinador de proyectos + empoderamiento legislativo + acceso a gobiernos locales." }
                ],
                riesgo_mitigado: [
                    "Riesgo territorial y de ordenamiento urbano (tramitología, negación de cambios de uso de suelo).",
                    "Incumplimiento normativo y retrasos en permisos."
                ]
            },
            {
                tag: "Admin.",
                name: "Joel Ayala Bracho",
                role: "Director de Vinculación y Desarrollo de Negocios",
                badge: "Coordinador de Vinculación Estratégica, Política de Alianzas y Desarrollo de Negocios",
                img: "img/Equipo/perfil-joel-ayala-bracho-convertido-de-png.webp",
                email: "jayala@big-i.com.mx",
                phone: "+52 55 2855 2461",
                resumen_ejecutivo: "Profesional con amplia trayectoria en representación institucional, gestión de proyectos y construcción de alianzas estratégicas entre los sectores público y privado. Ha participado en iniciativas de desarrollo económico y coordinación de actores clave.",
                formacion: "Licenciatura en Administración de Negocios — Universidad Anáhuac.\nEspecialización en Gestión de Proyectos — Instituto Tecnológico Autónomo de México (ITAM).",
                experiencia_previa: [
                    "Amplia trayectoria en representación institucional, gestión de proyectos y construcción de alianzas estratégicas entre los sectores público y privado.",
                    "Participación en iniciativas de desarrollo económico y coordinación de actores clave."
                ],
                especialidades: [
                    { icon: "groups", text: "Relaciones Institucionales" },
                    { icon: "account_balance", text: "Gestión Gubernamental" },
                    { icon: "trending_up", text: "Desarrollo de Negocios" },
                    { icon: "handshake", text: "Negociación Estratégica" },
                    { icon: "public", text: "Vinculación Público-Privada" }
                ],
                trayectoria_kyc: [
                    { entity: "Gestión y Ejecución de Proyectos", position: "Coordinador", desc: "Pericia en gestión estratégica, finanzas corporativas, dirección de empresas y optimización de recursos.", border: "border-[#009FFE]" },
                    { entity: "Administración Pública y Gestión de Recursos", position: "Directivo", desc: "Ha ocupado cargos directivos y de coordinación en dependencias gubernamentales, enfocándose en la optimización de presupuestos, planeación estratégica y supervisión de servicios generales.", border: "border-gray-300" },
                    { entity: "Enlace Institucional y Negociación Estratégica", position: "Especialista en Cabildeo", desc: "Experiencia en el cabildeo (lobbying), la vinculación interinstitucional y la mediación entre el sector gubernamental, organizaciones sindicales y proveedores privados.", border: "border-gray-300" },
                    { entity: "Consultoría Corporativa", position: "Consultor", desc: "Administración de negocios en la estructuración de proyectos de inversión, análisis de riesgo y eficiencia operativa para el sector empresarial.", border: "border-gray-300" },
                    { entity: "Capacidad de Movilización y Gestión Territorial", position: "Enlace Territorial", desc: "Representa una amplia red de más de 2 millones de Burócratas de México afiliados en toda la República Mexicana. Esto le otorga una red territorial masiva en prácticamente todos los municipios y estados.", border: "border-gray-300" }
                ],
                valor_estrategico: [
                    { icon: "forum", title: "Comunicación Estratégica", desc: "Nodo de comunicación efectivo entre PMO central y gerencias regionales." },
                    { icon: "health_and_safety", title: "Control Operativo", desc: "Mitigación de riesgos en obra civil y control de inversión." },
                    { icon: "account_balance", title: "Gestión Gubernamental", desc: "Facilita la relación con gobiernos locales, delegaciones y oficinas públicas en todo el país, agilizando trámites, licencias de construcción y factibilidades." }
                ],
                riesgo_mitigado: [
                    "Retrasos en construcción.",
                    "Desviación de costos.",
                    "Incumplimiento de normas de seguridad de cambios de uso de suelo."
                ]
            },
            {
                tag: "Ing.",
                name: "Brandon Jhoan De Jesús Hernández",
                role: "Director de Proyectos de Infraestructura",
                badge: "Coordinador de Proyectos de Construcción e Ingeniería Civil",
                img: "img/Equipo/perfil-brandon-jhoan-de-jesus-hernandez-convertido-de-png.webp",
                email: "bdejesus@big-i.com.mx",
                phone: "+52 55 3018 5764",
                resumen_ejecutivo: "Ingeniero especializado en planeación, construcción y supervisión de infraestructura. Ha coordinado proyectos multidisciplinarios de gran escala, administrando recursos, presupuestos y cronogramas para garantizar la correcta ejecución de obras bajo estándares de calidad.",
                formacion: "Maestría en Administración de la Construcción (IBERO).\nIngeniero Civil con Mención Honorífica (IPN).\nAlta Dirección Responsable de Obra (CICM).",
                experiencia_previa: [
                    "Ingeniero especializado en planeación, construcción y supervisión de infraestructura.",
                    "Coordinación de proyectos multidisciplinarios de gran escala.",
                    "Experiencia en la administración de recursos, presupuestos y cronogramas para garantizar la correcta ejecución de obras bajo estándares de calidad."
                ],
                especialidades: [
                    { icon: "engineering", text: "Ingeniería Civil" },
                    { icon: "architecture", text: "Dirección de Obra" },
                    { icon: "bolt", text: "Infraestructura Energética" },
                    { icon: "construction", text: "Gestión de Construcción" },
                    { icon: "rule", text: "Supervisión de Proyectos" }
                ],
                trayectoria_kyc: [
                    { entity: "Experiencia en Telecomunicaciones", position: "Director de Proyectos", desc: "A cargo de 500 personas, 40 proyectos activos, 12,300 km de construcción y 9,456 km FTTH. Demuestra capacidad de despliegue masivo simultáneo.", border: "border-[#009FFE]" },
                    { entity: "Experiencia en Construcción", position: "Gerente de Ingeniería", desc: "Gerente de Proyectos/Costos en desarrollos habitacionales de lujo, centros deportivos y plantas procesadoras. Responsable del diseño, presupuestos y ejecución física de las estaciones eléctricas y centros de tecnología.", border: "border-gray-300" },
                    { entity: "Sector Público", position: "Jefe de Unidad y Supervisor", desc: "Jefe de Unidad en Secretaría de Finanzas CDMX (valuación catastral) y Supervisor en SEDESO CDMX (obra pública y licitaciones).", border: "border-gray-300" },
                    { entity: "Competencias Técnicas", position: "Especialista", desc: "AutoCAD, Civil 3D, STAAD Pro, NEODATA, Project, Primavera, Precios Unitarios, Presupuestos, Análisis estructural.", border: "border-gray-300" }
                ],
                valor_estrategico: [
                    { icon: "domain", title: "Gestión Masiva", desc: "Capacidad probada para gestionar 40 proyectos simultáneos (aplica a 200-250 estaciones)." },
                    { icon: "price_check", title: "Control de Costos", desc: "Dominio de presupuestos y análisis de precios unitarios para mantener el low-cost." },
                    { icon: "gavel", title: "Normatividad", desc: "Experiencia en licitación pública y normatividad CDMX." }
                ],
                riesgo_mitigado: [
                    "Sobreestimación de costos.",
                    "Incumplimiento de plazos.",
                    "Mala calidad de construcción.",
                    "Falta de control de ingeniería."
                ]
            },
            {
                tag: "Lic.",
                name: "Lorenzo Mauricio Meyer Falcón",
                role: "Director Gerencial del Sector Energético",
                badge: "Coordinador de Proyectos en materia de Energías Regulación y Alta Dirección Energética",
                img: "img/Equipo/perfil-lorenzo-mauiricio-meyer-falcon-convertido-de-png.webp",
                email: "lmeyer@big-i.com.mx",
                phone: "+52 55 5416 9664",
                resumen_ejecutivo: "Especialista en regulación y desarrollo del sector energético con experiencia en organismos reguladores, empresas productivas del Estado y consultoría estratégica.",
                formacion: "Licenciatura en Relaciones Internacionales. Maestría en Administración de Empresas (MBA) - UNAM. Master of Business Administration (MBA) - The University of Texas at Austin. Derecho Energético - El Colegio de México.",
                experiencia_previa: [
                    "Especialista en regulación y desarrollo del sector energético.",
                    "Experiencia en organismos reguladores y consultoría estratégica."
                ],
                especialidades: [
                    { icon: "gavel", text: "Regulación Energética" },
                    { icon: "strategy", text: "Planeación Estratégica" },
                    { icon: "oil_barrel", text: "Hidrocarburos" },
                    { icon: "handshake", text: "Relaciones Institucionales" },
                    { icon: "business_center", text: "Desarrollo de Negocios Energéticos" }
                ],
                trayectoria_kyc: [
                    { entity: "Alta Dirección y Gobierno Corporativo en el Sector Energético", position: "Consejero Independiente", desc: "Consejero Independiente de PEMEX (2022-2025). Presidente del Comité de Adquisiciones, Arrendamientos, Obras y Servicios.", border: "border-[#009FFE]" },
                    { entity: "Director en la Comisión Reguladora de Energía", position: "Director", desc: "En la CRE, fue Director de Asuntos Internacionales e Investigación y Director de Regulación.", border: "border-gray-300" },
                    { entity: "Asesor en Secretaría de Energía Gobierno Federal", position: "Asesor", desc: "En la SENER, participó en la implementación de la reforma energética y leyes secundarias.", border: "border-gray-300" },
                    { entity: "Pericia Académica en Energías", position: "Profesor de Asignatura", desc: "Profesor de Asignatura de la Escuela de Relaciones Internacionales, Universidad Anáhuac del Norte.", border: "border-gray-300" }
                ],
                valor_estrategico: [
                    { icon: "bolt", title: "Experiencia Energética", desc: "Amplia experiencia en la regulación, evaluación, planeación y ejecución de proyectos en el sector energético." },
                    { icon: "model_training", title: "Resolución de Conflictos", desc: "Facilitador en la resolución de conflictos territoriales." },
                    { icon: "rule", title: "Mejora Regulatoria", desc: "Experto en mejora regulatoria de élite ante CRE y SENER." }
                ],
                riesgo_mitigado: [
                    "Falta de mexicano en el sector energético.",
                    "Incumplimiento normativo y retrasos en permisos."
                ]
            },
            {
                tag: "Lic.",
                name: "Leslie Staines Formoso",
                role: "Directora de Asuntos Públicos y Gestión Gubernamental",
                badge: "Coordinadora de Relaciones Gubernamentales y Gestión Estratégica",
                img: "img/Equipo/perfil-leslie-staines-formoso-convertido-de-png.webp",
                email: "lstaine@big-i.com.mx",
                phone: "+52 55 4074 8891",
                resumen_ejecutivo: "Especialista en gestión pública, comunicación institucional y construcción de relaciones estratégicas con autoridades, organismos reguladores y grupos de interés.",
                formacion: "Licenciatura en Ciencias de la Comunicación - ITAM. Formación especializada en Transparencia, Compliance y Anticorrupción. Especialización en Comunicación Estratégica.",
                experiencia_previa: [
                    "Especialista en gestión pública, comunicación institucional y construcción de relaciones estratégicas.",
                    "Experiencia en cumplimiento normativo, transparencia y gobernanza corporativa."
                ],
                especialidades: [
                    { icon: "public", text: "Asuntos Públicos" },
                    { icon: "account_balance", text: "Relaciones Gubernamentales" },
                    { icon: "verified", text: "Compliance" },
                    { icon: "campaign", text: "Comunicación Estratégica" }
                ],
                trayectoria_kyc: [
                    { entity: "Especialista en Gestión Pública", position: "Cabildera", desc: "Experiencia directa en cabildeo para infraestructura energética.", border: "border-[#009FFE]" },
                    { entity: "Vinculación con Legisladores y Organismos Reguladores", position: "Representante", desc: "Ha representado a empresas (como Grupo Peñoles) ante órganos de gobierno.", border: "border-gray-300" },
                    { entity: "Manejo de Stakeholders", position: "Especialista", desc: "Habilidad para relacionarse con ONGs, líderes políticos y prensa.", border: "border-gray-300" },
                    { entity: "Compliance, Transparencia y Anticorrupción", position: "Especialista", desc: "Cuenta con formación especializada en transparencia y anticorrupción.", border: "border-gray-300" },
                    { entity: "Liderazgo de Equipos", position: "Líder de Proyecto", desc: "Capacidad para gestionar estructuras de más de 500 personas.", border: "border-gray-300" }
                ],
                valor_estrategico: [
                    { icon: "share_location", title: "Agilidad Territorial", desc: "Agilidad en despliegue territorial por red de contactos en alcaldías." },
                    { icon: "security", title: "Gestión de Barreras", desc: "Anticipación de barreras sociales/gubernamentales." },
                    { icon: "health_and_safety", title: "Ética y Transparencia", desc: "Garantía de ética y transparencia." }
                ],
                riesgo_mitigado: [
                    "Obstrucción local (alcaldías/comunidades).",
                    "Riesgos reputacionales por falta de compliance.",
                    "Negación de licencias ambientales."
                ]
            },
            {
                tag: "Dr.",
                name: "Fluvio César Ruíz Alarcón",
                role: "Director Técnico y de Estrategia de Suministro",
                badge: "Especialista en Energía e Hidrocarburos",
                img: "img/Equipo/perfil-fluvio-cesar-ruiz-alarcon-convertido-de-png.webp",
                email: "fruiz@big-i.com.mx",
                phone: "+52 55 1473 0192",
                resumen_ejecutivo: "Reconocido especialista en energía e hidrocarburos con experiencia en organismos públicos, empresas productivas del Estado y entornos académicos.",
                formacion: "Licenciatura en Física - UNAM. Maestría en Ingeniería de Exploración Petrolera - UNAM. Doctorado en Economía de la Energía - Universidad de La Sorbona (Francia).",
                experiencia_previa: [
                    "Especialista en energía e hidrocarburos con experiencia en organismos públicos y academia.",
                    "Ha contribuido al análisis y diseño de políticas energéticas."
                ],
                especialidades: [
                    { icon: "account_balance", text: "Economía Energética" },
                    { icon: "oil_barrel", text: "Hidrocarburos" },
                    { icon: "strategy", text: "Estrategia de Suministro" },
                    { icon: "bolt", text: "Planeación Energética" },
                    { icon: "gavel", text: "Análisis Regulatorio" }
                ],
                trayectoria_kyc: [
                    { entity: "Consejero Profesional de PEMEX", position: "Consejero (2009-2015)", desc: "Presidió Comités de Estrategia e Inversiones de Pemex Gas y Petroquímica Básica.", border: "border-[#009FFE]" },
                    { entity: "Arquitecto Legal", position: "Asesor", desc: "Redactó leyes fundamentales de PEMEX y CNH. Asesor en Senado y Cámara de Diputados (2019-2023).", border: "border-gray-300" },
                    { entity: "Economía Energética y Política Pública", position: "Especialista", desc: "Reconocido especialista en economía energética e hidrocarburos.", border: "border-gray-300" },
                    { entity: "Investigación Académica y Desarrollo Técnico", position: "Académico", desc: "Académico del CIDE, reconocido como una de las principales autoridades en economía energética en México.", border: "border-gray-300" },
                    { entity: "Asesor directo del Ing. Cuauhtémoc Cárdenas", position: "Asesor", desc: "Otorga blindaje político en sectores progresistas y nacionalistas.", border: "border-gray-300" }
                ],
                valor_estrategico: [
                    { icon: "verified", title: "Credibilidad Técnica y Política", desc: "Credibilidad técnica y política (respaldo del CIDE + cercanía a Cuauhtémoc Cárdenas)." },
                    { icon: "architecture", title: "Estrategia de Suministro", desc: "Capacidad para diseñar estrategia de suministro con sustento técnico-económico de primer nivel." }
                ],
                riesgo_mitigado: [
                    "Riesgo reputacional ante sectores políticos críticos de la reforma energética.",
                    "Falta de validación técnica en economía de hidrocarburos.",
                    "Oposición de grupos nacionalistas."
                ]
            },
            {
                tag: "Econ.",
                name: "Lauro Francisco Meza Barojas",
                role: "Director de Comercialización y Abasto",
                badge: "Coordinador de Proyectos de Comercialización",
                img: "img/Equipo/perfil-lauro-francisco-meza-barojas-convertido-de-png.webp",
                email: "lmeza@big-i.com.mx",
                phone: "55 5415 5664",
                resumen_ejecutivo: "Profesional con amplia experiencia en comercialización, logística y distribución de combustibles. Ha participado en procesos de operación, abastecimiento y supervisión técnica dentro del sector energético.",
                formacion: "Licenciado en Economía - Escuela Superior de Economía (IPN).",
                experiencia_previa: [
                    "Amplia experiencia en comercialización, logística y distribución de combustibles.",
                    "Participación en procesos de operación, abastecimiento y supervisión técnica."
                ],
                especialidades: [
                    { icon: "storefront", text: "Comercialización de combustibles" },
                    { icon: "local_shipping", text: "Logística de distribución" },
                    { icon: "local_gas_station", text: "Operación de estaciones de servicio" },
                    { icon: "inventory_2", text: "Cadena de suministro" },
                    { icon: "trending_up", text: "Planeación comercial" }
                ],
                trayectoria_kyc: [
                    { entity: "PEMEX Transformación Industrial", position: "Ejecutivo de Cuenta", desc: "Ejecutivo de Cuenta para la cartera de Distribuidores y Comercializadores de Diéseles y Gasolinas, integrada por 35 razones sociales de primer nivel (CFE, Ferromex). Elaboración y administración de contratos de suministro.", border: "border-[#009FFE]" },
                    { entity: "Logística de Abasto", position: "Miembro del Equipo", desc: "Miembro del equipo de logística de abasto en la Subdirección Comercial de PEMEX.", border: "border-gray-300" },
                    { entity: "Servicio Técnico a Estaciones", position: "Supervisor General", desc: "Experiencia directa en la operación, mantenimiento y asistencia técnica a estaciones.", border: "border-gray-300" },
                    { entity: "Operación de Ductos", position: "Operador", desc: "Participó en el transporte de crudo hacia refinerías y distribución.", border: "border-gray-300" }
                ],
                valor_estrategico: [
                    { icon: "handshake", title: "Relación Institucional", desc: "Relación directa con PEMEX." },
                    { icon: "groups", title: "Cartera de Clientes", desc: "Cartera de clientes de alto nivel." },
                    { icon: "360", title: "Visión Integral", desc: "Visión 360° de la cadena de valor (desde operación de ductos hasta estaciones)." }
                ],
                riesgo_mitigado: [
                    "Interrupción del suministro por desconocimiento de la dinámica de contratos PEMEX.",
                    "Incumplimiento de volúmenes garantizados para la red de estaciones.",
                    "Falta de capacidad para negociar condiciones competitivas."
                ]
            },
            {
                tag: "Ing.",
                name: "Luis Javier Solórzano y Falcón",
                role: "Director de Proyectos en Operaciones y Calidad",
                badge: "Especialista en Control de Calidad",
                img: "img/Equipo/perfil-luis-javier-solorzano-y-falcon-convertido-de-png.webp",
                email: "lsolorzano@big-i.com.mx",
                phone: "55 4135 3473",
                resumen_ejecutivo: "Especialista en operación, supervisión y control de calidad dentro del sector de hidrocarburos. Cuenta con experiencia en procesos de refinación, distribución, comercialización y supervisión técnica de estaciones de servicio.",
                formacion: "Ingeniero Químico (UNAM). Alta Dirección de Empresas (IPADE).",
                experiencia_previa: [
                    "Especialista en operación, supervisión y control de calidad dentro del sector de hidrocarburos.",
                    "Experiencia en procesos de refinación, distribución y comercialización."
                ],
                especialidades: [
                    { icon: "local_gas_station", text: "Operación de Estaciones de Servicio" },
                    { icon: "science", text: "Calidad de Combustibles" },
                    { icon: "route", text: "Logística Operativa" },
                    { icon: "health_and_safety", text: "Seguridad Industrial" },
                    { icon: "rule", text: "Cumplimiento Normativo" }
                ],
                trayectoria_kyc: [
                    { entity: "PEMEX Refinación", position: "Exgerente de Coordinación Comercial", desc: "Coordinó acciones para garantizar satisfacción del mercado nacional al menor costo. Administró contratos de corrientes intermedias.", border: "border-[#009FFE]" },
                    { entity: "Estaciones de Servicio", position: "Supervisor", desc: "Coordinó programas de supervisión de operación, calidad, seguridad e infraestructura en estaciones de servicio (gasolinas y diésel).", border: "border-gray-300" },
                    { entity: "Asistencia Técnica a Clientes", position: "Estratega", desc: "Definió estrategias para proporcionar asistencia técnica sobre especificaciones de calidad y construcción de instalaciones.", border: "border-gray-300" }
                ],
                valor_estrategico: [
                    { icon: "verified", title: "Conocimiento Operativo", desc: "Conocimiento directo de la operación y calidad que PEMEX exigía a estaciones privadas." },
                    { icon: "domain", title: "Supervisión de Infraestructura", desc: "Capacidad para supervisar seguridad e infraestructura en 200 unidades." },
                    { icon: "local_shipping", title: "Optimización Logística", desc: "Optimización logística de suministro por ducto/autotanque." }
                ],
                riesgo_mitigado: [
                    "Fallas de calidad de combustibles.",
                    "Incumplimiento de estándares de seguridad en estaciones.",
                    "Ineficiencia en la cadena de distribución."
                ]
            },
            {
                tag: "Geóg.",
                name: "Jorge Tello Torres",
                role: "Director de Inteligencia Territorial y Geomarketing",
                badge: "Especialista en Geointeligencia",
                img: "img/Equipo/perfil-jorge-tello-torres-convertido-de-png.webp",
                email: "jtello@big-i.com.mx",
                phone: "55 5105 8113",
                resumen_ejecutivo: "Especialista en análisis espacial, planeación territorial y geointeligencia. Ha participado en proyectos de localización estratégica, desarrollo urbano, análisis socioeconómico y evaluación territorial para sectores públicos y privados.",
                formacion: "Geógrafo (UNAM). Especialidad en Sistemas de Información Geográfica (UNAM).",
                experiencia_previa: [
                    "Especialista en análisis espacial, planeación territorial y geointeligencia.",
                    "Participación en proyectos de localización estratégica, desarrollo urbano y análisis socioeconómico."
                ],
                especialidades: [
                    { icon: "map", text: "Sistemas de Información Geográfica (SIG)" },
                    { icon: "storefront", text: "Geomarketing" },
                    { icon: "public", text: "Análisis Territorial" },
                    { icon: "add_location", text: "Localización Estratégica" },
                    { icon: "rule", text: "Evaluación Multicriterio" }
                ],
                trayectoria_kyc: [
                    { entity: "Experiencia en sector público", position: "Director SIG", desc: "Director de Sistemas de Información Geográfica en SAGARPA, SEDESOL, SEDATU.", border: "border-[#009FFE]" },
                    { entity: "Experiencia en sector privado", position: "Especialista", desc: "Empresa especializada en proyectos territoriales y de movilidad.", border: "border-gray-300" },
                    { entity: "Volumen de proyectos", position: "Consultor Senior", desc: "Ha elaborado más de 500 proyectos especializados para clientes de primer nivel (KPMG, Google, CBRE, PwC, ONU Hábitat).", border: "border-gray-300" },
                    { entity: "Experiencia en energía e infraestructura", position: "Estratega", desc: "Específicamente en la ubicación de estaciones de servicio, centros logísticos y puntos de venta de alto tráfico.", border: "border-gray-300" }
                ],
                valor_estrategico: [
                    { icon: "my_location", title: "Precisión", desc: "Precisión en la selección de sitios." },
                    { icon: "trending_down", title: "Mitigación", desc: "Reducción del riesgo de inversión." },
                    { icon: "zoom_out_map", title: "Escalabilidad", desc: "Escalabilidad para 200-250 estaciones con metodología probada." },
                    { icon: "language", title: "Alcance", desc: "Experiencia con clientes globales." },
                    { icon: "domain", title: "Planeación Urbana", desc: "Vinculación con planeación urbana oficial." }
                ],
                riesgo_mitigado: [
                    "Selección de sitios no rentables (fracaso comercial de la estación).",
                    "Inversión en terrenos con restricciones de uso de suelo o ambientales.",
                    "Sobrecostos por logística deficiente."
                ]
            },
            {
                tag: "C.P.",
                name: "Francisco Altamirano Anaya",
                role: "Director de Auditoría Territorial y Cumplimiento Fiscal",
                badge: "Director de Auditoría",
                img: "img/Equipo/perfil-francisco-altamirano-anaya-convertido-de-png.webp",
                email: "Pendiente de actualización",
                phone: "Pendiente de actualización",
                resumen_ejecutivo: "Especialista en la verificación de objetivos institucionales bajo criterios de eficiencia, eficacia y economía, asegurando el estricto apego a la normatividad vigente. Experto en la emisión de dictámenes contables y financieros.",
                formacion: "Contador Público especializado en auditoría gubernamental, fiscalización, control financiero y evaluación de proyectos.",
                experiencia_previa: [
                    "Especialista en la verificación de objetivos institucionales asegurando el estricto apego a la normatividad.",
                    "Experto en la emisión de dictámenes contables y financieros requeridos por autoridades federales y estatales.",
                    "Experiencia en la facilitación de trámites ágiles de devolución y compensación de impuestos."
                ],
                especialidades: [
                    { icon: "account_balance", text: "Auditoría Integral" },
                    { icon: "gavel", text: "Dictaminación Especializada" },
                    { icon: "public", text: "Comercio Exterior" }
                ],
                trayectoria_kyc: [
                    { entity: "Auditoría Gubernamental", position: "Especialista", desc: "Experiencia en auditorías financieras, operativas, fiscales y gubernamentales para instituciones públicas y privadas.", border: "border-[#009FFE]" },
                    { entity: "Fiscalización y Cumplimiento", position: "Consultor", desc: "Especialista en revisión de estados financieros, cumplimiento normativo y mitigación de riesgos fiscales.", border: "border-gray-300" },
                    { entity: "Due Diligence", position: "Auditor", desc: "Capacidad para validar la viabilidad financiera y documental de proyectos de inversión y expansión territorial.", border: "border-gray-300" }
                ],
                valor_estrategico: [
                    { icon: "verified", title: "Transparencia", desc: "Asegura transparencia financiera en proyectos de infraestructura e hidrocarburos." },
                    { icon: "search", title: "Due Diligence", desc: "Fortalece procesos de revisión para inversionistas nacionales e internacionales." },
                    { icon: "shield", title: "Confianza", desc: "Genera confianza financiera y regulatoria para proyectos estratégicos." }
                ],
                riesgo_mitigado: [
                    "Evita observaciones fiscales y regulatorias.",
                    "Previene riesgos financieros en adquisiciones y expansiones.",
                    "Mitiga contingencias derivadas de incumplimientos administrativos."
                ]
            },
            {
                tag: "Admin.",
                name: "Mauricio Bárbara De Parres",
                role: "Director de Administración y Servicios Generales / COO",
                badge: "Chief Operating Officer",
                img: "img/Equipo/perfil-mauricio-barbara-de-parres-convertido-de-png.webp",
                email: "mbarbara@big-i.com.mx",
                phone: "Pendiente de actualización",
                resumen_ejecutivo: "Responsable de la administración integral, los servicios generales y la escalabilidad operativa de la red de estaciones, garantizando la estandarización de procesos y optimización de recursos.",
                formacion: "Pendiente de integrar conforme al documento KYC definitivo.",
                experiencia_previa: [
                    "Especialista en administración, organización y fortalecimiento operativo de proyectos de gran escala.",
                    "Ha participado en la implementación de procesos administrativos orientados a mejorar la eficiencia y coordinación interdepartamental.",
                    "Experiencia en optimización administrativa y capacidad de crecimiento de organizaciones."
                ],
                especialidades: [
                    { icon: "strategy", text: "Administración Estratégica" },
                    { icon: "trending_up", text: "Escalabilidad Operativa" },
                    { icon: "account_tree", text: "Optimización de Procesos" }
                ],
                trayectoria_kyc: [
                    { entity: "Central Holding", position: "Director", desc: "Visión integral para la estructuración administrativa, optimización de activos y servicios corporativos orientados a la rentabilidad.", border: "border-[#009FFE]" },
                    { entity: "Servicios Generales", position: "Coordinador", desc: "Coordinación de mantenimiento, seguridad y logística operativa.", border: "border-gray-300" },
                    { entity: "Capital Humano", position: "Gestor", desc: "Capacidad para diseñar estructuras laborales para 200 estaciones (reclutamiento, capacitación, retención).", border: "border-gray-300" }
                ],
                valor_estrategico: [
                    { icon: "zoom_out_map", title: "Escalabilidad", desc: "Capacidad operativa para replicar modelo eficiente en región Norte, Centro y Sur." },
                    { icon: "savings", title: "Reducción de OPEX", desc: "Control y disminución del gasto operativo, clave para el modelo low-cost." },
                    { icon: "hub", title: "Integración", desc: "Unificación de servicios corporativos transversales." }
                ],
                riesgo_mitigado: [
                    "Previene ineficiencias administrativas y cuellos de botella.",
                    "Evita el descontrol de costos operativos.",
                    "Garantiza la estandarización en operaciones de más de 200 unidades."
                ]
            },
            {
                tag: "Ing.",
                name: "Omar Alejandro Aburto Tena",
                role: "Especialista en Sistemas de Información y Soporte",
                badge: "Especialista TI",
                img: "img\\Equipo\\perfil-omar-alejadandro-aburto-tena-convertido-de-png.webp",
                email: "Pendiente de actualización",
                phone: "44 3169 2062",
                resumen_ejecutivo: "Especialista en innovación tecnológica, desarrollo de plataformas digitales e integración de sistemas inteligentes para la gestión de información estratégica.",
                formacion: "Ingeniero en Sistemas Computacionales.",
                experiencia_previa: [
                    "Especialista en innovación tecnológica, desarrollo de plataformas digitales e integración de sistemas inteligentes.",
                    "Participó en el diseño y desarrollo del Sistema de Autogestión Colaborativa Inteligente (SACI)."
                ],
                especialidades: [
                    { icon: "important_devices", text: "Transformación Digital" },
                    { icon: "memory", text: "Sistemas Inteligentes" },
                    { icon: "lan", text: "Plataformas Tecnológicas" }
                ],
                trayectoria_kyc: [
                    { entity: "SACI", position: "Desarrollador", desc: "Participó en el desarrollo del Sistema de Autogestión Colaborativa Inteligente, impulsando herramientas para gobernanza territorial.", border: "border-[#009FFE]" },
                    { entity: "Infraestructura TI", position: "Ingeniero", desc: "Formación profesional orientada a sistemas computacionales y tecnologías digitales.", border: "border-gray-300" }
                ],
                valor_estrategico: [
                    { icon: "support_agent", title: "Soporte Tecnológico", desc: "Despliegue y soporte para proyectos de inteligencia territorial." },
                    { icon: "integration_instructions", title: "Sistemas", desc: "Integración de herramientas digitales y plataformas de información." },
                    { icon: "database", title: "Data Management", desc: "Apoyo especializado en procesamiento y administración de datos." }
                ],
                riesgo_mitigado: [
                    "Mitiga riesgos asociados a la pérdida o mala gestión de información.",
                    "Previene fallas críticas de operación tecnológica.",
                    "Asegura la correcta integración de sistemas interdepartamentales."
                ]
            },
            {
                tag: "Lic.",
                name: "Dante Yamil San Pedro Jacobo",
                role: "Director de Viabilidad Jurídica, Regulatoria y Energética",
                badge: "Director Jurídico y Regulatorio",
                img: "img/Equipo/perfil-dante-yamil-san-pedro-jacobo-convertido-de-png.webp",
                email: "Pendiente de actualización",
                phone: "Pendiente de actualización",
                resumen_ejecutivo: "Profesional especializado en la integración de estrategias territoriales y coordinación de proyectos de alto impacto. Su experiencia se enfoca en la articulación de equipos multidisciplinarios, análisis de información estratégica y acompañamiento técnico para la implementación eficiente de iniciativas complejas.",
                formacion: "Licenciado en Derecho de la Universidad de las Américas Puebla con especialidad en Derecho Fiscal y Maestría en Derecho Comercial Internacional por la Universidad de Essex. Esta base académica le permite gestionar estructuras fiscales complejas y contratos internacionales, fundamentales para una alianza entre una firma española (Plenoil) y una red europea (AVIA).",
                experiencia_previa: [
                    "Profesional especializado en la integración de estrategias territoriales y coordinación de proyectos de alto impacto.",
                    "Experiencia en la articulación de equipos multidisciplinarios y el análisis de información estratégica para la toma de decisiones.",
                    "Participación en el acompañamiento técnico para la implementación eficiente de iniciativas complejas."
                ],
                especialidades: [
                    { icon: "strategy", text: "Planeación Estratégica" },
                    { icon: "map", text: "Gestión Territorial" },
                    { icon: "account_tree", text: "Desarrollo de Proyectos" },
                    { icon: "analytics", text: "Análisis Multidisciplinario" },
                    { icon: "engineering", text: "Coordinación Operativa" }
                ],
                trayectoria_kyc: [
                    { entity: "Derecho Energético", position: "Presidente", desc: "Presidente de la Academia Mexicana de Derecho Energético (AMDE) y referente nacional en regulación energética.", border: "border-[#009FFE]" },
                    { entity: "Liderazgo en el Sector Energético", position: "Secretario Técnico", desc: "Secretario Técnico de la Comisión Nacional de Energía (Coparmex). Experiencia en el cabildeo y vinculación empresarial.", border: "border-gray-300" },
                    { entity: "Asesor en Derecho Energético", position: "Asesor", desc: "Colaborador estratégico para el Consejo Coordinador Empresarial (CCE).", border: "border-gray-300" },
                    { entity: "Regulación de Hidrocarburos", position: "Especialista Regulatorio", desc: "Trayectoria en PEMEX y SENER. Ha ocupado cargos de relevancia tanto en la Secretaría de Energía como en Petróleos Mexicanos, lo que le otorga un conocimiento profundo de la operación interna del mercado de carburantes en México.", border: "border-gray-300" },
                    { entity: "Cabildeo y Vinculación Institucional", position: "Especialista en Cabildeo", desc: "Experiencia en coordinación con organismos empresariales, reguladores y autoridades gubernamentales.", border: "border-gray-300" },
                    { entity: "Contratación y Negocios Internacionales", position: "Especialista", desc: "Especialista en estructuración jurídica para inversiones internacionales y alianzas estratégicas.", border: "border-gray-300" }
                ],
                valor_estrategico: [
                    { icon: "gavel", title: "Garantía de Certeza Jurídica", desc: "Capacidad para armonizar el modelo de negocio de \"bajo costo\" con el paquete de leyes secundarias y regulaciones vigentes en 2026." },
                    { icon: "shield", title: "Mitigación de Riesgos Regulatorios", desc: "Conocimiento directo de los procesos ante la CRE y la CNH para agilizar la obtención de permisos de comercialización y expendio." },
                    { icon: "handshake", title: "Estructuración Comercial", desc: "Experiencia en derecho comercial internacional para formalizar los acuerdos de suministro y distribución de la red AVIA en territorio mexicano." }
                ],
                riesgo_mitigado: [
                    "Retrasos por incumplimiento normativo.",
                    "Riesgos regulatorios y legales.",
                    "Obstáculos en procesos de autorización y licenciamiento."
                ]
            },
            {
                tag: "Ing.",
                name: "Jorge Eztevez Abreu",
                role: "Director de Infraestructura Tecnológica, Conectividad y Sistemas Inteligentes de Monitoreo",
                badge: "CEO",
                img: "img/Equipo/perfil-jorge-estevez-abreu-convertido-de-png.webp",
                email: "jestevez@big-i.com.mx",
                phone: "Pendiente de actualización",
                resumen_ejecutivo: "Especialista en desarrollo técnico y coordinación de proyectos de infraestructura. Cuenta con experiencia en supervisión de procesos, evaluación de requerimientos técnicos y seguimiento de proyectos orientados al cumplimiento de estándares operativos y de calidad.",
                formacion: "Empresario y especialista en telecomunicaciones, infraestructura tecnológica y despliegue de redes de conectividad para proyectos estratégicos de gran escala.",
                experiencia_previa: [
                    "Especialista en desarrollo técnico y coordinación de proyectos de infraestructura.",
                    "Experiencia en supervisión de procesos, evaluación de requerimientos técnicos y seguimiento de proyectos orientados al cumplimiento de estándares operativos y de calidad."
                ],
                especialidades: [
                    { icon: "engineering", text: "Ingeniería Aplicada Sector Energético" },
                    { icon: "construction", text: "Construcción" },
                    { icon: "rule", text: "Supervisión Técnica" },
                    { icon: "architecture", text: "Gestión de Proyectos de Infraestructura" },
                    { icon: "memory", text: "Tecnologías Inteligentes" }
                ],
                trayectoria_kyc: [
                    { entity: "Infraestructura Tecnológica y Telecomunicaciones", position: "Especialista", desc: "Experiencia en planeación, implementación y operación de infraestructura tecnológica para entornos industriales, corporativos y gubernamentales.", border: "border-[#009FFE]" },
                    { entity: "Redes de Conectividad y Fibra Óptica", position: "Director", desc: "Desarrollo de proyectos de telecomunicaciones, conectividad de última milla, redes de datos y soluciones de transmisión de información de alta disponibilidad.", border: "border-gray-300" },
                    { entity: "Smart Cities y Monitoreo Inteligente", position: "Consultor TI", desc: "Participación en soluciones de monitoreo, control operativo, videovigilancia, telemetría y automatización para infraestructura crítica.", border: "border-gray-300" },
                    { entity: "Integración Tecnológica para Infraestructura Estratégica", position: "Coordinador", desc: "Capacidad para coordinar proyectos que integren telecomunicaciones, energía, seguridad y sistemas de información geográfica.", border: "border-gray-300" },
                    { entity: "Gestión Empresarial y Operativa", position: "Administrador", desc: "Experiencia en administración de proyectos tecnológicos, coordinación de equipos multidisciplinarios y desarrollo de alianzas estratégicas.", border: "border-gray-300" }
                ],
                valor_estrategico: [
                    { icon: "integration_instructions", title: "Integración Tecnológica", desc: "Integra plataformas tecnológicas para proyectos geoespaciales, mineros, energéticos e infraestructura inteligente." },
                    { icon: "sensors", title: "Monitoreo Avanzado", desc: "Permite incorporar sensores IoT, telemetría, videovigilancia y monitoreo remoto a los proyectos de BIG-i." },
                    { icon: "domain", title: "Smart Cities", desc: "Facilita la implementación de infraestructura digital para Smart Cities, C4, C5 y centros de monitoreo." }
                ],
                riesgo_mitigado: [
                    "Fallas de conectividad en proyectos estratégicos.",
                    "Deficiencias en el monitoreo operativo.",
                    "Falta de integración tecnológica entre infraestructura física y sistemas inteligentes."
                ]
            },
            {
                tag: "Ing.",
                name: "Pablo Gómez de los Ríos",
                role: "Director de Operaciones, Logística e Infraestructura Estratégica",
                badge: "Coordinador de Servicios de Soporte de Obras y Logística",
                img: "img/Equipo/perfil-pablo-gomez-de-los-rios-convertido-de-png.webp",
                email: "Pendiente de actualización",
                phone: "Pendiente de actualización",
                resumen_ejecutivo: "Especialista en el diseño, coordinación y gerenciamiento de proyectos de infraestructura, suministro y redes logísticas bajo la modalidad llave en mano. Experto en la administración de la cadena de suministro y en el montaje de infraestructuras modulares simultáneas en zonas de alta exigencia regulatoria de ingeniería y obras de conectividad para infraestructuras críticas, incluyendo la Refinería de Dos Bocas y la Ampliación de Energía Mayakán.",
                formacion: "Profesional con experiencia en dirección de operaciones internacionales, gestión estratégica de proyectos, infraestructura logística y administración de operaciones de gran escala. (Pendiente de integrar detalle académico específico).",
                experiencia_previa: [
                    "Especialista en el diseño, coordinación y gerenciamiento de proyectos de infraestructura, suministro y redes logísticas bajo la modalidad llave en mano.",
                    "Experto en la administración de la cadena de suministro y en la coordinación de operaciones de alta complejidad.",
                    "Amplia experiencia en el montaje de infraestructuras modulares simultáneas en zonas de alta exigencia regulatoria.",
                    "Ha participado en proyectos de infraestructura crítica, incluyendo la Refinería de Dos Bocas y la Ampliación de Energía Mayakán."
                ],
                especialidades: [
                    { icon: "design_services", text: "Diseño de Infraestructura" },
                    { icon: "local_shipping", text: "Redes Logísticas" },
                    { icon: "inventory_2", text: "Cadena de Suministro" }
                ],
                trayectoria_kyc: [
                    { entity: "Dirección de Operaciones Globales", position: "Director", desc: "Experiencia en la coordinación y dirección de operaciones internacionales para proyectos de infraestructura y desarrollo empresarial.", border: "border-[#009FFE]" },
                    { entity: "Despliegue Rápido en Entornos Complejos", position: "Especialista", desc: "Especialista en la implementación simultánea de proyectos bajo esquemas de alta exigencia operativa y regulatoria.", border: "border-gray-300" },
                    { entity: "Gobernanza Corporativa", position: "Ejecutivo", desc: "Experiencia en dirección ejecutiva, administración corporativa y gestión estratégica de organizaciones de alcance internacional.", border: "border-gray-300" },
                    { entity: "Obras de Conectividad para Infraestructuras", position: "Coordinador", desc: "Especialista en la coordinación de obras de conectividad, soporte técnico e infraestructura para proyectos estratégicos y de infraestructura crítica.", border: "border-gray-300" }
                ],
                valor_estrategico: [
                    { icon: "vpn_key", title: "Proyectos Llave en Mano", desc: "Capacidad para coordinar proyectos multidisciplinarios de infraestructura bajo esquemas llave en mano." },
                    { icon: "local_shipping", title: "Cadena de Suministro", desc: "Experiencia en administración integral de cadenas de suministro y operaciones logísticas complejas." },
                    { icon: "rocket_launch", title: "Despliegue Operativo", desc: "Amplia capacidad de despliegue operativo para proyectos de infraestructura crítica y expansión territorial." },
                    { icon: "visibility", title: "Visión Estratégica", desc: "Integración de visión estratégica, gobernanza corporativa y ejecución operativa para proyectos de gran escala." }
                ],
                riesgo_mitigado: [
                    "Retrasos en la ejecución de obras e infraestructura crítica.",
                    "Interrupciones en la cadena de suministro y logística operativa.",
                    "Descoordinación entre proveedores, contratistas y equipos de ejecución.",
                    "Riesgos asociados al despliegue simultáneo de proyectos en entornos de alta complejidad."
                ]
            },
            {
                tag: "Lic.",
                name: "Fernando Gutiérrez Ortiz",
                role: "Director Jurídico y Cumplimiento Regulatorio",
                badge: "Coordinador legal",
                img: "img/Equipo/perfil-fernando-gutierrez-ortiz-convertido-de-png.webp",
                email: "Pendiente de integración.",
                phone: "Pendiente de integración.",
                resumen_ejecutivo: "Especialista en los sectores mercantil, civil y energético. Su práctica legal se distingue por un enfoque preventivo, estructurado y proactivo, especializado en coordinar la defensa legal, mitigar riesgos regulatorios y mantener una comunicación ejecutiva constante con clientes corporativos de alta exigencia.",
                formacion: "Especialista en Derecho Energético y Corporativo, Litigio Estratégico Civil y Mercantil, Derecho Administrativo y Constitucional, y Gestión de Cumplimiento Regulatorio. (Pendiente de integrar el detalle académico cuando se incorpore el KYC específico).",
                experiencia_previa: [
                    "Especialista en los sectores mercantil, civil y energético.",
                    "Su práctica legal se distingue por un enfoque preventivo, estructurado y proactivo.",
                    "Especializado en coordinar la defensa legal, mitigar riesgos regulatorios y mantener una comunicación ejecutiva constante con clientes corporativos de alta exigencia."
                ],
                especialidades: [
                    { icon: "gavel", text: "Derecho Energético y Corporativo" },
                    { icon: "account_balance", text: "Litigio Estratégico Civil y Mercantil" },
                    { icon: "policy", text: "Derecho Administrativo y Constitucional" },
                    { icon: "shield", text: "Gestión y Cumplimiento Regulatorio" }
                ],
                trayectoria_kyc: [
                    { entity: "Derecho Energético y Corporativo", desc: "Especialista en el marco jurídico aplicable al sector energético, con enfoque en prevención de riesgos y cumplimiento regulatorio.", border: "border-[#009FFE]" },
                    { entity: "Litigio Estratégico Civil y Mercantil", desc: "Experiencia en coordinación de estrategias legales para la defensa de intereses corporativos y resolución de controversias.", border: "border-gray-300" },
                    { entity: "Derecho Administrativo y Constitucional", desc: "Conocimiento de procedimientos administrativos, regulación pública y marco constitucional aplicable a proyectos estratégicos.", border: "border-gray-300" },
                    { entity: "Gestión y Cumplimiento Regulatorio", desc: "Enfoque preventivo para garantizar el cumplimiento normativo y reducir contingencias legales en proyectos de alta complejidad.", border: "border-gray-300" }
                ],
                valor_estrategico: [
                    { icon: "verified", title: "Certeza Jurídica", desc: "Fortalece la certeza jurídica y el cumplimiento regulatorio de proyectos estratégicos." },
                    { icon: "health_and_safety", title: "Estrategias Preventivas", desc: "Implementa estrategias preventivas para reducir contingencias legales y riesgos corporativos." },
                    { icon: "gavel", title: "Defensa Jurídica", desc: "Integra una visión especializada en derecho energético y defensa jurídica para proyectos de inversión e infraestructura." }
                ],
                riesgo_mitigado: [
                    "Riesgos legales y regulatorios en proyectos de infraestructura y energía.",
                    "Contingencias derivadas de incumplimientos normativos o administrativos.",
                    "Litigios civiles, mercantiles y corporativos que puedan afectar la continuidad de los proyectos."
                ]
            },
            {
            tag: "MBA / Econ.",
            name: "Alfonso Martínez Meyer",
            role: "Director de Factibilidad Territorial, Planeación Estratégica y Gestión de Proyectos.",
            badge: "Director de Planeación Estratégica",
            img: "img/Equipo/perfil-alfonso-martinez-meyer-convertido-de-png.webp",
            email: "Pendiente de actualización",
            phone: "Pendiente de actualización",
            resumen_ejecutivo: "Profesional con experiencia en desarrollo organizacional, coordinación institucional y fortalecimiento de relaciones estratégicas. Ha colaborado en procesos de planeación, negociación y consolidación de alianzas orientadas al crecimiento sostenible de proyectos públicos y privados.",
            formacion: "MBA y Economista con amplia experiencia en planeación estratégica, evaluación de proyectos, coordinación institucional y optimización operativa.",
            experiencia_previa: [
                "Profesional con experiencia en desarrollo organizacional, coordinación institucional y fortalecimiento de relaciones estratégicas.",
                "Ha colaborado en procesos de planeación, negociación y consolidación de alianzas orientadas al crecimiento sostenible de proyectos públicos y privados."
            ],
            especialidades: [
                { icon: "strategy", text: "Desarrollo Estratégico" },
                { icon: "account_balance", text: "Gestión Institucional" },
                { icon: "handshake", text: "Relaciones Corporativas" },
                { icon: "hub", text: "Vinculación Estratégica" }
            ],
            trayectoria_kyc: [
                { entity: "Planeación Estratégica", desc: "Especialista en diseño de estrategias de crecimiento, evaluación de oportunidades de inversión y desarrollo de modelos de negocio.", border: "border-[#009FFE]" },
                { entity: "Gestión de Grandes Proyectos", desc: "Coordinó y supervisó más de 500 obras federales con valor superior a 20 mil millones de pesos en SEDATU.", border: "border-gray-300" },
                { entity: "Evaluación de Factibilidad", desc: "Experiencia en estudios de mercado, viabilidad comercial y localización estratégica para proyectos de inversión.", border: "border-gray-300" },
                { entity: "Auditoría y Cumplimiento", desc: "Coordinación institucional para atención de auditorías gubernamentales y solventación de observaciones de alto impacto.", border: "border-gray-300" },
                { entity: "Desarrollo de Negocios", desc: "Experiencia internacional en expansión comercial, negociación estratégica y apertura de nuevos mercados.", border: "border-gray-300" }
            ],
            valor_estrategico: [
                { icon: "analytics", title: "Viabilidad", desc: "Vincula análisis territorial con viabilidad financiera y comercial." },
                { icon: "moving", title: "Decisiones", desc: "Convierte información geoespacial en decisiones de inversión." },
                { icon: "domain", title: "Gestión", desc: "Fortalece la gestión institucional con organismos públicos y privados." }
            ],
            riesgo_mitigado: [
                "Inversiones en ubicaciones no viables.",
                "Desviaciones presupuestales.",
                "Falta de alineación estratégica entre estudios técnicos y objetivos de negocio."
            ]
        }
        ];

        let activeMemberIndex = 0;

        // Animación simple para suavizar transiciones
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);

        // Se asigna la función globalmente para poder llamarse desde el inline onclick
        window.selectMember = function(index) {
            activeMemberIndex = index;
            renderSidebar();
            renderProfile();
            
            // Auto-scroll al perfil en móvil
            if (window.innerWidth < 768) {
                const profilePanel = document.getElementById('profile-panel');
                if (profilePanel) {
                    profilePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        };

        function renderSidebar() {
            const sidebarContainer = document.getElementById('sidebar-team-list');
            if (!sidebarContainer) return;
            
            sidebarContainer.innerHTML = teamData.map((member, index) => {
                const isActive = index === activeMemberIndex;
                return `
                    <a class="p-6 flex items-center gap-3 transition-all cursor-pointer group ${isActive ? 'bg-[#009FFE] active' : 'hover:bg-white'}" onclick="window.selectMember(${index})">
                        <div class="w-12 h-12 rounded-full border-2 ${isActive ? 'border-white/30 bg-white' : 'border-gray-300 bg-white'} overflow-hidden flex-shrink-0">
                            <img alt="${member.name}" class="w-full h-full object-cover ${isActive ? '' : 'grayscale group-hover:grayscale-0 transition-all'}" src="${member.img}" onerror="this.src='img/logo.png'"/>
                        </div>
                        <div class="flex-grow min-w-0">
                            <h3 class="text-sm font-bold truncate transition-colors ${isActive ? 'text-[#131312]' : 'text-gray-700 group-hover:text-[#009FFE]'}">${member.tag} ${member.name}</h3>
                            <p class="text-[10px] uppercase tracking-wider font-bold truncate ${isActive ? 'text-[#131312]/80' : 'text-gray-500'}">${member.role}</p>
                        </div>
                        <span class="material-symbols-outlined transition-opacity ${isActive ? 'text-[#131312]' : 'text-gray-400 opacity-0 group-hover:opacity-100'}">chevron_right</span>
                    </a>
                `;
            }).join('');
        }

        function renderProfile() {
            const profileContainer = document.getElementById('profile-panel');
            if (!profileContainer) return;
            
            const member = teamData[activeMemberIndex];

            // 1. Manejo seguro de especialidades
            const especialidadesArray = member.especialidades || [];
            const especialidadesHtml = especialidadesArray.map(esp => `
                <div class="flex items-center gap-4 p-4 border border-gray-200 bg-slate-50 rounded-lg group hover:border-[#009FFE] transition-colors">
                    <span class="material-symbols-outlined text-[#009FFE] group-hover:scale-110 transition-transform">${esp.icon || 'star'}</span>
                    <span class="text-sm font-bold text-gray-700">${esp.text}</span>
                </div>
            `).join('');

            // 2. Manejo seguro de trayectoria (Soporta la versión corta o la detallada del KYC)
            const trayectoriaArray = member.trayectoria_kyc || member.trayectoria || [];
            const trayectoriaHtml = trayectoriaArray.map(tray => `
                <div class="relative">
                    <div class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-4 ${tray.border || 'border-gray-300'}"></div>
                    <h5 class="text-[#1d1d1b] text-base font-bold">${tray.entity || 'Destacado'}</h5>
                    ${tray.position ? `<p class="text-xs font-bold ${tray.border === 'border-[#009FFE]' ? 'text-[#009FFE]' : 'text-gray-500'} uppercase tracking-wider mb-1">${tray.position}</p>` : ''}
                    <p class="text-gray-500 text-sm leading-relaxed">${tray.desc}</p>
                </div>
            `).join('');

            // 3. Manejo de Valor Estratégico
            const valorArray = member.valor_estrategico || [];
            const valorHtml = valorArray.map(val => `
                <div class="space-y-3 bg-white p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div class="w-10 h-10 bg-[#009FFE]/10 rounded flex items-center justify-center border border-[#009FFE]/20">
                        <span class="material-symbols-outlined text-[#009FFE]">${val.icon || 'star'}</span>
                    </div>
                    <h5 class="text-sm text-[#1d1d1b] font-bold">${val.title || 'Estrategia'}</h5>
                    <p class="text-xs text-gray-600 leading-relaxed">${val.desc}</p>
                </div>
            `).join('');

            // 4. Inyección de nuevos campos detallados (Experiencia y Formación)
            let experienciaHtml = '';
            if (member.experiencia_previa && member.experiencia_previa.length > 0) {
                experienciaHtml = `
                    <div class="mt-6">
                        <h5 class="text-xs font-bold uppercase tracking-widest text-[#009FFE] mb-2">Experiencia Previa</h5>
                        <ul class="list-disc list-inside text-sm text-gray-600 space-y-1 ml-4">
                            ${member.experiencia_previa.map(exp => `<li>${exp}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }

            let formacionHtml = '';
            if (member.formacion) {
                formacionHtml = `
                    <div class="mt-6">
                        <h5 class="text-xs font-bold uppercase tracking-widest text-[#009FFE] mb-2">Formación Académica</h5>
                        <p class="text-sm text-gray-600 leading-relaxed">${member.formacion}</p>
                    </div>
                `;
            }

            // 5. Riesgo mitigado (soporta texto simple o viñetas)
            let riesgoTexto = member.riesgo_mitigado || '';
            if (Array.isArray(riesgoTexto)) {
                riesgoTexto = `<ul class="list-disc list-inside ml-2 space-y-1">${riesgoTexto.map(r => `<li>${r}</li>`).join('')}</ul>`;
            }

            // Consolidación del Resumen
            const resumenTexto = member.resumen_ejecutivo || member.resumen || '';

            profileContainer.innerHTML = `
                <header class="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 bg-white animate-[fadeIn_0.3s_ease-out]">
                    <div class="w-48 h-48 rounded-full border-4 border-gray-100 p-1 flex-shrink-0">
                        <div class="w-full h-full rounded-full overflow-hidden border-2 border-[#009FFE] shadow-lg">
                            <img alt="${member.name}" class="w-full h-full object-cover bg-white" src="${member.img}" onerror="this.src='img/logo.png'"/>
                        </div>
                    </div>
                    <div class="text-center md:text-left pt-4 flex-grow">
                        <h2 class="text-3xl md:text-4xl font-black text-[#1d1d1b] mb-2 uppercase leading-tight">${member.tag || ''} ${member.name}</h2>
                        <h3 class="text-xl font-bold text-[#009FFE] mb-4">${member.role || ''}</h3>
                        ${member.badge ? `
                        <div class="flex flex-wrap justify-center md:justify-start gap-4">
                            <span class="bg-slate-50 border border-gray-200 px-4 py-2 rounded-full text-sm font-bold text-gray-600 flex items-center gap-2">
                                <span class="material-symbols-outlined text-[#009FFE] text-[20px]">workspace_premium</span>
                                ${member.badge}
                            </span>
                        </div>` : ''}
                    </div>
                </header>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 animate-[fadeIn_0.4s_ease-out]">
                    <div class="space-y-10">
                        <div class="space-y-4">
                            <h4 class="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Contacto Directo</h4>
                            <div class="space-y-3">
                                <div class="flex items-center gap-3 text-gray-600 hover:text-[#009FFE] transition-colors cursor-pointer">
                                    <span class="material-symbols-outlined">mail</span>
                                    <span class="text-sm font-medium">${member.email || 'Pendiente'}</span>
                                </div>
                                <div class="flex items-center gap-3 text-gray-600 hover:text-[#009FFE] transition-colors cursor-pointer">
                                    <span class="material-symbols-outlined">phone_iphone</span>
                                    <span class="text-sm font-medium">${member.phone || 'Pendiente'}</span>
                                </div>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <h4 class="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Especialidades Clave</h4>
                            <div class="grid grid-cols-1 gap-4">
                                ${especialidadesHtml}
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-10">
                        <div class="space-y-4">
                            <h4 class="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Resumen Ejecutivo</h4>
                            <p class="text-gray-600 leading-relaxed text-sm">${resumenTexto}</p>
                            ${formacionHtml}
                            ${experienciaHtml}
                        </div>
                        <div class="space-y-6">
                            <h4 class="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Trayectoria Destacada / KYC</h4>
                            <div class="relative pl-6 space-y-8 border-l-2 border-gray-200 ml-3">
                                ${trayectoriaHtml}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-slate-50 border border-gray-200 p-10 mb-16 rounded-xl animate-[fadeIn_0.5s_ease-out]">
                    <h4 class="text-xl font-bold text-[#1d1d1b] mb-8 uppercase border-b-2 border-[#009FFE] inline-block pb-2">Valor estratégico para BIG-i</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        ${valorHtml}
                    </div>
                    
                    <div class="mt-10 bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg shadow-sm">
                        <h4 class="text-amber-800 font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span class="material-symbols-outlined text-amber-500 text-[20px]">gpp_maybe</span>
                            Riesgo Mitigado
                        </h4>
                        <div class="text-amber-900/80 text-sm leading-relaxed">${riesgoTexto}</div>
                    </div>
                </div>

                <div class="animate-[fadeIn_0.6s_ease-out]">
                    <h4 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 text-center border-b border-gray-100 pb-2">Afiliaciones y participaciones relevantes</h4>
                    <div class="flex flex-wrap justify-center items-center gap-12 grayscale opacity-50 hover:opacity-100 transition-opacity duration-500">
                        <div class="flex flex-col items-center gap-2 group">
                            <span class="material-symbols-outlined text-gray-600 text-[40px] group-hover:text-[#009FFE] transition-colors">public</span>
                            <span class="text-xs font-bold text-gray-500 group-hover:text-[#1d1d1b] transition-colors">ONU</span>
                        </div>
                        <div class="flex flex-col items-center gap-2 group">
                            <span class="material-symbols-outlined text-gray-600 text-[40px] group-hover:text-[#009FFE] transition-colors">account_balance</span>
                            <span class="text-xs font-bold text-gray-500 group-hover:text-[#1d1d1b] transition-colors">FCBG</span>
                        </div>
                        <div class="flex flex-col items-center gap-2 group">
                            <span class="material-symbols-outlined text-gray-600 text-[40px] group-hover:text-[#009FFE] transition-colors">groups</span>
                            <span class="text-xs font-bold text-gray-500 group-hover:text-[#1d1d1b] transition-colors">Cámara</span>
                        </div>
                        <div class="flex flex-col items-center gap-2 group">
                            <span class="material-symbols-outlined text-gray-600 text-[40px] group-hover:text-[#009FFE] transition-colors">corporate_fare</span>
                            <span class="text-xs font-bold text-gray-500 group-hover:text-[#1d1d1b] transition-colors">KG BIG-i</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Inicialización
        window.selectMember(0);
    }
});
