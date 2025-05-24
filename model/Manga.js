const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: String,
    autor: String,
    generos: [String],
    imagemCapa: String,
    capitulos: [
        {
            numero: Number,
            titulo: String,
            paginas: [String], // URLs das imagens das páginas
            dataPublicacao: Date
        }
    ],
    criadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    scan: { type: mongoose.Schema.Types.ObjectId, ref: 'Scan' }
}, { timestamps: true });

module.exports = mongoose.models.Manga || mongoose.model('Manga', mangaSchema);
