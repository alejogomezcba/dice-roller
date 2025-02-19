const cantidadDadosElement = document.getElementById("cantidadDados");
const incrementarBtn = document.getElementById("incrementar");
const disminuirBtn = document.getElementById("disminuir");
const lanzarBtn = document.getElementById("lanzar");
const dadosContainer = document.querySelector(".dados-container");

let cantidadDados = 1; // Valor inicial mínimo

// Función para actualizar el estado del botón "Disminuir"
function actualizarEstadoBotonDisminuir() {
    if (cantidadDados === 1) {
        disminuirBtn.disabled = true;
        disminuirBtn.style.filter = "grayscale(100%)"; // Aplicar escala de grises
        disminuirBtn.style.cursor = "not-allowed"; // Cambia el cursor para indicar que está deshabilitado
    } else {
        disminuirBtn.disabled = false;
        disminuirBtn.style.filter = "none"; // Elimina el filtro cuando está habilitado
        disminuirBtn.style.cursor = "pointer"; // Cursor normal
    }
}

// Función para lanzar los dados
function lanzarDados() {
    console.log('me ejecutan');

    dadosContainer.innerHTML = ""; // Limpiar los dados anteriores

    for (let i = 0; i < cantidadDados; i++) {
        let dado = document.createElement("div");
        dado.classList.add("dado");

        // Crear las seis caras del dado con puntos
        const caras = ["front", "back", "right", "left", "top", "bottom"];
        const valores = ["uno", "dos", "tres", "cuatro", "cinco", "seis"];

        caras.forEach((cara, index) => {
            let face = document.createElement("div");
            face.classList.add("cara", cara);
            
            let puntosContainer = document.createElement("div");
            puntosContainer.classList.add("puntos-container", valores[index]);

            let numPuntos = index + 1; // Mapea valores del dado (1 a 6)
            
            for (let j = 0; j < numPuntos; j++) {
                let punto = document.createElement("div");
                punto.classList.add("puntos");
                puntosContainer.appendChild(punto);
            }

            face.appendChild(puntosContainer);
            dado.appendChild(face);
        });

        dadosContainer.appendChild(dado);

        // Animación aleatoria al lanzar
        setTimeout(() => {
            let randomX = 720 + Math.floor(Math.random() * 360);
            let randomY = 720 + Math.floor(Math.random() * 360);

            let resultado = Math.floor(Math.random() * 6);
            let posicionesX = [0, 180, -90, 90, 90, -90];  // Rotación en X para la cara visible
            let posicionesY = [0, 0, 90, -90, 0, 0];      // Rotación en Y para evitar inclinaciones

            // Primera animación con giros aleatorios
            dado.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg)`;

            // Ajustar la posición final para mostrar el resultado
            setTimeout(() => {
                dado.style.transform = `rotateX(${posicionesX[resultado]}deg) rotateY(${posicionesY[resultado]}deg)`;
            }, 1200);
        }, 100);
    }
}

// Asignar evento al botón de lanzamiento
lanzarBtn.addEventListener("click", lanzarDados);

// Actualiza el número de dados sin lanzarlos
function actualizarCantidad(incremento) {
    cantidadDados += incremento;
    if (cantidadDados < 1) cantidadDados = 1;
    cantidadDadosElement.textContent = cantidadDados;
    lanzarDados();
    // Llamar a la función para actualizar el estado del botón "Disminuir"
    actualizarEstadoBotonDisminuir();
}

// Asignar eventos a los botones de incremento y decremento
incrementarBtn.addEventListener("click", () => actualizarCantidad(1));
disminuirBtn.addEventListener("click", () => actualizarCantidad(-1));

// Llamar a la función al inicio para asegurar que el botón comience en el estado correcto
actualizarEstadoBotonDisminuir();
