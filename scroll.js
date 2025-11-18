// scroll.js
document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos todos los artículos y el footer
  const sections = [...document.querySelectorAll("article"), document.querySelector("footer")];
  let isScrolling = false;
  let scrollTimeout;

  window.addEventListener("scroll", () => {
    if (isScrolling) return;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollPos = window.scrollY;
      const viewportHeight = window.innerHeight;

      let closestSection = sections[0];
      let minDistance = Math.abs(sections[0].offsetTop - scrollPos);

      // Buscar la sección más cercana al centro de la pantalla
      sections.forEach(section => {
        const distance = Math.abs(section.offsetTop - scrollPos);
        if (distance < minDistance) {
          closestSection = section;
          minDistance = distance;
        }
      });

      // Animar hacia la sección más cercana
      isScrolling = true;
      closestSection.scrollIntoView({ behavior: "smooth", block: "start" });

      // Liberar bloqueo después de la animación
      setTimeout(() => { isScrolling = false; }, 600);
    }, 200); // espera breve para que el usuario termine de scrollear
  });
});
