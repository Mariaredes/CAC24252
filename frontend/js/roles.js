document.addEventListener("DOMContentLoaded", function () {
    const btnRoles = document.getElementById('btn-roles');
    const newTable = document.getElementById('admin-table');
    const baseURL = "https://cac-ecommerce.vercel.app/"
    const localURL = "http://localhost:8080/"

    // Función para obtener y mostrar roles
    const getRoles = async () => {
        // Limpiar contenido actual
        newTable.innerHTML = '';

        // Crear una sola tabla
        const table = document.createElement('table');
        table.className = 'table user-list';

        // Crear el encabezado de la tabla
        table.innerHTML = `
            <thead>
                <tr>
                    <th class="text-center"><span>Id</span></th>
                    <th class="text-center"><span>Rol</span></th>
                    <th class="text-center"><span>Acciones</span></th>
                </tr>
            </thead>
            <tbody></tbody> <!-- Cuerpo de la tabla donde se añadirán las filas -->
        `;

        // Agregar la tabla al contenedor
        newTable.appendChild(table);

        // Obtener roles
<<<<<<< HEAD
        const response = await fetch('http://localhost:3000/roles');
=======
        const response = await fetch(`${baseURL}roles`);
>>>>>>> nicolas-cartellone
        const roles = await response.json();

        // Iterar sobre cada rol y agregarlos como filas a la tabla
        roles.forEach(role => {
            // Crear una nueva fila
            const row = document.createElement('tr');

            // Añadir celdas con los datos del rol
            row.innerHTML = `
                <td class="text-center">${role.id}</td>
                <td class="text-center">${role.nombre}</td>
                <td class="text-center">
                    <a href="#" class="table-link">
                        <span class="fa-stack">
                            <i class="fa fa-square fa-stack-2x"></i>
                            <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    <a href="#" class="table-link danger btn-eliminar" data-role-id="${role.id}">
                        <span class="fa-stack">
                            <i class="fa fa-square fa-stack-2x"></i>
                            <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </td>
            `;

            const btnEliminar = row.querySelector(".btn-eliminar");
            btnEliminar.addEventListener("click", () => {
                const roleId = btnEliminar.getAttribute("data-role-id");
                eliminarRol(roleId);
            });

            const btnActualizar = row.querySelector(".fa-pencil");
            btnActualizar.addEventListener("click", () => {
                mostrarModalActualizarRol(role)
            });

            // Agregar la fila al cuerpo de la tabla
            table.querySelector('tbody').appendChild(row);
        });
    };

    // Función para crear un rol nuevo
    const crearRol = async () => {
        const nombreRol = document.getElementById("nombre-rol").value;

        const nuevoRol = {
            nombre: nombreRol
        };

        try {
            const response = await fetch(`${baseURL}roles/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoRol),
            });

            if (!response.ok) {
                throw new Error("Error al crear el rol");
            }

            // Actualizar la tabla de roles
            getRoles();
            roleForm.reset();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Función para eliminar un rol
    const eliminarRol = async (roleId) => {
        try {
            const response = await fetch(`${baseURL}roles/${roleId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Error al eliminar rol");
            }

            // Actualizar la tabla de roles después de eliminar
            getRoles();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const actualizarRol = async (roleId) => {
        const form = document.getElementById("form-crear-rol")
        const formData = new FormData(form);

        const rolActualizado = {
            nombre: formData.get("nombre-rol")
        };

        try {
            const response = await fetch(`${baseURL}roles/${roleId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rolActualizado),
            })

            if (!response.ok) {
                throw new Error("Error al actualizar el rol");
            }

            // Actualizar la tabla de roles después de actualizar
            getRoles();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Función para crear el botón y modal de Roles
    const createBtnOpenModalRoles = () => {
        const btnOpenModal = document.getElementById("btn-open-modal");
        btnOpenModal.innerHTML = `
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-rol">
                Crear rol
            </button>

            <!-- Modal de Crear Rol -->
            <div class="modal fade" id="modal-rol" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Crear Rol</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <!-- Aquí va el formulario para crear rol -->
                            <form id="form-crear-rol">
                                <!-- Campos del formulario -->
                                <div class="mb-3">
                                    <label for="nombre-rol" class="form-label">Nombre del Rol</label>
                                    <input type="text" class="form-control" id="nombre-rol" name="nombre-rol" placeholder="Nombre del rol" required>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" id="btn-guardar-rol">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const btnSaveRol = document.getElementById("btn-guardar-rol");
        btnSaveRol.addEventListener("click", crearRol);
    };

    const mostrarModalActualizarRol = (rol) => {
        const modalRol = new bootstrap.Modal(document.getElementById("modal-rol"), {
            backdrop: "static",
            keyboard: false,
        });
        modalRol.show();

        const form = document.getElementById("form-crear-rol");
        form.reset()

        form.querySelector("#nombre-rol").value = rol.nombre;

        const btnSaveRol = document.getElementById("btn-guardar-rol");
        btnSaveRol.innerHTML = "Actualizar"
        btnSaveRol.removeEventListener("click", crearRol)
        btnSaveRol.addEventListener("click", () => {
            actualizarRol(rol.id)
            modalRol.hide();
        })
    }

    // Actualizar la tabla de roles al hacer clic en el botón de roles
    btnRoles.addEventListener("click", () => {
        getRoles();
        createBtnOpenModalRoles(); // Crear el botón y modal de Roles
    });
});
