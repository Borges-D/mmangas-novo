const mongoose = require('mongoose');

const capituloSchema = new mongoose.Schema({
    manga: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manga',
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    titulo: {
        type: String
    },
    paginas: [{
        type: String // URLs das páginas (imagens ou PDFs)
    }],
    dataPublicacao: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

module.exports = mongoose.models.Capitulo || mongoose.model('Capitulo', capituloSchema);
