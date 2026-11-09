const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productosRoutes = require('./src/routes/productosRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Permite parsear el req.body como application/json

// Rutas base
app.use('/api/productos', productosRoutes);

// Manejo de rutas inexistentes (404 Global)
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
    console.log(`[=] Servidor backend corriendo en http://localhost:${PORT}`);
});