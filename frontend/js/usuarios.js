document.addEventListener("DOMContentLoaded", function () {
  const btnUsuarios = document.getElementById("btn-usuarios");
  const newTable = document.getElementById("admin-table");
  const baseURL = "https://cac-ecommerce.vercel.app/"
  const localURL = "http://localhost:8080/"

  // Función para obtener y mostrar usuarios
  const getUsers = async () => {
    // Limpiar contenido actual
    newTable.innerHTML = "";

    // Crear una sola tabla
    const table = document.createElement("table");
    table.className = "table user-list";

    // Crear el encabezado de la tabla
    table.innerHTML = `
            <thead>
                <tr>
                    <th class="text-center"><span>Usuario</span></th>
                    <th class="text-center"><span>Rol</span></th>
                    <th class="text-center"><span>Email</span></th>
                    <th class="text-center"><span>Acciones</span></th>
                </tr>
            </thead>
            <tbody></tbody> <!-- Cuerpo de la tabla donde se añadirán las filas -->
        `;

    // Agregar la tabla al contenedor
    newTable.appendChild(table);

    // Obtener usuarios
<<<<<<< HEAD
    const response = await fetch("http://localhost:3000/usuarios");
    const users = await response.json();

    // Iterar sobre cada usuario y agregarlos como filas a la tabla
    users.forEach(async (user) => {
      const roleNameResponse = await fetch(
        `http://localhost:3000/roles/${user.id_rol}`
      );
=======
    const responseUsuarios = await fetch(`${baseURL}usuarios`);
    const users = await responseUsuarios.json();

    // Iterar sobre cada usuario y agregarlos como filas a la tabla
    users.forEach(async (user) => {
      const roleNameResponse = await fetch(`${baseURL}roles/${user.id_rol}`);
>>>>>>> nicolas-cartellone
      const role = await roleNameResponse.json();

      // Crear una nueva fila
      const row = document.createElement("tr");

      // Añadir celdas con los datos del usuario
      row.innerHTML = `
                <td class="text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="">
                    <span class="user-link">${user.nombre} ${user.apellido}</span>
                </td>
                <td class="text-center">${role[0].nombre}</td>
                <td class="text-center"><span href="mailto:${user.email}">${user.email}</span></td>
                <td class="text-center">
                    <a href="#" class="table-link">
                        <span class="fa-stack">
                            <i class="fa fa-square fa-stack-2x"></i>
                            <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    <a href="#" class="table-link danger btn-eliminar" data-user-id="${user.id}">
                        <span class="fa-stack">
                            <i class="fa fa-square fa-stack-2x"></i>
                            <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </td>
            `;

      const btnEliminar = row.querySelector(".btn-eliminar");
      btnEliminar.addEventListener("click", () => {
        const userId = btnEliminar.getAttribute("data-user-id");
        eliminarUsuario(userId);
      });

      // Agregar el EventListener al botón de actualizar
      const btnActualizar = row.querySelector(".fa-pencil");
      btnActualizar.addEventListener("click", () => {
        mostrarModalActualizar(user);
      });

      // Agregar la fila al cuerpo de la tabla
      table.querySelector("tbody").appendChild(row);
    });
  };

  // Función para crear el usuario
  const crearUsuario = async () => {
    const form = document.getElementById("form-crear-usuario");
    const formData = new FormData(form);

    const nuevoUsuario = {
      nombre: formData.get("nombre"),
      apellido: formData.get("apellido"),
      email: formData.get("email"),
      contraseña: formData.get("contraseña"),
      id_rol: parseInt(formData.get("rol-usuario")), // Convertir a número entero
    };

    try {
<<<<<<< HEAD
      const response = await fetch("http://localhost:3000/usuarios/", {
=======
      const response = await fetch(`${baseURL}usuarios/`, {
>>>>>>> nicolas-cartellone
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!response.ok) {
        throw new Error("Error al crear el usuario");
      }

      // Actualizar la tabla de usuarios
      getUsers();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para crear el usuario
  const eliminarUsuario = async (userId) => {
    try {
<<<<<<< HEAD
      const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
=======
      const response = await fetch(`${baseURL}usuarios/${userId}`, {
>>>>>>> nicolas-cartellone
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar usuario");
      }

      // Actualizar la tabla de usuarios después de eliminar
      getUsers();
    } catch (error) {
      console.error("Error:", error);
      // Manejar el error según tu necesidad (por ejemplo, mostrar un mensaje al usuario)
    }
  };

  const actualizarUsuario = async (userId) => {
    const form = document.getElementById("form-crear-usuario");
    const formData = new FormData(form);

    const usuarioActualizado = {
      nombre: formData.get("nombre"),
      apellido: formData.get("apellido"),
      email: formData.get("email"),
      id_rol: parseInt(formData.get("rol-usuario")) // Convertir a número entero
    };

    try {
<<<<<<< HEAD
        const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarioActualizado)
        });
=======
      const response = await fetch(`${baseURL}usuarios/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuarioActualizado)
      });
>>>>>>> nicolas-cartellone

      if (!response.ok) {
        throw new Error("Error al actualizar usuario");
      }

      // Actualizar la tabla de usuarios después de actualizar
      getUsers();
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      // Manejar el error según tu necesidad (por ejemplo, mostrar un mensaje al usuario)
    }
  };

  // Función para crear el botón y modal de Usuarios
  const createBtnOpenModalUsuarios = async () => {
    const btnOpenModal = document.getElementById("btn-open-modal");
    btnOpenModal.innerHTML = `
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modal-usuario">
                Crear usuario
            </button>

            <!-- Modal de Crear Usuario -->
            <div class="modal fade" id="modal-usuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Crear Usuario</h1>
                            <button id="btn-header-close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <!-- Aquí va el formulario para crear usuario -->
                            <form id="form-crear-usuario">
                                <!-- Campos del formulario -->
                                <div class="mb-3">
                                    <label for="nombre" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre" required>
                                </div>
                                <div class="mb-3">
                                    <label for="apellido" class="form-label">Apellido</label>
                                    <input type="text" class="form-control" id="apellido" name="apellido" placeholder="Apellido" required>
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email" name="email" placeholder="Email@ejemplo.com" required>
                                </div>
                                <div class"mb-3">
                                    <label for="contraseña" class="form-label">Contraseña</label>
                                    <input type="password" class="form-control" id="contraseña" name="contraseña" placeholder="*******" required>
                                </div >
                                <div class="mb-3 mt-3">
                                    <label for="rolUsuario" class="form-label">Rol</label>
                                    <select id="rol-usuario" name="rol-usuario" class="form-select" aria-label="Seleccionar rol" required>
                                        <!-- Opciones de categorías cargadas dinámicamente -->
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button id="btn-close-modal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-success" id="btn-guardar-usuario">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

    const btnCloseModal = document.getElementById("btn-close-modal");
    btnCloseModal.addEventListener("click", () => {
      const form = document.getElementById("form-crear-usuario");
      form.reset()
      const btnGuardar = document.getElementById("btn-guardar-usuario");
      btnGuardar.innerHTML = "Guardar";
      btnGuardar.removeEventListener("click", actualizarUsuario);
    })

    const btnHeaderClose = document.getElementById("btn-header-close");
    btnHeaderClose.addEventListener("click", () => {
      const form = document.getElementById("form-crear-usuario");
      form.reset()
      const btnGuardar = document.getElementById("btn-guardar-usuario");
      btnGuardar.innerHTML = "Guardar";
      btnGuardar.removeEventListener("click", actualizarUsuario);
    })

    // Obtener roles y actualizar el select
    try {
      const response = await fetch(`${baseURL}roles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Error al obtener los roles");
      }
      const roles = await response.json();
      const selectRoles = document.getElementById("rol-usuario");
      selectRoles.innerHTML = ''; // Limpiar opciones anteriores
      roles.forEach(role => {
        const option = document.createElement('option');
        option.value = role.id; // Asegúrate de tener el ID del rol
        option.textContent = role.nombre;
        selectRoles.appendChild(option);
      });
    } catch (error) {
      console.error("Error:", error);
      // Manejar el error según tu necesidad (por ejemplo, mostrar un mensaje al usuario)
    }


    const btnSaveUsuario = document.getElementById("btn-guardar-usuario");
    btnSaveUsuario.addEventListener("click", crearUsuario);


  };

  const mostrarModalActualizar = async (user) => {
    const modalUsuario = new bootstrap.Modal(document.getElementById("modal-usuario"),
      {
        backdrop: 'static',
        keyboard: false
      });
    modalUsuario.show();

    // Rellenar el formulario con los datos del usuario a actualizar
    const form = document.getElementById("form-crear-usuario");
    form.reset(); // Limpiar el formulario antes de rellenarlo

    form.querySelector("#nombre").value = user.nombre;
    form.querySelector("#apellido").value = user.apellido;
    form.querySelector("#email").value = user.email;
    form.querySelector("#rol-usuario").value = user.id_rol;

    // Cambiar el botón "Guardar" por "Actualizar" y actualizar el EventListener
    const btnGuardar = document.getElementById("btn-guardar-usuario");
    btnGuardar.innerHTML = "Actualizar";
    btnGuardar.removeEventListener("click", crearUsuario); // Remover el EventListener anterior
    btnGuardar.addEventListener("click", () => {
<<<<<<< HEAD
        actualizarUsuario(user.id);
    });
};

  const loadRolesOptions = async () => {
    const selectRol = document.getElementById("rol-usuario");
    selectRol.innerHTML = "";

    const responnse = await fetch("http://localhost:3000/roles");
    const roles = await responnse.json();

    roles.forEach((rol) => {
      const option = document.createElement("option");
      option.value = rol.id;
      option.text = rol.nombre;

      selectRol.appendChild(option);
=======
      actualizarUsuario(user.id);
      modalUsuario.hide();
>>>>>>> nicolas-cartellone
    });
  };

  // Cargar la tabla de usuarios al cargar la página
  getUsers();
  createBtnOpenModalUsuarios();

  btnUsuarios.addEventListener("click", () => {
    getUsers();
    createBtnOpenModalUsuarios(); // Actualizar el botón y modal de Usuarios
  });
});
