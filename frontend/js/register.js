document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    const baseURL = "https://cac-ecommerce.vercel.app/"
    const localURL = "http://localhost:8080/"

    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const nombre = document.getElementById("username").value;
        const apellido = document.getElementById("apellido").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`${baseURL}usuarios`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    email: email,
                    contraseña: password,
                    id_rol: 2
                }),
            });

            if(!response.ok){
                throw new Error("Error en la solicitud");
            }

            alert("Usuario creado con éxito, inicia sesión para continuar.");
        } catch (error) {
            console.error("Error al crear usuario:", error);
            alert("Error al crear usuario. Intenta de nuevo.");
        }
    })
});
