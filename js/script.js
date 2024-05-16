document.addEventListener("DOMContentLoaded", function () {
  // Menu toggle
  const toggleMenu = () => {
    const navLinks = document.getElementById("navLinks");
    navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
  };

  document.querySelector(".menu-icon").addEventListener("click", toggleMenu);

  // Navigation smooth scroll
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarHeight = document.querySelector("header").offsetHeight;

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      const targetPosition = targetElement.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      document.getElementById("navLinks").style.display = "none";
    });
  });

  // Slider
  const slider = document.querySelector(".slider-contenedor");
  const sliderIndividual = document.querySelectorAll(".contenido-slider");
  let contador = 1;
  let width = sliderIndividual[0].clientWidth;
  const intervalo = 3000;

  window.addEventListener("resize", () => {
    width = sliderIndividual[0].clientWidth;
  });

  setInterval(() => {
    slides();
  }, intervalo);

  const slides = () => {
    slider.style.transform = `translate(${-width * contador}px)`;
    slider.style.transition = "transform .8s";
    contador++;

    if (contador === sliderIndividual.length) {
      setTimeout(() => {
        slider.style.transform = "translate(0px)";
        slider.style.transition = "transform 0s";
        contador = 1;
      }, 1500);
    }
  };

  // Load products
  const loadProducts = async () => {
    try {
      const response = await fetch("productos.json");
      const data = await response.json();

      const contenedorProductos = document.getElementById("contenedor-productos");
      data.forEach((producto) => {
        const productoHTML = `
          <article class="col-lg-4 col-md-6 col-sm-12 mb-5 text-center articulo">
            <div>
              <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">
              <div class="card-body">
                <h2>${producto.nombre}</h2>
                <p class="fs-4">${producto.precio} €</p>
                <button class="btn btn-success" onclick="mostrarProducto('${producto.nombre}', '${producto.descripcion}')">
                  Detalle
                </button>
              </div>
            </div>
          </article>`;
        contenedorProductos.innerHTML += productoHTML;
      });
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  loadProducts();
});

const mostrarProducto = (nombre, descripcion) => {
  document.getElementById("descripcionProducto").innerHTML = descripcion;
  document.getElementById("titulo-producto").innerHTML = nombre;
  document.getElementById("modal").style.display = "flex";
};

document.getElementById("btn-cerrar").onclick = () => {
  document.getElementById("modal").style.display = "none";
};