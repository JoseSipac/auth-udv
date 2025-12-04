const express = require('express');
const cors = require('cors');
const sql = require('mssql');

const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURA TU SQL SERVER
const dbConfig = {
  user: 'udv_mobile',
  password: 'StrongP@ssw0rd2025!',
  server: 'localhost',
  database: 'UdvAuthDb',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, password)
      .query(`
        SELECT TOP 1 * FROM Usuarios
        WHERE email = @email AND password = @password
      `);

    if (result.recordset.length === 1) {
      return res.json({
        ok: true,
        token: 'token-falso-demo',
      });
    } else {
      return res.status(401).json({
        ok: false,
        message: 'Credenciales incorrectas'
      });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      message: 'Error en el servidor'
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
