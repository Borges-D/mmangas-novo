const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['scan', 'user'], default: 'user' },
    mangasLidos: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    experiencia: { type: Number, default: 0 },
    rankSemana: { type: Number, default: 0 },
    ultimoAcesso: { type: Date },
    capituloslidos: [{
        manga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga' },
        capitulo: { type: mongoose.Schema.Types.ObjectId, ref: 'Capitulo' },
        dataLeitura: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

// Evita recriar o modelo se já existir
module.exports = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);
