let contenedorPersonajes = document.getElementById("contenedorPersonajes");
let busquedaUsuario = document.getElementById("busquedaUsuario");
let paginaActual = 1;
let totalPaginas = 1;


async function cargarTodosLosPersonajes(page = 1, name = "") {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`);
        const data = await response.json();
        todosLosPersonajes = data.results || [];
        totalPaginas = data.info.pages;
        mostrarPersonajes(todosLosPersonajes);
        actualizarControlesPaginacion();
    } catch (error) {
        console.error('Error fetching data:', error);
        contenedorPersonajes.innerHTML = '<p style="color: white;">No se encontraron personajes.</p>';
    }
}


function mostrarPersonajes(personajes) {
    contenedorPersonajes.innerHTML = '';
    
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


async function filtrarPersonajes() {
    const textoBusqueda = busquedaUsuario.value.toLowerCase();
    paginaActual = 1;
    await cargarTodosLosPersonajes(paginaActual, textoBusqueda);
}


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

function cambiarPagina(direccion) {
    paginaActual += direccion;
    const textoBusqueda = busquedaUsuario.value.toLowerCase();
    cargarTodosLosPersonajes(paginaActual, textoBusqueda);
}

busquedaUsuario.addEventListener('input', filtrarPersonajes);
cargarTodosLosPersonajes();