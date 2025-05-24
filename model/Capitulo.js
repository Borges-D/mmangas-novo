const mongoose = require('mongoose');

const capituloSchema = new mongoose.Schema({
    manga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga', required: true },
    numero: { type: Number, required: true },
    titulo: { type: String },
    dataPublicacao: { type: Date, default: Date.now },
    paginas: [{ type: String }] // URLs das imagens do capítulo
});

module.exports = mongoose.model('Capitulo', capituloSchema);
