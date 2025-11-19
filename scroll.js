document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos todos los elementos <article> y el <footer>
  const secciones = [...document.querySelectorAll("article"), document.querySelector("footer")];
  let estaScrolleando = false;
  let tiempoEsperaScroll;

  window.addEventListener("scroll", () => {
    if (estaScrolleando) return;

    clearTimeout(tiempoEsperaScroll);
    tiempoEsperaScroll = setTimeout(() => {
      const posicionScroll = window.scrollY;
      const alturaViewport = window.innerHeight;

      let seccionMasCercana = secciones[0];
      let distanciaMinima = Math.abs(secciones[0].offsetTop - posicionScroll);

      // Buscar la sección más cercana a la posición actual de scroll (parte superior del viewport)
      secciones.forEach(seccion => {
        const distancia = Math.abs(seccion.offsetTop - posicionScroll);
        if (distancia < distanciaMinima) {
          seccionMasCercana = seccion;
          distanciaMinima = distancia;
        }
      });

      // Animar hacia la sección más cercana
      estaScrolleando = true;
      seccionMasCercana.scrollIntoView({ behavior: "smooth", block: "start" });

      // Liberar bloqueo después de la duración aproximada de la animación (600ms)
      setTimeout(() => { estaScrolleando = false; }, 600);
    }, 200); // Espera breve (200ms) para que el usuario termine de scrollear
  });
});