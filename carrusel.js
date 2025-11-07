class Carousel3D {
    constructor(container) {
        this.container = container;
        this.carousel = container.querySelector('.carousel-3d');
        this.items = container.querySelectorAll('.carousel-item');
        this.indicators = container.querySelectorAll('.indicator');
        this.prevBtn = container.querySelector('.carousel-btn.prev');
        this.nextBtn = container.querySelector('.carousel-btn.next');

        this.currentIndex = 0;
        this.totalItems = this.items.length;
        this.angle = 360 / this.totalItems;

        // Variables para transición suave
        this.isAnimating = false;
        this.animationDuration = 500; // ms
        this.rotationCount = 0;

        this.init();
    }

    init() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        this.indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const index = parseInt(indicator.dataset.index);
                this.goTo(index);
            });
        });

        // Auto-rotate cada 5 segundos
        this.autoRotate = setInterval(() => this.next(), 5000);

        // Pausar auto-rotate al hacer hover
        this.container.addEventListener('mouseenter', () => {
            clearInterval(this.autoRotate);
        });

        this.container.addEventListener('mouseleave', () => {
            this.autoRotate = setInterval(() => this.next(), 5000);
        });

        // Soporte para touch en dispositivos móviles
        this.addTouchSupport();

        this.update();
    }

    addTouchSupport() {
        let startX = 0;
        let endX = 0;

        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.container.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }

    handleSwipe(startX, endX) {
        const diff = startX - endX;
        const minSwipe = 50;

        if (Math.abs(diff) > minSwipe && !this.isAnimating) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }

    next() {
        if (this.isAnimating) return;

        this.isAnimating = true;
        this.rotationCount++; // sumamos vueltas
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.update();

        setTimeout(() => {
            this.isAnimating = false;
        }, this.animationDuration);
    }

    prev() {
        if (this.isAnimating) return;

        this.isAnimating = true;
        this.rotationCount--; // restamos vueltas
        this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        this.update();

        setTimeout(() => {
            this.isAnimating = false;
        }, this.animationDuration);
    }


    goTo(index) {
        if (this.isAnimating || index === this.currentIndex) return;

        this.isAnimating = true;

        // Calculamos la diferencia en vueltas
        let diff = index - this.currentIndex;

        // Si la diferencia es negativa, giramos hacia adelante (no hacia atrás)
        if (diff < 0) {
            diff += this.totalItems;
        }

        // Actualizamos el contador de rotación siguiendo el curso
        this.rotationCount += diff;
        this.currentIndex = index;

        this.update();

        setTimeout(() => {
            this.isAnimating = false;
        }, this.animationDuration);
    }

    update() {
        const rotation = -this.rotationCount * this.angle;

        this.carousel.style.transition = `transform ${this.animationDuration}ms ease-in-out`;
        this.carousel.style.transform = `rotateY(${rotation}deg)`;

        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });

        this.items.forEach((item, index) => {
            const isActive = index === this.currentIndex;
            item.style.zIndex = isActive ? 10 : 1;
            item.style.filter = isActive ? 'none' : 'brightness(0.8)';
            item.style.transition = `all ${this.animationDuration}ms ease-in-out`;
        });
    }

}

// Inicializar el carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-3d-container');
    if (carouselContainer) {
        new Carousel3D(carouselContainer);
    }
});