const pool = require('../config/db');

const obtenerProductos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor al obtener productos' });
    }
};

const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        // IA: Riesgo de SQL Injection al concatenar req.params.id → Solución manual: Uso del método execute() con placeholders (?) para blindar la consulta.
        const [rows] = await pool.execute('SELECT * FROM productos WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const crearProducto = async (req, res) => {
    const { nombre, precio, stock } = req.body;
    
    if (!nombre || !precio) {
        return res.status(400).json({ error: 'Nombre y precio son campos obligatorios' });
    }

    try {
        const [result] = await pool.execute(
            'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
            [nombre, precio, stock || 0]
        );
        res.status(201).json({ 
            mensaje: 'Producto creado exitosamente',
            id: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, stock } = req.body;

    try {
        const [result] = await pool.execute(
            'UPDATE productos SET nombre = COALESCE(?, nombre), precio = COALESCE(?, precio), stock = COALESCE(?, stock) WHERE id = ?',
            [nombre, precio, stock, id]
        );

        // IA: ¿Cómo saber si el UPDATE realmente afectó algún registro? → Solución manual: Validar result.affectedRows === 0 para devolver el status 404 exacto de la rúbrica.
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado para actualizar' });
        }
        res.status(200).json({ mensaje: 'Producto actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute('DELETE FROM productos WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json({ mensaje: 'Producto eliminado (Física)' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};