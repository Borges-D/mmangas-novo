const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
require('./model/db'); // Importe os modelos primeiro

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Importar rotas (corrigindo os caminhos)
const authRoutes = require('./routes/auth');
const mangasRoutes = require('./routes/mangas');
const usuariosRoutes = require('./routes/usuarios'); // Certifique-se que o nome do arquivo está correto
const capitulosRoutes = require('./routes/capitulos'); // Certifique-se que o nome do arquivo está correto


// Usar rotas
app.use('/api/auth', authRoutes);
app.use('/api/mangas', mangasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/capitulos', capitulosRoutes);
// Rota de teste/status da API
app.get('/', (req, res) => {
    res.send('API de Mangás está funcionando!');
});
const PORT = process.env.PORT || 5000;

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
            console.log(`API disponível em http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar no MongoDB:', err);
        process.exit(1); // Encerra o processo se não conseguir conectar ao MongoDB
    });

// Tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
    console.error('Erro não tratado:', err);
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.log('Recebido SIGTERM. Encerrando graciosamente...');
    mongoose.connection.close(() => {
        console.log('MongoDB desconectado');
        process.exit(0);
    });
});