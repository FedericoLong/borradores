// Función para obtener las películas y mostrarlas en la tabla
async function getPeliculas() {
    try {
        const response = await fetch('https://proyecto-movies-cac.000webhostapp.com/crud/getPeliculas.php');
        const peliculas = await response.json();
        const moviesTableBody = document.querySelector('#movies-table tbody');
        
        // Limpiar la tabla antes de agregar las filas
        moviesTableBody.innerHTML = '';

        peliculas.forEach(pelicula => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${pelicula.titulo}</td>
                <td><button class="delete-button" onclick="deletePelicula(${pelicula.id})">Eliminar</button></td>
            `;

            moviesTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener las películas:', error);
    }
}

// Función para eliminar una película
async function deletePelicula(id) {
    try {
        const response = await fetch('https://proyecto-movies-cac.000webhostapp.com/crud/deletePelicula.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });

        if (response.ok) {
            alert('Película eliminada exitosamente');
            getPelicula(); // Actualizar la lista de películas después de eliminar
        } else {
            alert('Error al eliminar la película');
        }
    } catch (error) {
        console.error('Error al eliminar la película:', error);
    }
}

// Llamar a getPelicula cuando se cargue la página
document.addEventListener('DOMContentLoaded', getPelicula);

