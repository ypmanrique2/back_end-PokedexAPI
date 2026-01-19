const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = 'pokedex_secret';

app.post('/api/login', (req, res) => {
    const { nickname, password } = req.body;

    if (nickname === 'iptdevs' && password === '123456') {
        const token = jwt.sign({ nickname }, SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ message: 'Credenciales inválidas' });
});

app.get('/api/profile', (req, res) => {
    res.json({
        nickname: 'iptdevs',
        moviePreferences: ['Acción', 'Ciencia Ficción']
    });
});

app.put('/api/profile', (req, res) => {
    res.json({ message: 'Perfil actualizado correctamente' });
});

app.listen(3000, () => {
    console.log('Backend running on http://localhost:3000');
});