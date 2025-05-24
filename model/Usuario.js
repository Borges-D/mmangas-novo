const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senhaHash: { type: String, required: true },
    scan: { type: mongoose.Schema.Types.ObjectId, ref: 'Scan' }, // scan que o usuário pertence, se for scan
    perfilPublico: { type: Boolean, default: true },
    rank: {
        level: { type: Number, default: 1 },
        mangasLidos: { type: Number, default: 0 },
        pontosSemana: { type: Number, default: 0 },
        pontosDia: { type: Number, default: 0 }
    }
});

module.exports = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);
