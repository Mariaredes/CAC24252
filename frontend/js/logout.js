document.addEventListener("DOMContentLoaded", function () {
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", function () {
            localStorage.removeItem("user");
            window.location = "/index.html";
        });
    }
});
