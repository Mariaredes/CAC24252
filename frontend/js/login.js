document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const baseURL = "https://cac-ecommerce.vercel.app/"
    const localURL = "http://localhost:8080/"

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`${baseURL}login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    contraseña: password
                }),
            });

            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }

            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data));

            if (data.usuario.id_rol === 1) {
                // Redirige al usuario administrador a admin.html
                window.location = "/admin.html";
            } else {
                // Redirige a otros usuarios a index.html o la página principal
                window.location = "/index.html";
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Error al iniciar sesión. Verifica tus credenciales.");
        }
    });
});
