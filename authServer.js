const express = require('express');
const bodyParser = require('body-parser');
//const { Client } = require('./db'); // Importa il modello Client dal file db.js
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'yourSecretKey'; // Modifica questa chiave segreta

app.use(bodyParser.json());

// Genera un token JWT con ClientID, Organization e UserID
app.post('/generateToken', (req, res) => {
  const { ClientID, Organization, UserID } = req.body;

  if (!ClientID || !Organization || !UserID) {
    return res.status(400).json({ message: 'ClientID, Organization e UserID sono necessari' });
  }

  const payload = {
    ClientID,
    Organization,
    UserID,
  };

  try {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Errore nella generazione del token' });
  }
});

// Middleware per verificare l'autenticità del token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token non fornito' });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token non valido' });
    req.decoded = decoded;
    next();
  });
};

// Endpoint per la verifica del token
app.get('/verifyToken', verifyToken, (req, res) => {
  res.json({ message: 'Token valido' });
});

const port = 3000; // Scegli una porta
app.listen(port, () => {
  console.log(`AuthServer running on port ${port}`);
});
