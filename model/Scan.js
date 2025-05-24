const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // identificador legível
    descricao: { type: String },
    site: { type: String }
}, { timestamps: true });

module.exports = mongoose.models.Scan || mongoose.model('Scan', scanSchema);
