const mysql = require('mysql2');

// Configura la conexión a la base de datos sin seleccionar una específica
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

// Conectar a MySQL y crear la base de datos si no existe
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
  } else {
    console.log('Conexión exitosa a MySQL');
    // Query para crear la base de datos si no existe
    connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`, (err, result) => {
      if (err) {
        console.error('Error al crear la base de datos:', err);
      } else {
        console.log(`Base de datos ${process.env.DATABASE} creada exitosamente o ya existe`);
      }

      // Selecciona la base de datos una vez creada o confirmada
      connection.query(`USE ${process.env.DATABASE}`, (err) => {
        if (err) {
          console.error('Error al seleccionar la base de datos:', err);
        } else {
          console.log(`Base de datos ${process.env.DATABASE} seleccionada`);

          // Consultas SQL para crear las tablas
          const createRolTable = `
            CREATE TABLE IF NOT EXISTS Rol (
              id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
              nombre VARCHAR(50) NOT NULL
            )
          `;

          const createCategoriaTable = `
            CREATE TABLE IF NOT EXISTS Categoria (
              id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
              nombre VARCHAR(50) NOT NULL
            )
          `;

          const createProductoTable = `
            CREATE TABLE IF NOT EXISTS Producto (
              id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
              nombre VARCHAR(50) NOT NULL,
              descripcion TEXT NOT NULL,
              precio DECIMAL(10,2) NOT NULL,
              id_categoria INT,
              FOREIGN KEY (id_categoria) REFERENCES Categoria(id)
            )
          `;

          const createUsuarioTable = `
            CREATE TABLE IF NOT EXISTS Usuario (
              id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
              nombre VARCHAR(50) NOT NULL,
              apellido VARCHAR(50) NOT NULL,
              email VARCHAR(100) NOT NULL,
              contraseña VARCHAR(200) NOT NULL,
              id_rol INT DEFAULT 1,
              FOREIGN KEY (id_rol) REFERENCES Rol(id)
            )
          `;

          // Ejecutar las consultas para crear las tablas
          connection.query(createRolTable, (err, results) => {
            if (err) console.error('Error al crear tabla Rol:', err);
            else console.log('Tabla Rol creada exitosamente');
          });

          connection.query(createCategoriaTable, (err, results) => {
            if (err) console.error('Error al crear tabla Categoria:', err);
            else console.log('Tabla Categoria creada exitosamente');
          });

          connection.query(createProductoTable, (err, results) => {
            if (err) console.error('Error al crear tabla Producto:', err);
            else console.log('Tabla Producto creada exitosamente');
          });

          connection.query(createUsuarioTable, (err, results) => {
            if (err) console.error('Error al crear tabla Usuario:', err);
            else console.log('Tabla Usuario creada exitosamente');
          });
        }
      });
    });
  }
});

module.exports = connection;
