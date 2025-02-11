document.addEventListener('DOMContentLoaded', function () {
    // ===================================================
    // Carrossel de Imagem Index (Automático)
    // ===================================================
    const trackIndex = document.querySelector('.carousel-track')
    const prevButtonIndex = document.querySelector('.prev')
    const nextButtonIndex = document.querySelector('.next')

    let imagesIndex
    let indexCurrent = 0
    let autoSlideInterval

    function updateImagesIndex() {
        // Determina se é desktop ou mobile e atualiza a lista de imagens
        imagesIndex = window.innerWidth <= 768
            ? document.querySelectorAll('.hero-image.mobile')
            : document.querySelectorAll('.hero-image.desktop')

        indexCurrent = 0 // Reinicia o índice ao trocar de contexto (desktop/mobile)
        updateCarouselIndex()
    }

    function updateCarouselIndex() {
        if (imagesIndex.length === 0) return
        const slideWidth = imagesIndex[0].offsetWidth
        trackIndex.style.transform = `translateX(-${indexCurrent * slideWidth}px)`
    }

    function nextSlideIndex() {
        indexCurrent = (indexCurrent + 1) % imagesIndex.length
        updateCarouselIndex()
    }

    function prevSlideIndex() {
        indexCurrent = indexCurrent > 0 ? indexCurrent - 1 : imagesIndex.length - 1
        updateCarouselIndex()
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlideIndex, 5000) // Muda a cada 5 segundos
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval)
    }

    prevButtonIndex.addEventListener('click', () => {
        prevSlideIndex()
        stopAutoSlide()
        startAutoSlide()
    })

    nextButtonIndex.addEventListener('click', () => {
        nextSlideIndex()
        stopAutoSlide()
        startAutoSlide()
    })

    window.addEventListener('resize', updateImagesIndex)

    updateImagesIndex()
    startAutoSlide() // Inicia a rotação automática

    // ===================================================
    // Carrossel de Imagens (Manual)
    // ===================================================
    const track = document.querySelector('.custom-carousel-track')
    const items = document.querySelectorAll('.custom-carousel-item')
    const indicatorsContainer = document.querySelector('.custom-carousel-indicators')
    let currentSlide = 0

    function setupIndicators() {
        const slidesToShow = window.innerWidth <= 768 ? 2 : 4
        const totalSlides = Math.ceil(items.length / slidesToShow)

        indicatorsContainer.innerHTML = ''

        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('span')
            indicator.classList.add('custom-indicator')
            if (i === 0) indicator.classList.add('active')
            indicator.dataset.slide = i
            indicatorsContainer.appendChild(indicator)
        }

        const indicators = document.querySelectorAll('.custom-indicator')
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index
                updateCarousel()
            })
        })
    }

    function updateCarousel() {
        const slidesToShow = window.innerWidth <= 768 ? 2 : 4
        const slideWidth = items[0].offsetWidth
        track.style.transform = `translateX(-${currentSlide * slideWidth * slidesToShow}px)`

        const indicators = document.querySelectorAll('.custom-indicator')
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide)
        })
    }

    window.addEventListener('resize', () => {
        setupIndicators()
        updateCarousel()
    })

    setupIndicators()
    updateCarousel()
})
