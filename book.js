document.addEventListener('DOMContentLoaded', () => {

    const btnAnterior = document.getElementById('prev-btn');
    const btnSiguiente = document.getElementById('next-btn');
    const paginasVolteables = Array.from(document.querySelectorAll('.flippable'));

    class NodoPagina {
        constructor(paginaDOM, index) {
            this.paginaDOM = paginaDOM;
            this.index = index;
            this.prev = null;
            this.next = null;
            this.zIndexOriginal = 100 - index;
        }
    }

    class LibroDLL {
        constructor() {
            this.head = null;
            this.tail = null;
            this.paginaActual = null;
        }

        agregarPagina(paginaDOM, index) {
            const nuevoNodo = new NodoPagina(paginaDOM, index);
            nuevoNodo.paginaDOM.style.zIndex = nuevoNodo.zIndexOriginal;
            if (!this.head) {
                this.head = nuevoNodo;
                this.tail = nuevoNodo;
                this.paginaActual = nuevoNodo;
            } else {
                this.tail.next = nuevoNodo;
                nuevoNodo.prev = this.tail;
                this.tail = nuevoNodo;
            }
        }

        pasarPaginaAdelante() {
            if (!this.paginaActual) return;
            const nodo = this.paginaActual;
            const dom = nodo.paginaDOM;
            dom.classList.add('flipped');
            dom.style.zIndex = 200 + nodo.index;
            this.paginaActual = nodo.next;
            this.actualizarBotones();
        }

        pasarPaginaAtras() {
            let nodoARecuperar = null;
            if (this.paginaActual === null) {
                nodoARecuperar = this.tail;
            } else if (this.paginaActual.prev) {
                nodoARecuperar = this.paginaActual.prev;
            } else {
                return;
            }

            nodoARecuperar.paginaDOM.classList.remove('flipped');
            nodoARecuperar.paginaDOM.style.zIndex = nodoARecuperar.zIndexOriginal;
            this.paginaActual = nodoARecuperar;
            this.actualizarBotones();
        }

        actualizarBotones() {
            if (this.head && !this.head.paginaDOM.classList.contains('flipped')) {
                btnAnterior.disabled = true;
            } else {
                btnAnterior.disabled = false;
            }
            if (this.paginaActual === null) {
                btnSiguiente.disabled = true;
            } else {
                btnSiguiente.disabled = false;
            }
        }
    }

    const libro = new LibroDLL();

    paginasVolteables.forEach((paginaDOM, index) => {
        libro.agregarPagina(paginaDOM, index);
    });

    libro.actualizarBotones();
    btnSiguiente.addEventListener('click', () => libro.pasarPaginaAdelante());
    btnAnterior.addEventListener('click', () => libro.pasarPaginaAtras());
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') libro.pasarPaginaAdelante();
        if (e.key === 'ArrowLeft') libro.pasarPaginaAtras();
    });
});
