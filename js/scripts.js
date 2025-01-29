document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.custom-carousel-track')
    const items = document.querySelectorAll('.custom-carousel-item')
    const indicatorsContainer = document.querySelector('.custom-carousel-indicators')
    let currentSlide = 0
    let autoSlideTimeout

    function setupIndicators() {
        // Determina o número de imagens por slide
        const slidesToShow = window.innerWidth <= 768 ? 2 : 4
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
        const slidesToShow = window.innerWidth <= 768 ? 2 : 4
        const slideWidth = items[0].offsetWidth
        track.style.transform = `translateX(-${currentSlide * slideWidth * slidesToShow}px)`

        // Atualiza os indicadores
        const indicators = document.querySelectorAll('.custom-indicator')
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide)
        })
    }

    function autoSlide() {
        const slidesToShow = window.innerWidth <= 768 ? 2 : 4
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

//imagem index
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track')
    const prevButton = document.querySelector('.prev')
    const nextButton = document.querySelector('.next')

    let images
    let currentIndex = 0
    let autoSlideTimeout

    function updateImages() {
        // Determina se é desktop ou mobile e atualiza a lista de imagens
        images = window.innerWidth <= 768
            ? document.querySelectorAll('.hero-image.mobile')
            : document.querySelectorAll('.hero-image.desktop')

        currentIndex = 0 // Reinicia o índice ao trocar de contexto (desktop/mobile)
        updateCarousel()
    }

    function updateCarousel() {
        if (images.length === 0) return
        const slideWidth = images[0].offsetWidth
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length
        updateCarousel()
    }

    function prevSlide() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1
        updateCarousel()
    }

    function autoSlide() {
        nextSlide()
        autoSlideTimeout = setTimeout(autoSlide, 5000) // Muda a cada 5 segundos
    }

    function resetAutoSlide() {
        clearTimeout(autoSlideTimeout)
        autoSlideTimeout = setTimeout(autoSlide, 5000)
    }

    prevButton.addEventListener('click', () => {
        prevSlide()
        resetAutoSlide()
    })

    nextButton.addEventListener('click', () => {
        nextSlide()
        resetAutoSlide()
    })

    // Atualiza ao redimensionar a tela
    window.addEventListener('resize', updateImages)

    // Inicializa o carrossel
    updateImages()
    autoSlideTimeout = setTimeout(autoSlide, 5000)
})
