document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para o menu responsivo (Hamburger) ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Opcional: Adicionar animação ao ícone do hambúrguer
        hamburger.classList.toggle('active');
    });

    // Fechar o menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active'); // Opcional: Remover classe do hambúrguer
            }
        });
    });

    // --- Lógica para o alternador de tema (Light/Dark Mode) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme'); // Pega o tema salvo

    // Aplica o tema salvo na inicialização
    if (currentTheme) {
        body.classList.add(currentTheme + '-theme');
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Ícone de sol para tema escuro
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Ícone de lua para tema claro
        }
    } else {
        // Tema padrão se não houver um salvo (light-theme, já definido no HTML)
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Ícone de lua para tema claro
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark'); // Salva o tema
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Muda ícone para sol
            // Atualiza partículas para tema escuro
            if (window.particlesJS) { // Verifica se particlesJS está carregado
                particlesJS('interactive-background', particlesConfigDark);
            }
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light'); // Salva o tema
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Muda ícone para lua
            // Atualiza partículas para tema claro
            if (window.particlesJS) { // Verifica se particlesJS está carregado
                particlesJS('interactive-background', particlesConfigLight);
            }
        }
    });

    // --- Lógica para a animação de surgimento ao scroll (Intersection Observer) ---
    // Seleciona todas as seções e o hero para observar
    const sectionsToAnimate = document.querySelectorAll('section, .hero'); 

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // O elemento aparecerá quando 20% dele estiver visível
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // IMPORTANTE: REMOVIDA A LINHA observer.unobserve(entry.target);
            } else {
                // Se o elemento não está mais intersectando, remove a classe para reanimar na próxima vez
                entry.target.classList.remove('fade-in');
            }
        });
    }, observerOptions);

    // Na inicialização, precisamos garantir que os elementos estejam no estado inicial (não animados)
    sectionsToAnimate.forEach(element => {
        element.classList.remove('fade-in'); // Garante que nenhum comece animado
        sectionObserver.observe(element); // Começa a observar
    });
});