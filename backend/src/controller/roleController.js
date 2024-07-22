const db = require('../db/db')

const getAllRoles = (req, res) => {
    const getAllRolesQuery = 'SELECT * FROM Rol'

    db.query(getAllRolesQuery, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los roles' })
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'No hay roles creados' })
        }
        res.status(200).json(result)
    })
}

const getRoleById = (req, res) => {
    const { id } = req.params
    const getRoleByIdQuery = 'SELECT * FROM Rol WHERE id = ?'

    db.query(getRoleByIdQuery, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener el rol' })
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Rol no encontrado' })
        }
        res.status(200).json(result)
    })
}

const createRol = (req, res) => {
    const { nombre } = req.body
    const createRolQuery = 'INSERT INTO Rol (nombre) VALUES (?)'

    db.query(createRolQuery, [nombre], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear el rol' })
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No se pudo crear el rol' })
        }
        res.status(201).json({ message: 'Rol creado exitosamente' })
    })
}

const updateRol = (req, res) => {
    const { id } = req.params
    const { nombre } = req.body
    const updateRolQuery = 'UPDATE Rol SET nombre = ? WHERE id = ?'

    db.query(updateRolQuery, [nombre, id], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error al actualizar el rol' })
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Rol no encontrado' })
        }
        res.status(200).json({ message: 'Rol actualizado exitosamente' })
    })
}

const deleteRol = (req, res) => {
    const { id } = req.params
    const deleteRolQuery = 'DELETE FROM Rol WHERE id = ?'

    db.query(deleteRolQuery, [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error al eliminar el rol' })
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Rol no encontrado' })
        }
        res.status(200).json({ message: 'Rol eliminado exitosamente' })
    })
}

module.exports = {
    getAllRoles,
    getRoleById,
    createRol,
    updateRol,
    deleteRol
}