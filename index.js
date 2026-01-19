const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simulación de una futura Base de Datos en Memoria (Mock)
let userProfile = {
    username: 'iptdevs',
    preferences: ['Acción', 'Comedia'] // Preferencias de películas por defecto
};

// 1. Endpoint Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    // Credenciales seguras solicitadas
    if (username === 'iptdevs' && password === '123456') {
        // Aquí debe devolver un JWT
        return res.status(200).json({ 
            token: 'fake-jwt-token-123456', 
            user: userProfile 
        });
    }
    return res.status(401).json({ message: 'Credenciales inválidas' });
});

// 2. Endpoint Perfil (GET y PUT)
app.get('/api/profile', (req, res) => {
    // Aquí se valida el token en un middleware
    res.json(userProfile);
});

app.post('/api/profile', (req, res) => {
    const { preferences } = req.body;
    if (preferences) {
        userProfile.preferences = preferences;
        return res.status(200).json({ message: 'Perfil actualizado', user: userProfile });
    }
    res.status(400).json({ message: 'Datos incompletos' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend corriendo en http://localhost:${PORT}`);
});