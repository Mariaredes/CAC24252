const db = require('../db/db')

const getAllProducts = (req, res) => {

    const sql = 'SELECT * FROM Producto';
    db.query(sql, (err,result) => 
    {
        if(err) throw err;
        res.json(result);

    });
}

const getProductById = (req, res) => {

    const { id } = req.params;
    const sql = 'SELECT * FROM producto WHERE id = ?';
    db.query(sql, [id], (err, result) => 
        {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener el producto' });
              }
              if (result.length === 0) {
                return res.status(404).json({ message: 'Producto no encontrado' });
              } 
            res.json(result[0]);
        });
}

const createProduct = (req, res) => {

    const { nombre, descripcion, precio, id_categoria } =req.body;
    
    if (!Number.isInteger(id_categoria)) {
        return res.status(400).json({ mensaje: 'El valor de id_categoria debe ser un número entero válido' });
    }

    const sql = 'INSERT INTO Producto (nombre, descripcion, precio, id_categoria) VALUES (?,?,?,?)';

    
    db.query(sql, [nombre, descripcion, precio, id_categoria], (err, result) => {
        if (err) {
            console.error('Error al crear producto:', err);
            return res.status(500).json({ mensaje: 'Error al crear producto' });
        }

        
        res.json({
            mensaje: 'producto Creado con Éxito',
            idProducto: result.insertId
        });
    });
}

const updateProduct = (req, res) => {

    const {id} = req.params;
    const {nombre, descripcion, precio, id_categoria} = req.body;

    const sql = 'UPDATE Producto SET nombre = ?, descripcion = ?, precio = ?, id_categoria = ? WHERE id = ?'
    db.query(sql,[nombre, descripcion, precio, id_categoria, id], (err, result) => 
    {
        if(err) throw err;

        res.json(
            {
                message : 'Producto editado con éxito'
            }
        );
    });
}

const deleteProduct = (req, res) => {

    const {id} = req.params;
    const sql = 'DELETE FROM Producto WHERE id= ?';
    db.query(sql, [id], (err, result) => 
        {
            if(err) throw err;

            res.json(
                {
                    message: 'Producto Eliminado XD'
                }
            );
        });
    
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}