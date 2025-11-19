// book.js

document.addEventListener('DOMContentLoaded', () => {

    const paginasVolteables = document.querySelectorAll('.flippable');
    const btnAnterior = document.getElementById('prev-btn');
    const btnSiguiente = document.getElementById('next-btn');

    let doblePaginaActual = 0;
    const totalDoblesPaginas = paginasVolteables.length - 1; // -1 porque comenzamos en 0

    const actualizarBotones = () => {
        btnAnterior.disabled = doblePaginaActual === 0;
        btnSiguiente.disabled = doblePaginaActual === totalDoblesPaginas;
    };

    const pasarPagina = (direccion) => {
        if (direccion === 1) { // ADELANTE
            if (doblePaginaActual >= totalDoblesPaginas) return;

            paginasVolteables[doblePaginaActual].classList.add('flipped');
            doblePaginaActual++;

        } else if (direccion === -1) { // ATRÁS
            if (doblePaginaActual <= 0) return;

            doblePaginaActual--;
            paginasVolteables[doblePaginaActual].classList.remove('flipped');
        }

        actualizarBotones();
    };

    btnSiguiente.addEventListener('click', () => pasarPagina(1));
    btnAnterior.addEventListener('click', () => pasarPagina(-1));

    // Inicialización
    actualizarBotones();
});