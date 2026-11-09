const mysql = require('mysql2/promise');
require('dotenv').config();

// IA: Pool de conexiones fallaba con callbacks nativos →
// Solución manual: Importar 'mysql2/promise' para usar async/await y connection pooling según rúbrica.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;