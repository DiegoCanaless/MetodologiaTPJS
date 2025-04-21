let contenedorPersonajes = document.getElementById("contenedorPersonajes");
let busquedaUsuario = document.getElementById("busquedaUsuario");
let paginaActual = 1; // Página actual
let totalPaginas = 1; // Total de páginas

// Función para cargar todos los personajes
async function cargarTodosLosPersonajes(page = 1, name = "") {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`);
        const data = await response.json();
        todosLosPersonajes = data.results || [];
        totalPaginas = data.info.pages; // Actualizar el total de páginas
        mostrarPersonajes(todosLosPersonajes);
        actualizarControlesPaginacion();
    } catch (error) {
        console.error('Error fetching data:', error);
        contenedorPersonajes.innerHTML = '<p>No se encontraron personajes.</p>';
    }
}

// Función para mostrar personajes
function mostrarPersonajes(personajes) {
    contenedorPersonajes.innerHTML = ''; // Limpiar el contenedor
    
    personajes.forEach(personaje => {
        const personajeDiv = document.createElement('div');
        personajeDiv.classList.add('cardPersonaje');
        personajeDiv.innerHTML = `
            <img src="${personaje.image}" alt="${personaje.name}" class="imgPersonaje">
            <h3>${personaje.name}</h3>
            <p>Especie: ${personaje.species}</p>
            <p>Estado: ${personaje.status}</p>
        `;
        contenedorPersonajes.appendChild(personajeDiv);
    });
}

// Función para filtrar personajes en todas las páginas
async function filtrarPersonajes() {
    const textoBusqueda = busquedaUsuario.value.toLowerCase();
    paginaActual = 1; // Reiniciar a la primera página de resultados
    await cargarTodosLosPersonajes(paginaActual, textoBusqueda);
}

// Función para actualizar los controles de paginación
function actualizarControlesPaginacion() {
    const controlesDiv = document.getElementById("controlesPaginacion");
    controlesDiv.innerHTML = `
        <button ${paginaActual === 1 ? "disabled" : ""} id="btnAnterior">Anterior</button>
        <span>Página ${paginaActual} de ${totalPaginas}</span>
        <button ${paginaActual === totalPaginas ? "disabled" : ""} id="btnSiguiente">Siguiente</button>
    `;

    document.getElementById("btnAnterior").addEventListener("click", () => cambiarPagina(-1));
    document.getElementById("btnSiguiente").addEventListener("click", () => cambiarPagina(1));
}

// Función para cambiar de página
function cambiarPagina(direccion) {
    paginaActual += direccion;
    const textoBusqueda = busquedaUsuario.value.toLowerCase();
    cargarTodosLosPersonajes(paginaActual, textoBusqueda);
}

// Evento para detectar cuando el usuario escribe
busquedaUsuario.addEventListener('input', filtrarPersonajes);

// Cargar los personajes al iniciar
cargarTodosLosPersonajes();