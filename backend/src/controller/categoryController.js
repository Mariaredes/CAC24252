const db = require('../db/db')

const getAllCategories = (req, res) => {

    const sql = 'SELECT * FROM Categoria';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);

    });
}

const getCategoryById = (req, res) => {
    const { id } = req.params;
    const getCategoryById = 'SELECT * FROM Categoria WHERE id = ?'

    db.query(getCategoryById, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener la categoria' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Categoria no encontrada' });
        }
        res.status(200).json(result);
    })
}

const createCategory = (req, res) => {

    const { nombre } = req.body;
    const sql = 'INSERT INTO Categoria (nombre) VALUES (?)';


    db.query(sql, [nombre], (err, result) => {
        if (err) {
            console.error('Error al crear la categoria:', err);
            return res.status(500).json({ mensaje: 'Error al crear la categoria' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'No se pudo crear la categoria' });
        }
        res.status(201).json({ mensaje: 'categoría Creada con Éxito' });
    });
}

const updateCategory = (req, res) => {

    const { id } = req.params;
    const { nombre } = req.body;

    const sql = 'UPDATE Categoria SET  nombre = ? WHERE id = ?'
    db.query(sql, [nombre, id], (err, result) => {
        if (err) throw err;

        res.json(
            {
                message: 'Categoría editado con éxito'
            }
        );
    });
}

const deleteCategory = (req, res) => {

    const { id } = req.params;
    const sql = 'DELETE FROM Categoria WHERE id= ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;

        res.json(
            {
                message: 'Categoría Eliminada XD'
            }
        );
    });
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}