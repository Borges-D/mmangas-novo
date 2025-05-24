const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Importar rotas
const mangasRoutes = require('./routes/mangas');
const usuariosRoutes = require('./routes/usuario');
const capitulosRoutes = require('./routes/capitulo');
const authRoutes = require('./routes/auth');


// Usar rotas
app.use('/api/mangas', mangasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/capitulos', capitulosRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API de Mangás está funcionando!');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    })
    .catch(err => console.error('Erro ao conectar no MongoDB:', err));
