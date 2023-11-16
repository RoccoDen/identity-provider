const express = require('express');
const axios = require('axios');

const app = express();

// Endpoint libero che restituisce data e orario attuale
app.get('/freeEndpoint', (req, res) => {
  const currentTime = new Date();
  res.json({ currentTime });
});

// Endpoint protetto che richiede un token valido
app.get('/protectedEndpoint', async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token non fornito' });
    }

    // Esegui la richiesta al server di autenticazione (AuthServer) per verificare il token
    const response = await axios.get('http://localhost:3000/verifyToken', {
      headers: { Authorization: token },
    });

    if (response.status === 200) {
      const currentTime = new Date();
      res.json({ currentTime, message: 'Secret' });
    }
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({ message: error.response.data.message });
    } else {
      res.status(500).json({ message: 'Errore nella verifica del token' });
    }
  }
});

const port = 4000; // Scegli una porta diversa dalla prima app
app.listen(port, () => {
  console.log(`ExternalServer running on port ${port}`);
});
