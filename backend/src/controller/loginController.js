const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { email, contraseña } = req.body;

    const sql = "SELECT * FROM Usuario WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error("Error al hacer login:", err);
            return res.status(500).json({ mensaje: "Error al hacer login" });
        }

        if (results.length === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        const usuario = results[0];
        
        // Comparar la contraseña proporcionada con la contraseña encriptada almacenada
        bcrypt.compare(contraseña, usuario.contraseña, (err, match) => {
            if (err) {
                console.error("Error al comparar contraseñas:", err);
                return res.status(500).json({ mensaje: "Error al hacer login" });
            }

            if (!match) {
                // Si las contraseñas no coinciden
                return res.status(401).json({ mensaje: "Contraseña incorrecta" });
            }

            // Si las contraseñas coinciden, enviar el usuario como respuesta
            const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, 'secreto', { expiresIn: '1h' });
            res.json({
                mensaje: "Usuario logueado con éxito",
                token: token,
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    email: usuario.email,
                    id_rol: usuario.id_rol,
                },
            });
        });
    });
};

module.exports = {
    login,
};
