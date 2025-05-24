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
    ultimaLeitura: { type: Date },
    capituloslidos: [{
        manga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga' },
        capitulo: { type: mongoose.Schema.Types.ObjectId, ref: 'Capitulo' },
        dataLeitura: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

// Schema do Manga
const mangaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    descricao: String,
    capa: String,
    status: { type: String, enum: ['em andamento', 'completo', 'dropado'], default: 'em andamento' }
}, { timestamps: true });

// Schema do Capítulo
const capituloSchema = new mongoose.Schema({
    numero: { type: Number, required: true },
    titulo: String,
    manga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga', required: true },
    paginas: [String]
}, { timestamps: true });


// Exportar todos os modelos
module.exports = {
    Usuario: mongoose.model('Usuario', usuarioSchema),
    Manga: mongoose.model('Manga', mangaSchema),
    Capitulo: mongoose.model('Capitulo', capituloSchema)
};