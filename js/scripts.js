document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.custom-carousel-track')
    const items = document.querySelectorAll('.custom-carousel-item')
    const indicatorsContainer = document.querySelector('.custom-carousel-indicators')
    let currentSlide = 0
    let autoSlideTimeout

    function setupIndicators() {
        // Determina o número de imagens por slide
        const slidesToShow = window.innerWidth <= 768 ? 1 : 4
        const totalSlides = Math.ceil(items.length / slidesToShow)

        // Limpa os indicadores anteriores
        indicatorsContainer.innerHTML = ''

        // Cria os indicadores dinamicamente
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('span')
            indicator.classList.add('custom-indicator')
            if (i === 0) indicator.classList.add('active')
            indicator.dataset.slide = i
            indicatorsContainer.appendChild(indicator)
        }

        // Atualiza o evento dos indicadores
        const indicators = document.querySelectorAll('.custom-indicator')
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index
                updateCarousel()
                resetAutoSlide() // Reinicia o temporizador ao clicar
            })
        })
    }

    function updateCarousel() {
        const slidesToShow = window.innerWidth <= 768 ? 1 : 4
        const slideWidth = items[0].offsetWidth
        track.style.transform = `translateX(-${currentSlide * slideWidth * slidesToShow}px)`

        // Atualiza os indicadores
        const indicators = document.querySelectorAll('.custom-indicator')
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide)
        })
    }

    function autoSlide() {
        const slidesToShow = window.innerWidth <= 768 ? 1 : 4
        const totalSlides = Math.ceil(items.length / slidesToShow)

        // Avança para o próximo slide
        currentSlide = (currentSlide + 1) % totalSlides
        updateCarousel()
        autoSlideTimeout = setTimeout(autoSlide, 5000) // Agendado novamente
    }

    function resetAutoSlide() {
        clearTimeout(autoSlideTimeout) // Limpa o temporizador atual
        autoSlideTimeout = setTimeout(autoSlide, 5000) // Reinicia o temporizador
    }

    // Atualiza o carrossel ao redimensionar a janela
    window.addEventListener('resize', () => {
        setupIndicators()
        updateCarousel()
        resetAutoSlide() // Reinicia o temporizador
    })

    // Inicializa o carrossel
    setupIndicators()
    updateCarousel()
    autoSlideTimeout = setTimeout(autoSlide, 5000) // Inicia o temporizador
})
