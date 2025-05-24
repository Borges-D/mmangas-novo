const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // slug para URL amigável
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
    scanSlug: { type: String, required: true } // Agora usamos o slug da Scan, e não o ObjectId
}, { timestamps: true });

module.exports = mongoose.models.Manga || mongoose.model('Manga', mangaSchema);
