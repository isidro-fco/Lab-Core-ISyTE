// book.js

document.addEventListener('DOMContentLoaded', () => {
    
    const flippablePages = document.querySelectorAll('.flippable');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentSpread = 0;
    const totalSpreads = flippablePages.length - 1; // -1 porque empezamos en 0

    const updateButtons = () => {
        prevBtn.disabled = currentSpread === 0;
        nextBtn.disabled = currentSpread === totalSpreads;
    };

    const turnPage = (direction) => {
        if (direction === 1) { // ADELANTE
            if (currentSpread >= totalSpreads) return;
            
            flippablePages[currentSpread].classList.add('flipped');
            currentSpread++;

        } else if (direction === -1) { // ATRÁS
            if (currentSpread <= 0) return;
            
            currentSpread--;
            flippablePages[currentSpread].classList.remove('flipped');
        }

        updateButtons();
    };

    nextBtn.addEventListener('click', () => turnPage(1));
    prevBtn.addEventListener('click', () => turnPage(-1));

    // Inicialización
    updateButtons();
});